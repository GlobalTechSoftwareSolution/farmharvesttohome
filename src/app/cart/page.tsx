"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type CartItem = {
  id: number
  name: string
  price: number | null
  size: string | null
  image: string
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // ✅ Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart))
        } catch (error) {
          console.error("Error parsing cart data:", error)
          setCart([])
        }
      } else {
        setCart([])
      }
      setIsLoading(false)
    }

    loadCart()

    // Sync cart across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCart()
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // ✅ Save cart back to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoading])

  // ✅ Remove item
  const handleRemove = (id: number, size: string | null) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }

  // ✅ Update quantity
  const handleQuantityChange = (id: number, size: string | null, qty: number) => {
    if (qty < 1) return
    const updated = cart.map(item =>
      item.id === id && item.size === size ? { ...item, quantity: qty } : item
    )
    setCart(updated)
  }

  // ✅ Cart total
  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 sm:p-8 text-center">
            <div className="text-5xl sm:text-6xl mb-4">🛒</div>
            <p className="text-gray-600 text-lg sm:text-xl mb-4">
              Your cart is empty
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            {/* Table for medium+ screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold text-center">Price</th>
                    <th className="px-4 py-3 font-semibold text-center">Quantity</th>
                    <th className="px-4 py-3 font-semibold text-center">Subtotal</th>
                    <th className="px-4 py-3 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 flex flex-col gap-1">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <p className="font-medium text-gray-800">{item.name}</p>
                        </div>
                        {item.size && (
                          <p className="text-sm text-gray-500 pl-20">Size: {item.size}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center font-medium">
                        ₹{(Number(item.price) || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.size, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 min-w-[3rem] text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.size, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-medium">
                        ₹{((Number(item.price) || 0) * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleRemove(item.id, item.size)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for small screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border mx-auto sm:mx-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    {item.size && (
                      <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>
                    )}
                    <p className="font-medium">₹{(Number(item.price) || 0).toFixed(2)}</p>

                    <div className="mt-2 flex items-center justify-center sm:justify-start border rounded-lg overflow-hidden w-fit mx-auto sm:mx-0">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.size, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-2 font-medium">
                      Subtotal: ₹{((Number(item.price) || 0) * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleRemove(item.id, item.size)}
                      className="mt-2 text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t gap-4">
              <button
                onClick={() => router.push("/shop")}
                className="w-full md:w-auto px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
              >
                Continue Shopping
              </button>

              <div className="text-center md:text-right w-full md:w-auto">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                  Total: <span className="text-green-600">₹{total.toFixed(2)}</span>
                </h2>
                <button className="w-full md:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 font-semibold">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
