"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function PrivacyPolicy() {
  const policies = [
    {
      id: "introduction",
      title: "1. Introduction",
      text: `Farm Harvest to Home (“we”, “our”, “us”) values your trust and respects your privacy. 
      This Privacy Policy explains how we collect, use, and protect your personal information 
      when you use our website and services.`
    },
    {
      id: "info",
      title: "2. Information We Collect",
      text: `We may collect the following types of information:
      • Personal details (name, email, phone number, address).  
      • Payment information (processed securely via trusted payment gateways).  
      • Usage data such as IP address, browser type, and device information.`
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      text: `We use your data to:
      • Process and deliver your orders.  
      • Improve our website, services, and customer experience.  
      • Send important updates, offers, or promotional content (with your consent).  
      • Comply with legal obligations.`
    },
    {
      id: "security",
      title: "4. Data Protection & Security",
      text: `We use industry-standard security measures to protect your data. 
      However, no method of transmission over the Internet is 100% secure, 
      and we cannot guarantee absolute protection.`
    },
    {
      id: "sharing",
      title: "5. Sharing of Information",
      text: `We do not sell or trade your personal information. 
      We may share limited information with trusted service providers (e.g., courier, payment gateway) 
      strictly for order fulfillment.`
    },
    {
      id: "cookies",
      title: "6. Cookies & Tracking",
      text: `Our website may use cookies and similar technologies to enhance user experience. 
      You may disable cookies in your browser, but certain features may not function properly.`
    },
    {
      id: "rights",
      title: "7. Your Rights",
      text: `You have the right to:
      • Access, update, or correct your personal data.  
      • Request deletion of your data (subject to legal and operational requirements).  
      • Opt-out of promotional emails.`
    },
    {
      id: "thirdparty",
      title: "8. Third-Party Links",
      text: `Our website may contain links to third-party websites. 
      We are not responsible for the privacy practices of such external sites.`
    },
    {
      id: "updates",
      title: "9. Updates to Privacy Policy",
      text: `We may update this Privacy Policy periodically. 
      Changes will be posted on this page with a revised “Last Updated” date.`
    },
    {
      id: "contact",
      title: "10. Contact Us",
      text: `For questions about this Privacy Policy, reach us at:  
      📧 Email: farmharvest@gmail.com  
      📞 Phone: +91-9844281875`
    }
  ]

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="bg-white text-gray-800 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex gap-12">
        {/* Sidebar - Table of Contents */}
        <aside className="hidden md:block w-1/4 sticky top-24 h-max border-r pr-6">
          <nav className="space-y-2 text-sm">
            {policies.map((item) => (
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

        {/* Mobile menu toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 border rounded-lg"
          >
            {menuOpen ? "Close Contents" : "Open Contents"}
          </button>
          {menuOpen && (
            <nav className="mt-4 space-y-2 text-sm bg-gray-50 p-4 rounded-lg shadow-md">
              {policies.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-gray-600 hover:text-green-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-green-700 mb-8"
          >
            Privacy Policy
          </motion.h1>

          {policies.map((item, idx) => (
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
