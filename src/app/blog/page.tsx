"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaQuoteLeft, FaBookOpen } from "react-icons/fa";

const blogData = [
  {
    title: "Reduced Pesticide Exposure & Toxicity",
    link: "/blog/reduced",
    points: [
      "Studies reveal that nearly **75% of conventional produce** carries pesticide residues, with many exceeding safe thresholds. Organic or chemical-free options consistently show **significantly lower residues and lower toxicity risk**. (EWG)",
      "An observational study found that switching to a fully organic diet can cut pesticide levels in urine by an astonishing **98.6% within two weeks** and may enhance DNA repair mechanisms. (Beyond Pesticides)",
      "Children and vulnerable groups may especially benefit, given links between pesticide exposure and lowered cognitive performance, ADHD, fertility risks, and cancer. (UC Davis Health / TIME)",
    ],
  },
  {
    title: "Boosted Nutritional Quality & Antioxidants",
    link: "/blog/nutritional-quality",
    points: [
      "Meta-analyses show that organic produce may contain up to **17–20% more antioxidants and polyphenols**, including vitamins C, magnesium, iron, and phosphorus.",
      "Organic animal products—like dairy and meats—often have **higher omega-3 fatty acids** and lower saturated fat, offering heart-health benefits. (TIME)",
    ],
  },
  {
    title: "Environmental Protection & Biodiversity",
    link: "/blog/environmental-protection",
    points: [
      "Organic farming practices—such as crop rotation, natural pest control, and avoiding synthetic inputs—help preserve **soil fertility, water quality, and ecological balance**.",
      "Biodiversity thrives in chemical-free systems: organic farms average **30% more species richness**, including insects, soil microbes, birds, and beneficial fauna.",
    ],
  },
  {
    title: "Supporting Sustainable Farming & Local Communities",
    link: "/blog/sustainable-farming",
    points: [
      "Buying chemical-free products often supports **small-scale, local farmers**, boosting fair livelihoods, reducing long-distance food transport, and promoting sustainable agriculture.",
      "In India, certifications like **India Organic by APEDA** ensure that food is grown without synthetic pesticides or hormones and reinforce traceability and food integrity.",
    ],
  },
  {
    title: "Clean Labels & Ethical Practices",
    link: "/blog/clean-labels",
    points: [
      "Chemical-free food typically means **no synthetic additives, preservatives, or GMOs**—a commitment to simplicity, safety, and transparency. (nutriearth.in)",
      "It contributes to **avoiding antibiotic use and synthetic hormones** in livestock, reducing exposure to industrial chemical agro-inputs. (TIME)",
    ],
  },
];

export default function BlogsSection() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-green-25 to-green-100 py-20 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-green-200 rounded-full -translate-x-1/2 opacity-20"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-green-300 rounded-full translate-x-1/3 opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FaBookOpen className="text-green-600 text-2xl" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
            Insights & <span className="text-green-600">Research</span>
          </h2>

          <div className="w-24 h-2 bg-green-500 rounded-full mx-auto mb-8"></div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/80 rounded-2xl p-6 shadow-md max-w-4xl mx-auto"
          >
            <FaQuoteLeft className="text-green-400 text-2xl mb-3" />
            <p className="text-xl text-gray-700 leading-relaxed italic">
              At{" "}
              <span className="font-semibold text-green-700">
                Farm Harvest to Home
              </span>
              , we believe in delivering purity, nutrition, and sustainability
              in every morsel. Here's why opting for chemical-free, pesticide-free food is
              more than just a trend—it's a smarter choice for health, planet,
              and community.
            </p>
          </motion.div>
        </motion.div>

        {/* Blog sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
        >
          {blogData.map((section, i) => (
            <motion.div key={i} variants={itemVariants} className="group relative">
              <Link href={section.link}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border-l-4 border-green-500 overflow-hidden">

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-green-900 mb-5 flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3 text-sm">
                        {i + 1}
                      </span>
                      {section.title}
                    </h3>

                    <ul className="space-y-4">
                      {section.points.map((point, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + j * 0.2, duration: 0.7 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 mt-2.5 mr-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <p
                            className="text-gray-700 text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: point.replace(
                                /\*\*(.*?)\*\*/g,
                                "<span class='font-semibold text-green-700'>$1</span>"
                              ),
                            }}
                          />
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                      Read more
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
