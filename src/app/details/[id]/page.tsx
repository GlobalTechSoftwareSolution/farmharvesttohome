"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams(); // ✅ get product ID from URL
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch product details by ID
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center py-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {product.description || "No description available"}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-green-600 font-bold text-2xl">
              ₹{product.price}
            </span>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
