"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import ProfessionalHeader from "@/components/professional-header"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import DynamicBackground from "@/components/dynamic-background"
import CertificatesSection from "@/components/certificates-section"
import TestimonialsSection from "@/components/testimonials-section"
import PerformanceOptimizations from "@/components/performance-optimizations"
import AIAssistant from "@/components/ai-assistant"
import PortfolioSection from "@/components/portfolio-section"
import EnhancedTechCarousel from "@/components/enhanced-tech-carousel"
import ScrollToTop from "@/components/scroll-to-top"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Set dark mode as default
    document.body.classList.add("dark-theme")
    localStorage.setItem("portfolio-dark-mode", "true")

    // Apply any saved theme preferences from localStorage
    const savedDarkMode = localStorage.getItem("portfolio-dark-mode")
    if (savedDarkMode === "false") {
      document.body.classList.remove("dark-theme")
    } else {
      // If no preference is saved, set dark mode as default
      localStorage.setItem("portfolio-dark-mode", "true")
    }

    // Apply other saved settings
    const savedThemeColor = localStorage.getItem("portfolio-theme-color")
    if (savedThemeColor) {
      document.documentElement.style.setProperty("--hue-color", savedThemeColor)
    }

    const savedFont = localStorage.getItem("portfolio-font")
    if (savedFont) {
      document.documentElement.style.setProperty("--body-font", savedFont)
    }

    const savedAnimationSpeed = localStorage.getItem("portfolio-animation-speed")
    if (savedAnimationSpeed) {
      document.documentElement.style.setProperty("--transition-speed", `${savedAnimationSpeed}s`)
    }

    const savedFontSize = localStorage.getItem("portfolio-font-size")
    if (savedFontSize) {
      document.documentElement.style.setProperty("--base-font-size", `${savedFontSize}px`)
    }

    const savedLayoutStyle = localStorage.getItem("portfolio-layout-style")
    if (savedLayoutStyle) {
      document.body.dataset.layout = savedLayoutStyle
    }

    const savedAnimationLevel = localStorage.getItem("portfolio-animation-level")
    if (savedAnimationLevel) {
      document.body.dataset.animations = savedAnimationLevel
    }

    const savedContrastMode = localStorage.getItem("portfolio-contrast-mode")
    if (savedContrastMode === "true") {
      document.body.classList.add("high-contrast")
    }

    const savedReducedMotion = localStorage.getItem("portfolio-reduced-motion")
    if (savedReducedMotion === "true") {
      document.body.classList.add("reduced-motion")
    }

    const savedBackgroundEffects = localStorage.getItem("portfolio-background-effects")
    if (savedBackgroundEffects === "false") {
      document.body.classList.add("no-background-effects")
    }

    // Apply performance optimizations for mobile
    if (isMobile) {
      // Reduce animations on mobile for better performance
      document.body.dataset.animations = "subtle"
      // Disable heavy background effects on mobile
      document.body.classList.add("no-background-effects")
    }

    // Preload critical assets
    const preloadAssets = () => {
      // Preload hero image
      const heroImage = new Image()
      heroImage.src = "/images/profile.png"

      // Preload certificate images
      const certificateImages = [
        "/certificates/business-acumen.png",
        "/certificates/supercomputing-ai.png",
        "/certificates/storytelling-investment.png",
        "/certificates/agile-business-process.png",
        "/certificates/business-plan.png",
        "/certificates/finance-non-financial.png",
        "/certificates/influencing-motivating.png",
        "/certificates/problem-solving.png",
        "/certificates/data-science-analytics.png",
        "/certificates/ai-for-beginners.png",
        "/certificates/resume-writing.png",
        "/certificates/cybersecurity-awareness.png",
      ]

      certificateImages.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    // Preload assets after initial render
    if (typeof window !== "undefined") {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(preloadAssets)
      } else {
        setTimeout(preloadAssets, 200)
      }
    }
  }, [isMobile])

  return (
    <main>
      <Preloader />
      <PerformanceOptimizations />
      <DynamicBackground />
      <Header />
      <ProfessionalHeader />
      <AboutSection />
      <SkillsSection />
      <EnhancedTechCarousel />
      <ServicesSection />
      <PortfolioSection />
      <ProjectsSection />
      <CertificatesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
      <AIAssistant />
    </main>
  )
}
