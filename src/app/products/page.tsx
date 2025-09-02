"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaInfoCircle, FaSearch, FaWeightHanging, FaFilter, FaTimes } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface ProductCategories {
  categories: ProductCategory;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  short_description?: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  images?: { src: string }[];
  attributes?: { slug: string; name: string; options: string[] }[];
  product_categories?: ProductCategories[];
  variations?: {
    weights: { label: string; price: number }[];
  };
  category_group?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  // Price filter: single max price slider
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [selectedWeights, setSelectedWeights] = useState<{[key: number]: string}>({});
  const [showWeightPopup, setShowWeightPopup] = useState<number | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const CATEGORY_GROUPS = ["MILLET", "SPICES AND MASALA", "PULSES AND GRAINS"];

  // Fetch products from Supabase (with nested product_categories)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select(`
            id, name, description, short_description, price, stock, image_url, images, attributes, variations, category_group,
            product_categories (
              categories ( id, name, slug )
            )
          `);

        if (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        } else {
          // Transform the data to match our Product type
         const transformedData: Product[] = (data || []).map((product: any) => ({
  ...product,
  product_categories: (product.product_categories || []).map((pc: any) => ({
    categories: (pc.categories || []).map((c: any) => ({
      id: Number(c.id),
      name: String(c.name),
      slug: String(c.slug),
    })),
  })),
}));
 
          
          setProducts(transformedData);

          // Extract unique categories from nested product_categories
          const uniqueCategories: { id: number; name: string; slug: string }[] = [];
          transformedData.forEach((product) => {
            product.product_categories?.forEach((pc: ProductCategories) => {
              const category = pc.categories;
              if (!uniqueCategories.find(c => c.id === category.id)) {
                uniqueCategories.push(category);
              }
            });
          });

          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getAvailableWeights = (product: Product) => {
    // Check for variations.weights first
    if (product.variations?.weights && Array.isArray(product.variations.weights)) {
      return product.variations.weights.map(w => w.label);
    }
    if (product.attributes && product.attributes.length > 0) {
      const weightAttr = product.attributes.find(
        (attr) => attr.slug === "pa_weight" || attr.name.toLowerCase() === "weight"
      );
      return weightAttr ? weightAttr.options : [];
    }
    return [];
  };

  const getImageUrl = (product: Product) => {
    if (product.image_url && product.image_url.startsWith("http")) return product.image_url;
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImg = product.images[0];
      if (firstImg.src) return firstImg.src;
    }
    return "/placeholder-product.jpg";
  };

  // Filter products by category using nested product_categories
  const filteredByCategory = selectedCategory === "all"
    ? products
    : products.filter(product =>
        product.product_categories?.some(pc => pc.categories.slug === selectedCategory)
      );

  // Filter by category group
  const filteredByCategoryGroup = selectedCategoryGroup === "all"
    ? filteredByCategory
    : filteredByCategory.filter(product => product.category_group === selectedCategoryGroup);

  // Filter products by search query
  const filteredBySearch = search
    ? filteredByCategoryGroup.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
      )
    : filteredByCategoryGroup;

  // Filter products by price slider
  const filteredProducts =
    maxPrice === 1000
      ? filteredBySearch
      : filteredBySearch.filter(product => product.price <= maxPrice);

  // Toggle product selection
  const toggleProductSelection = (productId: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      const newWeights = { ...selectedWeights };
      delete newWeights[productId];
      setSelectedWeights(newWeights);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  // Handle weight selection
  const handleWeightChange = (productId: number, weight: string) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
  };

  // Handle buy now button click
  const handleBuyNowClick = (productId: number, e: React.MouseEvent) => {
    // Always show the weight popup if available weights, otherwise just add to cart
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const availableWeights = getAvailableWeights(product);
    if (availableWeights.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      setShowWeightPopup(productId);
    } else {
      handleAddToCart(productId, e);
    }
  };

  // Handle add to cart
  const handleAddToCart = (productId: number, e: React.MouseEvent | any) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selectedWeight = selectedWeights[productId] || "";
    let price = product.price;

    if (selectedWeight && product.variations?.weights) {
      // Try to find the price for the selected weight
      const foundWeight = product.variations.weights.find(w => w.label === selectedWeight);
      if (foundWeight) {
        price = foundWeight.price;
      } else {
        // fallback to the old logic if not found
        const weight = selectedWeight.toLowerCase();
        if (weight.includes("500")) price = product.price * 2;
        else if (weight.includes("1kg") || weight.includes("1000")) price = product.price * 4;
        else if (weight.includes("250")) price = product.price;
      }
    } else if (selectedWeight) {
      const weight = selectedWeight.toLowerCase();
      if (weight.includes("500")) price = product.price * 2;
      else if (weight.includes("1kg") || weight.includes("1000")) price = product.price * 4;
      else if (weight.includes("250")) price = product.price;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price,
      size: selectedWeight || "default",
      image: product.image_url || "",
      quantity: 1,
      category_group: product.category_group,
    };

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
    window.location.href = "/cart";
  };

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
          
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative flex-1 mr-4">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
            <div className="relative flex-1 mr-4 mb-4">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Category group filter mobile */}
            <h3 className="font-semibold mb-3 text-gray-700 flex items-center">
              <FaFilter className="mr-2" />
              Filter by Group
            </h3>
            <select
              value={selectedCategoryGroup}
              onChange={(e) => {
                setSelectedCategoryGroup(e.target.value);
                setShowMobileFilters(false);
              }}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            >
              <option value="all">All Groups</option>
              {CATEGORY_GROUPS.map(group => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {/* Price filter mobile */}
            <h3 className="font-semibold mb-3 text-gray-700 flex items-center mt-4">
              <FaFilter className="mr-2" />
              Filter by Price
            </h3>
            <div className="flex flex-col items-start space-y-2">
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-700">
                Up to ₹{maxPrice}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Category and Price Filter */}
          <div className="hidden md:block w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
              {/* Category Filter */}
             
              <div className="space-y-2 mb-6">
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
              {/* Category Group Filter */}
              <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
                <FaFilter className="mr-2" />
                Filter by Group
              </h3>
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setSelectedCategoryGroup("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategoryGroup === "all"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Groups
                </button>
                {CATEGORY_GROUPS.map(group => (
                  <button
                    key={group}
                    onClick={() => setSelectedCategoryGroup(group)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategoryGroup === group
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
              {/* Price Filter */}
              <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
                <FaFilter className="mr-2" />
                Filter by Price
              </h3>
              <div className="flex flex-col items-start space-y-2">
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-700">
                  Up to ₹{maxPrice}
                </span>
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
                {maxPrice !== 1000 && (
                  <span> in <span className="font-semibold text-green-600">
                    Up to ₹{maxPrice}
                  </span></span>
                )}
                {search && (
                  <span> matching "<span className="font-semibold text-green-600">{search}</span>"</span>
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
                  // Extract categories for display from product.product_categories
                  const productCategories = product.product_categories?.map(pc => pc.categories) ?? [];
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
                          src={getImageUrl(product)}
                          alt={product.name}
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
                          {(product.short_description || product.description || "")
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 80)}
                          ...
                        </p>
                        {/* Product Categories Display */}
                        {productCategories.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {productCategories.map(cat => (
                              <span
                                key={cat.id}
                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Category Group Badge */}
                        {product.category_group && (
                          <div className="mb-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {product.category_group}
                            </span>
                          </div>
                        )}
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
                            href={`/products/${product.id}`}
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
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearch("");
                  }}
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
                {getAvailableWeights(products.find(p => p.id === showWeightPopup) as Product).map((weight: string) => (
                  <button
                    key={weight}
                    onClick={() => handleWeightChange(showWeightPopup!, weight)}
                    className={`p-4 border-2 rounded-xl text-center transition-all duration-200 font-medium ${
                      selectedWeights[showWeightPopup!] === weight
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
                      // Add to cart with selected weight, then redirect to /cart
                      const productId = showWeightPopup;
                      const product = products.find(p => p.id === productId);
                      if (!product) return;
                      const selectedWeight = selectedWeights[productId] || "";
                      let price = product.price;
                      if (selectedWeight && product.variations?.weights) {
                        const foundWeight = product.variations.weights.find(w => w.label === selectedWeight);
                        if (foundWeight) {
                          price = foundWeight.price;
                        } else {
                          const weight = selectedWeight.toLowerCase();
                          if (weight.includes("500")) price = product.price * 2;
                          else if (weight.includes("1kg") || weight.includes("1000")) price = product.price * 4;
                          else if (weight.includes("250")) price = product.price;
                        }
                      } else if (selectedWeight) {
                        const weight = selectedWeight.toLowerCase();
                        if (weight.includes("500")) price = product.price * 2;
                        else if (weight.includes("1kg") || weight.includes("1000")) price = product.price * 4;
                        else if (weight.includes("250")) price = product.price;
                      }
                      const cartItem = {
                        id: product.id,
                        name: product.name,
                        price,
                        size: selectedWeight || "default",
                        image: product.image_url || "",
                        quantity: 1,
                        category_group: product.category_group,
                      };
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
                      closeWeightPopup();
                      window.location.href = "/cart";
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
                        src={getImageUrl(product)}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">{product.name}</div>
                        {product.category_group && (
                          <div className="text-xs text-gray-400">{product.category_group}</div>
                        )}
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