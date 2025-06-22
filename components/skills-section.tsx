"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Globe, Server, FileCode } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import RotatingCube from "./rotating-cube"

interface Skill {
  name: string
  percentage: number
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  subtitle: string
  skills: Skill[]
}

export default function SkillsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
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

  const skillCategories: SkillCategory[] = [
    {
      title: "Full-Stack Development",
      icon: <Code className="h-5 w-5 text-primary" />,
      subtitle: "1+ years experience",
      skills: [
        { name: "Back-End Development", percentage: 80 },
        { name: "Front-End Development", percentage: 90 },
        { name: "WordPress Development", percentage: 85 },
        { name: "Microsoft Office Suite", percentage: 90 },
      ],
    },
    {
      title: "Back-End Development",
      icon: <Server className="h-5 w-5 text-primary" />,
      subtitle: "More than 1 year experience",
      skills: [
        { name: "C# Framework (ASP.NET)", percentage: 80 },
        { name: "SQL Server", percentage: 60 },
        { name: "Web APIs", percentage: 70 },
        { name: "ASP.NET MVC", percentage: 90 },
      ],
    },
    {
      title: "Front-End Development",
      icon: <Globe className="h-5 w-5 text-primary" />,
      subtitle: "More than 1 year experience",
      skills: [
        { name: "HTML5", percentage: 90 },
        { name: "CSS3", percentage: 70 },
        { name: "JavaScript", percentage: 50 },
        { name: "Bootstrap", percentage: 80 },
      ],
    },
    {
      title: "Other Skills",
      icon: <FileCode className="h-5 w-5 text-primary" />,
      subtitle: "More than 1 year experience",
      skills: [
        { name: "Microsoft Office", percentage: 95 },
        { name: "Bootstrap", percentage: 80 },
        { name: "Amazon FBA", percentage: 85 },
        { name: "Inventory Management", percentage: 75 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-12">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold mb-2">Skills</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              My technical expertise and professional capabilities
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <RotatingCube />
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="border rounded-lg overflow-hidden"
                defaultValue={index === 0 ? "item-1" : undefined}
              >
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <div className="text-left">
                        <h3 className="font-medium">{category.title}</h3>
                        <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-primary font-medium">{skill.percentage}%</span>
                          </div>
                          <Progress value={skill.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
