"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, TrendingUp, Star, Users, Award } from "lucide-react"
import Image from "next/image"
import { useState, useCallback, useEffect } from "react"

export default function ProfessionalHeader() {
  // Add fullscreen functionality
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.log("Error attempting to enable fullscreen:", err)
        })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Auto-enter fullscreen on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!document.fullscreenElement) {
        toggleFullscreen()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [toggleFullscreen])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile: Profile Image First, Desktop: Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 mobile-profile-top"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg mx-auto mobile-profile-large">
              {/* Enhanced decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500"></div>

              {/* Main Image Container - Larger on mobile */}
              <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-3xl p-6 lg:p-8 backdrop-blur-sm border border-primary/20">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-3 lg:p-4">
                  <Image
                    src="/images/uzair-chatbot.jpg"
                    alt="Muhammad Uzair - Professional Developer"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />

                  {/* Floating Badge */}
                  <div className="absolute top-3 right-3 lg:top-4 lg:right-4 bg-green-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Available
                  </div>
                </div>

                {/* Professional Info */}
                <div className="mt-4 lg:mt-6 text-center">
                  <h3 className="text-lg lg:text-xl font-bold">Muhammad Uzair</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">Full-Stack Developer & AI Specialist</p>
                  <div className="flex justify-center gap-2 mt-2 lg:mt-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      AI/ML
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Business
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Text Content Below, Desktop: Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left mobile-text-center"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge
                variant="outline"
                className="text-primary border-primary/30 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium"
              >
                <Star className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                Available for Hire
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 lg:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Hire Me
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-foreground/90">
                Grow Your Business
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Transform your vision into reality with cutting-edge web development, AI solutions, and business strategy.
              Let's build something extraordinary together.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Hire Me Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <TrendingUp className="h-5 w-5 mr-2" />
                View My Work
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 pt-6 border-t border-border/50"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Trusted by 100+ clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Certified Professional</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
