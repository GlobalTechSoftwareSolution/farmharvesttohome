"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart } from "react-icons/fa"

const products = [
  {
    id: 1,
    name: "Barnyard Millet (ಉದಲು)",
    category: "MILLETS",
    image: "/images/millet.jpg",
    price: 220,
    oldPrice: 250,
    sizes: ["1Kg", "250g", "500g"],
    sale: true,
  },
  {
    id: 2,
    name: "BLACK PEPPER (ಕಾಳು ಮೆಣಸು)",
    category: "SPICES AND MASALA",
    image: "/images/pepper.jpg",
    price: 590,
    oldPrice: 620,
    sizes: ["1Kg", "250g", "500g"],
    sale: true,
  },
  {
    id: 3,
    name: "BLACK SESAME SEEDS (ಕಪ್ಪು ಎಳ್ಳು)",
    category: "SPICES AND MASALA",
    image: "/images/sesame.jpg",
    price: 150,
    priceRange: "150 – 600",
    sizes: ["1Kg", "250g", "500g"],
    sale: true,
  },
]

export default function ShopPage() {
  const [search, setSearch] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(3300)
  const [category, setCategory] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({})
  const [cartCount, setCartCount] = useState(0)

  const router = useRouter()

  // Load cart count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [])

  const handleAddToCart = (productId: number) => {
  if (!selectedSize[productId]) {
    alert("Please select a size first!")
    return
  }

  const product = products.find((p) => p.id === productId)
  if (!product) return

  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")

  // Check if already exists
  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === selectedSize[product.id]
  )

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize[product.id],
      image: product.image,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0)) // show total qty
}


  return (
    <div className="flex bg-green-50 min-h-screen relative">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-green-50 border-r">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter by price</h3>
          <input
            type="range"
            min="0"
            max="3300"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm mt-2">
            Price: ₹{minPrice} – ₹{maxPrice}
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-2 text-sm">
            {["MILLETS", "PULSES AND GRAINS", "SPICES AND MASALA"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategory(cat)}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    category === cat ? "bg-green-600 text-white" : "hover:bg-green-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCategory(null)}
                className="text-sm text-gray-500 hover:underline"
              >
                Clear Filter
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1 p-8">
        <h2 className="text-lg font-semibold mb-4">
          Showing {products.length} results
        </h2>
 {/* Cart Icon (Top Right) */}
<button
  onClick={() => router.push("/cart")}
  className=" top-[-3rem] right-[-70rem] bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 relative place-items-end"
>
  <FaShoppingCart size={20} />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden relative"
            >
              {product.sale && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Sale!
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="mt-2">
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 mr-2">
                      ₹{product.oldPrice}
                    </span>
                  )}
                  <span className="text-green-600 font-bold">
                    ₹{product.priceRange || product.price}
                  </span>
                </div>

                {/* Sizes */}
                {/* Sizes */}
<div className="flex gap-2 mt-3">
  {product.sizes.map((size, i) => (
    <button
      key={i}
      onClick={() =>
        setSelectedSize((prev) => {
          // if already selected, unselect it
          if (prev[product.id] === size) {
            const updated = { ...prev }
            delete updated[product.id]
            return updated
          }
          // else select this size
          return { ...prev, [product.id]: size }
        })
      }
      className={`border px-2 py-1 text-xs rounded ${
        selectedSize[product.id] === size
          ? "bg-green-600 text-white"
          : "hover:bg-green-100"
      }`}
    >
      {size}
    </button>
  ))}
</div>


                {/* Button */}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  {selectedSize[product.id] ? "Add To Cart" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
