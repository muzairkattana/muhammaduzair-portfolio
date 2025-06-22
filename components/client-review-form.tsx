"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useSound } from "./sound-provider"
import Image from "next/image"

interface ClientReviewFormProps {
  onSubmit: (review: {
    name: string
    position: string
    company: string
    rating: number
    text: string
    projectLink?: string
    image?: File | null
  }) => void
  onCancel: () => void
}

export default function ClientReviewForm({ onSubmit, onCancel }: ClientReviewFormProps) {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { playSound } = useSound()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      playSound("click")
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)
    playSound("click")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !text) {
      toast({
        title: "Missing information",
        description: "Please provide your name and review text.",
        variant: "destructive",
      })
      playSound("error")
      return
    }

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      onSubmit({
        name,
        position,
        company,
        rating,
        text,
        projectLink: projectLink || undefined,
        image,
      })

      setIsSubmitting(false)
      playSound("success")

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review will be visible after approval.",
      })
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card rounded-lg p-6 shadow-lg border border-border"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Share Your Experience</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Your Name <span className="text-red-500">*</span>
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="CEO" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
        </div>

        <div className="space-y-2">
          <Label>
            Rating <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  setRating(star)
                  playSound("click")
                }}
              >
                <Star className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">
            Your Review <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience working with me..."
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectLink">Project Link (Optional)</Label>
          <Input
            id="projectLink"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="https://example.com/project"
            type="url"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Upload Image (Optional)</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("image-upload")?.click()}
              className="gap-2"
            >
              <Upload className="h-4 w-4" /> Choose Image
            </Button>
            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            {imagePreview && (
              <div className="relative h-16 w-16">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  onClick={handleRemoveImage}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Upload a screenshot or image of the project we worked on together.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span> Submitting...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" /> Submit Review
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
