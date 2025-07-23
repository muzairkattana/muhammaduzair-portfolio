"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"

interface EnhancedProfileImageProps {
  src: string
  alt: string
  className?: string
}

export default function EnhancedProfileImage({ src, alt, className = "" }: EnhancedProfileImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.start({
      scale: 1.03,
      transition: { duration: 0.3 },
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    controls.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.5 },
    })
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          rotateX,
          rotateY,
        }}
        animate={controls}
      >
        {/* Main Image with 3D effect */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
          <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover object-center" priority />

          {/* Professional overlay effect */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50 mix-blend-overlay"
            style={{
              backgroundSize: "200% 200%",
              backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
              transition: "background-position 0.5s ease-out",
            }}
          />

          {/* Subtle shine effect */}
          {isHovered && (
            <div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-40"
              style={{
                transform: `rotate(${x.get() / 15}deg)`,
                backgroundSize: "200% 200%",
                backgroundPosition: `${50 + x.get() / 10}% ${50 + y.get() / 10}%`,
              }}
            />
          )}
        </div>

        {/* Subtle glow effect */}
        <div className="absolute -z-10 inset-0 rounded-full bg-primary/10 blur-xl transform scale-105 animate-pulse" />

        {/* Professional badges moved to border */}
        <motion.div
          className="absolute -bottom-2 -left-2 bg-background rounded-lg p-2 shadow-lg border-2 border-primary/20"
          animate={{ y: isHovered ? -3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-4 w-4 text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </motion.div>

        {/* Available badge moved to profile border */}
        <motion.div
          className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full border-2 border-white shadow-lg"
          animate={{ y: isHovered ? 3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Available
        </motion.div>

        <motion.div
          className="absolute -bottom-2 -right-2 bg-background rounded-lg p-2 shadow-lg border-2 border-primary/20"
          animate={{ y: isHovered ? 3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">Full Stack Developer</div>
        </motion.div>
      </motion.div>
    </div>
  )
}
