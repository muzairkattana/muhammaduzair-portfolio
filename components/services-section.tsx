"use client"

import React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Globe, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface Service {
  title: string
  icon: React.ReactNode
  description: string
  details: string[]
}

export default function ServicesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [selectedService, setSelectedService] = useState<Service | null>(null)

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

  const services: Service[] = [
    {
      title: "Full-Stack Development",
      icon: <Code className="h-10 w-10 text-primary" />,
      description: "End-to-end web application development with modern technologies",
      details: [
        "I analyze web development requirements",
        "Automating information retrieval",
        "Systematically applying statistical and logical techniques",
        "Visualizing graphs, charts and preparing reports and dashboards",
      ],
    },
    {
      title: "Front-End Development",
      icon: <Globe className="h-10 w-10 text-primary" />,
      description: "Creating responsive and interactive user interfaces",
      details: [
        "Assisting both personal and commercial clients with design questions and needs",
        "Maintain customer accounts and help resolve disputes",
        "Refer customers to other specialists when needed",
        "Systematically applying statistical and logical techniques",
      ],
    },
    {
      title: "Back-End Development",
      icon: <Database className="h-10 w-10 text-primary" />,
      description: "Building robust server-side applications and APIs",
      details: [
        "I develop the user interface",
        "Webpage development",
        "I create UX element interactions",
        "Well trained in WordPress",
      ],
    },
  ]

  return (
    <section id="services" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-12">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold mb-2">Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">What I offer to help you succeed</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-primary/10"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">{service.icon}</div>
                  <h3 className="text-xl font-medium">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="gap-1 group-hover:text-primary"
                        onClick={() => setSelectedService(service)}
                      >
                        View more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {selectedService?.icon &&
                            React.cloneElement(selectedService.icon as React.ReactElement, { className: "h-5 w-5" })}
                          {selectedService?.title}
                        </DialogTitle>
                        <DialogDescription>Detailed information about this service</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>{selectedService?.description}</p>
                        <ul className="space-y-2">
                          {selectedService?.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full mt-4">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
