"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  const sections = [
    {
      title: "1. Processing & Appearance",
      market: {
        heading: "Market Polished Grains",
        text: "These grains go through heavy processing, removing the bran and germ layers. They appear smooth and shiny but lose much of their natural value. Examples: white rice, refined wheat flour."
      },
      farm: {
        heading: "Farm Harvest-to-Home (Unpolished Grains & Pulses)",
        text: "Our grains are minimally processed, keeping bran, germ, and endosperm intact. They retain a natural, rough texture — a sign of purity. Examples: brown rice, whole wheat, millets."
      }
    },
    {
      title: "2. Nutritional Value",
      market: {
        heading: "Market Polished Grains",
        text: "Polished grains lose essential nutrients during refining (fiber, B vitamins, iron, magnesium). Mostly starch — leading to faster digestion, high glycemic index, and spikes in blood sugar."
      },
      farm: {
        heading: "Harvest-to-Home Grains & Pulses",
        text: "Rich in fiber, antioxidants, and nutrients (B1, B3, B6, iron, zinc). Slow digestion helps satiety, supports blood sugar control, and improves digestion."
      }
    },
    {
      title: "3. Health Benefits",
      market: {
        heading: "Market Polished Grains",
        text: "Fewer health benefits due to low fiber and nutrients. May increase risk of weight gain, diabetes, and poor digestion."
      },
      farm: {
        heading: "Harvest-to-Home Grains & Pulses",
        text: "Support heart health, digestion, and blood sugar control. High fiber contributes to wellness and long-term health."
      }
    },
    {
      title: "4. Digestibility & Gut Health",
      market: {
        heading: "Market Polished Grains",
        text: "Low fiber causes constipation and slow digestion. High starch may lead to bloating and discomfort."
      },
      farm: {
        heading: "Harvest-to-Home Grains & Pulses",
        text: "Fiber-rich grains promote healthy gut bacteria and act as natural prebiotics for strong digestion."
      }
    },
    {
      title: "5. Environmental & Farming Impact",
      market: {
        heading: "Market Polished Grains",
        text: "Often grown with chemical fertilizers and pesticides. Refining consumes more water and energy."
      },
      farm: {
        heading: "Harvest-to-Home Grains & Pulses",
        text: "Cultivated with traditional or organic methods. Minimal processing = lower carbon footprint, eco-friendly."
      }
    }
  ]

  return (
    <>
      {/* ---------------- About Us Section ---------------- */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/images/about.avif"
              alt="About Us"
              width={500}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-green-700 mb-4">
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At <span className="font-semibold text-green-700">Farm Harvest To Home</span>, 
              we believe in recon necting people with real food. 
              Our mission is to deliver fresh, chemical-free, and 
              unpolished grains directly from our partner farmers 
              to your doorstep — ensuring freshness, transparency, 
              and nutrition in every bite.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              By working hand-in-hand with local farmers, we support 
              sustainable agriculture while bringing you products that 
              are good for your health and the planet. 
              Every purchase you make directly supports a farming family.
            </p>

            {/* Highlight Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-green-100 border-l-4 border-green-600 p-5 rounded-lg shadow"
            >
              <p className="text-green-800 font-medium">
                🌱 “From our farmers’ fields to your dining table — 
                we bring nature’s goodness, pure and simple.”
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Comparison Section ---------------- */}
      {/* ---------------- Comparison Section ---------------- */}
<section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
  <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
    Market Products vs Farm Harvest to Home
  </h2>

  {/* Desktop / Tablet View (detailed cards) */}
  <div className="hidden md:block max-w-7xl mx-auto space-y-8">
    {sections.map((sec, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Market Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-red-50 p-6 rounded-2xl shadow-md border-l-4 border-red-400"
        >
          <h3 className="text-xl font-semibold text-red-700">{sec.title}</h3>
          <h4 className="mt-3 font-bold uppercase text-red-600 text-sm">{sec.market.heading}</h4>
          <p className="mt-2 text-gray-700">{sec.market.text}</p>
        </motion.div>

        {/* Farm Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-green-50 p-6 rounded-2xl shadow-md border-l-4 border-green-400"
        >
          <h3 className="text-xl font-semibold text-green-700">{sec.title}</h3>
          <h4 className="mt-3 font-bold text-green-600 text-sm">{sec.farm.heading}</h4>
          <p className="mt-2 text-gray-700">{sec.farm.text}</p>
        </motion.div>
      </motion.div>
    ))}
  </div>

  {/* Mobile View (simplified table) */}
  <div className="block md:hidden max-w-3xl mx-auto">
    <table className="w-full border border-gray-300 text-sm text-gray-700">
      <thead>
        <tr className="bg-gray-200 text-gray-900">
          <th className="p-2 border">Point</th>
          <th className="p-2 border text-red-600">Market</th>
          <th className="p-2 border text-green-600">Farm Harvest</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((sec, idx) => (
          <tr key={idx} className="text-center">
            <td className="p-2 border font-medium">{sec.title}</td>
            <td className="p-2 border">{sec.market.heading}</td>
            <td className="p-2 border">{sec.farm.heading}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

    </>
  )
}
