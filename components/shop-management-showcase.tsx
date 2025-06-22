"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Monitor,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const screenshots = [
  {
    id: 1,
    title: "Supplier Management",
    description: "Comprehensive supplier information management and payment tracking.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-73AUhWpnIXfSSv1yf2IC7I2ffbC26K.png",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Zakat Dashboard",
    description: "Financial tracking and zakat calculation dashboard with monthly distribution visualization.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7SI0iiP9cDjNBMUmgmXnzg7tHV6GpX.png",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Product Dashboard",
    description: "Inventory management with real-time stock levels and product categorization.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uKFiPhAItEqpl650sdoXshEeUwczX4.png",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Supplier Dashboard",
    description: "Supplier management with payment history tracking and visualization.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cfOQnln0KLcYWcwMzJeON8AjrXZ8mZ.png",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "Payments Management",
    description: "Track, manage, and collect payments from customers and suppliers.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jZGKGf9VQCuKvuGKiPNRRoVNhIN9Ws.png",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "Sales Tracker",
    description: "Record and manage sales transactions with product selection and pricing.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7o8EdYwPrO4ZGG8AkjT1j5lB8uHk6n.png",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
]

const features = [
  {
    title: "Inventory Management",
    description: "Track products, stock levels, and pricing in real time",
    icon: <Package className="h-5 w-5 text-primary" />,
  },
  {
    title: "Customer Relationship Management",
    description: "Manage customer data, interactions, and order history",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "Sales & Order Tracking",
    description: "View and manage orders with automated status updates",
    icon: <ShoppingCart className="h-5 w-5 text-primary" />,
  },
  {
    title: "Financial Management",
    description: "Track payments, expenses, and generate financial reports",
    icon: <DollarSign className="h-5 w-5 text-primary" />,
  },
  {
    title: "Supplier Management",
    description: "Manage supplier information, orders, and payment history",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "Dashboard Analytics",
    description: "Visual reports and insights for business performance",
    icon: <LayoutDashboard className="h-5 w-5 text-primary" />,
  },
]

const technologies = ["Next.js", "React", "Node.js", "Tailwind CSS", "JavaScript", "RESTful API"]

export default function ShopManagementShowcase() {
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
          {/* Project Showcase */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Shop Management System</h2>
                <p className="text-muted-foreground">
                  A comprehensive CRM and inventory management solution for retail businesses
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground">
                This Shop Management System is a web-based platform designed to help sellers efficiently manage their
                businesses. It provides a seamless interface for inventory management, customer interactions, sales
                tracking, and order processing. The system leverages a modern UI/UX with Tailwind CSS and integrates
                backend functionalities for real-time updates and secure data handling.
              </p>

              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="technical">Technical Details</TabsTrigger>
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
                <TabsContent value="technical" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Frontend</h4>
                      <p className="text-sm text-muted-foreground">
                        Built with Next.js and React for a responsive and interactive user interface. Styled with
                        Tailwind CSS for a modern and consistent design system.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Backend</h4>
                      <p className="text-sm text-muted-foreground">
                        Node.js backend with RESTful API endpoints for data management. Secure authentication and
                        authorization system.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        Component-based architecture for scalability and maintainability. Modular design allowing for
                        easy feature additions and customizations.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <Monitor className="h-4 w-4" /> Live Demo
                </Button>
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" /> View Code
                </Button>
              </div>
            </div>
          </div>

          {/* Screenshots Carousel */}
          <div
            className="order-1 lg:order-2"
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
        </div>
      </div>
    </div>
  )
}
