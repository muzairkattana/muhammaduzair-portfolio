"use client"
import Image from "next/image"
import { Star, Quote, ExternalLink, Calendar, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSound } from "./sound-provider"
import TestPilotFeedbackSystem from "./testpilot-feedback-system"

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatar: string
  rating: number
  text: string
  date: string
  verified?: boolean
  projectLink?: string
  projectImage?: string
}

export default function TestimonialsSection() {
  return <TestPilotFeedbackSystem />
}

// Separate component for testimonial cards
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { playSound } = useSound()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <div className="relative flex-1">
          <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
          <p className="text-sm pt-4 px-4">{testimonial.text}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{testimonial.date}</span>
          </div>
          {testimonial.verified && (
            <Badge variant="outline" className="text-green-500 border-green-200 text-xs">
              <Check className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
        </div>

        {testimonial.projectLink && (
          <div className="pt-2 mt-2 border-t">
            <a
              href={testimonial.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 text-primary hover:underline"
              onClick={() => playSound("click")}
            >
              <ExternalLink className="h-3 w-3" /> View Project
            </a>
          </div>
        )}

        {testimonial.projectImage && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Project Preview:</p>
            <div className="relative h-32 rounded-md overflow-hidden">
              <Image
                src={testimonial.projectImage || "/placeholder.svg"}
                alt="Project preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
