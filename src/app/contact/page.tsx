"use client"
import { useState, useRef, FormEvent, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube, 
  FaLeaf,
  FaCheckCircle,
  FaTimesCircle,
  FaPaperPlane
} from "react-icons/fa"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [popup, setPopup] = useState<{ 
    show: boolean; 
    message: string; 
    type: "success" | "error" 
  }>({
    show: false,
    message: "",
    type: "success"
  })

  const form = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // EmailJS Send Function
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!form.current) return

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setPopup({
            show: true,
            message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
            type: "success"
          })
          setFormData({ name: "", email: "", message: "" })
        },
        (error) => {
          console.error("EmailJS Error:", error.text)
          setPopup({
            show: true,
            message: "We apologize, but there was an error sending your message. Please try again or contact us directly.",
            type: "error"
          })
        }
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup(prev => ({ ...prev, show: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [popup.show])

  const closePopup = () => {
    setPopup(prev => ({ ...prev, show: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header Section */}
      <div className="bg-green-700 text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <FaLeaf className="mr-3 text-green-300" />
            Contact Farm Harvest to Home
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Get in touch with us - we're here to answer your questions and help you with fresh farm products
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE - Contact Info */}
            <div className="bg-green-700 text-white p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Talk</h2>
                <div className="w-16 h-1 bg-green-400 mb-6"></div>
                <p className="text-green-100 text-lg leading-relaxed">
                  Whether you have questions about our farm-fresh products, need assistance with your order, 
                  or want to learn more about our sustainable farming practices — we're here to help.
                </p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                    <p className="text-green-100">
                      No 10, 4th floor, Gaduniya Complex<br />
                      Ramaiah Layout, Vidyaranyapura<br />
                      Bangalore – 560097
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <FaPhoneAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                    <a href="tel:+919844281875" className="text-green-100 hover:text-green-300 transition">
                      +91-9844281875
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <a
                      href="mailto:farmharvesttohome@gmail.com
"
                      className="text-green-100 hover:text-green-300 transition"
                    >
                      farmharvesttohome@gmail.com

                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Follow Our Journey</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/farmharvesttohome/?next=%2F" 
                    className="bg-green-600 hover:bg-green-500 p-3 rounded-full transition-colors"
                  >
                    <FaInstagram className="text-white text-xl" />
                  </a>
                  <a 
                    href="https://www.facebook.com/share/175Y72VCNJ/" 
                    className="bg-green-600 hover:bg-green-500 p-3 rounded-full transition-colors"
                  >
                    <FaFacebook className="text-white text-xl" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@farmharvesttohome" 
                    className="bg-green-600 hover:bg-green-500 p-3 rounded-full transition-colors"
                  >
                    <FaYoutube className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Contact Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">We'll respond to your inquiry as soon as possible</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Popup Notification */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closePopup}
          ></div>
          
          {/* Notification Card */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-95 animate-scale-in">
            {/* Header with gradient */}
            <div className={`h-2 w-full ${popup.type === "success" ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start">
                {/* Icon */}
                <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${popup.type === "success" ? 'bg-green-100' : 'bg-red-100'}`}>
                  {popup.type === "success" ? (
                    <FaCheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <FaTimesCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
                
                {/* Message */}
                <div className="ml-4 flex-1">
                  <h3 className={`text-lg font-semibold ${popup.type === "success" ? 'text-green-800' : 'text-red-800'}`}>
                    {popup.type === "success" ? 'Message Sent Successfully' : 'Something Went Wrong'}
                  </h3>
                  <p className="mt-1 text-gray-600 text-sm">{popup.message}</p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="ml-4 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimesCircle className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={closePopup}
                className={`px-4 py-2 rounded-lg font-medium ${
                  popup.type === "success" 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-red-600 hover:bg-red-700"
                } text-white transition-colors`}
              >
                {popup.type === "success" ? "Continue" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}