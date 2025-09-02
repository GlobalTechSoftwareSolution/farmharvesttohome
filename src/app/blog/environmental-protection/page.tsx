"use client"
import { motion, Variants, easeOut } from "framer-motion"
import Image from "next/image"
import { FaLeaf, FaWater, FaSeedling, FaRecycle, FaCloudRain, FaArrowLeft, FaTree, FaGlobe } from "react-icons/fa"
import Link from "next/link"

export default function EnvironmentalProtectionPage() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: easeOut, // ✅ FIX: imported from framer-motion
      },
    },
  }

  const benefitsData = [
    {
      title: "Water Conservation",
      description:
        "Organic farming uses 30-50% less water through improved soil structure and water retention",
      icon: <FaWater className="text-blue-500 text-2xl" />,
      color: "bg-blue-50",
    },
    {
      title: "Soil Health",
      description:
        "Increases organic matter by 20-40% and improves soil structure and fertility",
      icon: <FaSeedling className="text-green-500 text-2xl" />,
      color: "bg-amber-50",
    },
    {
      title: "Carbon Sequestration",
      description:
        "Organic soils can store up to 40% more carbon, helping combat climate change",
      icon: <FaCloudRain className="text-gray-500 text-2xl" />,
      color: "bg-green-50",
    },
    {
      title: "Biodiversity",
      description:
        "Supports 30% more species richness including pollinators and beneficial insects",
      icon: <FaTree className="text-green-600 text-2xl" />,
      color: "bg-teal-50",
    },
  ]

  const practicesData = [
    {
      title: "Crop Rotation",
      description: "Prevents soil depletion and disrupts pest cycles naturally",
      icon: "🔄",
    },
    {
      title: "Composting",
      description: "Recycles organic waste into nutrient-rich soil amendment",
      icon: "♻️",
    },
    {
      title: "Cover Cropping",
      description:
        "Protects soil from erosion and improves fertility during off-seasons",
      icon: "🌱",
    },
    {
      title: "Natural Pest Control",
      description:
        "Uses beneficial insects and companion planting instead of chemicals",
      icon: "🪲",
    },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-25 to-blue-50 py-12 px-6">
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
            <FaGlobe className="text-green-600 text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Environmental Protection & Soil Health
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            How organic farming practices protect our planet and create
            sustainable ecosystems
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
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-lg z-0 opacity-70"></div>

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/environment.jpg"
                alt="Organic farming landscape showing healthy ecosystem"
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
            <motion.div
              variants={itemVariants}
              className="bg-white/80 rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center">
                <FaLeaf className="text-green-600 mr-3" />
                The Environmental Cost of Conventional Farming
              </h2>
              <p className="text-gray-700">
                Conventional agriculture relies heavily on synthetic fertilizers
                and pesticides that can contaminate soil, rivers, and drinking
                water. These chemicals create dead zones in waterways, harm
                beneficial insects and wildlife, and degrade soil health over
                time.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center">
                <FaRecycle className="text-green-600 mr-3" />
                The Organic Solution
              </h2>
              <p className="text-gray-700">
                Organic farming reduces pollution, conserves water, reduces soil
                erosion, increases soil fertility, and uses less energy. By
                working with natural systems rather than against them, organic
                agriculture creates resilient ecosystems that can better
                withstand climate change and extreme weather events.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Environmental Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            Environmental Benefits of Organic Farming
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`${benefit.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full mb-4 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-center">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Climate Change Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-green-700 rounded-2xl p-8 text-white shadow-xl mb-16"
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-600 p-3 rounded-full mr-4">
              <FaCloudRain className="text-2xl" />
            </div>
            <h2 className="text-3xl font-bold">Combatting Climate Change</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-200">
                Carbon Sequestration
              </h3>
              <p className="mb-4">
                Healthier soils in organic systems store significantly more
                carbon, helping remove CO₂ from the atmosphere. Studies show
                organic farming methods can increase soil carbon by 26-40%
                compared to conventional methods.
              </p>
              <div className="bg-green-600 rounded-lg p-4">
                <p className="text-center font-bold">
                  "If all globally cultivated land converted to organic
                  practices, it could offset{" "}
                  <span className="text-amber-300">
                    23% of global greenhouse gas emissions
                  </span>
                  "
                </p>
                <p className="text-center text-sm mt-2 text-green-200">
                  - Rodale Institute
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-200">
                Reduced Energy Consumption
              </h3>
              <p className="mb-4">
                Organic farming uses 30-50% less energy per unit of output by
                eliminating energy-intensive synthetic fertilizers and
                pesticides. This significantly reduces the carbon footprint of
                food production.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <span>45% less energy used in organic crop production</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    No synthetic nitrogen fertilizers (which account for 3-5% of
                    global natural gas use)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    ✓
                  </span>
                  <span>
                    Reduced fossil fuel consumption for pesticide production and
                    application
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Sustainable Practices Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">
            Sustainable Organic Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-800 border-b pb-2">
                Core Organic Techniques
              </h3>
              <div className="space-y-4">
                {practicesData.map((practice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="flex items-start p-4 bg-green-50 rounded-lg"
                  >
                    <span className="text-2xl mr-4">{practice.icon}</span>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        {practice.title}
                      </h4>
                      <p className="text-gray-700">{practice.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-800 border-b pb-2">
                Biodiversity Impact
              </h3>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  Organic farms support significantly greater biodiversity than
                  conventional farms:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      +
                    </span>
                    <span>
                      <b>30% more species</b> on average
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      +
                    </span>
                    <span>
                      <b>50% more pollinators</b> like bees and butterflies
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      +
                    </span>
                    <span>
                      <b>Up to 3x more earthworms</b> improving soil health
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      +
                    </span>
                    <span>
                      <b>More beneficial insects</b> for natural pest control
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
