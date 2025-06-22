"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number // 0-100
}

interface SkillRadarProps {
  skills: Skill[]
  size?: number
  className?: string
}

export default function SkillRadar({ skills, size = 350, className = "" }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [pulseAnimation, setPulseAnimation] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Pulse animation for professional effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 0.02) % (Math.PI * 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Enhanced drawing with ultra-professional styling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with higher resolution
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = size * pixelRatio
    canvas.height = size * pixelRatio
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(pixelRatio, pixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35

    // Ultra-professional gradient background with pulse
    const pulseIntensity = 0.5 + Math.sin(pulseAnimation) * 0.1
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.2)
    bgGradient.addColorStop(0, `rgba(59, 130, 246, ${0.08 * pulseIntensity})`)
    bgGradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.04 * pulseIntensity})`)
    bgGradient.addColorStop(1, "rgba(59, 130, 246, 0.01)")

    ctx.fillStyle = bgGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
    ctx.fill()

    // Professional concentric circles with enhanced styling
    const levels = 5
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i
      const opacity = 0.1 + i * 0.05 + Math.sin(pulseAnimation + i) * 0.02

      // Outer glow
      ctx.shadowColor = `rgba(59, 130, 246, ${opacity * 2})`
      ctx.shadowBlur = 3
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
      ctx.lineWidth = i === levels ? 3 : 1.5

      ctx.beginPath()
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Inner highlight
      ctx.shadowBlur = 0
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.shadowBlur = 0
    }

    // Enhanced skill axes with dynamic effects
    const angleStep = (Math.PI * 2) / skills.length
    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      const isHovered = hoveredSkill === i
      const glowIntensity = isHovered ? 1 : 0.4 + Math.sin(pulseAnimation + i) * 0.2

      ctx.shadowColor = `rgba(59, 130, 246, ${glowIntensity * 0.6})`
      ctx.shadowBlur = isHovered ? 6 : 2
      ctx.strokeStyle = `rgba(59, 130, 246, ${glowIntensity * 0.8})`
      ctx.lineWidth = isHovered ? 3 : 1.5

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()

      ctx.shadowBlur = 0
    })

    // Calculate animated skill points
    const points = skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const distance = (skill.level / 100) * radius * animationProgress
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        name: skill.name,
        level: skill.level,
        angle: angle,
      }
    })

    // Ultra-professional skill area with multiple gradients
    if (animationProgress > 0) {
      // Main area gradient
      const areaGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.25)")
      areaGradient.addColorStop(0.7, "rgba(59, 130, 246, 0.15)")
      areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)")

      ctx.beginPath()
      points.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.closePath()

      ctx.fillStyle = areaGradient
      ctx.fill()

      // Enhanced border with multiple layers
      ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
      ctx.shadowBlur = 8
      ctx.strokeStyle = "rgba(59, 130, 246, 0.9)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Inner highlight border
      ctx.shadowBlur = 0
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.shadowBlur = 0
    }

    // Ultra-enhanced skill points with professional styling
    points.forEach((point, i) => {
      const isHovered = hoveredSkill === i
      const baseSize = 5
      const hoverSize = 8
      const pointSize = isHovered ? hoverSize : baseSize
      const pulseSize = pointSize + Math.sin(pulseAnimation + i) * 1

      // Outer glow
      ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
      ctx.shadowBlur = isHovered ? 12 : 6

      // Main point
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = isHovered ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.9)"
      ctx.fill()

      // Inner highlight
      ctx.shadowBlur = 0
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize - 2, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.fill()

      // Core point
      ctx.beginPath()
      ctx.arc(point.x, point.y, pulseSize - 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 1)"
      ctx.fill()

      ctx.shadowBlur = 0
    })

    // Professional skill labels with enhanced styling
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const labelDistance = radius + 30
      const labelX = centerX + Math.cos(angle) * labelDistance
      const labelY = centerY + Math.sin(angle) * labelDistance
      const isHovered = hoveredSkill === i

      // Enhanced background for labels
      const textWidth = ctx.measureText(skill.name).width
      const bg = ctx.createLinearGradient(
        labelX - textWidth / 2 - 8,
        labelY - 12,
        labelX + textWidth / 2 + 8,
        labelY + 12,
      )
      bg.addColorStop(0, "rgba(59, 130, 246, 0.1)")
      bg.addColorStop(0.5, "rgba(59, 130, 246, 0.15)")
      bg.addColorStop(1, "rgba(59, 130, 246, 0.1)")

      ctx.fillStyle = bg
      ctx.fillRect(labelX - textWidth / 2 - 8, labelY - 12, textWidth + 16, 24)

      // Label border
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 1
      ctx.strokeRect(labelX - textWidth / 2 - 8, labelY - 12, textWidth + 16, 24)

      // Label text with glow
      ctx.shadowColor = isHovered ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.4)"
      ctx.shadowBlur = isHovered ? 4 : 2
      ctx.fillStyle = isHovered ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.9)"
      ctx.fillText(skill.name, labelX, labelY - 2)

      // Skill level text
      ctx.font = "11px system-ui, -apple-system, sans-serif"
      ctx.fillStyle = "rgba(59, 130, 246, 0.7)"
      ctx.shadowBlur = 1
      ctx.fillText(`${skill.level}%`, labelX, labelY + 10)

      ctx.shadowBlur = 0
      ctx.font = "bold 13px system-ui, -apple-system, sans-serif"
    })
  }, [skills, size, animationProgress, hoveredSkill, pulseAnimation])

  // Enhanced mouse interaction
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const centerX = size / 2
      const centerY = size / 2
      const radius = size * 0.35

      let closestSkill = null
      let minDistance = Number.POSITIVE_INFINITY

      skills.forEach((skill, i) => {
        const angle = (i * (Math.PI * 2)) / skills.length - Math.PI / 2
        const distance = (skill.level / 100) * radius * animationProgress
        const pointX = centerX + Math.cos(angle) * distance
        const pointY = centerY + Math.sin(angle) * distance

        const dist = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2)
        if (dist < 20 && dist < minDistance) {
          minDistance = dist
          closestSkill = i
        }
      })

      setHoveredSkill(closestSkill)
    },
    [skills, size, animationProgress],
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  return (
    <motion.div
      className={`skill-radar-container relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer transition-all duration-300 hover:scale-105"
        style={{
          filter: "drop-shadow(0 10px 30px rgba(59, 130, 246, 0.2))",
        }}
      />

      {/* Professional tooltip */}
      {hoveredSkill !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg shadow-xl border border-blue-500/30"
        >
          <div className="text-sm font-semibold">{skills[hoveredSkill].name}</div>
          <div className="text-xs opacity-90">Proficiency: {skills[hoveredSkill].level}%</div>
        </motion.div>
      )}
    </motion.div>
  )
}
