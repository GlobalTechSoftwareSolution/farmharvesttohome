"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaSearch, FaFilter, FaTimes } from "react-icons/fa"
import Products from '@/app/products/page'

interface Variant {
  weight: string
  price: number
}

interface Product {
  id: number
  name: string
  category: string
  image: string
  oldPrice?: number
  sale?: boolean
  variants?: Variant[]
  price?: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [minPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(3300)
  const [category, setCategory] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products?per_page=30")
        const data = await response.json()

        // Normalize the API response
        let productsData = Array.isArray(data) ? data : data.products || data.data || []

        const processedProducts = productsData.map((product: any) => {
          let variants: Variant[] = []

          if (product.variations && Array.isArray(product.variations) && product.variations.length > 0) {
            // ✅ Use variations from WooCommerce
            variants = product.variations.map((variation: any) => {
              let rawWeight = variation.attributes?.[0]?.option || "Default"

              // ✅ Normalize units: if "1000g" → "1kg"
              let weight = rawWeight.toLowerCase().includes("g") && rawWeight.replace(/\D/g, "") === "1000"
                ? "1kg"
                : rawWeight

              return {
                weight,
                price: variation.price ? parseFloat(variation.price) : 0,
              }
            })
          } else {
            // ✅ Fallback: provide 3 standard weights
            variants = [
              { weight: "250g", price: product.price ? parseFloat(product.price) * 0.25 : 0 },
              { weight: "500g", price: product.price ? parseFloat(product.price) * 0.5 : 0 },
              { weight: "1kg",  price: product.price ? parseFloat(product.price) : 0 },
            ]
          }

          return {
            id: product.id,
            name: product.name,
            category: product.categories?.[0]?.name || "Uncategorized",
            image: product.images?.[0]?.src || product.image || "",
            oldPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
            sale: product.on_sale,
            variants,
            price: product.price ? parseFloat(product.price) : undefined,
          }
        })

        setProducts(processedProducts)
      } catch (err) {
        console.error("Failed to load products", err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean)

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen relative">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="relative flex-1 mr-4">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            className="w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="bg-green-600 text-white p-2 rounded-lg flex items-center"
        >
          {showMobileFilters ? <FaTimes size={16} /> : <FaFilter size={16} />}
          <span className="ml-2">Filters</span>
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {showMobileFilters && (
        <div className="lg:hidden bg-white border-b shadow-md overflow-hidden">
          <div className="p-4">
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">Filter by price</h3>
              <input
                type="range"
                min="0"
                max="3300"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value))
                }}
                className="w-full accent-green-600"
              />
              <p className="text-sm mt-2 text-gray-500">
                Price: <span className="font-medium">₹{minPrice} – ₹{maxPrice}</span>
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setCategory(cat)
                        setShowMobileFilters(false)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        category === cat
                          ? "bg-green-600 text-white shadow"
                          : "hover:bg-green-100"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setCategory(null)
                      setShowMobileFilters(false)
                    }}
                    className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1 
                                hover:bg-green-50 hover:text-green-700 hover:border-green-600 
                                transition-all duration-300 ease-in-out transform hover:scale-105 
                                shadow-sm hover:shadow-md"
                  >
                    Clear Filter ✨
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full lg:w-72 p-6 bg-white border-r shadow-sm">
        {/* Search */}
        <div className="mb-8 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            className="w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2 text-gray-700">Filter by price</h3>
          <input
            type="range"
            min="0"
            max="3300"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value))
            }}
            className="w-full accent-green-600"
          />
          <p className="text-sm mt-2 text-gray-500">
            Price: <span className="font-medium">₹{minPrice} – ₹{maxPrice}</span>
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setCategory(cat)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    category === cat
                      ? "bg-green-600 text-white shadow"
                      : "hover:bg-green-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setCategory(null)
                }}
                className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1 
                            hover:bg-green-50 hover:text-green-700 hover:border-green-600 
                            transition-all duration-300 ease-in-out transform hover:scale-105 
                            shadow-sm hover:shadow-md"
              >
                Clear Filter ✨
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Cart Button */}
      <button
        onClick={() => router.push("/cart")}
        className="fixed lg:right-10 md:mt-5 top-4 mr-4 right-3 mt-[5rem] lg:top-auto bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <FaShoppingCart size={20} className="sm:size-22" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1.5 sm:px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
      <Products />
    </div>
  )
}