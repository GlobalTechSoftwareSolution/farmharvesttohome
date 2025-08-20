"use client"
import { useState } from "react"
import { Phone, MessageCircle, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9199844281875"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  )
}
