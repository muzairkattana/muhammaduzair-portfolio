"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function EnhancedTechCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const techCategories = [
    {
      category: "Frontend Development",
      color: "from-blue-500 to-cyan-500",
      technologies: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JAVASCRIPT%20LOGO-3nYUh0EgKLmyP3jISlToa1SOl0DOdz.png",
          alt: "JavaScript",
          name: "JavaScript",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c09f02949277dcdc1be246884c24be48-xBPePHbpbhLlSeOZLBwAcwpjUiJM9x.png",
          alt: "Bootstrap",
          name: "Bootstrap",
          level: "Advanced",
        },
      ],
    },
    {
      category: "Backend & Database",
      color: "from-green-500 to-emerald-500",
      technologies: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6f8415ffc78eaee0b44d053a1b79f096-8IPmd0CBCZbKGmvpZEdBYHEXgG8jBC.png",
          alt: "Python",
          name: "Python",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a86c2be94f651a191030fa9769acb2cf-XCGo0suIH0RHBnVnVf4vOPcP9zSXxO.png",
          alt: "SQL Server",
          name: "SQL Server",
          level: "Advanced",
        },
      ],
    },
    {
      category: "Programming Languages",
      color: "from-purple-500 to-pink-500",
      technologies: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a5d2fe5e5744e50feb00d7bf8cb8a011-mRzGTFxWDcQJT066a1OyohiQ7LizD2.png",
          alt: "C Programming",
          name: "C",
          level: "Advanced",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a26df580ce0975fbe2b7484f82df5634-WlehIBhMJPtyfEGBLC4nneo9zJZrLR.png",
          alt: "C Sharp",
          name: "C#",
          level: "Advanced",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JAVA%20LOGO-7acdSEZxBDSNDRlBKC0GgnLPxWdf2j.png",
          alt: "Java",
          name: "Java",
          level: "Intermediate",
        },
      ],
    },
    {
      category: "Business & Productivity",
      color: "from-orange-500 to-red-500",
      technologies: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5efe187797d6ff80f18083c40f70282a-i2whtg2hcDbz4CPCpZltjsDY2sskKS.png",
          alt: "Microsoft Office",
          name: "MS Office",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OFFICE-tExp0026hRkVNugUgboqOyrWlOFXp5.png",
          alt: "Microsoft Office",
          name: "Office Suite",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MS%20WORD-jJxXwqYd18JhcqXI00WDAfoeqsvIyb.png",
          alt: "Microsoft Word",
          name: "MS Word",
          level: "Expert",
        },
      ],
    },
    {
      category: "Specialized Skills",
      color: "from-indigo-500 to-purple-500",
      technologies: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8062d353c233abbefea9036282cb5fc6-TvRvtAZJ75WTnGKBSPoshTDhUODGUl.png",
          alt: "Artificial Intelligence",
          name: "AI",
          level: "Advanced",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b6c2cdb0fc84ecd697b9d0706f3f698b-o55PI1dQd6JJfSgaEGA8jCCtJfVVjB.png",
          alt: "Business Management",
          name: "Business Management",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AMAZON-vC82iKJylCM6x5ITJBGSFb9YYJzJon.png",
          alt: "Amazon",
          name: "Amazon FBA",
          level: "Expert",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WORDPRESS-eSXXxwtuZ44h5BV1qL8ZQpLvRFKKT7.png",
          alt: "WordPress",
          name: "WordPress",
          level: "Advanced",
        },
      ],
    },
  ]

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % techCategories.length)
    }, 4000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [techCategories.length])

  const currentCategory = techCategories[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="text-primary border-primary/30 px-4 py-2 mb-6">
            Technical Expertise
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Technologies & Tools
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Mastering cutting-edge technologies to deliver exceptional solutions across the full development stack
          </p>
        </motion.div>

        {/* Category Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Category Header */}
              <div className="text-center mb-8">
                <div
                  className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${currentCategory.color} text-white font-semibold text-lg mb-4`}
                >
                  {currentCategory.category}
                </div>
              </div>

              {/* Technologies Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentCategory.technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="relative h-16 w-16 mx-auto mb-4 transition-transform group-hover:scale-110">
                        <Image
                          src={tech.src || "/placeholder.svg"}
                          alt={tech.alt}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-center mb-2">{tech.name}</h3>
                      <Badge
                        variant="secondary"
                        className={`w-full justify-center ${
                          tech.level === "Expert"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : tech.level === "Advanced"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {tech.level}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {techCategories.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to category ${idx + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="w-full bg-muted/30 rounded-full h-1">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary/60 h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
              key={currentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
