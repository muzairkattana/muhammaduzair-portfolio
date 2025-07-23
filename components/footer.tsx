"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
  Download,
  Calendar,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const quickLinks = [
    { href: "#about", label: "About Me" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#services", label: "Services" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/uzair", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/uzair", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/uzair", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/uzair", label: "Instagram" },
  ]

  const handleNavClick = (href: string) => {
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

  if (!isMounted) {
    return (
      <footer className="relative bg-background/50 backdrop-blur-sm border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand Section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">MU</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Muhammad Uzair
                  </h3>
                  <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Crafting digital experiences with passion and precision. Specialized in modern web technologies and
                Amazon FBA solutions.
              </p>
              <Button
                onClick={downloadCV}
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-xs px-4 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Download className="h-3 w-3 mr-2" />
                Download CV
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-foreground">Get In Touch</h4>
              <div className="space-y-3">
                <a
                  href="mailto:uzair@example.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  uzair@example.com
                </a>
                <a
                  href="tel:+923001234567"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  +92 300 123 4567
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Lahore, Pakistan
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  PKT: {currentTime}
                </div>
              </div>
            </motion.div>

            {/* Social & Newsletter */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold text-foreground">Connect</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for projects
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© 2024 Muhammad Uzair. All rights reserved.</span>
              <div className="hidden sm:flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" fill="currentColor" /> in Pakistan
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button className="hover:text-primary transition-colors duration-300">Privacy Policy</button>
              <button className="hover:text-primary transition-colors duration-300">Terms of Service</button>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Last updated: Dec 2024
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
