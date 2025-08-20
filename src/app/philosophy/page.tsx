"use client"
import { motion } from "framer-motion"
import { FaLock, FaBox, FaHeart } from "react-icons/fa"
import Link from "next/link"

export default function Philosophy() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
          >
            Our Philosophy:{" "}
            <span className="text-green-300">Simplicity, Purity, and Purpose</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-200"
          >
            In a world full of flashy packaging, preservatives, and polished grains,
            we decided to go back to basics —{" "}
            <span className="font-semibold text-green-200">real food with real value.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <button className="px-8 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105">
              <Link href='/contact'>Contact</Link>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
            <FaLock className="text-4xl text-green-600 mb-4" />
            <h3 className="text-lg font-semibold">SECURE PAYMENTS</h3>
          </motion.div>

          {/* Feature 2 */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
            <FaBox className="text-4xl text-green-600 mb-4" />
            <h3 className="text-lg font-semibold">FAST DELIVERY</h3>
          </motion.div>

          {/* Feature 3 */}
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
            <FaHeart className="text-4xl text-green-600 mb-4" />
            <h3 className="text-lg font-semibold">CUSTOMER SATISFACTION</h3>
          </motion.div>
        </div>
      </section>
    </>
  )
}
