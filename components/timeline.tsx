"use client"

import { motion } from "framer-motion"
import { Calendar, GraduationCap, Briefcase } from "lucide-react"

interface TimelineItem {
  id: number
  title: string
  location: string
  description: string
  date: string
  icon: "education" | "work"
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2"></div>

      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
        >
          {/* Content */}
          <div className="md:w-1/2 bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground text-sm mb-2">{item.location}</p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{item.date}</span>
            </div>
            <p>{item.description}</p>
          </div>

          {/* Icon */}
          <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center transform md:-translate-x-1/2 z-10">
            {item.icon === "education" ? (
              <GraduationCap className="h-4 w-4 text-white" />
            ) : (
              <Briefcase className="h-4 w-4 text-white" />
            )}
          </div>

          {/* Empty div for layout on desktop */}
          <div className="hidden md:block md:w-1/2"></div>
        </motion.div>
      ))}
    </div>
  )
}
