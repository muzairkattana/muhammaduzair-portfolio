"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Download,
  UserX,
  Calendar,
  Tag,
  Settings,
  Bell,
  Shield,
  Sparkles,
  Moon,
  Sun,
  Search,
  RefreshCw,
  ImageIcon,
  Send,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useSound } from "./sound-provider"
import Image from "next/image"

interface Feedback {
  id: string
  rating: number
  text: string
  tags: string[]
  images: string[]
  userName: string
  isAnonymous: boolean
  timestamp: Date
  isApproved: boolean
  upvotes: number
  hasUpvoted: boolean
  language: "en" | "ur"
  aiSummary?: string
  autoTags?: string[]
}

const availableTags = [
  { id: "bug", label: "Bug", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
  { id: "feature", label: "Feature Request", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
  { id: "ui-ux", label: "UI/UX", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" },
  {
    id: "performance",
    label: "Performance",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  },
  { id: "suggestion", label: "Suggestion", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
  { id: "design", label: "Design", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100" },
  { id: "content", label: "Content", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
  {
    id: "accessibility",
    label: "Accessibility",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  },
]

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
]

export default function TestPilotFeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating" | "upvotes">("newest")
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "ur">("en")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const { toast } = useToast()
  const { playSound } = useSound()

  // Form state
  const [formData, setFormData] = useState({
    rating: 5,
    text: "",
    tags: [] as string[],
    images: [] as File[],
    userName: "",
    isAnonymous: false,
    language: "en" as "en" | "ur",
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockFeedbacks: Feedback[] = [
      {
        id: "1",
        rating: 5,
        text: "Amazing portfolio! The AI assistant is incredibly helpful and the design is stunning. Love the interactive elements and smooth animations.",
        tags: ["ui-ux", "design"],
        images: [],
        userName: "Sarah Johnson",
        isAnonymous: false,
        timestamp: new Date("2024-01-15"),
        isApproved: true,
        upvotes: 12,
        hasUpvoted: false,
        language: "en",
        aiSummary: "Positive feedback about AI assistant and design quality",
        autoTags: ["positive", "ai", "design"],
      },
      {
        id: "2",
        rating: 4,
        text: "Great work! Could use better mobile optimization for the contact form. Overall very impressive portfolio.",
        tags: ["suggestion", "performance"],
        images: [],
        userName: "Anonymous",
        isAnonymous: true,
        timestamp: new Date("2024-01-10"),
        isApproved: true,
        upvotes: 8,
        hasUpvoted: false,
        language: "en",
        aiSummary: "Positive feedback with mobile optimization suggestion",
      },
      {
        id: "3",
        rating: 5,
        text: "بہترین پورٹ فولیو! ڈیزائن اور فیچرز دونوں شاندار ہیں۔ AI اسسٹنٹ بہت مددگار ہے۔",
        tags: ["design", "feature"],
        images: [],
        userName: "احمد علی",
        isAnonymous: false,
        timestamp: new Date("2024-01-08"),
        isApproved: true,
        upvotes: 15,
        hasUpvoted: false,
        language: "ur",
        aiSummary: "Excellent portfolio with great design and AI assistant",
      },
    ]
    setFeedbacks(mockFeedbacks)
  }, [])

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate reCAPTCHA validation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate AI processing
    const aiSummary = `${formData.rating >= 4 ? "Positive" : formData.rating >= 3 ? "Neutral" : "Negative"} feedback about ${formData.tags.join(", ")}`
    const autoTags = formData.rating >= 4 ? ["positive"] : formData.rating >= 3 ? ["neutral"] : ["negative"]

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date(),
      isApproved: false, // Requires admin approval
      upvotes: 0,
      hasUpvoted: false,
      aiSummary,
      autoTags,
      images: formData.images.map((file) => URL.createObjectURL(file)),
    }

    setFeedbacks([newFeedback, ...feedbacks])
    setFormData({
      rating: 5,
      text: "",
      tags: [],
      images: [],
      userName: "",
      isAnonymous: false,
      language: "en",
    })
    setShowFeedbackForm(false)
    setIsLoading(false)

    toast({
      title: currentLanguage === "en" ? "Feedback Submitted!" : "فیڈبیک جمع کر دیا گیا!",
      description:
        currentLanguage === "en"
          ? "Thank you for your feedback. It will be reviewed and published soon."
          : "آپ کے فیڈبیک کے لیے شکریہ۔ اسے جلد ہی ریویو کر کے پبلش کیا جائے گا۔",
    })
    playSound("success")
  }

  const handleUpvote = (feedbackId: string) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              upvotes: feedback.hasUpvoted ? feedback.upvotes - 1 : feedback.upvotes + 1,
              hasUpvoted: !feedback.hasUpvoted,
            }
          : feedback,
      ),
    )
    playSound("click")
  }

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin panel!",
      })
      playSound("success")
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password",
        variant: "destructive",
      })
      playSound("error")
    }
  }

  const handleApproveFeedback = (feedbackId: string) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === feedbackId ? { ...feedback, isApproved: !feedback.isApproved } : feedback,
      ),
    )
    playSound("click")
  }

  const handleDeleteFeedback = (feedbackId: string) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== feedbackId))
    playSound("click")
  }

  const exportFeedbacks = (format: "csv" | "json") => {
    const data = feedbacks.map((feedback) => ({
      id: feedback.id,
      rating: feedback.rating,
      text: feedback.text,
      tags: feedback.tags.join(", "),
      userName: feedback.isAnonymous ? "Anonymous" : feedback.userName,
      timestamp: feedback.timestamp.toISOString(),
      upvotes: feedback.upvotes,
      language: feedback.language,
    }))

    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "feedbacks.json"
      a.click()
    } else {
      const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "feedbacks.csv"
      a.click()
    }
    playSound("success")
  }

  const filteredFeedbacks = feedbacks
    .filter((feedback) => (isAdmin ? true : feedback.isApproved))
    .filter((feedback) => (filterRating ? feedback.rating === filterRating : true))
    .filter((feedback) => (filterTag ? feedback.tags.includes(filterTag) : true))
    .filter((feedback) => (searchQuery ? feedback.text.toLowerCase().includes(searchQuery.toLowerCase()) : true))
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.timestamp.getTime() - a.timestamp.getTime()
        case "oldest":
          return a.timestamp.getTime() - b.timestamp.getTime()
        case "rating":
          return b.rating - a.rating
        case "upvotes":
          return b.upvotes - a.upvotes
        default:
          return 0
      }
    })

  const stats = {
    total: feedbacks.length,
    approved: feedbacks.filter((f) => f.isApproved).length,
    pending: feedbacks.filter((f) => !f.isApproved).length,
    averageRating: feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length || 0,
    totalUpvotes: feedbacks.reduce((acc, f) => acc + f.upvotes, 0),
  }

  const text = {
    en: {
      title: "Feedback & Reviews",
      subtitle: "Share your experience and help us improve",
      submitFeedback: "Submit Feedback",
      rating: "Rating",
      feedback: "Your Feedback",
      tags: "Tags",
      uploadImages: "Upload Images",
      userName: "Your Name",
      anonymous: "Submit Anonymously",
      language: "Language",
      submit: "Submit Feedback",
      helpful: "Was this helpful?",
      admin: "Admin Panel",
      login: "Login",
      approve: "Approve",
      delete: "Delete",
      export: "Export",
      stats: "Statistics",
      filter: "Filter",
      search: "Search feedbacks...",
      sort: "Sort by",
    },
    ur: {
      title: "فیڈبیک اور جائزے",
      subtitle: "اپنا تجربہ شیئر کریں اور ہمیں بہتر بنانے میں مدد کریں",
      submitFeedback: "فیڈبیک جمع کریں",
      rating: "ریٹنگ",
      feedback: "آپ کا فیڈبیک",
      tags: "ٹیگز",
      uploadImages: "تصاویر اپ لوڈ کریں",
      userName: "آپ کا نام",
      anonymous: "گمنام طور پر جمع کریں",
      language: "زبان",
      submit: "فیڈبیک جمع کریں",
      helpful: "کیا یہ مددگار تھا؟",
      admin: "ایڈمن پینل",
      login: "لاگ ان",
      approve: "منظور کریں",
      delete: "ڈیلیٹ کریں",
      export: "ایکسپورٹ",
      stats: "اعداد و شمار",
      filter: "فلٹر",
      search: "فیڈبیک تلاش کریں...",
      sort: "ترتیب دیں",
    },
  }

  const t = text[currentLanguage]

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 rounded-full px-4 py-2 mb-6">
            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">TestPilot Feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>

          {/* Language & Theme Toggle */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Select value={currentLanguage} onValueChange={(value: "en" | "ur") => setCurrentLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Admin Login */}
            <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Shield className="h-4 w-4" />
                  {t.admin}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <Button onClick={handleAdminLogin} className="w-full">
                    {t.login}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="submit">Submit</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>

            {/* Feedback Display */}
            <TabsContent value="feedback" className="space-y-6">
              {/* Filters */}
              <Card className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t.search}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>

                  <Select
                    value={filterRating?.toString() || "all"}
                    onValueChange={(value) => setFilterRating(value === "all" ? null : Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterTag || "all"}
                    onValueChange={(value) => setFilterTag(value === "all" ? null : value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {availableTags.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="upvotes">Upvotes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              {/* Feedback Cards */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredFeedbacks.map((feedback) => (
                    <motion.div
                      key={feedback.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group"
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                {feedback.isAnonymous ? (
                                  <UserX className="h-5 w-5" />
                                ) : (
                                  feedback.userName.charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{feedback.isAnonymous ? "Anonymous" : feedback.userName}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {feedback.timestamp.toLocaleDateString()}
                                  {feedback.language === "ur" && <span className="text-xs">🇵🇰</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Rating */}
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>

                              {/* Admin Actions */}
                              {isAdmin && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleApproveFeedback(feedback.id)}
                                    className={feedback.isApproved ? "text-green-600" : "text-gray-400"}
                                  >
                                    {feedback.isApproved ? (
                                      <CheckCircle className="h-4 w-4" />
                                    ) : (
                                      <Clock className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteFeedback(feedback.id)}
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Feedback Text */}
                          <p className={`mb-4 leading-relaxed ${feedback.language === "ur" ? "text-right" : ""}`}>
                            {feedback.text}
                          </p>

                          {/* AI Summary */}
                          {feedback.aiSummary && isAdmin && (
                            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-600">AI Summary</span>
                              </div>
                              <p className="text-sm text-blue-700 dark:text-blue-300">{feedback.aiSummary}</p>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {feedback.tags.map((tagId) => {
                              const tag = availableTags.find((t) => t.id === tagId)
                              return (
                                <Badge key={tagId} className={tag?.color}>
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag?.label}
                                </Badge>
                              )
                            })}
                            {feedback.autoTags?.map((autoTag) => (
                              <Badge key={autoTag} variant="outline" className="text-xs">
                                <Sparkles className="h-3 w-3 mr-1" />
                                {autoTag}
                              </Badge>
                            ))}
                          </div>

                          {/* Images */}
                          {feedback.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                              {feedback.images.map((image, index) => (
                                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                                  <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`Feedback image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUpvote(feedback.id)}
                              className={`flex items-center gap-2 ${
                                feedback.hasUpvoted ? "text-blue-600" : "text-muted-foreground"
                              }`}
                            >
                              <ThumbsUp className={`h-4 w-4 ${feedback.hasUpvoted ? "fill-current" : ""}`} />
                              {t.helpful} ({feedback.upvotes})
                            </Button>

                            {!feedback.isApproved && (
                              <Badge variant="outline" className="text-orange-600 border-orange-200">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending Approval
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredFeedbacks.length === 0 && (
                  <Card className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No feedback found matching your criteria.</p>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Submit Feedback */}
            <TabsContent value="submit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    {t.submitFeedback}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitFeedback} className="space-y-6">
                    {/* Rating */}
                    <div className="space-y-2">
                      <Label>{t.rating}</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                rating <= formData.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 hover:text-yellow-200"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Text */}
                    <div className="space-y-2">
                      <Label htmlFor="feedback">{t.feedback}</Label>
                      <Textarea
                        id="feedback"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder={
                          currentLanguage === "en"
                            ? "Share your thoughts, suggestions, or report issues..."
                            : "اپنے خیالات، تجاویز، یا مسائل کی رپورٹ کریں..."
                        }
                        rows={4}
                        required
                        className={formData.language === "ur" ? "text-right" : ""}
                      />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label>{t.tags}</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => {
                              const newTags = formData.tags.includes(tag.id)
                                ? formData.tags.filter((t) => t !== tag.id)
                                : [...formData.tags, tag.id]
                              setFormData({ ...formData, tags: newTags })
                            }}
                            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                              formData.tags.includes(tag.id)
                                ? "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100"
                                : "border-gray-300 hover:border-blue-300 dark:border-gray-600 dark:hover:border-blue-600"
                            }`}
                          >
                            {tag.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>{t.uploadImages}</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/png,image/jpg,image/jpeg,image/webp"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            setFormData({ ...formData, images: files })
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload images (PNG, JPG, WebP)</p>
                        </label>
                        {formData.images.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {formData.images.map((file, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                                  alt={`Upload ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newImages = formData.images.filter((_, i) => i !== index)
                                    setFormData({ ...formData, images: newImages })
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userName">{t.userName}</Label>
                        <Input
                          id="userName"
                          value={formData.userName}
                          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                          placeholder={currentLanguage === "en" ? "Your name (optional)" : "آپ کا نام (اختیاری)"}
                          disabled={formData.isAnonymous}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t.language}</Label>
                        <Select
                          value={formData.language}
                          onValueChange={(value: "en" | "ur") => setFormData({ ...formData, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.flag} {lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Anonymous Toggle */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked })}
                      />
                      <Label htmlFor="anonymous">{t.anonymous}</Label>
                    </div>

                    {/* reCAPTCHA Placeholder */}
                    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-sm">reCAPTCHA verification (simulated)</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={isLoading || !formData.text.trim()} className="w-full">
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t.submit}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Admin Panel */}
            {isAdmin && (
              <TabsContent value="admin" className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.averageRating.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">{stats.totalUpvotes}</div>
                    <div className="text-sm text-muted-foreground">Total Upvotes</div>
                  </Card>
                </div>

                {/* Admin Actions */}
                <Card className="p-4">
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => exportFeedbacks("csv")} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button onClick={() => exportFeedbacks("json")} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                    <Button variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </Card>

                {/* Rating Distribution */}
                <Card className="p-6">
                  <CardTitle className="mb-4">Rating Distribution</CardTitle>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = feedbacks.filter((f) => f.rating === rating).length
                      const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0
                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1 w-16">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </div>
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-12">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
