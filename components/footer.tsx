"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin, Clock, ExternalLink, Heart, Code, Coffee, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pakistanTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now)
      setCurrentTime(pakistanTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/muhammaduzaireng",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/muhammaduzaireng",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      href: "mailto:muhammaduzaireng@gmail.com",
      icon: Mail,
      color: "hover:text-red-500",
    },
  ]

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-background via-muted/20 to-background backdrop-blur-xl border-t border-border/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Zap className="h-2 w-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Muhammad Uzair
                </h3>
                <p className="text-xs text-muted-foreground">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Crafting digital experiences with modern technologies. Specialized in React, Next.js, and AI integration.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for projects</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-blue-500" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-muted-foreground rounded-full group-hover:bg-blue-600 transition-colors"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-500" />
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm group hover:text-primary transition-colors">
                <Mail className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                <a
                  href="mailto:muhammaduzaireng@gmail.com"
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                >
                  muhammaduzaireng@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm group hover:text-primary transition-colors">
                <Phone className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                <a
                  href="tel:+923001234567"
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                >
                  +92 300 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm group hover:text-primary transition-colors">
                <MapPin className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                <span className="text-muted-foreground group-hover:text-primary">Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">PKT:</span>
                  <Badge variant="outline" className="text-xs font-mono">
                    {currentTime}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="sm"
                    asChild
                    className={`transition-all duration-200 hover:scale-105 border-border/50 hover:border-primary/30 hover:bg-primary/5 ${social.color}`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Icon className="h-3 w-3" />
                      <span className="text-xs">{social.name}</span>
                    </a>
                  </Button>
                )
              })}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg border border-primary/20 dark:border-primary/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Coffee className="h-3 w-3 text-amber-500" />
                <span>Let's grab a coffee and discuss your next project!</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Muhammad Uzair. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span className="text-border">•</span>
              <a href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span className="text-border">•</span>
              <a href="#cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
