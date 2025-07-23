"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Upload,
  X,
  Send,
  Filter,
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Calendar,
  FileText,
  ImageIcon,
  Video,
  Paperclip,
  Shield,
  BarChart3,
  Settings,
  Bell,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { useSound } from "./sound-provider"
import Image from "next/image"

// Types and Interfaces
interface ReviewFeedback {
  id: string
  rating: number
  feedback: string
  category: string
  tags: string[]
  userName: string
  userEmail?: string
  isAnonymous: boolean
  timestamp: Date
  attachments: FileAttachment[]
  status: "pending" | "reviewed" | "in-progress" | "resolved"
  upvotes: number
  hasUpvoted?: boolean
  adminNotes?: string
  isHelpful: boolean
  language: "en" | "ur"
}

interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  preview?: string
}

interface FilterOptions {
  rating: string
  category: string
  status: string
  dateRange: string
  searchQuery: string
}

// Predefined categories and tags
const CATEGORIES = [
  { value: "bug", label: "Bug Report", icon: "🐛", color: "bg-red-100 text-red-800" },
  { value: "feature", label: "Feature Request", icon: "✨", color: "bg-blue-100 text-blue-800" },
  { value: "ui-ux", label: "UI/UX", icon: "🎨", color: "bg-purple-100 text-purple-800" },
  { value: "performance", label: "Performance", icon: "⚡", color: "bg-yellow-100 text-yellow-800" },
  { value: "content", label: "Content", icon: "📝", color: "bg-green-100 text-green-800" },
  { value: "general", label: "General", icon: "💬", color: "bg-gray-100 text-gray-800" },
]

const PREDEFINED_TAGS = [
  "Critical",
  "Minor",
  "Enhancement",
  "Documentation",
  "Mobile",
  "Desktop",
  "Accessibility",
  "Security",
  "Loading Speed",
  "Navigation",
  "Design",
  "Functionality",
]

const LANGUAGES = {
  en: {
    title: "Reviews & Feedback",
    submitReview: "Submit Review",
    viewReviews: "View Reviews",
    adminPanel: "Admin Panel",
    rating: "Rating",
    feedback: "Feedback",
    category: "Category",
    tags: "Tags",
    attachments: "Attachments",
    anonymous: "Submit Anonymously",
    name: "Your Name",
    email: "Your Email (Optional)",
    submit: "Submit Feedback",
    cancel: "Cancel",
    helpful: "Was this helpful?",
    upvote: "Upvote",
    filterBy: "Filter By",
    searchPlaceholder: "Search reviews...",
    exportData: "Export Data",
    markAsReviewed: "Mark as Reviewed",
    addNote: "Add Admin Note",
    deleteReview: "Delete Review",
    pending: "Pending",
    reviewed: "Reviewed",
    inProgress: "In Progress",
    resolved: "Resolved",
  },
  ur: {
    title: "جائزے اور رائے",
    submitReview: "جائزہ جمع کریں",
    viewReviews: "جائزے دیکھیں",
    adminPanel: "ایڈمن پینل",
    rating: "درجہ بندی",
    feedback: "رائے",
    category: "قسم",
    tags: "ٹیگز",
    attachments: "منسلکات",
    anonymous: "گمنام طور پر جمع کریں",
    name: "آپ کا نام",
    email: "آپ کا ای میل (اختیاری)",
    submit: "رائے جمع کریں",
    cancel: "منسوخ",
    helpful: "کیا یہ مددگار تھا؟",
    upvote: "پسند",
    filterBy: "فلٹر کریں",
    searchPlaceholder: "جائزے تلاش کریں...",
    exportData: "ڈیٹا ایکسپورٹ کریں",
    markAsReviewed: "جائزہ شدہ کے طور پر نشان زد کریں",
    addNote: "ایڈمن نوٹ شامل کریں",
    deleteReview: "جائزہ حذف کریں",
    pending: "زیر التواء",
    reviewed: "جائزہ شدہ",
    inProgress: "جاری",
    resolved: "حل شدہ",
  },
}

