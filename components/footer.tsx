"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Package,
  Moon,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const [isDarkMode, setIsDarkMode] = useState(true)
  const [weather, setWeather] = useState({
    temperature: 25,
    condition: "sunny" as "sunny" | "cloudy" | "rainy",
    location: "Your Location",
  })

  useEffect(() => {
    // Check current theme
    const isDark = document.body.classList.contains("dark-theme")
    setIsDarkMode(isDark)

    // Simulate weather data
    const hour = new Date().getHours()
    const temperature = Math.floor(Math.random() * 14) + 18
    const condition = hour < 6 || hour > 18 ? "cloudy" : "sunny"

    setWeather({
      temperature,
      condition,
      location: "Takht-Bhai, Pakistan",
    })
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }

    localStorage.setItem("portfolio-dark-mode", newDarkMode.toString())
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-400" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-400" />
      default:
        return <Cloud className="h-4 w-4" />
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="#" className="flex items-center gap-2 text-xl font-bold">
              <Package className="h-6 w-6" />
              <span>Muhammad Uzair</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-xs">
              Full-stack developer and Amazon FBA specialist with expertise in creating modern web applications and
              e-commerce solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connect With Me</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1BaofcJxgo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-uzair-1b7ba8275"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/muzairkattana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>

              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                {getWeatherIcon(weather.condition)}
                <span>{weather.temperature}°C</span>
                <Thermometer className="h-4 w-4" />
                <span>{weather.location}</span>
              </div>
            </div>

            <div className="text-sm text-primary-foreground/70">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left text-primary-foreground/70">
              <p>© {currentYear} Muhammad Uzair. All rights reserved.</p>
              <p className="text-sm mt-1">Designed and developed with passion</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
