"use client";
import { motion } from "framer-motion";
import { FaSeedling, FaLeaf, FaHandshake, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { supabase } from "@/app/lib/supabaseClient";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Clerk hooks
  const { user: clerkUser } = useUser();
  const { openSignIn } = useClerk();

  // Supabase fallback
  const [supabaseUser, setSupabaseUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSupabaseUser(data?.user || null);
    });
  }, []);

  // ✅ Unified login check
  const isLoggedIn = !!clerkUser || !!supabaseUser;

  // ✅ Shop Now handler
  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      if (openSignIn) {
        openSignIn({ redirectUrl: "/shop" });
      } else {
        router.push("/login?redirect=/shop");
      }
    } else {
      router.push("/shop");
    }
    setIsOpen(false);
  };

  // ✅ Features array
  const features = [
    {
      title: "Direct from Farmers",
      desc: "We do natural farming in our own land and even we partner directly with farmers who follow traditional, natural farming practices. So, no agents — just farm-fresh products.",
      icon: <FaSeedling className="text-green-600 text-3xl" />,
    },
    {
      title: "No Polishing, No Processing Loss",
      desc: "Market grains are often polished to look shiny but lose nutrients in the process. Our grains are not polished, so they keep their fiber, vitamins, and minerals.",
      icon: <FaLeaf className="text-green-600 text-3xl" />,
    },
    {
      title: "Fair Price to Farmers & Honest Price to You",
      desc: "By eliminating middlemen, we ensure that farmers get a fair share, and you get premium quality at the right price.",
      icon: <FaHandshake className="text-green-600 text-3xl" />,
    },
    {
      title: "Better for Health, Better for the Planet",
      desc: "Our natural farming helps protect soil, save water, and support nature — making every purchase a step toward a sustainable future.",
      icon: <FaGlobe className="text-green-600 text-3xl" />,
    },
  ];

  return (
    <section className="relative bg-green-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-light text-gray-900 leading-relaxed max-w-3xl mx-auto drop-shadow-md"
        >
          Because real food doesn’t need polishing — it shines on its own.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <button
            onClick={handleShopNow}
            className="px-8 py-3 md:px-10 md:py-4 bg-white text-green-800 font-semibold rounded-xl shadow-lg hover:bg-green-100 transition duration-300 text-lg"
          >
            Shop Now And Taste The Difference!
          </button>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-3xl sm:text-5xl font-bold text-green-900 drop-shadow-lg"
        >
          Why Choose Farm Harvest To Home ?
        </motion.h2>
        <span className="block h-1 w-20 bg-green-600 mx-auto mt-3 rounded-full"></span>

        {/* Image + Features Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/images/mani.jpg"
              alt="Why Choose Farm Harvest"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover max-w-[400px] w-full"
            />
          </motion.div>

          {/* Features */}
          <div className="grid gap-8 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* {feature.icon} */}
                  <h3 className="text-lg font-semibold text-green-800 drop-shadow-sm">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed drop-shadow-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Read More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            href="/about"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition-colors duration-300"
          >
            Read More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
