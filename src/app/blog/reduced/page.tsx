"use client"

import { motion, Variants } from "framer-motion" // ✅ Added Variants import
import Image from "next/image"
import { FaLeaf, FaSeedling, FaAppleAlt, FaChild, FaChartLine, FaArrowLeft } from "react-icons/fa"
import Link from "next/link"

export default function ReducedPesticidePage() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // ✅ Valid cubic-bezier easing
      },
    },
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-25 to-green-100 py-12 px-6">
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
            <FaLeaf className="text-green-600 text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Reduced Pesticide Exposure & Toxicity
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding how choosing organic and chemical-free foods can
            significantly reduce your exposure to harmful pesticides
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
                src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                alt="Organic farming without pesticides"
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
                <FaChartLine className="text-green-600 mr-3" />
                The Problem with Conventional Produce
              </h2>
              <p className="text-gray-700">
                Studies reveal that nearly{" "}
                <span className="font-bold text-green-700">
                  75% of conventional produce
                </span>{" "}
                carries pesticide residues, with many exceeding safe thresholds.
                The Environmental Working Group (EWG) consistently finds that
                organic or chemical-free options show{" "}
                <span className="font-bold text-green-700">
                  significantly lower residues and lower toxicity risk
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-3 flex items-center">
                <FaAppleAlt className="text-green-600 mr-3" />
                The Power of Organic Transition
              </h2>
              <p className="text-gray-700">
                Remarkable research from Beyond Pesticides shows that switching
                to a fully organic diet can reduce pesticide levels in urine by
                an astonishing{" "}
                <span className="font-bold text-green-700">
                  98.6% within just two weeks
                </span>
                . This rapid detoxification may even enhance the body's DNA
                repair mechanisms, offering protection at the cellular level.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Impact on vulnerable populations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-green-700 rounded-2xl p-8 text-white mb-16 shadow-xl"
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-600 p-3 rounded-full mr-4">
              <FaChild className="text-2xl" />
            </div>
            <h2 className="text-3xl font-bold">
              Protecting Vulnerable Populations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">
                Children's Health
              </h3>
              <p className="mb-4">
                Research from UC Davis Health and TIME indicates that children
                are particularly susceptible to pesticide exposure, which has
                been linked to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Lowered cognitive performance</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Increased risk of ADHD</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Developmental delays</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-200">
                Long-term Health Impacts
              </h3>
              <p className="mb-4">
                Beyond childhood, pesticide exposure has been associated with:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Fertility issues in both men and women</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Increased cancer risk</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    →
                  </span>
                  <span>Neurological disorders</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Practical tips section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaSeedling className="text-2xl text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">
              Reducing Your Pesticide Exposure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                The Dirty Dozen®
              </h3>
              <p className="mb-4 text-gray-700">
                These conventionally grown items tend to have the highest
                pesticide levels:
              </p>
              <ul className="space-y-2">
                {[
                  "Strawberries",
                  "Spinach",
                  "Kale",
                  "Nectarines",
                  "Apples",
                  "Grapes",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center bg-green-50 p-3 rounded-lg"
                  >
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                The Clean Fifteen®
              </h3>
              <p className="mb-4 text-gray-700">
                These conventionally grown items tend to have the lowest
                pesticide levels:
              </p>
              <ul className="space-y-2">
                {[
                  "Avocados",
                  "Sweet corn",
                  "Pineapple",
                  "Onions",
                  "Papaya",
                  "Frozen sweet peas",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-center bg-amber-50 p-3 rounded-lg"
                  >
                    <span className="bg-amber-200 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500"
          >
            <p className="text-green-800 italic">
              <span className="font-semibold">Tip:</span> When possible, choose
              organic versions of the Dirty Dozen, and feel confident buying
              conventional versions of the Clean Fifteen to balance health
              concerns with budget considerations.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
