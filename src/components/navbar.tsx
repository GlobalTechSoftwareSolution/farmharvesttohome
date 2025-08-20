"use client"
import Link from "next/link"
import { useState } from "react"
import { User, Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useUser()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Shop Now", href: "/shop" },
  ]

  return (
    <nav className="bg-green-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-800">
            <div className="w-[90px] h-[90px] relative">
              <Image 
                src="/images/farmer.png"
                alt="Farmer"
                height={150}
                width={150}
                className="rounded-full object-cover scale-110"
                priority
              />
            </div>
            <span className="leading-tight text-2xl md:text-2xl">
              Farm Harvest To Home
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-medium ml-8 pl-[8rem]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full border transition-all duration-300 
                ${pathname === link.href
                    ? "text-white bg-green-600 border-green-600 shadow-md"
                    : "text-gray-700 border-transparent hover:border-green-600 hover:text-green-600 hover:bg-green-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center ml-auto space-x-6 pl-10">
            
            {/* If logged OUT → show Login button */}
            <SignedOut>
              <SignInButton mode="modal" afterSignInUrl="/shop">
                <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 
                  hover:border-green-600 hover:bg-green-100 hover:text-green-600 transition-all duration-300 shadow-sm">
                  <User className="w-5 h-5 text-green-600" />
                  <span className="text-sm md:text-base font-medium">Log In</span>
                </button>       
              </SignInButton>
            </SignedOut>

            {/* If logged IN → show profile photo + signout modal */}
            <SignedIn>
              <div className="hidden md:flex items-center gap-3">
                <span className="font-medium text-gray-700">
                  {user?.fullName || user?.firstName || "User"}
                </span>
                {/* ✅ only afterSignOutUrl is valid here */}
                <UserButton afterSignOutUrl="/" /> 
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3 font-medium animate-slideDown">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 px-4 rounded-full border transition-all duration-300 text-center
              ${pathname === link.href
                  ? "text-white bg-green-600 border-green-600 shadow-md"
                  : "text-gray-700 border-gray-200 hover:border-green-600 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Auth */}
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/shop">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gray-300 
                hover:border-green-600 hover:bg-green-50 hover:text-green-600 transition-all duration-300">
                <User className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Log In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col items-center gap-3">
              <span className="font-medium text-gray-700">
                {user?.fullName || user?.firstName || "User"}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  )
}
