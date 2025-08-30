"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type CartItem = {
  id: number
  name: string
  price: number
  size: string
  image: string
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Load cart from localStorage on component mount and whenever it changes
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
    
    // Also listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCart()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Save to localStorage when cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoading])

  // Remove function
  const handleRemove = (id: number, size: string) => {
    setCart(prevCart =>
      prevCart.filter(item => !(item.id === id && item.size === size))
    )
  }

  const handleQuantityChange = (id: number, size: string, qty: number) => {
    if (qty < 1) return // Don't allow quantities less than 1
    
    const updated = cart.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity: qty } : item
    )
    setCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600 text-xl mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push("/products")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
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
                    {/* Product Column */}
                    <td className="px-4 py-4 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="px-4 py-4 text-center font-medium">₹{item.price.toFixed(2)}</td>

                    {/* Quantity Column */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.size, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 min-w-[3rem] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.size, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Subtotal Column */}
                    <td className="px-4 py-4 text-center font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>

                    {/* Remove Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleRemove(item.id, item.size)}
                        className="text-red-600 hover:text-red-800 transition-colors font-medium"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t">
              <button
                onClick={() => router.push("/products")}
                className="mb-4 md:mb-0 px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Continue Shopping
              </button>
              
              <div className="text-right">
                <h2 className="text-2xl font-semibold mb-4">
                  Total: <span className="text-green-600">₹{total.toFixed(2)}</span>
                </h2>
                <button
                 
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <Link href='/checkout'>Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}