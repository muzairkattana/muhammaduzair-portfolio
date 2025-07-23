"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Calendar,
  Shield,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  Search,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useSound } from "./sound-provider"

interface Review {
  id: string
  rating: number
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    location: string
    reviewCount: number
    isVerified: boolean
  }
  date: Date
  helpful: number
  notHelpful: number
  hasVoted: boolean
  voteType?: "helpful" | "not-helpful"
  tags: string[]
  experience: "Excellent" | "Great" | "Average" | "Poor" | "Bad"
  isRecommended: boolean
  isLiked: boolean
  response?: {
    author: string
    content: string
    date: Date
  }
}

const EXPERIENCE_COLORS = {
  Excellent: "bg-[rgb(88,183,124)]/10 text-[rgb(88,183,124)] border-[rgb(88,183,124)]/30",
  Great: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300",
  Average: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300",
  Poor: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300",
  Bad: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300",
}

export default function TrustpilotReviewSystem() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  const { toast } = useToast()
  const { playSound } = useSound()

  // Form state
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    content: "",
    experience: "Great" as const,
    isRecommended: true,
    author: {
      name: "",
      location: "",
    },
  })

  // Sample reviews data
  useEffect(() => {
    const sampleReviews: Review[] = [
      {
        id: "1",
        rating: 5,
        title: "Outstanding portfolio with incredible AI features",
        content:
          "Muhammad's portfolio is absolutely stunning! The AI assistant is incredibly helpful and responsive. The design is modern, clean, and showcases his skills perfectly. The interactive elements and smooth animations make it a joy to navigate. Highly recommended for anyone looking for top-tier web development services.",
        author: {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "New York, USA",
          reviewCount: 47,
          isVerified: true,
        },
        date: new Date("2024-01-15"),
        helpful: 23,
        notHelpful: 1,
        hasVoted: false,
        tags: ["Web Development", "AI Integration"],
        experience: "Excellent",
        isRecommended: true,
        isLiked: false,
        response: {
          author: "Muhammad Uzair",
          content:
            "Thank you so much for your kind words, Sarah! I'm thrilled that you found the AI assistant helpful and enjoyed the overall experience. Your feedback means a lot to me!",
          date: new Date("2024-01-16"),
        },
      },
      {
        id: "2",
        rating: 5,
        title: "Professional service and exceptional results",
        content:
          "Working with Muhammad was an absolute pleasure. He delivered exactly what we needed for our e-commerce platform. The attention to detail, responsiveness, and technical expertise are top-notch. The project was completed on time and exceeded our expectations.",
        author: {
          name: "David Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "Toronto, Canada",
          reviewCount: 12,
          isVerified: true,
        },
        date: new Date("2024-01-10"),
        helpful: 18,
        notHelpful: 0,
        hasVoted: false,
        tags: ["E-commerce", "Professional"],
        experience: "Excellent",
        isRecommended: true,
        isLiked: false,
      },
      {
        id: "3",
        rating: 4,
        title: "Great developer with innovative solutions",
        content:
          "Muhammad provided excellent web development services for our startup. His innovative approach to problem-solving and modern development practices helped us create a competitive product. Communication was clear throughout the project.",
        author: {
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "London, UK",
          reviewCount: 8,
          isVerified: false,
        },
        date: new Date("2024-01-05"),
        helpful: 15,
        notHelpful: 2,
        hasVoted: false,
        tags: ["Innovation", "Startup"],
        experience: "Great",
        isRecommended: true,
        isLiked: false,
      },
      {
        id: "4",
        rating: 5,
        title: "بہترین ڈیولپر اور شاندار کام",
        content:
          "محمد عزیر کا کام واقعی قابل تعریف ہے۔ انہوں نے ہماری ویب سائٹ کو جدید اور پرکشش بنایا۔ AI کی سہولات اور ڈیزائن دونوں بہترین ہیں۔ میں انہیں ہر کسی کو تجویز کرتا ہوں۔",
        author: {
          name: "احمد علی",
          location: "کراچی، پاکستان",
          reviewCount: 3,
          isVerified: true,
        },
        date: new Date("2024-01-08"),
        helpful: 12,
        notHelpful: 0,
        hasVoted: false,
        tags: ["ویب ڈیولپمنٹ", "AI"],
        experience: "Excellent",
        isRecommended: true,
        isLiked: false,
      },
      {
        id: "5",
        rating: 5,
        title: "Exceptional UI/UX and Performance",
        content:
          "The portfolio website Muhammad created is not just visually appealing but also incredibly fast and responsive. The user experience is seamless across all devices. The attention to detail in animations and interactions is remarkable.",
        author: {
          name: "Maria Garcia",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "Madrid, Spain",
          reviewCount: 15,
          isVerified: true,
        },
        date: new Date("2024-01-12"),
        helpful: 20,
        notHelpful: 0,
        hasVoted: false,
        tags: ["UI/UX", "Performance"],
        experience: "Excellent",
        isRecommended: true,
        isLiked: false,
      },
      {
        id: "6",
        rating: 4,
        title: "Reliable and skilled developer",
        content:
          "Muhammad delivered our project on time with excellent quality. His communication skills are great and he's very responsive to feedback. The final product exceeded our initial expectations.",
        author: {
          name: "James Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          location: "Sydney, Australia",
          reviewCount: 6,
          isVerified: false,
        },
        date: new Date("2024-01-03"),
        helpful: 11,
        notHelpful: 1,
        hasVoted: false,
        tags: ["Reliable", "Communication"],
        experience: "Great",
        isRecommended: true,
        isLiked: false,
      },
    ]
    setReviews(sampleReviews)
  }, [])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (reviewForm.rating === 0 || !reviewForm.title.trim() || !reviewForm.content.trim()) {
      toast({
        title: "Please fill in all required fields",
        description: "Rating, title, and review content are required.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newReview: Review = {
      id: Date.now().toString(),
      rating: reviewForm.rating,
      title: reviewForm.title,
      content: reviewForm.content,
      author: {
        name: reviewForm.author.name || "Anonymous User",
        location: reviewForm.author.location || "Unknown",
        reviewCount: 1,
        isVerified: false,
      },
      date: new Date(),
      helpful: 0,
      notHelpful: 0,
      hasVoted: false,
      tags: [],
      experience: reviewForm.experience,
      isRecommended: reviewForm.isRecommended,
      isLiked: false,
    }

    setReviews((prev) => [newReview, ...prev])
    setReviewForm({
      rating: 0,
      title: "",
      content: "",
      experience: "Great",
      isRecommended: true,
      author: { name: "", location: "" },
    })
    setShowWriteReview(false)
    setIsSubmitting(false)

    toast({
      title: "Review submitted successfully!",
      description: "Thank you for your feedback. Your review will be published shortly.",
    })
    playSound("success")
  }

  const handleVote = (reviewId: string, voteType: "helpful" | "not-helpful") => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          if (review.hasVoted && review.voteType === voteType) {
            // Remove vote
            return {
              ...review,
              helpful: voteType === "helpful" ? review.helpful - 1 : review.helpful,
              notHelpful: voteType === "not-helpful" ? review.notHelpful - 1 : review.notHelpful,
              hasVoted: false,
              voteType: undefined,
            }
          } else {
            // Add or change vote
            const helpfulChange = voteType === "helpful" ? 1 : review.voteType === "helpful" ? -1 : 0
            const notHelpfulChange = voteType === "not-helpful" ? 1 : review.voteType === "not-helpful" ? -1 : 0

            return {
              ...review,
              helpful: review.helpful + helpfulChange,
              notHelpful: review.notHelpful + notHelpfulChange,
              hasVoted: true,
              voteType,
            }
          }
        }
        return review
      }),
    )
    playSound("click")
  }

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            isLiked: !review.isLiked,
          }
        }
        return review
      }),
    )
    playSound("click")
    toast({
      title: reviews.find((r) => r.id === reviewId)?.isLiked ? "Removed from favorites" : "Added to favorites",
      description: reviews.find((r) => r.id === reviewId)?.isLiked
        ? "Review removed from your favorites"
        : "Review added to your favorites",
    })
  }

  const handleShare = async (review: Review) => {
    const shareData = {
      title: `Review: ${review.title}`,
      text: `Check out this review by ${review.author.name}: "${review.content.substring(0, 100)}..."`,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "Review shared successfully!",
          description: "Thank you for sharing this review.",
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        toast({
          title: "Review link copied!",
          description: "Review link has been copied to your clipboard.",
        })
      }
      playSound("success")
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share this review. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("reviews-container")
    if (container) {
      const scrollAmount = 400
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
    playSound("click")
  }

  const filteredAndSortedReviews = reviews
    .filter((review) => {
      if (filterRating !== "all" && review.rating !== Number.parseInt(filterRating)) return false
      if (
        searchQuery &&
        !review.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !review.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.getTime() - a.date.getTime()
        case "oldest":
          return a.date.getTime() - b.date.getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0
  const totalReviews = reviews.length
  const recommendationRate =
    reviews.length > 0 ? (reviews.filter((r) => r.isRecommended).length / reviews.length) * 100 : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

  return (
    <section id="testimonials" className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge
            variant="outline"
            className="text-[rgb(88,183,124)] border-[rgb(88,183,124)]/30 px-3 py-1 mb-3 text-sm font-medium"
          >
            <Star className="h-3 w-3 mr-1 fill-[rgb(88,183,124)]" />
            Client Testimonials
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-slate-900 via-[rgb(88,183,124)] to-slate-900 dark:from-white dark:via-[rgb(88,183,124)] dark:to-white bg-clip-text text-transparent">
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Rating Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg sticky top-4">
              <CardHeader className="text-center pb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="p-2 bg-[rgb(88,183,124)] rounded-full">
                    <Star className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-[rgb(88,183,124)]">{averageRating.toFixed(1)}</div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.round(averageRating)
                            ? "fill-[rgb(88,183,124)] text-[rgb(88,183,124)]"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{totalReviews} reviews</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {/* Rating Distribution */}
                <div className="space-y-1">
                  {ratingDistribution.slice(0, 3).map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2 text-xs">
                      <span className="w-2">{rating}</span>
                      <Star className="h-2 w-2 fill-[rgb(88,183,124)] text-[rgb(88,183,124)]" />
                      <div className="flex-1">
                        <Progress value={percentage} className="h-1" />
                      </div>
                      <span className="text-muted-foreground w-3">{count}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Trust Indicators */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-[rgb(88,183,124)]" />
                    <span>{recommendationRate.toFixed(0)}% recommend</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-[rgb(88,183,124)]" />
                    <span>Verified reviews</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowWriteReview(true)}
                  size="sm"
                  className="w-full bg-[rgb(88,183,124)] hover:bg-[rgb(88,183,124)]/90 text-white text-xs py-2"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Write Review
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Horizontal Reviews Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {/* Filters */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                  <h3 className="text-sm font-semibold">Reviews ({totalReviews})</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="h-3 w-3 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-24 h-7 pl-6 text-xs"
                      />
                    </div>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-20 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="5">5★</SelectItem>
                        <SelectItem value="4">4★</SelectItem>
                        <SelectItem value="3">3★</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-20 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="highest">Highest</SelectItem>
                        <SelectItem value="helpful">Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horizontal Scroll Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleScroll("left")}
                  className="h-10 w-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleScroll("right")}
                  className="h-10 w-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Horizontal Reviews Container */}
              <div
                id="reviews-container"
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-12"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
              >
                <AnimatePresence>
                  {filteredAndSortedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex-shrink-0 w-80 md:w-96"
                    >
                      <Card className="h-full border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[rgb(88,183,124)]/30 hover:-translate-y-1">
                        <CardContent className="p-4 h-full flex flex-col">
                          {/* Review Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 ring-2 ring-[rgb(88,183,124)]/20">
                                <AvatarImage
                                  src={review.author.avatar || "/placeholder.svg"}
                                  alt={review.author.name}
                                />
                                <AvatarFallback className="bg-gradient-to-r from-[rgb(88,183,124)] to-[rgb(88,183,124)]/80 text-white font-semibold">
                                  {review.author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                                    {review.author.name}
                                  </h4>
                                  {review.author.isVerified && (
                                    <CheckCircle className="h-3 w-3 text-[rgb(88,183,124)]" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{review.author.location}</span>
                                  <span>•</span>
                                  <span>{review.author.reviewCount} reviews</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`text-xs px-2 py-1 ${EXPERIENCE_COLORS[review.experience]}`}>
                              {review.experience}
                            </Badge>
                          </div>

                          {/* Rating and Date */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "fill-[rgb(88,183,124)] text-[rgb(88,183,124)]"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs font-medium text-[rgb(88,183,124)]">{review.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {review.date.toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            {review.isRecommended && (
                              <div className="flex items-center gap-1 text-xs text-[rgb(88,183,124)]">
                                <Heart className="h-3 w-3 fill-current" />
                              </div>
                            )}
                          </div>

                          {/* Review Title */}
                          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-tight line-clamp-2">
                            {review.title}
                          </h3>

                          {/* Review Content */}
                          <div className="flex-grow">
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 line-clamp-4">
                              {review.content}
                            </p>
                          </div>

                          {/* Tags */}
                          {review.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {review.tags.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-[rgb(88,183,124)]/30 text-[rgb(88,183,124)] hover:bg-[rgb(88,183,124)]/10"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {review.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                                  +{review.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Response */}
                          {review.response && (
                            <div className="bg-[rgb(88,183,124)]/5 border-l-4 border-[rgb(88,183,124)] rounded-r-lg p-3 mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-[rgb(88,183,124)] text-white text-xs font-semibold">
                                    MU
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <span className="font-semibold text-xs text-slate-900 dark:text-white">
                                    {review.response.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    {review.response.date.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                                {review.response.content}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-700/60 mt-auto">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleVote(review.id, "helpful")}
                                className={`flex items-center gap-1 text-xs transition-colors ${
                                  review.hasVoted && review.voteType === "helpful"
                                    ? "text-[rgb(88,183,124)]"
                                    : "text-muted-foreground hover:text-[rgb(88,183,124)]"
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{review.helpful}</span>
                              </button>
                              <button
                                onClick={() => handleVote(review.id, "not-helpful")}
                                className={`flex items-center gap-1 text-xs transition-colors ${
                                  review.hasVoted && review.voteType === "not-helpful"
                                    ? "text-red-600"
                                    : "text-muted-foreground hover:text-red-600"
                                }`}
                              >
                                <ThumbsDown className="h-3 w-3" />
                                <span>{review.notHelpful}</span>
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLike(review.id)}
                                className={`h-6 w-6 p-0 transition-colors ${
                                  review.isLiked
                                    ? "text-red-500 hover:text-red-600"
                                    : "text-muted-foreground hover:text-red-500"
                                }`}
                              >
                                <Heart className={`h-3 w-3 ${review.isLiked ? "fill-current" : ""}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleShare(review)}
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-[rgb(88,183,124)]"
                              >
                                <Share2 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-slate-700"
                              >
                                <Flag className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredAndSortedReviews.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0 w-80">
                    <Card className="border-slate-200/50 dark:border-slate-700/50 h-64 flex items-center justify-center">
                      <CardContent className="text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                          No reviews found
                        </h3>
                        <p className="text-sm text-muted-foreground">No reviews match your current search criteria.</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Write Review Modal */}
        <AnimatePresence>
          {showWriteReview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowWriteReview(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-[rgb(88,183,124)] rounded-full">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Write a Review</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWriteReview(false)}
                      className="text-muted-foreground hover:text-slate-700 h-6 w-6 p-0"
                    >
                      ✕
                    </Button>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    {/* Rating */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Overall Rating *</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= reviewForm.rating
                                  ? "fill-[rgb(88,183,124)] text-[rgb(88,183,124)]"
                                  : "text-gray-300 hover:text-[rgb(88,183,124)]/50"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Experience</Label>
                      <Select
                        value={reviewForm.experience}
                        onValueChange={(value: any) => setReviewForm((prev) => ({ ...prev, experience: value }))}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Great">Great</SelectItem>
                          <SelectItem value="Average">Average</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                          <SelectItem value="Bad">Bad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Title */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Review Title *</Label>
                      <Input
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Summarize your experience"
                        className="h-8"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Your Review *</Label>
                      <Textarea
                        value={reviewForm.content}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Tell others about your experience..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Recommendation */}
                    <div className="flex items-center space-x-2 p-2 bg-[rgb(88,183,124)]/5 rounded">
                      <Switch
                        checked={reviewForm.isRecommended}
                        onCheckedChange={(checked) => setReviewForm((prev) => ({ ...prev, isRecommended: checked }))}
                      />
                      <Label className="text-sm">I would recommend Muhammad Uzair</Label>
                    </div>

                    {/* Author Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Name</Label>
                        <Input
                          value={reviewForm.author.name}
                          onChange={(e) =>
                            setReviewForm((prev) => ({
                              ...prev,
                              author: { ...prev.author, name: e.target.value },
                            }))
                          }
                          placeholder="Your name"
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Location</Label>
                        <Input
                          value={reviewForm.author.location}
                          onChange={(e) =>
                            setReviewForm((prev) => ({
                              ...prev,
                              author: { ...prev.author, location: e.target.value },
                            }))
                          }
                          placeholder="City, Country"
                          className="h-8"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowWriteReview(false)}
                        className="flex-1 h-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          reviewForm.rating === 0 ||
                          !reviewForm.title.trim() ||
                          !reviewForm.content.trim()
                        }
                        className="flex-1 h-8 bg-[rgb(88,183,124)] hover:bg-[rgb(88,183,124)]/90 text-white"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Publishing...
                          </div>
                        ) : (
                          <>
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
