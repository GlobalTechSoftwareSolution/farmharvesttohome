"use client"

import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, useUser, useClerk } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function HeroSection() {
  const { isSignedIn, user } = useUser()
  const { openSignIn } = useClerk()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false) // ✅ only one state

  // custom handler for Shop Now
  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      openSignIn({ afterSignInUrl: "/shop" }) // opens Clerk modal
    } else {
      router.push("/shop")
    }
    setIsOpen(false) // close mobile menu after click
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/farm.jpg')" }}
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-snug sm:leading-tight">
          Welcome to <span className="text-green-400">Farm Harvest To Home </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
          Fresh, organic, and locally grown with traditional methods, farm produced <br />  delivering straight to your doorstep. <br />
          <br />  NO CHEMICAL, NO POLISH, JUST REAL FOOD.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* ✅ If logged IN → go straight to /shop */}
          <SignedIn>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition text-center"
            >
              Shop Now
            </Link>
          </SignedIn>

          {/* ✅ If logged OUT → login modal + open navbar after login */}
          <SignedOut>
            <SignInButton mode="modal" signUpForceRedirectUrl="/shop">
              <button
                onClick={() => {
                  localStorage.setItem("openNavbarAfterLogin", "true")
                }}
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition text-center"
              >
                Shop Now
              </button>
            </SignInButton>
          </SignedOut>

          {/* Extra CTA */}
          <Link
            href="/about"
            className="w-full sm:w-auto px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-green-700 transition text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
