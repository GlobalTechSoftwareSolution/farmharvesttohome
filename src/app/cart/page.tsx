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
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


// Remove function
const handleRemove = (id: number, size: string) => {
  setCart(prevCart =>
    prevCart.filter(item => !(item.id === id && item.size === size))
  );
};


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
    <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2 text-center">Price</th>
            <th className="px-4 py-2 text-center">Quantity</th>
            <th className="px-4 py-2 text-center">Subtotal</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => (
            <tr key={i} className="border-b">
              {/* Product Column */}
              <td className="px-4 py-2 flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
              </td>

              {/* Price Column */}
              <td className="px-4 py-2 text-center">₹{item.price.toFixed(2)}</td>

              {/* Quantity Column */}
              <td className="px-4 py-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm text-gray-600">Qty</span>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border border-gray-300"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, item.quantity + 1)
                      }
                      className="px-2 py-1 border border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>

              {/* Subtotal Column */}
              <td className="px-4 py-2 text-center">
                ₹{(item.price * item.quantity).toFixed(2)}
              </td>

              {/* Remove Button */}
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="flex justify-end mt-6">
        <div className="text-right">
          <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  )
}