"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function StorySection() {
  const features = [
    {
      img: "/images/raisins.webp",
      alt: "Sun-dried black raisins",
      text: "Sun-dried black raisins — no sugar, no sulfur, just sweet nature",
    },
    {
      img: "/images/grains.jpg",
      alt: "Hand-cleaned grains",
      text: "Hand-cleaned grains full of natural nutrients",
    },
    {
      img: "/images/rice.jpeg",
      alt: "Traditional rice",
      text: "Traditional rice grown without chemicals",
    },
  ]

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 via-green-100/40 to-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-900 tracking-tight leading-tight relative inline-block"
        >
          Our Story Begins in the Field
          <span className="block h-[3px] w-24 bg-green-600 mx-auto mt-4 rounded-full shadow-md"></span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-10 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          We saw a big problem: store-bought food looks good, sells fast, and makes money — 
          but it has lost its real value. Grains and rice are polished so much that they lose nutrients.
          Even raisins are dried with chemicals — they look perfect but taste bland. 
          Worst of all, farmers earned the least.
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-14 bg-green-50/70 border-l-6 border-green-600 px-8 py-6 rounded-xl shadow-sm text-left"
        >
          <p className="italic text-lg text-green-900 leading-relaxed">
            “So, we asked ourselves — what if food could go back to how it’s meant to be?”
          </p>
          <p className="mt-4 not-italic font-medium text-green-800">
            Now, we work with trusted farmers across India to bring you:
          </p>
        </motion.blockquote>

        {/* Feature List */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={item.img}
                alt={item.alt}
                width={400}
                height={300}
                className="object-cover w-full h-60 scale-105 hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay with Blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center px-4">
              <p className="text-lg font-bold text-white text-center 
              drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] 
              [text-shadow:_0_2px_6px_rgba(0,0,0,0.9)]">
              {item.text}
            </p>

          </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
