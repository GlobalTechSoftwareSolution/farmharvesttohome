"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function TermsAndConditions() {
  const terms = [
    { id: "general", title: "1. General Information", text: `“We”, “our”, or “us” refers to Farm Harvest to Home. “You” or “customer” refers to the person using our services. We reserve the right to update or change these Terms & Conditions at any time.` },
    { id: "products", title: "2. Products", text: `Our products include unpolished, minimally processed grains, pulses, and related items. While we strive to provide accurate descriptions and images, actual products may vary slightly due to natural differences. Availability depends on seasonal and farming conditions.` },
    { id: "orders", title: "3. Orders & Payments", text: `Orders can be placed through our website. All prices are in INR (₹). Payments must be completed at checkout via available payment gateways. We may cancel orders in case of incorrect pricing, payment failure, or stock unavailability.` },
    { id: "delivery", title: "4. Delivery & Shipping", text: `We aim to deliver fresh products within estimated timelines. Delivery may vary depending on your location and courier partner. Risk of loss passes to you once the order is handed to the courier.` },
    { id: "returns", title: "5. Returns & Refunds", text: `Due to the perishable nature of food items, we do not accept general returns. Refunds/replacements are only allowed for damaged or incorrect items, if reported within 24 hours of delivery with photos.` },
    { id: "responsibilities", title: "6. Customer Responsibilities", text: `Customers must provide accurate delivery details. Products must be stored properly as per instructions. We are not liable for adverse health effects caused by misuse or negligence.` },
    { id: "ip", title: "7. Intellectual Property", text: `All website content, branding, images, and designs belong to Farm Harvest to Home. No content may be copied or reused without written permission.` },
    { id: "liability", title: "8. Limitation of Liability", text: `We are not responsible for indirect, incidental, or consequential damages from using our products or site. Our maximum liability shall not exceed the order value.` },
    { id: "law", title: "9. Governing Law", text: `These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in [Your City/State].` },
    { id: "contact", title: "10. Contact Us", text: `For any queries, reach us at:\n📧 Email: farmharvest@gmail.com\n📞 Phone: +91-9844281875` }
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar - Table of contents */}
        <aside className="md:w-1/4 md:sticky md:top-20 h-fit">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden mb-4 px-4 py-2 border rounded-lg"
          >
            {menuOpen ? "Close" : "Contents"}
          </button>
          <nav
            className={`space-y-2 text-sm md:block ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            {terms.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="block text-gray-600 hover:text-green-600 transition"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="md:w-3/4 space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-green-700 mb-8"
          >
            Terms & Conditions
          </motion.h1>

          {terms.map((item, idx) => (
            <motion.section
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.text}
              </p>
            </motion.section>
          ))}
        </main>
      </div>
    </section>
  )
}
