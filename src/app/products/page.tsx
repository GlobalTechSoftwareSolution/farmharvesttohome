"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [selectedWeights, setSelectedWeights] = useState<{[key: number]: string}>({});
  const [showWeightPopup, setShowWeightPopup] = useState<number | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories: any[] = [];
        data.forEach((product: any) => {
          if (product.categories && product.categories.length > 0) {
            product.categories.forEach((category: any) => {
              if (!uniqueCategories.find(c => c.id === category.id)) {
                uniqueCategories.push(category);
              }
            });
          }
        });
        setCategories(uniqueCategories);
      });
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
  const handleAddToCart = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddingToCart(productId);
    
    // Add product to selected products if not already selected
    if (!selectedProducts.has(productId)) {
      toggleProductSelection(productId);
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setAddingToCart(null);
      // Redirect to cart page after animation
      window.location.href = '/cart';
    }, 1000);
  };

  // Close weight popup
  const closeWeightPopup = () => {
    setShowWeightPopup(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-64"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isSelected = selectedProducts.has(product.id);
          const availableWeights = getAvailableWeights(product);
          const selectedWeight = selectedWeights[product.id] || '';
          const isAdding = addingToCart === product.id;
          
          return (
            <div 
              key={product.id} 
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'
              }`}
            >
              {/* Product Image */}
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img 
                  src={getImageUrl(product.images?.[0]?.src || '')} 
                  alt={product.images?.[0]?.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {isAdding && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 text-sm">
                  {product.short_description?.replace(/<[^>]*>/g, '').substring(0, 80)}...
                </p>
                
                {/* Price */}
                <p className="text-green-600 font-bold mb-3">₹{product.price}</p>
                
                {/* Weight Selection (if available) */}
                {availableWeights.length > 0 && selectedWeight && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-600">Selected: {selectedWeight}</span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => handleBuyNowClick(product.id, e)}
                    disabled={isAdding}
                    className={`flex-1 py-2 px-4 rounded transition-all duration-300 ${
                      isAdding 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : isSelected 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isAdding ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </span>
                    ) : isSelected ? (
                      'Go to Cart'
                    ) : (
                      'Buy Now'
                    )}
                  </button>

                  <Link 
                    href={`/details/${product.id}`}
                    className="py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-300"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weight Selection Popup */}
      {showWeightPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Select Weight</h3>
            <p className="text-gray-600 mb-4">Please select a weight option for this product:</p>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              {getAvailableWeights(products.find(p => p.id === showWeightPopup)).map((weight: string) => (
                <button
                  key={weight}
                  onClick={() => handleWeightChange(showWeightPopup, weight)}
                  className={`p-3 border rounded text-center transition-all duration-200 ${
                    selectedWeights[showWeightPopup] === weight
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeWeightPopup}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedWeights[showWeightPopup]) {
                    closeWeightPopup();
                    // Automatically add to cart after weight selection
                    handleAddToCart(showWeightPopup, { preventDefault: () => {}, stopPropagation: () => {} } as any);
                  }
                }}
                disabled={!selectedWeights[showWeightPopup]}
                className={`px-4 py-2 rounded text-white transition-colors duration-200 ${
                  selectedWeights[showWeightPopup]
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Products Summary */}
      {selectedProducts.size > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Selected Products</h2>
          <ul className="space-y-3">
            {Array.from(selectedProducts).map(productId => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;
              
              const selectedWeight = selectedWeights[productId] || '';
              return (
                <li key={productId} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">{product.name}</span>
                    {selectedWeight && <span className="text-sm text-gray-600 ml-2">({selectedWeight})</span>}
                  </div>
                  <span className="font-semibold">₹{product.price}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-2 border-t">
            <Link 
              href="/cart"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-300 inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}