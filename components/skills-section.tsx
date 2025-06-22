"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import SkillRadar from "@/components/skill-radar"
import { Code, Database, Palette, Globe, Smartphone, Cloud, Brain, TrendingUp } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "JavaScript", level: 94 },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Development",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 80 },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "UI/UX Design",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "Figma", level: 87 },
      { name: "Adobe XD", level: 83 },
      { name: "Responsive Design", level: 92 },
      { name: "User Research", level: 78 },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "E-commerce & Business",
    icon: <TrendingUp className="h-5 w-5" />,
    skills: [
      { name: "Amazon FBA", level: 93 },
      { name: "Shopify", level: 88 },
      { name: "Digital Marketing", level: 85 },
      { name: "SEO", level: 82 },
    ],
    color: "from-orange-500 to-red-500",
  },
]

const radarSkills = [
  { name: "React", level: 95 },
  { name: "Node.js", level: 88 },
  { name: "TypeScript", level: 90 },
  { name: "MongoDB", level: 82 },
  { name: "AWS", level: 75 },
  { name: "UI/UX", level: 87 },
  { name: "Amazon FBA", level: 93 },
  { name: "SEO", level: 82 },
]

const technologies = [
  { name: "React", icon: <Globe className="h-4 w-4" />, category: "Frontend" },
  { name: "Next.js", icon: <Code className="h-4 w-4" />, category: "Framework" },
  { name: "TypeScript", icon: <Code className="h-4 w-4" />, category: "Language" },
  { name: "Node.js", icon: <Database className="h-4 w-4" />, category: "Backend" },
  { name: "MongoDB", icon: <Database className="h-4 w-4" />, category: "Database" },
  { name: "AWS", icon: <Cloud className="h-4 w-4" />, category: "Cloud" },
  { name: "Figma", icon: <Palette className="h-4 w-4" />, category: "Design" },
  { name: "Mobile Dev", icon: <Smartphone className="h-4 w-4" />, category: "Mobile" },
]

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-background/95 to-primary/5"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            <Brain className="h-4 w-4 mr-2" />
            Technical Expertise
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Skills <span className="text-primary">Overview</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive view of my technical skills and professional expertise across various domains
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Professional Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Card className="skill-chart-professional border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Professional Skills Overview
                </CardTitle>
                <p className="text-muted-foreground">Interactive skill proficiency radar</p>
              </CardHeader>
              <CardContent className="flex justify-center">
                <SkillRadar skills={radarSkills} size={350} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-muted" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Technology Stack</h3>
            <p className="text-muted-foreground">Technologies and tools I work with regularly</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                >
                  {tech.icon}
                  <span className="ml-2">{tech.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    {tech.category}
                  </span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
