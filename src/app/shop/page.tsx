"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaSearch } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from "next/link"

interface Product {
  id: number
  name: string
  category: string
  image: string
  price: number
  oldPrice?: number
  weights?: string[]
  priceRange?: string
  sale?: boolean
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [minPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(3300)
  const [category, setCategory] = useState<string | null>(null)
  const [selectedWeight, setSelectedWeight] = useState<{ [key: number]: string }>({})
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  const router = useRouter()

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products.json", err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  const handleAddToCart = (productId: number) => {
    if (!selectedWeight[productId]) {
      alert("Please select a weight first!")
      return
    }

    const product = products.find((p) => p.id === productId)
    if (!product) return

    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.weight === selectedWeight[productId]
    )

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        weight: selectedWeight[productId],
        image: product.image,
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category ? p.category === category : true
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice
    return matchesSearch && matchesCategory && matchesPrice
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen relative">
      {/* Sidebar (hidden on mobile, shown on lg) */}
      <aside className="hidden lg:block w-72 p-6 bg-white border-r shadow-sm">
        {/* Search */}
        <div className="mb-8 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
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
              setCurrentPage(1)
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
            {["MILLETS", "PULSES AND GRAINS", "SPICES AND MASALA"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setCategory(cat)
                    setCurrentPage(1)
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
                    setCurrentPage(1)
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

      {/* Products */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
          {loading
            ? "Loading products..."
            : `Showing ${indexOfFirstProduct + 1} – ${Math.min(
                indexOfLastProduct,
                filteredProducts.length
              )} of ${filteredProducts.length} Products`}
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {!loading && currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden relative"
              >
                {product.sale && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    Sale
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">{product.category}</p>
                  <div className="mt-2">
                    {product.oldPrice && (
                      <span className="line-through text-gray-400 mr-2 text-sm">
                        ₹{product.oldPrice}
                      </span>
                    )}
                    <span className="text-green-600 font-bold text-base sm:text-lg">
                      ₹{product.priceRange || product.price}
                    </span>
                  </div>

                  {/* Weights */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.weights?.map((weight, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setSelectedWeight((prev) => {
                            if (prev[product.id] === weight) {
                              const updated = { ...prev }
                              delete updated[product.id]
                              return updated
                            }
                            return { ...prev, [product.id]: weight }
                          })
                        }
                        className={`px-2 sm:px-3 py-1 rounded-full border text-xs transition ${
                          selectedWeight[product.id] === weight
                            ? "bg-green-600 text-white"
                            : "hover:bg-green-100"
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>

                <div className="flex space-x-2">
                    {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 text-sm sm:text-base rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    {selectedWeight[product.id] ? "Add To Cart" : "Buy Now"}
                  </button>
                  
                    <Link
  href={`/products/${product.id}`}
  className="mt-4 w-full bg-gray-200 flex items-center justify-center text-black py-2 text-sm sm:text-base rounded-lg font-medium shadow hover:bg-gray-300 transition-transform transform hover:scale-105"
>
  View Details
</Link>

                </div>
                </div>
              </motion.div>
            ))
          ) : (
            !loading && <p className="text-gray-500">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 text-sm sm:text-base"
            >
              Previous
            </button>

            <span className="font-medium text-gray-700 text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => {
                if (currentPage === totalPages) {
                  setCurrentPage(1) // loop back to start
                } else {
                  setCurrentPage((prev) => prev + 1)
                }
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Cart Button (always top-right) */}
     <button onClick={() => router.push("/cart")}
        className="fixed lg:right-10 md:mt-5 top-4 mr-4 right-3 mt-[5rem] lg:top-auto bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition" >
          <FaShoppingCart size={20} className="sm:size-22" /> 
            {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1.5 sm:px-2 py-0.5 rounded-full"> 
            {cartCount}
            </span> )}
        </button>
    </div>
  )
}
