"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Code,
  Layout,
  Users,
  Shield,
  Globe,
  Server,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const screenshots = [
  {
    id: 1,
    title: "Hero Section",
    description: "Modern hero section with animated background and brand logo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TjehGKVBgmAtsefsdGXdr851dnSfXH.png",
    icon: <Layout className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Statistics Section",
    description: "Animated statistics showcasing client success and project metrics.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aHwBOXGhtXjy81GuDKtgfN5lAA8nA9.png",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Social Connect",
    description: "Interactive social media connection section with animated elements.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T3lLnGZxXYjfJ1zDfIh1CuI8rRmMo5.png",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Footer Section",
    description: "Clean footer design with contact information and quick links.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3g3hmMDhclcm8jmSdc35RTMWm8vLeN.png",
    icon: <Layout className="h-5 w-5" />,
  },
]

const features = [
  {
    title: "Interactive UI Components",
    description: "Built with Radix UI for accessible, interactive elements",
    icon: <Layout className="h-5 w-5 text-primary" />,
  },
  {
    title: "Secure Authentication",
    description: "Robust user authentication and authorization system",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    title: "Next.js Architecture",
    description: "Fast and scalable frontend with Next.js",
    icon: <Code className="h-5 w-5 text-primary" />,
  },
  {
    title: "Responsive Design",
    description: "Tailwind CSS for seamless styling and responsiveness",
    icon: <Layout className="h-5 w-5 text-primary" />,
  },
  {
    title: "API Integration",
    description: "Seamless integration with backend services and APIs",
    icon: <Server className="h-5 w-5 text-primary" />,
  },
  {
    title: "Performance Optimized",
    description: "Optimized for fast loading and smooth animations",
    icon: <Database className="h-5 w-5 text-primary" />,
  },
]

const technologies = ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB"]

const services = [
  "Ethical Hacking Services",
  "Security Consulting",
  "Web Development",
  "Technical Support",
  "Digital Solutions",
]

export default function ServiceProviderShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Screenshots Carousel */}
          <div
            className="order-1 lg:order-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative overflow-hidden rounded-xl border border-border shadow-xl">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <Image
                  src={screenshots[activeIndex].image || "/placeholder.svg"}
                  alt={screenshots[activeIndex].title}
                  width={1200}
                  height={675}
                  className="object-cover"
                  priority={activeIndex === 0}
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    {screenshots[activeIndex].icon}
                    <h3 className="font-medium">{screenshots[activeIndex].title}</h3>
                  </div>
                  <p className="text-sm text-white/80">{screenshots[activeIndex].description}</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div
                className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex justify-center gap-2">
              {screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === activeIndex ? "bg-primary w-4" : "bg-muted"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View ${screenshot.title}`}
                />
              ))}
            </div>
          </div>

          {/* Project Showcase */}
          <div className="order-2 lg:order-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Digital Service Provider</h2>
                <p className="text-muted-foreground">Premium tech solutions and ethical hacking services platform</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground">
                A comprehensive digital service platform built for a client who provides technical solutions and ethical
                hacking services. The website features a modern dark-themed UI with interactive elements, secure
                authentication, and responsive design to showcase professional tech services and facilitate client
                engagement.
              </p>

              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-primary/10 p-1.5 rounded-full">{feature.icon}</div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="services" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-medium">{service}</p>
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground mt-4">
                      This platform serves as a professional showcase for technical services, enabling clients to
                      discover, connect with, and engage the service provider for their digital needs.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </Button>
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" /> View Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
