"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"

const faqs = [
  {
    q: "What makes your Farm-to-Home delivery special?",
    a: "We deliver directly from trusted small and tribal farmers. No middlemen, no chemicals, no polish — just real, traditional food delivered fresh to your doorstep."
  },
  {
    q: "Where is your farm located?",
    a: "Our farm is located in Vidyaranyapura, Bangalore – 560097. All our fresh produce is harvested and delivered directly from here."
  },
  {
    q: "Do you deliver Pan-India?",
    a: "Yes, we provide fast and secure Pan-India shipping. For Bangalore, we also have same-day or next-day delivery options depending on the product."
  },
  {
    q: "Can I place bulk orders for my café, store, or housing society?",
    a: "Yes! We offer customized bulk orders for restaurants, cafés, health stores, kirana outlets, and housing communities with flexible quantities and eco-friendly packaging."
  },
  {
    q: "Do you use eco-friendly packaging?",
    a: "Absolutely! Our packaging is food-safe, resealable, and plastic-free. We also use sustainable paper bags and custom branding for retail partners."
  },
  {
    q: "How do you support farmers?",
    a: "Through our Farmer Partnership Program, we provide training on organic and regenerative farming, ensure fair and transparent pricing, and build long-term relationships that uplift farmers."
  },
  {
    q: "Can I visit the farm?",
    a: "Yes, customers are welcome to visit the farm with prior appointment. We’d love to show you our farm-to-home process!"
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfers, and cash on delivery for convenience. For bulk orders, we also provide invoice-based payments."
  },
  {
    q: "How can I contact customer support?",
    a: "You can call us at +91-9844281875 or email us at farmharvest@gmail.com for any support or inquiries."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-green-700 text-center mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Everything you need to know about Farm Harvest To Home.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-green-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-green-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-5 pb-4 text-gray-600"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-10">
          <p className="text-gray-700 mb-4">
            Still have questions? We’d love to help you.
          </p>
          <a
            href="https://wa.me/919844281875"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-700 transition"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
