"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaClipboardList } from "react-icons/fa"
import Products from '@/app/products/page'

interface Variant {
  weight: string
  price: number
}

interface Product {
  id: number
  name: string
  category: string
  image: string
  oldPrice?: number
  sale?: boolean
  variants?: Variant[]
  price?: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [minPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(3300)
  const [category, setCategory] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products?per_page=30")
        const data = await response.json()

        let productsData = Array.isArray(data) ? data : data.products || data.data || []

        const processedProducts = productsData.map((product: any) => {
          let variants: Variant[] = []

          if (product.variations && Array.isArray(product.variations) && product.variations.length > 0) {
            variants = product.variations.map((variation: any) => {
              let rawWeight = variation.attributes?.[0]?.option || "Default"
              let weight =
                rawWeight.toLowerCase().includes("g") && rawWeight.replace(/\D/g, "") === "1000"
                  ? "1kg"
                  : rawWeight

              return {
                weight,
                price: variation.price ? parseFloat(variation.price) : 0,
              }
            })
          } else {
            variants = [
              { weight: "250g", price: product.price ? parseFloat(product.price) * 0.25 : 0 },
              { weight: "500g", price: product.price ? parseFloat(product.price) * 0.5 : 0 },
              { weight: "1kg", price: product.price ? parseFloat(product.price) : 0 },
            ]
          }

          return {
            id: product.id,
            name: product.name,
            category: product.categories?.[0]?.name || "Uncategorized",
            image: product.images?.[0]?.src || product.image || "",
            oldPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
            sale: product.on_sale,
            variants,
            price: product.price ? parseFloat(product.price) : undefined,
          }
        })

        setProducts(processedProducts)
      } catch (err) {
        console.error("Failed to load products", err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean)

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen relative">
  {/* Floating Buttons Wrapper */}
  <div className="fixed right-3 top-20 lg:top-auto lg:right-10 flex flex-col gap-4">
    
    {/* Cart Button */}
    <button
      onClick={() => router.push("/cart")}
      className="bg-green-600 text-white p-3 mt-2 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition relative"
    >
      <FaShoppingCart size={20} className="sm:size-22" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1.5 sm:px-2 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </button>

    {/* Orders Button */}
    <button
      onClick={() => router.push("/orderhistory")}
      className="bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      <FaClipboardList size={20} className="sm:size-22" />
    </button>
  </div>

  {/* Products Section */}
  <Products />
</div>

  )
}
