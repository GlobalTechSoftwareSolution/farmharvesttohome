"use client"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image 
              src="/images/farm.png"
              alt="Farmer"
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="text-white font-semibold">
              Farm Harvest <br />
              <span className="text-green-500 text-base md:text-lg">To Home</span>
            </span>
          </div> <br />

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Image src="/images/phone.png" alt="Phone" width={20} height={20} />
              <a href="tel:+919844281875" className="hover:text-green-500 transition">
                +91-9844281875
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/images/email.png" alt="Email" width={20} height={20} />
              <a
                href="mailto:farmharvest@gmail.com"
                className="hover:text-green-500 transition"
              >
                farmharvest@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Image src="/images/location.png" alt="Location" width={20} height={20} className="mt-1" />
              <span>
                No 10, 4th Floor, Gaduniya Complex, Ramaiah Layout, Vidyaranyapura, Bangalore - 560097
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:ml-20">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-green-500 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-green-500 transition">Contact</Link></li>
            <li><Link href="/services" className="hover:text-green-500 transition">Services</Link></li>
            <li><Link href="/blog" className="hover:text-green-500 transition">Blog</Link></li>
            <li><Link href="/faqs" className="hover:text-green-500 transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-green-500 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-green-500 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/share/175Y72VCNJ/" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="https://www.instagram.com/farmharvesttohome/?next=%2F" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://wa.me/919844281875" className="hover:text-green-500 transition"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-white font-medium">Farm Harvest To Home</span>. All rights reserved.
      </div>
    </footer>
  )
}
