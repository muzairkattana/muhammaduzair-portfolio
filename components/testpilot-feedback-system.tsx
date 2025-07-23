"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Upload,
  X,
  ThumbsUp,
  Download,
  Eye,
  Trash2,
  Check,
  MessageSquare,
  Tag,
  Calendar,
  Globe,
  Shield,
  Clock,
  Search,
  Bot,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Feedback {
  id: string
  rating: number
  text: string
  tags: string[]
  userName: string
  isAnonymous: boolean
  timestamp: Date
  status: "pending" | "approved" | "rejected"
  upvotes: number
  language: "en" | "ur"
  images?: string[]
  aiSummary?: string
  autoTags?: string[]
}

const AVAILABLE_TAGS = [
  "Bug",
  "Feature Request",
  "UI/UX",
  "Performance",
  "Suggestion",
  "Design",
  "Content",
  "Navigation",
  "Mobile",
  "Accessibility",
]

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
]

export default function TestPilotFeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [filterRating, setFilterRating] = useState("all")
  const [filterTag, setFilterTag] = useState("all")
  const [filterStatus, setFilterStatus] = useState("approved")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ur">("en")

  // Form state
  const [formData, setFormData] = useState({
    rating: 0,
    text: "",
    tags: [] as string[],
    userName: "",
    isAnonymous: false,
    images: [] as string[],
  })

  // Sample data
  useEffect(() => {
    const sampleFeedbacks: Feedback[] = [
      {
        id: "1",
        rating: 5,
        text: "Amazing portfolio! The design is modern and the animations are smooth.",
        tags: ["UI/UX", "Design"],
        userName: "Sarah Johnson",
        isAnonymous: false,
        timestamp: new Date("2024-01-15"),
        status: "approved",
        upvotes: 12,
        language: "en",
        aiSummary: "Positive feedback about design and animations",
        autoTags: ["Positive", "Design"],
      },
      {
        id: "2",
        rating: 4,
        text: "Great work! Could use better mobile optimization.",
        tags: ["Mobile", "Suggestion"],
        userName: "Anonymous",
        isAnonymous: true,
        timestamp: new Date("2024-01-14"),
        status: "approved",
        upvotes: 8,
        language: "en",
        aiSummary: "Positive with mobile improvement suggestion",
        autoTags: ["Mobile", "Improvement"],
      },
      {
        id: "3",
        rating: 5,
        text: "بہترین پورٹ فولیو! ڈیزائن اور فیچرز بہت اچھے ہیں۔",
        tags: ["Design", "Feature Request"],
        userName: "احمد علی",
        isAnonymous: false,
        timestamp: new Date("2024-01-13"),
        status: "approved",
        upvotes: 15,
        language: "ur",
        aiSummary: "Excellent portfolio with great design and features",
        autoTags: ["Positive", "Design"],
      },
    ]
    setFeedbacks(sampleFeedbacks)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.rating === 0 || !formData.text.trim()) return

    setIsSubmitting(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date(),
      status: "pending",
      upvotes: 0,
      language: selectedLanguage,
      aiSummary: generateAISummary(formData.text),
      autoTags: generateAutoTags(formData.text),
    }

    setFeedbacks((prev) => [newFeedback, ...prev])
    setFormData({
      rating: 0,
      text: "",
      tags: [],
      userName: "",
      isAnonymous: false,
      images: [],
    })
    setIsSubmitting(false)
  }

  const generateAISummary = (text: string): string => {
    if (text.includes("good") || text.includes("great") || text.includes("amazing")) {
      return "Positive feedback with appreciation"
    } else if (text.includes("bug") || text.includes("issue") || text.includes("problem")) {
      return "Bug report or technical issue"
    } else if (text.includes("suggest") || text.includes("improve") || text.includes("better")) {
      return "Improvement suggestion"
    }
    return "General feedback"
  }

  const generateAutoTags = (text: string): string[] => {
    const tags = []
    if (text.includes("mobile") || text.includes("phone")) tags.push("Mobile")
    if (text.includes("design") || text.includes("ui") || text.includes("ux")) tags.push("Design")
    if (text.includes("slow") || text.includes("fast") || text.includes("performance")) tags.push("Performance")
    if (text.includes("bug") || text.includes("error")) tags.push("Bug")
    return tags
  }

  const handleUpvote = (id: string) => {
    setFeedbacks((prev) =>
      prev.map((feedback) => (feedback.id === id ? { ...feedback, upvotes: feedback.upvotes + 1 } : feedback)),
    )
  }

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdminAuthenticated(true)
      setShowAdminPanel(true)
    }
  }

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setFeedbacks((prev) => prev.map((feedback) => (feedback.id === id ? { ...feedback, status } : feedback)))
  }

  const handleDelete = (id: string) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id))
  }

  const exportData = (format: "csv" | "json") => {
    const data = feedbacks.filter((f) => f.status === "approved")
    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "feedback-export.json"
      a.click()
    } else {
      const csv = [
        "Rating,Text,Tags,User,Date,Upvotes",
        ...data.map(
          (f) =>
            `${f.rating},"${f.text}","${f.tags.join(";")}",${f.userName},${f.timestamp.toISOString()},${f.upvotes}`,
        ),
      ].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "feedback-export.csv"
      a.click()
    }
  }

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filterStatus !== "all" && feedback.status !== filterStatus) return false
    if (filterRating !== "all" && feedback.rating !== Number.parseInt(filterRating)) return false
    if (filterTag !== "all" && !feedback.tags.includes(filterTag)) return false
    if (searchQuery && !feedback.text.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: feedbacks.length,
    approved: feedbacks.filter((f) => f.status === "approved").length,
    pending: feedbacks.filter((f) => f.status === "pending").length,
    averageRating: feedbacks.length > 0 ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length : 0,
  }

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: feedbacks.filter((f) => f.rating === rating && f.status === "approved").length,
  }))

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TestPilot Feedback System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your experience and help us improve. Your feedback drives our innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Submit Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Language Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Language / زبان</Label>
                    <Select value={selectedLanguage} onValueChange={(value: "en" | "ur") => setSelectedLanguage(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {selectedLanguage === "en" ? "Rating" : "ریٹنگ"}
                    </Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {selectedLanguage === "en" ? "Your Feedback" : "آپ کی رائے"}
                    </Label>
                    <Textarea
                      value={formData.text}
                      onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                      placeholder={
                        selectedLanguage === "en"
                          ? "Share your thoughts, suggestions, or report issues..."
                          : "اپنے خیالات، تجاویز، یا مسائل شیئر کریں..."
                      }
                      className="min-h-[100px] resize-none"
                      dir={selectedLanguage === "ur" ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {selectedLanguage === "en" ? "Tags" : "ٹیگز"}
                    </Label>
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (value && !formData.tags.includes(value)) {
                          setFormData((prev) => ({ ...prev, tags: [...prev.tags, value] }))
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={selectedLanguage === "en" ? "Select tags..." : "ٹیگز منتخب کریں..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_TAGS.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800">
                          {tag}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                tags: prev.tags.filter((t) => t !== tag),
                              }))
                            }
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* User Name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">
                        {selectedLanguage === "en" ? "Your Name" : "آپ کا نام"}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={formData.isAnonymous}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAnonymous: checked }))}
                        />
                        <Label className="text-xs">{selectedLanguage === "en" ? "Anonymous" : "گمنام"}</Label>
                      </div>
                    </div>
                    <Input
                      value={formData.userName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
                      placeholder={selectedLanguage === "en" ? "Enter your name..." : "اپنا نام درج کریں..."}
                      disabled={formData.isAnonymous}
                      dir={selectedLanguage === "ur" ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      {selectedLanguage === "en" ? "Screenshots (Optional)" : "اسکرین شاٹس (اختیاری)"}
                    </Label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm text-muted-foreground">
                        {selectedLanguage === "en"
                          ? "Click to upload images (PNG, JPG, WebP)"
                          : "تصاویر اپ لوڈ کرنے کے لیے کلک کریں"}
                      </p>
                    </div>
                  </div>

                  {/* reCAPTCHA Simulation */}
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-blue-500 rounded flex items-center justify-center">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-sm">
                        {selectedLanguage === "en" ? "I'm not a robot" : "میں روبوٹ نہیں ہوں"}
                      </span>
                      <Shield className="h-5 w-5 text-blue-500 ml-auto" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || formData.rating === 0 || !formData.text.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {selectedLanguage === "en" ? "Processing..." : "پروسیسنگ..."}
                      </div>
                    ) : selectedLanguage === "en" ? (
                      "Submit Feedback"
                    ) : (
                      "فیڈبیک جمع کریں"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feedback Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Community Feedback
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {stats.approved} Reviews
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{stats.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-blue-500" />
                    <Input
                      placeholder="Search feedback..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterTag} onValueChange={setFilterTag}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {AVAILABLE_TAGS.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Feedback List */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {filteredFeedbacks.map((feedback) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              {feedback.isAnonymous ? "Anonymous" : feedback.userName}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {feedback.timestamp.toLocaleDateString()}
                            </span>
                            {feedback.language === "ur" && (
                              <Badge variant="outline" className="text-xs">
                                🇵🇰 اردو
                              </Badge>
                            )}
                          </div>
                          <Badge
                            variant={feedback.status === "approved" ? "default" : "secondary"}
                            className={
                              feedback.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {feedback.status}
                          </Badge>
                        </div>

                        <p className={`text-sm mb-3 ${feedback.language === "ur" ? "text-right" : "text-left"}`}>
                          {feedback.text}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {feedback.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-blue-100 text-blue-800">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                          {feedback.autoTags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-purple-100 text-purple-800">
                              <Bot className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* AI Summary */}
                        {feedback.aiSummary && (
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="h-4 w-4 text-purple-500" />
                              <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                                AI Summary
                              </span>
                            </div>
                            <p className="text-xs text-purple-600 dark:text-purple-400">{feedback.aiSummary}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleUpvote(feedback.id)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({feedback.upvotes})</span>
                          </button>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            <span>{feedback.language === "en" ? "English" : "اردو"}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredFeedbacks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No feedback found matching your filters.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Admin Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-red-200 dark:border-red-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!isAdminAuthenticated ? (
                <div className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter admin password..."
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                    />
                    <Button onClick={handleAdminLogin} variant="outline">
                      Login
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Demo password: admin123</p>
                </div>
              ) : (
                <Tabs defaultValue="dashboard" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="manage">Manage</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dashboard" className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total Feedback</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="flex items-center gap-3">
                          <Check className="h-8 w-8 text-green-500" />
                          <div>
                            <p className="text-2xl font-bold">{stats.approved}</p>
                            <p className="text-sm text-muted-foreground">Approved</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                        <div className="flex items-center gap-3">
                          <Clock className="h-8 w-8 text-yellow-500" />
                          <div>
                            <p className="text-2xl font-bold">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <div className="flex items-center gap-3">
                          <Star className="h-8 w-8 text-purple-500 fill-current" />
                          <div>
                            <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                            <p className="text-sm text-muted-foreground">Avg Rating</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="manage" className="space-y-4">
                    <div className="flex gap-4 mb-4">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {feedbacks.map((feedback) => (
                        <div key={feedback.id} className="p-4 border rounded-lg bg-white dark:bg-slate-800">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">
                                {feedback.isAnonymous ? "Anonymous" : feedback.userName}
                              </span>
                              <Badge
                                variant={
                                  feedback.status === "approved"
                                    ? "default"
                                    : feedback.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {feedback.status}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              {feedback.status !== "approved" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(feedback.id, "approved")}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {feedback.status !== "rejected" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(feedback.id, "rejected")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(feedback.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm mb-2">{feedback.text}</p>
                          <div className="flex flex-wrap gap-1">
                            {feedback.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
                      <div className="space-y-3">
                        {ratingDistribution.map(({ rating, count }) => (
                          <div key={rating} className="flex items-center gap-4">
                            <div className="flex items-center gap-1 w-20">
                              <span>{rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <Progress value={(count / stats.approved) * 100} className="h-2" />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="export" className="space-y-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-semibold">Export Feedback Data</h3>
                      <p className="text-muted-foreground">Download approved feedback in your preferred format</p>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={() => exportData("json")} variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export JSON
                        </Button>
                        <Button onClick={() => exportData("csv")} variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
