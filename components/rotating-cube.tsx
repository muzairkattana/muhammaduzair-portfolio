"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Code, Database, Globe, Server, Briefcase, ShoppingCart } from "lucide-react"

interface CubeFace {
  icon: React.ReactNode
  title: string
  color: string
}

export default function RotatingCube() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentFace, setCurrentFace] = useState(0)
  const controls = useAnimation()

  const faces: CubeFace[] = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Front-End",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Back-End",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Databases",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Dev",
      color: "from-orange-500 to-amber-400",
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Amazon FBA",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Business",
      color: "from-teal-500 to-cyan-400",
    },
  ]

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentFace((prev) => (prev + 1) % faces.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isHovered, faces.length])

  useEffect(() => {
    controls.start({
      rotateY: currentFace * 60,
      transition: { duration: 1, ease: "easeInOut" },
    })
  }, [currentFace, controls])

  return (
    <div className="w-full h-64 flex items-center justify-center perspective">
      <div
        className="relative w-32 h-32 preserve-3d"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="w-full h-full preserve-3d" animate={controls} initial={{ rotateY: 0 }}>
          {faces.map((face, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-br ${face.color} text-white shadow-lg preserve-3d cursor-pointer`}
              style={{
                transform: `rotateY(${index * 60}deg) translateZ(80px)`,
                backfaceVisibility: "hidden",
              }}
              onClick={() => setCurrentFace(index)}
            >
              {face.icon}
              <span className="mt-2 font-medium">{face.title}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
