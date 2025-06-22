"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Timeline from "./timeline"
import SkillRadar from "./skill-radar"

export default function AboutSection() {
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

  const timelineItems = [
    {
      id: 1,
      title: "BS Artificial Intelligence",
      location: "UET Mardan Khyber Pakhtunkhwa",
      description: "Studied advanced concepts in artificial intelligence, machine learning, and data science.",
      date: "2020 - 2024",
      icon: "education",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      location: "LTE IT HOME Takht-Bhai",
      description: "Developed and maintained web applications using modern technologies.",
      date: "2022 - 2023",
      icon: "work",
    },
    {
      id: 3,
      title: "Diploma In Information Technology",
      location: "ZICCA Academy Takht-bhai district Mardan",
      description: "Learned comprehensive IT skills including programming, networking, and system administration.",
      date: "2021 - 2022",
      icon: "education",
    },
    {
      id: 4,
      title: "Intermediate level",
      location: "Computer science from Post Graduate College Mardan",
      description: "Studied computer science fundamentals and programming concepts.",
      date: "2018 - 2020",
      icon: "education",
    },
  ]

  const skills = [
    { name: "Front-End", level: 90 },
    { name: "Back-End", level: 80 },
    { name: "UI/UX", level: 75 },
    { name: "Databases", level: 70 },
    { name: "DevOps", level: 60 },
    { name: "Amazon FBA", level: 85 },
  ]

  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="space-y-16">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get to know more about me and my professional journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-4 border-primary/20">
                <Image src="/images/profile.png" alt="Muhammad Uzair" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-lg"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg">
                Meet Muhammad Uzair, a talented individual with a diverse skill set in the fields of full-stack
                development, Amazon wholesaling, and Artificial Intelligence. With expertise in both front-end and
                back-end development, a successful business as an Amazon wholesaler, and a deep understanding of
                software systems, Muhammad Uzair brings a unique blend of technical knowledge and entrepreneurial spirit
                to the table.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-primary">01+</h3>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-primary">05+</h3>
                    <p className="text-sm text-muted-foreground">Completed Certifications</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-3xl font-bold text-primary">01</h3>
                    <p className="text-sm text-muted-foreground">Company Worked</p>
                  </CardContent>
                </Card>
              </div>

              <Button className="gap-2">
                <Download className="h-4 w-4" /> Download CV
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">My Journey</h3>
              <Timeline items={timelineItems} />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Skills Overview</h3>
              <SkillRadar skills={skills} className="mx-auto" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
