"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"


export default function CleanLabelsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
         {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </motion.div>
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            Clean Labels & Transparency
          </h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            Discover how clean labeling and transparent sourcing empower you to make healthier, more ethical food choices.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-6">Why Clean Labels Matter</h2>
            
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6 text-lg text-gray-700"
            >
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Minimal Processing:</span> Organic and natural foods often come with <b>clean labels</b> — fewer artificial additives, preservatives, or synthetic chemicals.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Transparent Sourcing:</span> Knowing where and how your food was produced ensures quality and supports ethical practices.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Informed Choices:</span> Clear labeling empowers consumers to make <b>healthier, more ethical decisions</b> about what they eat.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Environmental Impact:</span> Clean labels often indicate sustainable farming practices that protect our planet.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Community Support:</span> Transparent sourcing often means supporting local farmers and communities.
              </motion.li>
            </motion.ul>
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center">
                  <span className="text-green-800 font-semibold">Organic Certification Badge</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                  <span className="text-amber-800 font-semibold">Ingredient Transparency Visual</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-800 font-semibold">Farm-to-Table Journey</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-red-100 to-pink-200 rounded-lg flex items-center justify-center">
                  <span className="text-red-800 font-semibold">No Artificial Additives Icon</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Benefits of Clean Label Products</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-green-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Better Health</h3>
              <p className="text-green-600">Reduced exposure to artificial chemicals and preservatives.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-amber-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌎</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-700 mb-2">Eco-Friendly</h3>
              <p className="text-amber-600">Sustainable farming practices that protect our environment.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Ethical Sourcing</h3>
              <p className="text-blue-600">Support for fair labor practices and local communities.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}