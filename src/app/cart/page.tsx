"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save to localStorage when cart changes
 useEffect(() => {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    setCart(JSON.parse(savedCart))
  }
}, [])

  const handleRemove = (id: number, size: string) => {
    const updated = cart.filter((item) => !(item.id === id && item.size === size))
    setCart(updated)
  }

  const handleQuantityChange = (id: number, size: string, qty: number) => {
    const updated = cart.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity: qty } : item
    )
    setCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-white shadow rounded-lg p-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, item.size, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}