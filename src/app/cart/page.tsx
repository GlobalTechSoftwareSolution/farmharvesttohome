"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaTrash } from "react-icons/fa"

type CartItem = {
  id: number
  name: string
  price: number
  size: string
  image: string
  quantity: number
}


export default function CartTotals() {
  // const [cart, setCart] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [shippingAddress, setShippingAddress] = useState("Karnataka") // default address
  const [shippingCost, setShippingCost] = useState(0)
   const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)

    const total = storedCart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )
    setSubtotal(total)
  }, [])

  const handleBuyNow = () => {
    alert("Redirecting to checkout...") 
    // 👉 Here you can integrate Razorpay/Stripe/PayPal or redirect to checkout page
  }

  // Save to localStorage when cart changes
 useEffect(() => {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    setCart(JSON.parse(savedCart))
  }
}, [])


// Remove function
const handleRemove = (id: number, size: string) => {
  setCart(prevCart => {
    const updatedCart = prevCart.filter(item => !(item.id === id && item.size === size))
    localStorage.setItem("cart", JSON.stringify(updatedCart)) // persist change
    return updatedCart
  })
}



  const handleQuantityChange = (id: number, size: string, qty: number) => {
    const updated = cart.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity: qty } : item
    )
    setCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <div className="min-h-screen bg-green-50 mt-10">
      
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold">🛒 Your Cart</h1>
        <button
          onClick={() => router.push("/shop")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FaShoppingCart /> Shop More
        </button>
      </header>

      {/* Cart Content */}
      <div className="p-6 ">
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <button
              onClick={() => router.push("/shop")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
<div className="bg-white shadow rounded-lg p-4 md:p-6 overflow-x-auto">
          <table className="w-full border-collapse">
    <thead className="hidden md:table-header-group">
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
        <tr
          key={i}
          className="border-b hover:bg-gray-50 flex flex-col md:table-row mb-4 md:mb-0 last:border-b-0"
        >
          {/* Product */}
          <td className="px-2 py-3 md:px-4 md:py-3 flex items-center gap-3 md:table-cell">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
            </div>
          </td>

          {/* Price (shows label only on mobile) */}
          <td className="px-2 py-2 md:px-4 md:py-3 text-center md:table-cell flex justify-between md:block items-center border-b md:border-b-0">
            <span className="md:hidden font-semibold text-gray-700">Price:</span>
            <span>₹{item.price.toFixed(2)}</span>
          </td>

          {/* Quantity */}
          <td className="px-2 py-2 md:px-4 md:py-3 text-center md:table-cell flex justify-between md:block items-center border-b md:border-b-0">
            <span className="md:hidden font-semibold text-gray-700">Quantity:</span>
            <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  handleQuantityChange(
                    item.id,
                    item.size,
                    Math.max(1, item.quantity - 1)
                  )
                }
                className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-200 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 min-w-[3rem] inline-block">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityChange(item.id, item.size, item.quantity + 1)
                }
                className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </td>

          {/* Subtotal */}
          <td className="px-2 py-2 md:px-4 md:py-3 text-center md:table-cell flex justify-between md:block items-center border-b md:border-b-0">
            <span className="md:hidden font-semibold text-gray-700">Subtotal:</span>
            <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
          </td>

          {/* Remove */}
          <td className="px-2 py-3 md:px-4 md:py-3 text-center md:table-cell flex justify-between md:block items-center">
            <span className="md:hidden font-semibold text-gray-700">Action:</span>
            <button
              onClick={() => handleRemove(item.id, item.size)}
              className="text-red-600 hover:text-red-800 flex items-center gap-1 justify-center md:justify-start transition-colors"
            >
              <FaTrash className="text-sm" /> 
              <span className="hidden md:inline">Remove</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>


            {/* Total Section */}
             <div className="border rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg max-w-md ml-auto mt-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Cart Totals</h2>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center py-3 border-b text-gray-700">
                      <span className="font-medium">Subtotal</span>
                      <span className="text-lg font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="py-4 border-b text-gray-700">
                      <p className="font-medium">Shipping</p>
                      <p className="text-sm text-gray-500">Local pickup available</p>
                      <p className="text-sm mt-1">
                        Shipping to <span className="font-semibold text-gray-800">{shippingAddress}</span>
                      </p>
                      <button
                        onClick={() =>
                          setShippingAddress(
                            shippingAddress === "Karnataka" ? "Maharashtra" : "Karnataka"
                          )
                        }
                        className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium underline"
                      >
                        Change address
                      </button>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-4 border-b">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-green-600">
                        ₹{(subtotal + shippingCost).toFixed(2)}
                      </span>
                    </div>

                    {/* Button */}
                    <button
                     onClick={() => router.push("/checkout")}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 transition duration-200 text-white text-lg font-semibold py-3 rounded-xl shadow-md"
                    >
                      BUY NOW
                    </button>
            </div>

            </div>
        )}
      </div>
    </div>
  )
}

<style jsx>{`
    /* Mobile-specific styles */
    @media (max-width: 767px) {
      tr {
        position: relative;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 0.75rem;
      }
      
      td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0.25rem;
      }
      
      td:first-child {
        padding-top: 1rem;
        border-bottom: 1px solid #e5e7eb;
      }
      
      td:last-child {
        padding-bottom: 1rem;
      }
    }
    
    /* Tablet and above */
    @media (min-width: 768px) {
      tr {
        display: table-row;
      }
      
      td {
        display: table-cell;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #e5e7eb;
      }
    }
    
    /* Larger screens */
    @media (min-width: 1024px) {
      td {
        padding: 1rem 1.25rem;
      }
    }
  `}</style>