"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Download,
  ChevronDown,
  Sparkles,
  Code,
  Palette,
  Globe,
  Award,
  TrendingUp,
  Users,
  ArrowRight,
  MousePointer2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import TypingAnimation from "./typing-animation"
import EnhancedProfileImage from "./enhanced-profile-image"
import ParticleBackground from "./particle-background"
import { useSound } from "./sound-provider"

const roles = ["Full Stack Developer", "AI/ML Engineer", "UI/UX Designer", "Amazon FBA Expert", "Digital Entrepreneur"]

const achievements = [
  { icon: Code, label: "50+ Projects", value: "50+", color: "text-blue-500" },
  { icon: Users, label: "Happy Clients", value: "30+", color: "text-green-500" },
  { icon: Award, label: "Certifications", value: "12+", color: "text-purple-500" },
  { icon: TrendingUp, label: "Years Experience", value: "5+", color: "text-orange-500" },
]

const skills = [
  { name: "React/Next.js", level: 95, color: "bg-blue-500" },
  { name: "AI/ML", level: 88, color: "bg-purple-500" },
  { name: "UI/UX Design", level: 92, color: "bg-pink-500" },
  { name: "E-commerce", level: 90, color: "bg-green-500" },
]

export default function EnhancedHeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollHint, setShowScrollHint] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { playSound } = useSound()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Auto-rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Hide scroll hint after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
      playSound("click")
    }
  }

  const handleDownloadCV = () => {
    playSound("success")
    // Create a temporary link to download CV
    const link = document.createElement("a")
    link.href = "/cv/Muhammad-Uzair-CV.pdf"
    link.download = "Muhammad-Uzair-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background"
      id="home"
    >
      {/* Animated Background */}
      <ParticleBackground />

      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          style={{
            left: "10%",
            top: "20%",
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          style={{
            right: "15%",
            bottom: "25%",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          style={{
            left: "60%",
            top: "10%",
          }}
        />
      </div>

      <motion.div className="container mx-auto px-4 relative z-10" style={{ y, opacity, scale }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for new projects
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Muhammad Uzair
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground"
              >
                <TypingAnimation
                  texts={roles}
                  className="text-primary"
                  speed={100}
                  deleteSpeed={50}
                  delayBetweenTexts={2000}
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              Passionate about creating innovative digital solutions that bridge technology and business success.
              Specializing in AI-powered applications, modern web development, and e-commerce excellence.
            </motion.p>

            {/* Skills Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Core Expertise</h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={handleDownloadCV}
                className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                Download CV
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  playSound("click")
                }}
                className="group border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <MousePointer2 className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Let's Connect
              </Button>
            </motion.div>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 group"
                  >
                    <Icon
                      className={`h-6 w-6 mx-auto mb-2 ${achievement.color} group-hover:scale-110 transition-transform`}
                    />
                    <div className="text-2xl font-bold text-foreground mb-1">{achievement.value}</div>
                    <div className="text-xs text-muted-foreground">{achievement.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Profile Image */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative z-10">
                <EnhancedProfileImage
                  src="/images/uzair-profile.jpg"
                  alt="Muhammad Uzair"
                  className="w-80 h-80 lg:w-96 lg:h-96"
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 z-20"
              >
                <Card className="p-3 bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Expert</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 z-20"
              >
                <Card className="p-3 bg-card/90 backdrop-blur-sm border-green-500/20 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Full Stack</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/2 -right-8 z-20"
              >
                <Card className="p-3 bg-card/90 backdrop-blur-sm border-purple-500/20 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">UI/UX</span>
                  </div>
                </Card>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-150 -z-10" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                playSound("click")
              }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
