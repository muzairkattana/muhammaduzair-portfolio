"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  size: number
  vx: number
  vy: number
  connections: number[]
}

interface Connection {
  from: number
  to: number
  strength: number
}

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height

        // Reinitialize nodes when canvas size changes
        initializeNodes()
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        }
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeNodes()
      startAnimation()
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions])

  const initializeNodes = () => {
    const { width, height } = dimensions
    const nodeCount = Math.max(10, Math.floor((width * height) / 25000))

    // Create nodes
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }

    // Create connections
    const connections: Connection[] = []
    const maxDistance = Math.min(width, height) * 0.2

    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i]

      for (let j = i + 1; j < nodes.length; j++) {
        const nodeB = nodes[j]
        const dx = nodeA.x - nodeB.x
        const dy = nodeA.y - nodeB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const strength = 1 - distance / maxDistance
          connections.push({
            from: i,
            to: j,
            strength,
          })

          nodeA.connections.push(j)
          nodeB.connections.push(i)
        }
      }
    }

    nodesRef.current = nodes
    connectionsRef.current = connections
  }

  const startAnimation = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      const { width, height } = dimensions
      ctx.clearRect(0, 0, width, height)

      // Get primary color from CSS variables
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim()

      // Update nodes
      for (const node of nodesRef.current) {
        // Apply mouse influence
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x
          const dy = mouseRef.current.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 500
            node.vx += dx * force
            node.vy += dy * force
          }
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Apply friction
        node.vx *= 0.99
        node.vy *= 0.99

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${primaryColor}, 0.5)`
        ctx.fill()
      }

      // Draw connections
      for (const conn of connectionsRef.current) {
        const nodeA = nodesRef.current[conn.from]
        const nodeB = nodesRef.current[conn.to]

        const dx = nodeA.x - nodeB.x
        const dy = nodeA.y - nodeB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw if still in range
        const maxDistance = Math.min(width, height) * 0.2
        if (distance < maxDistance) {
          ctx.beginPath()
          ctx.moveTo(nodeA.x, nodeA.y)
          ctx.lineTo(nodeB.x, nodeB.y)
          ctx.strokeStyle = `hsla(${primaryColor}, ${conn.strength * 0.2})`
          ctx.lineWidth = conn.strength
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
  }

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none" />
}
