"use client"

import { supabase } from "@/app/lib/supabaseClient";
import Image from "next/image"
import { useRouter, usePathname  } from "next/navigation"
import { useState, useEffect} from "react" // adjust path if different

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  // Supabase fallback
  const [supabaseUser, setSupabaseUser] = useState<any>(null);

  useEffect(() => {
    // Check user session from Supabase
    supabase.auth.getUser().then(({ data }) => {
      setSupabaseUser(data?.user || null);
    });
  }, []);

  // Decide if logged in (either Clerk or Supabase)
  const isLoggedIn = !!supabase || !!supabaseUser;

  // unified handler
const handleShopNow = (e: React.MouseEvent) => {
  e.preventDefault();

  if (!isLoggedIn) {
    // Supabase login flow
    router.push("/login?redirect=/shop");
  } else {
    // Already logged in → go directly
    router.push("/shop");
  }

  setIsOpen(false); // close mobile menu if open
};


  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 text-gray-800 leading-relaxed">
      {/* Hero Section */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Farm Harvest To Home</h1>
        <div className="w-24 h-1.5 bg-green-700 mx-auto mb-6"></div>
        <p className="text-xl text-green-800 max-w-3xl mx-auto font-medium">
          Bringing clean, chemical-free food straight from our farmers to your plate
        </p>
      </div>

      {/* Image Left / Text Right Section */}
      <section className="mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image on left */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/about/about.avif"
                alt="Organic farm field with fresh produce"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
          
          {/* Text on right */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6">
              Honest Food, Straight from the Soil
            </h2>
            <div className="space-y-4">
              <p>
                At Farm Harvest To Home, we believe in restoring trust in what we eat.
                In today's market, most food products — especially grains, rice, pulses, spices,
                and dry fruits — are heavily processed, polished, and treated with chemicals.
                They may look shiny and appealing on store shelves, but behind that glossy
                appearance is a loss of nutrition, flavor, and most importantly, safety.
              </p>
              <p className="font-medium text-green-700">
                We started Farm Harvest To Home with a simple mission:  
                Bring clean, chemical-free food straight from our farmers to your plate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TO CHOOSE US */}
      <section className="mb-16 md:mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">Why Choose Us?</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-green-700">Chemical Free Grains</h3>
            </div>
            <p className="pl-10">
              We don't polish, we never add preservatives and there are no middlemen.
              When you buy from us, you get grains that directly support farmers.
              Each time you order, you're choosing food rich in fiber, minerals, and taste.
              What you order from us is real food delivered in its purest form, ready for your kitchen.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-green-700">Direct from the Source</h3>
            </div>
            <p className="pl-10">
              We work hand-in-hand with trusted local farmers who follow traditional,
              sustainable farming practices. When you shop here, you directly support farmers
              with fair pricing while getting authentic products customer can't easily find in regular markets.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-green-700">Honest, Transparent, and Traceable</h3>
            </div>
            <p className="pl-10">
              Every product you purchase can be traced back to the hands that grew it.
              No hidden chemicals, synthetic ripening, or shortcuts — just wholesome staples
              you can confidently stock up on and serve to your family.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-green-700">Rooted in Farms. Delivered with Care.</h3>
            </div>
            <p className="pl-10">
              Welcome to Farm Harvest To Home, where we believe food should be more than
              just something you eat — it should nourish your body, honor the farmer, and respect the earth.
            </p>
            <ul className="list-disc ml-10 mt-3 space-y-2">
              <li>Traditional grains ready to order online</li>
              <li>Pure, unpolished rice you can bring home today</li>
              <li>Naturally sun-dried black raisins you can add to your cart right now</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Image Right / Text Left Section */}
      <section className="mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          {/* Image on right */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/about/differnt.jpeg"
                alt="Assortment of organic grains and pulses"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
          
          {/* Text on left */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-6">
              Why We're Different
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Unpolished Grains & Pulses – Wholesome, nutrient-rich staples you can order for everyday cooking.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Traditional Rice Varieties – Like Rajamudi and Red Rice, available to shop now.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Chemical-Free Spices – Full of aroma and medicinal benefits, ready for you to buy online.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Naturally Dried Fruits & Nuts – No added sugar, no shine — just purity you can stock up on today.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Wheat Image */}
      <div className="w-full mb-16">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/wheat.webp"
            alt="Organic wheat from our farms"
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Market vs Farm Harvest */}
   <section className="mb-20 px-4 md:px-8 py-12 bg-gradient-to-b from-gray-50 to-white">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14 tracking-tight">
    Market Products vs Our Products
  </h2>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Market Products */}
    <div className="bg-gradient-to-b from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-700">
          Market Products
        </h3>
      </div>
      
      <ol className="space-y-8 text-gray-700 leading-relaxed">
        {[
          {
            title: "Processing & Appearance",
            content: "These grains go through heavy processing, which removes the outer bran and germ layers. As a result, they appear smooth and shiny, but they lose a lot of their natural value. Examples include white rice and refined wheat flour.",
            icon: "⚙️"
          },
          {
            title: "Nutritional Value",
            content: "Polished grains lose many essential nutrients during the refining process. This includes important fiber, B-complex vitamins, and minerals like iron and magnesium. As a result, these grains are mostly made up of starch. This can lead to faster digestion and a higher glycemic index, which may cause spikes in blood sugar levels. Moreover, the lack of fiber can reduce the feeling of fullness, which might lead to overeating.",
            icon: "📉"
          },
          {
            title: "Health Benefits",
            content: "While easy to digest, they provide fewer benefits. Low fiber and nutrients increase risks of weight gain, diabetes, and poor digestion.",
            icon: "🏥"
          },
          {
            title: "Digestibility & Gut Health",
            content: "Because these grains contain little fiber, these grains can cause constipation and slow digestion. The high starch content may also cause bloating or discomfort.",
            icon: "🤢"
          },
          {
            title: "Environmental Impact",
            content: "These are usually grown with the use of chemical fertilizers and pesticides. Additionally, their production consumes more water and energy due to milling and refining processes.",
            icon: "🌍"
          }
        ].map((item, index) => (
          <li key={index} className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">{item.icon}</span>
            </div>
            <h4 className="font-semibold text-red-800 mb-2 text-lg">
              {item.title}
            </h4>
            <p className="text-gray-600">
              {item.content}
            </p>
          </li>
        ))}
      </ol>
    </div>

    {/* Our Products */}
    <div className="bg-gradient-to-b from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-700">
          Farm Harvest To Home Products
        </h3>
      </div>
      
      <ol className="space-y-8 text-gray-700 leading-relaxed">
        {[
          {
            title: "Processing & Appearance",
            content: "Our grains are minimally processed, keeping the bran, germ, and endosperm intact. They retain a natural, rough texture and a duller color — a sign of purity, not polish. Examples include brown rice, whole wheat, millets, and hand-pounded rice. Most importantly, they are chemical-free and naturally healthy.",
            icon: "🌾"
          },
          {
            title: "Nutritional Value",
            content: "In contrast, our farm-fresh grains and pulses are rich in fiber, antioxidants, and essential nutrients such as vitamins B1, B3, and B6, as well as iron and zinc. Thanks to their slow-digesting nature, they help you stay full longer and support better blood sugar control. Additionally, the high fiber content helps improve digestion.",
            icon: "📈"
          },
          {
            title: "Health Benefits",
            content: "On the other hand, our grains help support heart health, better digestion, and blood sugar control. Their high fiber content contributes to overall wellness and long-term health.",
            icon: "💚"
          },
          {
            title: "Digestibility & Gut Health",
            content: "Thanks to their fiber-rich nature, our grains support the growth of healthy gut bacteria. They also act as a natural prebiotic, promoting a strong and balanced digestive system.",
            icon: "👍"
          },
          {
            title: "Environmental Impact",
            content: "Our grains are cultivated using traditional or organic farming methods. Because they undergo minimal processing, they have a lower carbon footprint and are more eco-friendly.",
            icon: "🌱"
          }
        ].map((item, index) => (
          <li key={index} className="relative pl-10">
            <div className="absolute left-0 top-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">{item.icon}</span>
            </div>
            <h4 className="font-semibold text-green-800 mb-2 text-lg">
              {item.title}
            </h4>
            <p className="text-gray-600">
              {item.content}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </div>
</section>

      
      {/* Services */}
      <section className="mb-16 md:mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">Our Services</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-700 text-4xl font-bold mb-4">01</div>
            <h3 className="font-bold text-xl text-green-700 mb-3">Direct Farm-to-Home Delivery</h3>
            <p>
              Skip the middlemen. Get unpolished, chemical-free grains, native rice, and sun-dried black raisins
              directly from small and tribal farmers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-700 text-4xl font-bold mb-4">02</div>
            <h3 className="font-bold text-xl text-green-700 mb-3">Customized Bulk Orders</h3>
            <p>
              Restaurants, cafés, kirana stores, and housing societies can get flexible quantities with eco-friendly packaging.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-700 text-4xl font-bold mb-4">03</div>
            <h3 className="font-bold text-xl text-green-700 mb-3">Eco-Friendly Product Packaging</h3>
            <p>
              Food-safe pouches, paper bags, and custom branding. No plastic, no chemicals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <div className="text-green-700 text-4xl font-bold mb-4">04</div>
            <h3 className="font-bold text-xl text-green-700 mb-3">Farmer Partnership Program</h3>
            <p>
              Long-term partnerships, training in organic farming, and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Farm Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { src: "/about/coconut.webp", alt: "Organic Coconut", label: "Organic Coconut" },
            { src: "/about/image1.webp", alt: "Sesame Seeds", label: "Sesame Seeds" },
            { src: "/about/image2.webp", alt: "Nigella Seeds (Kalonji)", label: "Black Seeds" },
            { src: "/about/image3.webp", alt: "Cloves", label: "Cloves" },
            { src: "/about/image4.webp", alt: "Cinnamon Sticks", label: "Cinnamon" },
            { src: "/about/image5.webp", alt: "Cardamom Pods", label: "Cardamom" },
            { src: "/about/image6.webp", alt: "Dried Red Chillies", label: "Guntur Chilli" },
            { src: "/about/image7.webp", alt: "Sun-Dried Byadagi Chillies", label: "Byadagi Chilli" },
            { src: "/about/image8.webp", alt: "Turmeric Powder", label: "Turmeric Powder" },
            { src: "/about/image9.webp", alt: "Fennel Seeds", label: "Fennel Seeds" },
            { src: "/about/image10.webp", alt: "Mustard Seeds", label: "Mustard Seeds" },
            { src: "/about/image11.webp", alt: "Black Peppercorns", label: "Black Pepper" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 group"
            >
              <div className="overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-800 text-white rounded-2xl p-8 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Experience Farm-Fresh Goodness?</h2>
        <p className="text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have made the switch to chemical-free, 
          nutrient-rich foods straight from our farms to your home.
        </p>
      </section>
    </div>
  )
}