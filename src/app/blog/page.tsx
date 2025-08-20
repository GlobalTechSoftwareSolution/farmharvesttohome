"use client"
import { motion } from "framer-motion"

const blogData = [
  {
    title: "Reduced Pesticide Exposure & Toxicity",
    points: [
      "Studies reveal that nearly **75% of conventional produce** carries pesticide residues, with many exceeding safe thresholds. Organic or chemical-free options consistently show **significantly lower residues and lower toxicity risk**. (EWG)",
      "An observational study found that switching to a fully organic diet can cut pesticide levels in urine by an astonishing **98.6% within two weeks** and may enhance DNA repair mechanisms. (Beyond Pesticides)",
      "Children and vulnerable groups may especially benefit, given links between pesticide exposure and lowered cognitive performance, ADHD, fertility risks, and cancer. (UC Davis Health / TIME)"
    ]
  },
  {
    title: "Boosted Nutritional Quality & Antioxidants",
    points: [
      "Meta-analyses show that organic produce may contain up to **17–20% more antioxidants and polyphenols**, including vitamins C, magnesium, iron, and phosphorus.",
      "Organic animal products—like dairy and meats—often have **higher omega-3 fatty acids** and lower saturated fat, offering heart-health benefits. (TIME)"
    ]
  },
  {
    title: "Environmental Protection & Biodiversity",
    points: [
      "Organic farming practices—such as crop rotation, natural pest control, and avoiding synthetic inputs—help preserve **soil fertility, water quality, and ecological balance**.",
      "Biodiversity thrives in chemical-free systems: organic farms average **30% more species richness**, including insects, soil microbes, birds, and beneficial fauna."
    ]
  },
  {
    title: "Supporting Sustainable Farming & Local Communities",
    points: [
      "Buying chemical-free products often supports **small-scale, local farmers**, boosting fair livelihoods, reducing long-distance food transport, and promoting sustainable agriculture.",
      "In India, certifications like **India Organic by APEDA** ensure that food is grown without synthetic pesticides or hormones and reinforce traceability and food integrity."
    ]
  },
  {
    title: "Clean Labels & Ethical Practices",
    points: [
      "Chemical-free food typically means **no synthetic additives, preservatives, or GMOs**—a commitment to simplicity, safety, and transparency. (nutriearth.in)",
      "It contributes to **avoiding antibiotic use and synthetic hormones** in livestock, reducing exposure to industrial chemical agro-inputs. (TIME)"
    ]
  }
]

export default function BlogsSection() {
  return (
    <section className="relative bg-gradient-to-b from-green-50 via-green-100 to-green-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold text-green-900 text-center"
        >
          Blogs
          <span className="block h-1 w-20 bg-green-500 mx-auto mt-3 rounded-full"></span>
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto"
        >
          At <span className="italic font-semibold">Farm Harvest to Home</span>, we believe in delivering purity, nutrition, 
          and sustainability in every morsel. Here’s why opting for chemical-free, pesticide-free food is 
          more than just a trend—it’s a smarter choice for health, planet, and community.
        </motion.p>

        {/* Blog Sections */}
        <div className="mt-12 space-y-14">
          {blogData.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/70 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-green-500 font-bold">{i + 1}.</span> {section.title}
              </h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                {section.points.map((point, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + j * 0.2, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                    <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") }} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
