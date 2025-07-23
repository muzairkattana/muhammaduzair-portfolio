"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Phone, Mail, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#certificates", label: "Certificates" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv/Muhammad-Uzair-CV.pdf"
    link.download = "Muhammad-Uzair-CV.pdf"
    link.click()
  }

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20"></div>
              <span className="text-xl font-bold">Muhammad Uzair</span>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Add progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer relative"
            onClick={() => handleNavClick("#home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 shadow-lg">
              <Image
                src="/images/uzair-logo.jpg"
                alt="Muhammad Uzair"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
              {/* Add availability indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Muhammad Uzair
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">Full Stack Developer • Available</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            {/* Add after the navigation items */}
            <div className="hidden xl:flex items-center gap-2 ml-4 pl-4 border-l border-border/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("https://calendly.com/muhammaduzair", "_blank")}
                className="text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Book Call
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick("#portfolio")}
                className="text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Eye className="h-3 w-3 mr-1" />
                Portfolio
              </Button>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Contact Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("tel:+923001234567", "_self")}
                className="text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("mailto:uzair@example.com", "_self")}
                className="text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
            </div>

            {/* Download CV Button */}
            <Button
              onClick={downloadCV}
              size="sm"
              className="hidden sm:flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-3 py-1.5 text-xs font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="h-3 w-3 mr-1" />
              CV
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 sm:h-10 sm:w-10 hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-lg mx-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border/30">
                  <Button
                    onClick={downloadCV}
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-medium transition-all duration-300"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("tel:+923001234567", "_self")}
                      className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("mailto:uzair@example.com", "_self")}
                      className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
