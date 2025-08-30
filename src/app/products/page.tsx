"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaInfoCircle, FaWeightHanging, FaFilter, FaTimes } from "react-icons/fa";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [selectedWeights, setSelectedWeights] = useState<{[key: number]: string}>({});
  const [showWeightPopup, setShowWeightPopup] = useState<number | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        let allProducts: any[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const res = await fetch(`/api/products?per_page=100&page=${page}`);
          const data = await res.json();

          if (data.length === 0) {
            hasMore = false;
          } else {
            allProducts = [...allProducts, ...data];
            page++;
          }
        }

        setProducts(allProducts);

        // Extract unique categories
        const uniqueCategories: any[] = [];
        allProducts.forEach((product: any) => {
          if (product.categories && product.categories.length > 0) {
            product.categories.forEach((category: any) => {
              if (!uniqueCategories.find(c => c.id === category.id)) {
                uniqueCategories.push(category);
              }
            });
          }
        });
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (!imagePath) return "/placeholder-product.jpg";
    return `https://farmharvesttohome.com/wp-content/uploads/${imagePath.replace(/^\//, '')}`;
  };

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => 
        product.categories && product.categories.some((cat: any) => cat.slug === selectedCategory)
      );

  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      
      // Remove weight selection when product is deselected
      const newWeights = {...selectedWeights};
      delete newWeights[productId];
      setSelectedWeights(newWeights);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  // Handle weight selection
  const handleWeightChange = (productId: number, weight: string) => {
    setSelectedWeights(prev => ({
      ...prev,
      [productId]: weight
    }));
  };

  // Get available weights for a product
  const getAvailableWeights = (product: any) => {
    if (product.attributes && product.attributes.length > 0) {
      const weightAttr = product.attributes.find((attr: any) => 
        attr.slug === 'pa_weight' || attr.name.toLowerCase() === 'weight'
      );
      return weightAttr ? weightAttr.options : [];
    }
    return [];
  };

  // Handle buy now button click
  const handleBuyNowClick = (productId: number, e: React.MouseEvent) => {
    const availableWeights = getAvailableWeights(products.find(p => p.id === productId));
    
    if (availableWeights.length > 0 && !selectedWeights[productId]) {
      e.preventDefault();
      e.stopPropagation();
      setShowWeightPopup(productId);
    } else {
      // If weight is already selected or no weights available, proceed to add to cart
      handleAddToCart(productId, e);
    }
  };

  // Handle add to cart
  const handleAddToCart = (productId: number, e: React.MouseEvent | any) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Pick selected weight (if any)
    const selectedWeight = selectedWeights[productId] || "";
    const availableWeights = getAvailableWeights(product);

    // Calculate price based on selected weight (base is 250g)
    const basePrice = parseFloat(product.price);
    let price = basePrice;

    if (selectedWeight) {
      const weight = selectedWeight.toLowerCase();
      if (weight.includes("500")) {
        price = basePrice * 2;
      } else if (weight.includes("1kg") || weight.includes("1000")) {
        price = basePrice * 4;
      } else if (weight.includes("250")) {
        price = basePrice;
      }
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price,
      size: selectedWeight || "default",
      image: product.images?.[0]?.src || "",
      quantity: 1,
    };

    // Save to localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = existingCart.findIndex(
      (item: any) => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Redirect to cart
    window.location.href = "/cart";
  };

  // Close weight popup
  const closeWeightPopup = () => {
    setShowWeightPopup(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Fresh Products</h1>
            <p className="text-gray-600">Discover farm-fresh goodness delivered to your doorstep</p>
          </div>
          
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden bg-green-600 text-white px-4 py-2 rounded-lg flex items-center mt-4"
          >
            {showMobileFilters ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
            Filters
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {showMobileFilters && (
          <div className="md:hidden bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in">
            <h3 className="font-semibold mb-3 text-gray-700 flex items-center">
              <FaFilter className="mr-2" />
              Filter by Category
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setShowMobileFilters(false);
              }}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Category Filter */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
              <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
                <FaFilter className="mr-2" />
                Filter by Category
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === "all" 
                      ? "bg-green-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? "bg-green-600 text-white shadow-md" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
                {selectedCategory !== "all" && (
                  <span> in <span className="font-semibold text-green-600">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                  </span></span>
                )}
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-md p-5 animate-pulse"
                  >
                    {/* Image Skeleton */}
                    <div className="h-56 bg-gray-200 rounded-lg mb-4 relative overflow-hidden shimmer"></div>

                    {/* Title Skeleton */}
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 shimmer"></div>

                    {/* Description Skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 shimmer"></div>

                    {/* Price + Button Skeleton */}
                    <div className="flex items-center justify-between">
                      <div className="h-7 bg-gray-200 rounded w-16 shimmer"></div>
                      <div className="h-10 bg-gray-200 rounded-lg w-24 shimmer"></div>
                    </div>
                  </div>
                ))}

                {/* Extra Loading Animation */}
                <div className="col-span-full flex flex-col items-center mt-10 space-y-4">
                  <div className="flex space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                  <p className="text-gray-500 font-medium animate-pulse">
                    Loading fresh goodies for you...
                  </p>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => {
                  const isSelected = selectedProducts.has(product.id);
                  const availableWeights = getAvailableWeights(product);
                  const selectedWeight = selectedWeights[product.id] || '';
                  const isAdding = addingToCart === product.id;
                  
                  return (
                    <div 
                      key={product.id} 
                      className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg opacity-0 animate-fade-slide ${
                        isSelected ? 'ring-2 ring-green-500 transform scale-105' : 'hover:-translate-y-1'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {/* Product Image */}
                      <div className="h-56 overflow-hidden bg-gray-100 relative">
                        <img 
                          src={getImageUrl(product.images?.[0]?.src || '')} 
                          alt={product.images?.[0]?.alt || product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {isAdding && (
                          <div className="absolute inset-0 bg-green-500 bg-opacity-70 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Fresh
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="p-5">
                        <h2 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h2>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                          {product.short_description?.replace(/<[^>]*>/g, '').substring(0, 80)}...
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-green-600 font-bold text-xl">₹{product.price}</p>
                          {availableWeights.length > 0 && (
                            <span className="text-xs text-gray-500 flex items-center">
                              <FaWeightHanging className="mr-1" />
                              {availableWeights.length} sizes
                            </span>
                          )}
                        </div>
                        
                        {/* Weight Selection (if available) */}
                        {availableWeights.length > 0 && selectedWeight && (
                          <div className="mb-4">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              Selected: {selectedWeight}
                            </span>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => handleBuyNowClick(product.id, e)}
                            disabled={isAdding}
                            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center ${
                              isAdding 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : isSelected 
                                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md' 
                                  : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                            }`}
                          >
                            {isAdding ? (
                              <span className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Adding...
                              </span>
                            ) : isSelected ? (
                              <>
                                <FaShoppingCart className="mr-2" />
                                Go to Cart
                              </>
                            ) : (
                              <>
                                <FaShoppingCart className="mr-2" />
                                Buy Now
                              </>
                            )}
                          </button>

                          <Link 
                            href={`/details/${product.id}`}
                            className="py-3 px-4 rounded-xl border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center"
                          >
                            <FaInfoCircle className="mr-2" />
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Products Found */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm animate-fade-in">
                <div className="w-24 h-24 mx-auto text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try selecting a different category or check back later</p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Weight Selection Popup */}
        {showWeightPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md w-full animate-scale-in">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaWeightHanging className="mr-2 text-green-600" />
                Select Weight
              </h3>
              <p className="text-gray-600 mb-6">Choose your preferred size for this product:</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {getAvailableWeights(products.find(p => p.id === showWeightPopup)).map((weight: string) => (
                  <button
                    key={weight}
                    onClick={() => handleWeightChange(showWeightPopup, weight)}
                    className={`p-4 border-2 rounded-xl text-center transition-all duration-200 font-medium ${
                      selectedWeights[showWeightPopup] === weight
                        ? 'bg-green-100 text-green-700 border-green-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeWeightPopup}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedWeights[showWeightPopup]) {
                      closeWeightPopup();
                      handleAddToCart(showWeightPopup, { preventDefault: () => {}, stopPropagation: () => {} } as any);
                    }
                  }}
                  disabled={!selectedWeights[showWeightPopup]}
                  className={`px-5 py-2 rounded-lg text-white transition-colors duration-200 flex items-center ${
                    selectedWeights[showWeightPopup]
                      ? 'bg-green-600 hover:bg-green-700 shadow-md'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Products Summary */}
        {selectedProducts.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl p-6 animate-slide-in-up z-40">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <FaShoppingCart className="mr-2 text-green-600" />
                  Selected Items ({selectedProducts.size})
                </h2>
                <button
                  onClick={() => setSelectedProducts(new Set())}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {Array.from(selectedProducts).slice(0, 3).map(productId => {
                  const product = products.find(p => p.id === productId);
                  if (!product) return null;
                  
                  const selectedWeight = selectedWeights[productId] || '';
                  return (
                    <div key={productId} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <img 
                        src={getImageUrl(product.images?.[0]?.src || '')} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">{product.name}</div>
                        {selectedWeight && <div className="text-xs text-gray-600">{selectedWeight}</div>}
                      </div>
                      <div className="font-semibold">₹{product.price}</div>
                    </div>
                  );
                })}
                {selectedProducts.size > 3 && (
                  <div className="flex items-center justify-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-sm text-gray-600">+{selectedProducts.size - 3} more items</span>
                  </div>
                )}
              </div>
              
              <Link 
                href="/cart"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center block font-semibold shadow-md"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 150%;
          }
        }

        /* Fade in */
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Staggered slide */
        .animate-fade-slide {
          animation: fadeSlide 0.6s ease forwards;
        }
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scale in */
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Slide in up */
        .animate-slide-in-up {
          animation: slideInUp 0.4s ease-out forwards;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}