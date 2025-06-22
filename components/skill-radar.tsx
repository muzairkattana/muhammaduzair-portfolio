"use client"

import { useEffect, useRef } from "react"
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with higher resolution for retina displays
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = size * pixelRatio
    canvas.height = size * pixelRatio
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(pixelRatio, pixelRatio)

    // Get primary color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Draw background circles
    const levels = 5
    ctx.strokeStyle = "rgba(200, 200, 200, 0.2)"

    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Calculate points for each skill
    const angleStep = (Math.PI * 2) / skills.length
    const points = skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2 // Start from top
      const distance = (skill.level / 100) * radius
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        name: skill.name,
        level: skill.level,
      }
    })

    // Draw skill axes
    ctx.strokeStyle = "rgba(200, 200, 200, 0.5)"
    skills.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()
    })

    // Draw skill labels
    ctx.fillStyle = "#888"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2
      const labelX = centerX + Math.cos(angle) * (radius + 20)
      const labelY = centerY + Math.sin(angle) * (radius + 20)
      ctx.fillText(skill.name, labelX, labelY)
    })

    // Draw skill area
    ctx.beginPath()
    points.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.closePath()
    ctx.fillStyle = `hsla(${primaryColor}, 0.2)`
    ctx.fill()
    ctx.strokeStyle = `hsla(${primaryColor}, 0.8)`
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw skill points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${primaryColor}, 1)`
      ctx.fill()
    })
  }, [skills, size])

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <canvas ref={canvasRef} width={size} height={size} className="max-w-full" />
    </motion.div>
  )
}
