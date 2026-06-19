"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Globe, Menu, X, Command } from "lucide-react"

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Product", href: "#features" },
    { label: "Features", href: "#journey" },
    { label: "Network", href: "#network" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
  ]

  const scrollTo = (id: string) => {
    if (id.startsWith("#")) {
      const el = document.querySelector(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center transition-all duration-200 ${
          scrolled
            ? "bg-canvas/90 backdrop-blur-md border-b border-hairline"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1240px] mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 text-on-dark hover:opacity-80 transition-opacity"
          >
            <Globe className="w-5 h-5 text-accent-cyan" />
            <span className="text-sm font-semibold tracking-wide text-on-dark">SwasthYatra</span>
          </Link>

          {/* Center: Nav Links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 text-sm text-mute hover:text-on-dark transition-colors duration-100"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="hidden sm:block text-sm text-mute hover:text-on-dark transition-colors duration-100"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signin"
              className="btn-primary text-button-md"
            >
              Start Journey
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-on-dark p-1"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-canvas/60 backdrop-blur-sm z-[55] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-72 bg-canvas border-r border-hairline z-[60] md:hidden"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3 text-base text-mute hover:text-on-dark hover:bg-surface rounded-lg transition-all"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-hairline">
                  <Link
                    href="/auth/signin"
                    className="flex items-center gap-3 px-4 py-3 text-base text-mute hover:text-on-dark hover:bg-surface rounded-lg transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="mt-2 flex items-center justify-center btn-primary w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Start Journey
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
