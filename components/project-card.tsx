"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  demoUrl: string
  githubUrl?: string
  technologies: string[]
  details?: string
}

export default function ProjectCard({
  title,
  description,
  image,
  demoUrl,
  githubUrl,
  technologies,
  details,
}: ProjectCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotation({ x: rotateX, y: rotateY })
  }

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-card border border-border rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Technologies */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>

              {githubUrl && (
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="gap-1">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}

              {details && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                      <DialogDescription>Project details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>{details}</p>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        {/* Glare effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${rotation.y * -10 + 50}% ${rotation.x * -10 + 50}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
              transform: "translateZ(20px)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