export default function ReviewFeedbackSystem({ isAdmin = false }: { isAdmin?: boolean }) {
  const [activeTab, setActiveTab] = useState("submit")
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [reviews, setReviews] = useState<ReviewFeedback[]>([])
  const [filteredReviews, setFilteredReviews] = useState<ReviewFeedback[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    rating: "all",
    category: "all",
    status: "all",
    dateRange: "all",
    searchQuery: "",
  })

  // Form states
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [attachments, setAttachments] = useState<FileAttachment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedReview, setSelectedReview] = useState<ReviewFeedback | null>(null)
  const [adminNote, setAdminNote] = useState("")

  const { playSound } = useSound()
  const t = LANGUAGES[language]

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem("portfolio-reviews")
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews).map((review: any) => ({
        ...review,
        timestamp: new Date(review.timestamp),
      }))
      setReviews(parsedReviews)
    }
  }, [])

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("portfolio-reviews", JSON.stringify(reviews))
    }
  }, [reviews])

  // Filter reviews based on current filters
  useEffect(() => {
    let filtered = [...reviews]

    if (filters.rating !== "all") {
      filtered = filtered.filter((review) => review.rating === Number.parseInt(filters.rating))
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((review) => review.category === filters.category)
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((review) => review.status === filters.status)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (review) =>
          review.feedback.toLowerCase().includes(query) ||
          review.userName.toLowerCase().includes(query) ||
          review.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (filters.dateRange !== "all") {
      const now = new Date()
      const filterDate = new Date()

      switch (filters.dateRange) {
        case "today":
          filterDate.setHours(0, 0, 0, 0)
          break
        case "week":
          filterDate.setDate(now.getDate() - 7)
          break
        case "month":
          filterDate.setMonth(now.getMonth() - 1)
          break
      }

      filtered = filtered.filter((review) => review.timestamp >= filterDate)
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    setFilteredReviews(filtered)
  }, [reviews, filters])

  // Handle file upload
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files) return

      Array.from(files).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          toast({
            title: "File too large",
            description: "Please select files smaller than 10MB",
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const attachment: FileAttachment = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: file.size,
            url: e.target?.result as string,
            preview: file.type.startsWith("image/") ? (e.target?.result as string) : undefined,
          }

          setAttachments((prev) => [...prev, attachment])
          playSound("success")
        }
        reader.readAsDataURL(file)
      })
    },
    [playSound],
  )

  // Remove attachment
  const removeAttachment = useCallback(
    (id: string) => {
      setAttachments((prev) => prev.filter((att) => att.id !== id))
      playSound("click")
    },
    [playSound],
  )

  // Add custom tag
  const addCustomTag = useCallback(() => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
      playSound("success")
    }
  }, [customTag, selectedTags, playSound])

  // Toggle tag selection
  const toggleTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
      playSound("click")
    },
    [playSound],
  )

  // Submit review
  const handleSubmitReview = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!feedback.trim() || !selectedCategory) {
        toast({
          title: "Missing information",
          description: "Please provide feedback and select a category",
          variant: "destructive",
        })
        playSound("error")
        return
      }

      if (!isAnonymous && !userName.trim()) {
        toast({
          title: "Missing information",
          description: "Please provide your name or submit anonymously",
          variant: "destructive",
        })
        playSound("error")
        return
      }

      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newReview: ReviewFeedback = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        rating,
        feedback: feedback.trim(),
        category: selectedCategory,
        tags: selectedTags,
        userName: isAnonymous ? "Anonymous" : userName.trim(),
        userEmail: isAnonymous ? undefined : userEmail.trim(),
        isAnonymous,
        timestamp: new Date(),
        attachments,
        status: "pending",
        upvotes: 0,
        hasUpvoted: false,
        isHelpful: false,
        language,
      }

      setReviews((prev) => [newReview, ...prev])

      // Reset form
      setRating(5)
      setFeedback("")
      setSelectedCategory("")
      setSelectedTags([])
      setUserName("")
      setUserEmail("")
      setAttachments([])
      setIsSubmitting(false)

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. It will be reviewed shortly.",
      })
      playSound("success")

      // Switch to reviews tab
      setActiveTab("reviews")
    },
    [
      feedback,
      selectedCategory,
      isAnonymous,
      userName,
      userEmail,
      rating,
      selectedTags,
      attachments,
      language,
      playSound,
    ],
  )

  // Handle upvote
  const handleUpvote = useCallback(
    (reviewId: string) => {
      setReviews((prev) =>
        prev.map((review) => {
          if (review.id === reviewId) {
            const hasUpvoted = review.hasUpvoted || false
            return {
              ...review,
              upvotes: hasUpvoted ? review.upvotes - 1 : review.upvotes + 1,
              hasUpvoted: !hasUpvoted,
            }
          }
          return review
        }),
      )
      playSound("click")
    },
    [playSound],
  )

  // Update review status (admin only)
  const updateReviewStatus = useCallback(
    (reviewId: string, status: ReviewFeedback["status"]) => {
      setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, status } : review)))
      playSound("success")
    },
    [playSound],
  )

  // Add admin note
  const addAdminNote = useCallback(
    (reviewId: string, note: string) => {
      setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, adminNotes: note } : review)))
      setAdminNote("")
      playSound("success")
    },
    [playSound],
  )

  // Delete review (admin only)
  const deleteReview = useCallback(
    (reviewId: string) => {
      setReviews((prev) => prev.filter((review) => review.id !== reviewId))
      playSound("success")
    },
    [playSound],
  )

  // Export data
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(reviews, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `reviews-export-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    playSound("success")
  }, [reviews, playSound])

  // Calculate statistics
  const stats = {
    total: reviews.length,
    averageRating: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
    byStatus: {
      pending: reviews.filter((r) => r.status === "pending").length,
      reviewed: reviews.filter((r) => r.status === "reviewed").length,
      inProgress: reviews.filter((r) => r.status === "in-progress").length,
      resolved: reviews.filter((r) => r.status === "resolved").length,
    },
    byRating: [1, 2, 3, 4, 5].map((rating) => ({
      rating,
      count: reviews.filter((r) => r.rating === rating).length,
    })),
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">Share your experience and help us improve</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={(value: "en" | "ur") => setLanguage(value)}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 EN</SelectItem>
              <SelectItem value="ur">🇵🇰 اردو</SelectItem>
            </SelectContent>
          </Select>

          {isAdmin && (
            <Badge variant="outline" className="bg-primary/10">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          )}
        </div>
      </div>

      {/* Statistics Cards (Admin View) */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.byStatus.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{stats.byStatus.resolved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
          <TabsTrigger value="submit" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t.submitReview}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {t.viewReviews}
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t.adminPanel}
            </TabsTrigger>
          )}
        </TabsList>

        {/* Submit Review Tab */}
        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t.submitReview}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Rating */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">{t.rating}</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star)
                          playSound("click")
                        }}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({rating} star{rating !== 1 ? "s" : ""})
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">{t.category}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">{t.feedback}</Label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    className="min-h-[120px] resize-none"
                    maxLength={1000}
                  />
                  <div className="text-right text-sm text-muted-foreground">{feedback.length}/1000</div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">{t.tags}</Label>

                  {/* Predefined Tags */}
                  <div className="flex flex-wrap gap-2">
                    {PREDEFINED_TAGS.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer transition-colors hover:bg-primary/20"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Custom Tag Input */}
                  <div className="flex gap-2">
                    <Input
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      placeholder="Add custom tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addCustomTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addCustomTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Selected Tags */}
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className="hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* File Attachments */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">{t.attachments}</Label>

                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload files or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">Images, PDFs, Documents (Max 10MB each)</p>
                    </label>
                  </div>

                  {/* Attachment Preview */}
                  {attachments.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="relative border rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            {attachment.type.startsWith("image/") ? (
                              <ImageIcon className="h-4 w-4 text-blue-500" />
                            ) : attachment.type === "application/pdf" ? (
                              <FileText className="h-4 w-4 text-red-500" />
                            ) : attachment.type.startsWith("video/") ? (
                              <Video className="h-4 w-4 text-purple-500" />
                            ) : (
                              <Paperclip className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="text-sm truncate flex-1">{attachment.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(attachment.id)}
                              className="text-destructive hover:bg-destructive/20 rounded-full p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>

                          {attachment.preview && (
                            <div className="mt-2">
                              <Image
                                src={attachment.preview || "/placeholder.svg"}
                                alt={attachment.name}
                                width={100}
                                height={60}
                                className="rounded object-cover"
                              />
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground mt-1">{(attachment.size / 1024).toFixed(1)} KB</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Information */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                    <Label htmlFor="anonymous">{t.anonymous}</Label>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t.name} *</Label>
                        <Input
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Your full name"
                          required={!isAnonymous}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.email}</Label>
                        <Input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none">
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t.submit}
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setRating(5)
                      setFeedback("")
                      setSelectedCategory("")
                      setSelectedTags([])
                      setUserName("")
                      setUserEmail("")
                      setAttachments([])
                      playSound("click")
                    }}
                  >
                    {t.cancel}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.searchPlaceholder}
                      value={filters.searchQuery}
                      onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Select
                    value={filters.rating}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showAdvancedFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() =>
                          setFilters({
                            rating: "all",
                            category: "all",
                            status: "all",
                            dateRange: "all",
                            searchQuery: "",
                          })
                        }
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                  <p className="text-muted-foreground">
                    {reviews.length === 0
                      ? "Be the first to leave a review!"
                      : "Try adjusting your filters to see more reviews."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onUpvote={handleUpvote}
                  isAdmin={isAdmin}
                  onStatusUpdate={updateReviewStatus}
                  onDelete={deleteReview}
                  onAddNote={addAdminNote}
                  language={language}
                />
              ))
            )}
          </div>

          {/* Load More Button (if needed) */}
          {filteredReviews.length > 0 && filteredReviews.length < reviews.length && (
            <div className="text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          )}
        </TabsContent>

        {/* Admin Panel Tab */}
        {isAdmin && (
          <TabsContent value="admin" className="space-y-6">
            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={exportData} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>

                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>

                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.byRating.reverse().map(({ rating, count }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <Progress value={stats.total > 0 ? (count / stats.total) * 100 : 0} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {reviews.slice(0, 10).map((review) => (
                      <div key={review.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {review.isAnonymous ? "?" : review.userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {review.userName} left a {review.rating}-star review
                          </p>
                          <p className="text-xs text-muted-foreground">{review.timestamp.toLocaleDateString()}</p>
                        </div>
                        <Badge
                          variant={
                            review.status === "resolved"
                              ? "default"
                              : review.status === "in-progress"
                                ? "secondary"
                                : review.status === "reviewed"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {review.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

// Review Card Component
function ReviewCard({
  review,
  onUpvote,
  isAdmin,
  onStatusUpdate,
  onDelete,
  onAddNote,
  language,
}: {
  review: ReviewFeedback
  onUpvote: (id: string) => void
  isAdmin: boolean
  onStatusUpdate: (id: string, status: ReviewFeedback["status"]) => void
  onDelete: (id: string) => void
  onAddNote: (id: string, note: string) => void
  language: "en" | "ur"
}) {
  const [showAdminActions, setShowAdminActions] = useState(false)
  const [adminNote, setAdminNote] = useState("")
  const { playSound } = useSound()
  const t = LANGUAGES[language]

  const category = CATEGORIES.find((cat) => cat.value === review.category)
  const statusColors = {
    pending: "bg-orange-100 text-orange-800",
    reviewed: "bg-blue-100 text-blue-800",
    "in-progress": "bg-purple-100 text-purple-800",
    resolved: "bg-green-100 text-green-800",
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{review.isAnonymous ? "?" : review.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {review.timestamp.toLocaleDateString()}
                  {category && (
                    <>
                      <Separator orientation="vertical" className="h-3" />
                      <Badge variant="outline" className={category.color}>
                        {category.icon} {category.label}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={statusColors[review.status]}>
                {t[review.status as keyof typeof t] || review.status}
              </Badge>
              {isAdmin && (
                <Button variant="ghost" size="sm" onClick={() => setShowAdminActions(!showAdminActions)}>
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({review.rating}/5)</span>
          </div>

          {/* Feedback */}
          <p className="text-sm leading-relaxed">{review.feedback}</p>

          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {review.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Attachments */}
          {review.attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Attachments:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {review.attachments.map((attachment) => (
                  <div key={attachment.id} className="border rounded-lg p-2">
                    <div className="flex items-center gap-1 mb-1">
                      {attachment.type.startsWith("image/") ? (
                        <ImageIcon className="h-3 w-3 text-blue-500" />
                      ) : (
                        <FileText className="h-3 w-3 text-gray-500" />
                      )}
                      <span className="text-xs truncate">{attachment.name}</span>
                    </div>
                    {attachment.preview && (
                      <Image
                        src={attachment.preview || "/placeholder.svg"}
                        alt={attachment.name}
                        width={60}
                        height={40}
                        className="rounded object-cover w-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Notes */}
          {review.adminNotes && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Admin Note:</strong> {review.adminNotes}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpvote(review.id)}
              className={review.hasUpvoted ? "text-primary" : ""}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 ${review.hasUpvoted ? "fill-current" : ""}`} />
              {t.helpful} ({review.upvotes})
            </Button>

            <div className="text-xs text-muted-foreground">ID: {review.id.slice(-8)}</div>
          </div>

          {/* Admin Actions */}
          <AnimatePresence>
            {isAdmin && showAdminActions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t pt-4 space-y-3"
              >
                <div className="flex flex-wrap gap-2">
                  <Select
                    value={review.status}
                    onValueChange={(status: ReviewFeedback["status"]) => onStatusUpdate(review.id, status)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(review.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add admin note..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (adminNote.trim()) {
                        onAddNote(review.id, adminNote.trim())
                        setAdminNote("")
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
