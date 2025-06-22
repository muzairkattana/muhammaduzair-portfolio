import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import PortfolioSection from "@/components/portfolio-section"
import CertificatesSection from "@/components/certificates-section"
import TestimonialsSection from "@/components/testimonials-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import ProfessionalHeader from "@/components/professional-header"
import AIAssistant from "@/components/ai-assistant"
import Preloader from "@/components/preloader"
import ScrollToTop from "@/components/scroll-to-top"
import PerformanceOptimizations from "@/components/performance-optimizations"
import SoundControl from "@/components/sound-control"
import FullscreenLauncher from "@/components/fullscreen-launcher"

export default function Home() {
  return (
    <>
      <FullscreenLauncher />
      <Preloader />
      <PerformanceOptimizations />
      <SoundControl />

      <div className="min-h-screen bg-background">
        <ProfessionalHeader />

        <main className="relative">
          <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <PortfolioSection />
            <CertificatesSection />
            <TestimonialsSection />
            <ServicesSection />
            <ContactSection />
          </Suspense>
        </main>

        <Footer />
        <AIAssistant />
        <ScrollToTop />
      </div>
    </>
  )
}
