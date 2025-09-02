"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaLeaf, FaAppleAlt, FaHeart, FaBrain, FaSeedling, FaArrowLeft, FaChartBar } from "react-icons/fa"
import Link from "next/link"
import { Variants } from "framer-motion";

export default function NutritionalQualityPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // ✅ equivalent to easeInOut
    },
  },
};

  const antioxidantData = [
    { name: "Polyphenols", benefit: "Reduce inflammation and chronic disease risk", icon: "🍇" },
    { name: "Vitamin C", benefit: "Boosts immunity and collagen production", icon: "🍊" },
    { name: "Vitamin E", benefit: "Protects cells from oxidative damage", icon: "🥑" },
    { name: "Carotenoids", benefit: "Support eye health and immune function", icon: "🥕" },
    { name: "Flavonoids", benefit: "Improve heart health and blood vessel function", icon: "🍵" }
  ]

  const nutrientComparison = [
    { nutrient: "Antioxidants", organic: "+17-20%", conventional: "Baseline", color: "bg-amber-500" },
    { nutrient: "Vitamin C", organic: "+15-20%", conventional: "Baseline", color: "bg-orange-500" },
    { nutrient: "Iron", organic: "+21%", conventional: "Baseline", color: "bg-red-600" },
    { nutrient: "Omega-3", organic: "+47%", conventional: "Baseline", color: "bg-blue-500" },
    { nutrient: "Polyphenols", organic: "+18-25%", conventional: "Baseline", color: "bg-purple-500" }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-25 to-amber-50 py-12 px-6">
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

        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FaAppleAlt className="text-green-600 text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Boosted Nutritional Quality & Antioxidants
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover how organic farming methods enhance the nutritional value of your food
          </p>
          <div className="w-24 h-2 bg-green-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        {/* Main content with image and text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-lg z-0 opacity-70"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-100 rounded-lg z-0 opacity-70"></div>
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                alt="Colorful organic vegetables rich in nutrients"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="bg-white/80 rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center">
                <FaChartBar className="text-green-600 mr-3" />
                Scientifically Proven Nutritional Advantages
              </h2>
              <p className="text-gray-700">
                Comprehensive meta-analyses of hundreds of studies reveal that organic produce contains 
                up to <span className="font-bold text-green-700">17–20% more antioxidants</span>, vitamins, and essential minerals 
                compared to conventionally grown food. This nutritional advantage stems from organic plants 
                developing stronger natural defenses.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/80 rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center">
                <FaSeedling className="text-green-600 mr-3" />
                Why Organic Food is More Nutritious
              </h2>
              <p className="text-gray-700">
                Without synthetic pesticides to rely on, organic plants produce more of their own protective 
                compounds, including antioxidants. The richer, more biologically active soil in organic farming 
                systems also contributes to increased nutrient uptake by plants.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Nutrient Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaLeaf className="text-2xl text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">Nutritional Advantages of Organic Food</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-800 border-b pb-2">Nutrient Comparison</h3>
              <div className="space-y-4">
                {nutrientComparison.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">{item.nutrient}</span>
                    <span className="font-bold text-green-700">{item.organic}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-800 border-b pb-2">Key Antioxidants in Organic Food</h3>
              <div className="space-y-4">
                {antioxidantData.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start p-3 bg-amber-50 rounded-lg"
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Health Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-green-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 p-3 rounded-full mr-4">
                <FaHeart className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold">Cardiovascular Benefits</h2>
            </div>
            <p className="mb-4">
              Organic dairy and meat products provide <span className="font-bold text-amber-300">higher omega-3 fatty acids</span> 
              (up to 47% more in some studies), which are essential for:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Reducing inflammation throughout the body</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Lowering triglyceride levels</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Decreasing risk of heart disease and stroke</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-amber-500 p-3 rounded-full mr-4">
                <FaBrain className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold">Brain Health & Antioxidants</h2>
            </div>
            <p className="mb-4">
              The higher antioxidant content in organic food plays a crucial role in:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Reducing oxidative stress linked to aging</span>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Protecting brain cells from damage</span>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Lowering risk of neurodegenerative diseases</span>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">✓</span>
                <span>Supporting cognitive function and memory</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Practical Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Maximizing Nutritional Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center p-6 bg-green-50 rounded-xl"
            >
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥬</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Choose Colorful Variety</h3>
              <p className="text-sm text-gray-600">Different colored fruits and vegetables provide diverse antioxidants and phytonutrients.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-center p-6 bg-amber-50 rounded-xl"
            >
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Eat Seasonally & Fresh</h3>
              <p className="text-sm text-gray-600">Nutrient levels are highest when produce is freshly harvested and in season.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-center p-6 bg-green-50 rounded-xl"
            >
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🌾</span>
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Support Local Organic Farmers</h3>
              <p className="text-sm text-gray-600">Locally grown organic food often has higher nutrient retention due to shorter transport times.</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}