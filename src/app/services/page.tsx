"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"

const services = [
  {
    title: "Direct Farm-to-Home Delivery",
    desc: "Skip the middlemen and mass production. We deliver: Unpolished, Chemical Free Grains, Traditional native grains, Naturally sun-dried black raisins. All sourced directly from our trusted network of small and tribal farmers. You get freshness, transparency, and nutrition — delivered straight to your doorstep."
  },
  {
    title: "Customized Bulk Orders (for Homes, Cafes, and Stores)",
    desc: "Looking for natural food in bulk? We supply clean, organic products for Restaurants & Organic Cafés, Health stores & Kirana outlets, Housing societies & communities. With flexible quantities and eco-friendly packaging, we make bulk buying healthy and hassle-free."
  },
  {
    title: "Eco-Friendly Product Packaging",
    desc: "We offer food-safe, resealable pouches (500g to 5kg), custom branding for retail partners, and sustainable paper bags for walk-in or local delivery orders. Every package is designed to protect the purity of the product — no plastic contamination, no chemical exposure."
  },
  {
    title: "Farmer Partnership Program",
    desc: "Hand-in-hand with local farmers, we provide training on organic & regenerative practices, transparent pricing with zero exploitation, and long-term partnerships that improve their livelihood. Your purchase directly supports a farmer and their family."
  },
  {
    title: "Easy Online Ordering & Delivery",
    desc: "Made ordering organic food simple: Fast & secure checkout, Pan-India shipping, WhatsApp ordering for regular customers, and dedicated customer support. Your health is just a click away."
  }
]

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index)

  return (
    <div className="bg-green-50 min-h-screen py-16 px-6 md:px-16">
      {/* Services Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-4xl font-extrabold text-green-800 text-center mb-12">
          Our Services
        </h2>
        <div className="space-y-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-green-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-green-700 mb-3">
                {index + 1}. {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
