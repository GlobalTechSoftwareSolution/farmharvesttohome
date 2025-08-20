"use client"
import { motion } from "framer-motion"

export default function TermsAndConditions() {
  const terms = [
    {
      title: "1. General Information",
      text: `“We”, “our”, or “us” refers to Farm Harvest to Home. “You” or “customer” refers to the person using our services. 
      We reserve the right to update or change these Terms & Conditions at any time.`
    },
    {
      title: "2. Products",
      text: `Our products include unpolished, minimally processed grains, pulses, and related items. 
      While we strive to provide accurate descriptions and images, actual products may vary slightly due to natural differences. 
      Availability depends on seasonal and farming conditions.`
    },
    {
      title: "3. Orders & Payments",
      text: `Orders can be placed through our website. All prices are in INR (₹). 
      Payments must be completed at checkout via available payment gateways. 
      We may cancel orders in case of incorrect pricing, payment failure, or stock unavailability.`
    },
    {
      title: "4. Delivery & Shipping",
      text: `We aim to deliver fresh products within estimated timelines. 
      Delivery may vary depending on your location and courier partner. 
      Risk of loss passes to you once the order is handed to the courier.`
    },
    {
      title: "5. Returns & Refunds",
      text: `Due to the perishable nature of food items, we do not accept general returns. 
      Refunds/replacements are only allowed for damaged or incorrect items, if reported within 24 hours of delivery with photos.`
    },
    {
      title: "6. Customer Responsibilities",
      text: `Customers must provide accurate delivery details. 
      Products must be stored properly as per instructions. 
      We are not liable for adverse health effects caused by misuse or negligence.`
    },
    {
      title: "7. Intellectual Property",
      text: `All website content, branding, images, and designs belong to Farm Harvest to Home. 
      No content may be copied or reused without written permission.`
    },
    {
      title: "8. Limitation of Liability",
      text: `We are not responsible for indirect, incidental, or consequential damages from using our products or site. 
      Our maximum liability shall not exceed the order value.`
    },
    {
      title: "9. Governing Law",
      text: `These Terms & Conditions are governed by the laws of India. 
      Any disputes shall be subject to the jurisdiction of courts in [Your City/State].`
    },
    {
      title: "10. Contact Us",
      text: `For any queries, reach us at:
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
          Terms & Conditions
        </motion.h2>

        {/* Terms List */}
        <div className="space-y-8">
          {terms.map((item, idx) => (
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
