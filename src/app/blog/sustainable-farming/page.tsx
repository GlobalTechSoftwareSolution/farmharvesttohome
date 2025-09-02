"use client"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"

export default function SustainableFarmingPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 py-16 px-6">
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
            Sustainable Farming & Ethical Practices
          </h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            Discover how sustainable agriculture protects our planet while supporting communities and promoting biodiversity.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-green-800 mb-6">The Pillars of Sustainable Agriculture</h2>
            
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
                <span className="text-green-600 font-bold">Biodiversity Protection:</span> Organic farming supports <b>biodiversity</b> by protecting pollinators, beneficial insects, and native wildlife through natural pest control and habitat preservation.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Ethical Animal Treatment:</span> Ethical farming practices prioritize animal welfare, avoiding hormones, antibiotics, and confinement while ensuring animals have access to open spaces and natural behaviors.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Community Support:</span> Buying organic supports small farmers and fair trade communities, ensuring equitable compensation and sustainable livelihoods.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Soil Health:</span> Sustainable farming practices focus on building healthy soil through crop rotation, cover cropping, and natural fertilizers.
              </motion.li>
              
              <motion.li 
                whileHover={{ scale: 1.02, backgroundColor: "#f0fdf4" }}
                className="p-4 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 font-bold">Water Conservation:</span> Organic farms typically use less water and implement practices that protect water quality from chemical runoff.
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
                  <span className="text-green-800 font-semibold text-center px-2">Biodiversity & Pollinator Habitat</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                  <span className="text-amber-800 font-semibold text-center px-2">Ethical Animal Farming Practices</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-800 font-semibold text-center px-2">Soil Conservation Techniques</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white p-2 rounded-xl shadow-lg"
              >
                <div className="h-64 bg-gradient-to-br from-red-100 to-pink-200 rounded-lg flex items-center justify-center">
                  <span className="text-red-800 font-semibold text-center px-2">Community Supported Agriculture</span>
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
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Benefits of Sustainable Farming</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-green-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐝</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Ecosystem Health</h3>
              <p className="text-green-600">Promotes biodiversity, soil vitality, and clean water systems.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-amber-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-700 mb-2">Farmer Support</h3>
              <p className="text-amber-600">Provides fair wages and supports traditional farming communities.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 p-6 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Nutrient-Rich Food</h3>
              <p className="text-blue-600">Produces healthier, more nutritious food without synthetic chemicals.</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Practices Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Key Sustainable Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Crop Rotation</h3>
                <p className="text-gray-700">Alternating crops seasonally to maintain soil fertility and reduce pest problems.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Composting</h3>
                <p className="text-gray-700">Using organic waste to create nutrient-rich soil amendments instead of chemical fertilizers.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Integrated Pest Management</h3>
                <p className="text-gray-700">Using natural predators and biological controls instead of synthetic pesticides.</p>
              </motion.div>
            </div>
            
            <div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Water Conservation</h3>
                <p className="text-gray-700">Implementing drip irrigation, rainwater harvesting, and other water-saving techniques.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Agroforestry</h3>
                <p className="text-gray-700">Integrating trees and shrubs into farming systems to enhance biodiversity.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-3">Cover Cropping</h3>
                <p className="text-gray-700">Planting specific crops to protect and enrich the soil during off-seasons.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-green-800 mb-4">Support Sustainable Agriculture</h2>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Your choices matter. By supporting sustainable farming practices, you contribute to a healthier planet and more equitable food system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -10px rgba(5, 122, 85, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-8 rounded-full text-lg"
            >
              Find Local Farms
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -10px rgba(5, 122, 85, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 border-2 border-green-500 font-semibold py-3 px-8 rounded-full text-lg"
            >
              Learn About CSA Programs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}