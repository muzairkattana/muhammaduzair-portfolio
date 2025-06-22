"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Github, ArrowDown, MessageSquare, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedProfileImage from "./enhanced-profile-image"

export default function HeroSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="home" className="relative pt-24 pb-16 min-h-screen flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-2">
                <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1">
                  Full Stack Developer
                </Badge>
                <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1">
                  Amazon FBA Specialist
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I'm{" "}
                <span
                  className="text-primary transition-all duration-300 hover:scale-110 hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:via-purple-500 hover:to-pink-500 hover:bg-clip-text inline-block cursor-pointer transform-gpu"
                  style={{ transformOrigin: "center" }}
                >
                  Muhammad Uzair
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mt-2 mb-4">
                Transforming ideas into exceptional digital experiences
              </p>

              <p className="text-muted-foreground max-w-xl mx-auto lg:mx-0">
                As a professional Full Stack Developer with expertise in modern web technologies and e-commerce
                solutions, I deliver high-quality, scalable applications that drive business growth and enhance user
                experience.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-6">
                <Button asChild size="lg" className="gap-2 rounded-full">
                  <Link href="#contact">
                    Contact Me <MessageSquare className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 rounded-full">
                  <a href="/cv/Muhammad-Uzair-CV.pdf" download="Muhammad-Uzair-CV.pdf" target="_blank" rel="noreferrer">
                    Download CV <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex gap-4 justify-center lg:justify-start mt-8">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:text-primary"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-2xl transform scale-150"></div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border-2 border-primary/20 animate-pulse animation-delay-2000"></div>
                <div className="absolute inset-8 rounded-full border-2 border-primary/20 animate-pulse animation-delay-4000"></div>

                {/* Enhanced Profile image */}
                <EnhancedProfileImage src="/images/profile.png" alt="Muhammad Uzair" className="w-full h-full" />
              </div>
            </div>
          </motion.div>

          {/* Scroll Down */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors col-span-2 justify-center"
          >
            <Link href="#about" className="flex items-center gap-2 text-sm font-medium absolute bottom-10">
              <span>Scroll Down</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
