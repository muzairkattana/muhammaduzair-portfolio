"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import ProjectCard from "./project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  demoUrl: string
  githubUrl?: string
  technologies: string[]
  details?: string
}

export default function PortfolioSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [activeCategory, setActiveCategory] = useState("all")

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

  const projects: Project[] = [
    {
      id: "1",
      title: "Modern Dashboard",
      category: "web",
      description: "Data analytical dashboard adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      details:
        "A comprehensive dashboard solution for data visualization and analytics. Features include real-time data updates, interactive charts, and responsive design for all device sizes.",
    },
    {
      id: "2",
      title: "E-Commerce Website",
      category: "web",
      description: "Amazon clone adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      githubUrl: "#",
      technologies: ["Next.js", "MongoDB", "Stripe", "Redux"],
      details:
        "A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing. Includes admin dashboard for inventory management.",
    },
    {
      id: "3",
      title: "Brand Design",
      category: "design",
      description: "Tesla Clone adaptable to all devices, with UI components and animated interactions.",
      image: "/placeholder.svg?height=300&width=500",
      demoUrl: "#",
      technologies: ["Figma", "Adobe XD", "Photoshop"],
      details:
        "Complete brand identity design including logo, color palette, typography, and brand guidelines. Created for a tech startup in the renewable energy sector.",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-12">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold mb-2">Portfolio</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Check out my most recent projects</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                    All
                  </TabsTrigger>
                  <TabsTrigger value="web" onClick={() => setActiveCategory("web")}>
                    Web
                  </TabsTrigger>
                  <TabsTrigger value="design" onClick={() => setActiveCategory("design")}>
                    Design
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      demoUrl={project.demoUrl}
                      githubUrl={project.githubUrl}
                      technologies={project.technologies}
                      details={project.details}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
