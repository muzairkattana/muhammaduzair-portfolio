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

export default function SkillRadar({ skills, size = 300, className = "" }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Add more professional styling and animations
  const [animationProgress, setAnimationProgress] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced drawing with professional styling
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

    // Professional gradient background
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    bgGradient.addColorStop(0, "rgba(59, 130, 246, 0.05)")
    bgGradient.addColorStop(1, "rgba(59, 130, 246, 0.02)")

    ctx.fillStyle = bgGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    // Enhanced grid lines with glow effect
    const levels = 5
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i

      // Glow effect
      ctx.shadowColor = "rgba(59, 130, 246, 0.3)"
      ctx.shadowBlur = 2
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 + i * 0.05})`
      ctx.lineWidth = i === levels ? 2 : 1

      ctx.beginPath()
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.shadowBlur = 0
    }

    // Animated skill axes with glow
    const angleStep = (Math.PI * 2) / skills.length
    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2

      ctx.shadowColor = "rgba(59, 130, 246, 0.4)"
      ctx.shadowBlur = 1
      ctx.strokeStyle = hoveredSkill === i ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = hoveredSkill === i ? 2 : 1

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()

      ctx.shadowBlur = 0
    })

    // Animated skill points with progress
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

    // Professional skill area with gradient
    if (animationProgress > 0) {
      const areaGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)")
      areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.1)")

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

      // Enhanced border with glow
      ctx.shadowColor = "rgba(59, 130, 246, 0.6)"
      ctx.shadowBlur = 4
      ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Enhanced skill points with animation
    points.forEach((point, i) => {
      const isHovered = hoveredSkill === i
      const pointSize = isHovered ? 6 : 4

      // Glow effect for points
      ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
      ctx.shadowBlur = isHovered ? 8 : 4

      ctx.beginPath()
      ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2)
      ctx.fillStyle = isHovered ? "rgba(59, 130, 246, 1)" : "rgba(59, 130, 246, 0.9)"
      ctx.fill()

      // Inner highlight
      ctx.beginPath()
      ctx.arc(point.x, point.y, pointSize - 1, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.fill()

      ctx.shadowBlur = 0
    })

    // Enhanced skill labels with better positioning
    ctx.fillStyle = "hsl(var(--foreground))"
    ctx.font = "bold 12px system-ui"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const labelDistance = radius + 25
      const labelX = centerX + Math.cos(angle) * labelDistance
      const labelY = centerY + Math.sin(angle) * labelDistance

      // Background for labels
      const textWidth = ctx.measureText(skill.name).width
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
      ctx.fillRect(labelX - textWidth / 2 - 4, labelY - 8, textWidth + 8, 16)

      ctx.fillStyle = hoveredSkill === i ? "rgba(59, 130, 246, 1)" : "hsl(var(--foreground))"
      ctx.fillText(skill.name, labelX, labelY)

      // Skill percentage
      ctx.font = "10px system-ui"
      ctx.fillStyle = "hsl(var(--muted-foreground))"
      ctx.fillText(`${skill.level}%`, labelX, labelY + 12)
      ctx.font = "bold 12px system-ui"
    })
  }, [skills, size, animationProgress, hoveredSkill])

  // Add mouse interaction
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

      // Check if mouse is near any skill point
      const angleStep = (Math.PI * 2) / skills.length
      let nearestSkill = null
      let minDistance = Number.POSITIVE_INFINITY

      skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2
        const distance = (skill.level / 100) * radius
        const pointX = centerX + Math.cos(angle) * distance
        const pointY = centerY + Math.sin(angle) * distance

        const dist = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2)
        if (dist < 20 && dist < minDistance) {
          minDistance = dist
          nearestSkill = i
        }
      })

      setHoveredSkill(nearestSkill)
    },
    [skills, size],
  )

  // Add mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="max-w-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </motion.div>
  )
}
