"use client"
import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* Hero Section with Full Background Image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/images/farm.jpg')" }} // Replace with your image
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-snug sm:leading-tight">
            Welcome to{" "}
            <span className="text-green-400">Farm Harvest To Home 🌾</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
            Fresh, organic, and locally grown farm produce delivered straight to your doorstep.
            <br /> 🌱 NO CHEMICAL, NO POLISH, JUST REAL FOOD.
                      </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-green-700 transition text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
