"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.id.toString() === id)
        setProduct(found || null)
      })
      .catch((err) => console.error("Error loading product:", err))
  }, [id])

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Loading product details...</p>
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl object-cover shadow mb-4"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1> <br />
         <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of the Product</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {product.description}
          </p>

          <p className="text-lg text-green-700 font-semibold mb-2">
            {product.priceRange}
          </p>
          <div className="mb-6">
            <span className="font-medium text-gray-800">Available Weights: </span>
            <span className="text-gray-700">{product.weights.join(", ")}</span>
          </div>
        </div>

        {/* Buy Button at bottom */}
        <button
          onClick={() => router.push("/cart")}
          className="mt-4 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
