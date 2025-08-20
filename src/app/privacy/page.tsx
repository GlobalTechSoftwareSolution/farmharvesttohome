"use client"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  const policies = [
    {
      title: "1. Introduction",
      text: `Farm Harvest to Home (“we”, “our”, “us”) values your trust and respects your privacy. 
      This Privacy Policy explains how we collect, use, and protect your personal information 
      when you use our website and services.`
    },
    {
      title: "2. Information We Collect",
      text: `We may collect the following types of information:
      • Personal details (name, email, phone number, address).  
      • Payment information (processed securely via trusted payment gateways).  
      • Usage data such as IP address, browser type, and device information.`
    },
    {
      title: "3. How We Use Your Information",
      text: `We use your data to:
      • Process and deliver your orders.  
      • Improve our website, services, and customer experience.  
      • Send important updates, offers, or promotional content (with your consent).  
      • Comply with legal obligations.`
    },
    {
      title: "4. Data Protection & Security",
      text: `We use industry-standard security measures to protect your data. 
      However, no method of transmission over the Internet is 100% secure, 
      and we cannot guarantee absolute protection.`
    },
    {
      title: "5. Sharing of Information",
      text: `We do not sell or trade your personal information. 
      We may share limited information with trusted service providers (e.g., courier, payment gateway) 
      strictly for order fulfillment.`
    },
    {
      title: "6. Cookies & Tracking",
      text: `Our website may use cookies and similar technologies to enhance user experience. 
      You may disable cookies in your browser, but certain features may not function properly.`
    },
    {
      title: "7. Your Rights",
      text: `You have the right to:
      • Access, update, or correct your personal data.  
      • Request deletion of your data (subject to legal and operational requirements).  
      • Opt-out of promotional emails.`
    },
    {
      title: "8. Third-Party Links",
      text: `Our website may contain links to third-party websites. 
      We are not responsible for the privacy practices of such external sites.`
    },
    {
      title: "9. Updates to Privacy Policy",
      text: `We may update this Privacy Policy periodically. 
      Changes will be posted on this page with a revised “Last Updated” date.`
    },
    {
      title: "10. Contact Us",
      text: `For questions about this Privacy Policy, reach us at:  
      📧 Email: farmharvest@gmail.com
      📞 Phone: +91-9844281875`
    }
  ]

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-green-700 mb-10 text-center"
        >
          Privacy Policy
        </motion.h2>

        {/* Policy List */}
        <div className="space-y-8">
          {policies.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-xl p-6 border-l-4 border-green-500"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
