"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image_url?: string;
  images?: { src: string }[];
  price: number;
  description: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const getImageUrl = (product: Product) => {
    if (product.image_url && product.image_url.startsWith("http")) return product.image_url;
    if (product.image_url) return `${window.location.origin}/${product.image_url}`;
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImg = product.images[0];
      if (firstImg.src) return firstImg.src.startsWith("http") ? firstImg.src : `${window.location.origin}/${firstImg.src}`;
    }
    return "/placeholder-product.jpg";
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          console.error("API fetch error:", data.error);
          setProduct(null);
        } else {
          setProduct(data);
          setImageUrl(getImageUrl(data));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Loading product details...</p>;
  if (!product) return <p className="p-6 text-red-500">Product not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-green-50 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-green-100">

        {/* Product Image */}
        <div className="flex justify-center items-center p-6 md:p-8 bg-gray-50 rounded-3xl">
          <div className="relative w-full h-80 md:h-[500px]">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-10 flex flex-col justify-center space-y-6">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm md:text-base font-semibold rounded-full shadow-lg tracking-wide uppercase mb-2">
            New Arrival 🌿
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-gray-900 leading-snug">
            {product.name}
          </h1>

          <p className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-6">
            ₹{product.price}
          </p>

          <div className="text-gray-700 leading-relaxed mb-8 space-y-4 max-w-prose text-base md:text-lg tracking-wide">
            {product.description?.trim() ? (
              product.description.split("\n").map((line, idx) => <p key={idx}>{line}</p>)
            ) : (
              <p>No description available.</p>
            )}
          </div>

          {/* Highlights */}
          <ul className="space-y-3 mb-10">
            {[
              "100% Chemical-Free & Non-GMO",
              "Unpolished & Fiber-Rich",
              "Sun-Dried & Naturally Processed",
              "Directly Sourced from Farmers",
              "Gluten-Free & Diabetic Friendly"
            ].map((point, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-800 bg-green-50 px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-base md:text-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
                {point}
              </li>
            ))}
          </ul>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (!product) return;
                const cartItem = {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image_url || (product.images && product.images[0]?.src) || "/placeholder-product.jpg",
                };
                const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                const existingIndex = existingCart.findIndex(
                  (item: any) => item.id === cartItem.id
                );
                if (existingIndex !== -1) {
                  existingCart[existingIndex].quantity += 1;
                } else {
                  existingCart.push(cartItem);
                }
                localStorage.setItem("cart", JSON.stringify(existingCart));
                window.location.href = "/cart";
              }}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-lg md:text-xl tracking-wide"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        p {
          text-align: justify;
        }
      `}</style>
    </div>
  );
}