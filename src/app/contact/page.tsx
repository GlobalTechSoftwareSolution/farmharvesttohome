"use client"
import { useState, useRef, FormEvent, useEffect } from "react"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [popup, setPopup] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success"
  })

  const form = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendToWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, email, message } = formData
    const yourNumber = "919844281875"

    const text = `Hello, I want to get in touch.%0A
Name: ${name}%0A
Email: ${email}%0A
Message: ${message}`

    const url = `https://wa.me/${yourNumber}?text=${text}`

    window.open(url, "_blank")

    setPopup({
      show: true,
      message: "✅ Opening WhatsApp...",
      type: "success"
    })

    setFormData({ name: "", email: "", message: "" })
  }

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup(prev => ({ ...prev, show: false }))
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [popup.show])

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT SIDE - Contact Info */}
        <div>
          {/* LEFT HEADING STYLE */}
          <h2 className="text-4xl font-extrabold text-green-700 mb-3 tracking-tight">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-green-500 mb-6"></div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Whether you have a question about our products, need help with your order, or want to know 
            more about our farm-to-home journey — we’re here to help.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
              <p>
                <strong>VISIT US</strong><br />
                No 10, 4th floor, Gaduniya Complex Ramaiah Layout, Vidyaranyapura, Bangalore – 560097
              </p>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-green-600 text-xl mt-1" />
              <p>
                <strong>CALL US</strong><br />
                <a href="tel:+919844281875" className="hover:text-green-500 transition">
                +91-9844281875
              </a>
              </p>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-green-600 text-xl mt-1" />
              <p>
                <strong>EMAIL US</strong><br />
                 <a
                    href="mailto:farmharvest@gmail.com"
                    className="hover:text-green-500 transition"
                  >
                    farmharvest@gmail.com
                  </a>              
              </p>
            </div>
          </div>

          <hr className="my-8 border-green-300" />

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">FOLLOW US</h3>
            <div className="flex space-x-5 text-2xl text-gray-700">
            <a href="https://www.instagram.com/farmharvesttohome/?next=%2F" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://www.facebook.com/share/175Y72VCNJ/" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="https://www.youtube.com/@farmharvesttohome" className="hover:text-red-500 transition"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div>
          {/* RIGHT HEADING STYLE */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Drop us a line or two
          </h2>
          <p className="text-gray-500 mb-6">We’d love to hear from you</p>

          <form ref={form} onSubmit={sendToWhatsApp} className="space-y-5">
            
            <input
              type="text"
              name="name"
              placeholder="Full name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />

            <textarea
              name="message"
              placeholder="Your message *"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl text-white font-medium transition-opacity duration-500 ${
            popup.type === "success"
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : "bg-gradient-to-r from-red-400 to-red-600"
          }`}
        >
          {popup.message}
        </div>
      )}
    </div>
  )
}
