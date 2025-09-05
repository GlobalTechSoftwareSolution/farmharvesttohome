"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X, User, LogOut } from "lucide-react"
import { supabase } from "@/app/lib/supabaseClient"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      listener.subscription.unsubscribe()
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Shop Now", href: "/shop", authRequired: true },
  ]

  const handleNav = (href: string, authRequired?: boolean) => {
    if (authRequired && !user) {
      router.push("/login")
    } else {
      router.push(href)
    }
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    setIsOpen(false)
  }

  const renderAvatar = () => {
    if (user?.user_metadata?.avatar_url) {
      return (
        <Image
          src={user.user_metadata.avatar_url}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )
    }
    return (
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || <User className="w-4 h-4" />}
      </div>
    )
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-green-50 shadow-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-lg font-bold text-gray-800 hover:opacity-90 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-[100px] h-[100px] relative flex-shrink-0">
              <Image 
                src="/images/farmer.png"
                alt="Farm Harvest To Home Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="block sm:hidden truncate max-w-[200px]">Farm Harvest To Home</span>
            <span className="hidden sm:block md:text-2xl">Farm Harvest To Home</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-8 pl-[5rem]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.authRequired)}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium
                  ${pathname === link.href
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 border hover:border-green-600 hover:bg-green-200 hover:text-green-600 "}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ">
            {!user ? (
              <button
                onClick={() => router.push("/login")}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                Log In
              </button>
            ) : (
              <div className="relative hidden md:flex items-center">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 hover:bg-green-100 transition-colors"
                >
                  <span className="font-medium text-gray-700 truncate max-w-[120px]">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  {renderAvatar()}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-36 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-green-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-2 border-t">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href, link.authRequired)}
              className={`flex items-center w-full py-3 px-4 rounded-full transition-all duration-300 font-medium
                ${pathname === link.href
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-green-100 hover:text-green-600"}`}
            >
              {link.name}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-100">
            {!user ? (
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/login")
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" /> Log In
              </button>
            ) : (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-12 h-12">
                    {user?.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt="User Avatar"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium">
                        {user.user_metadata?.full_name?.[0] || user.email?.[0] || <User className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-3 px-4 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
