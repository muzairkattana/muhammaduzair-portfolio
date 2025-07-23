"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Send,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  User,
  ChevronDown,
  Settings,
  RefreshCw,
  Copy,
  Check,
  Save,
  Download,
  HelpCircle,
  MessageSquare,
  Clock,
  Search,
  ChevronUp,
  Loader2,
  Phone,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isImportant?: boolean
  category?: string
}

// Define the SpeechRecognition type for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResult {
  transcript: string
  isFinal: boolean
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
  item(index: number): SpeechRecognitionResult
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
}

// Updated Voice API configuration
const VOICE_API_KEY = "sk_d9ac4149e5b1107c542325f8a645351695f26748bf610a3f"
const VOICE_ID = "EkK5I93UQWFDigLMpZcX"

// Predefined quick responses
const quickResponses = [
  "Tell me about your skills",
  "What projects have you worked on?",
  "How can I contact you?",
  "What certificates do you have?",
  "What services do you offer?",
  "Tell me about your experience",
]

// Knowledge base for the assistant
const knowledgeBase = {
  skills: [
    "Frontend Development: React, Next.js, HTML5, CSS3, JavaScript, TypeScript",
    "Backend Development: Node.js, Express, MongoDB, PostgreSQL",
    "UI/UX Design: Figma, Adobe XD, Responsive Design",
    "E-commerce: Amazon FBA, Shopify, WooCommerce",
    "Other: Git, Docker, AWS, SEO, Digital Marketing",
  ],
  projects: [
    "3D Model Generator: AI-powered 3D model generation with advanced visualization",
    "Modern E-commerce Platform: Built with Next.js, Tailwind CSS, and Stripe",
    "Portfolio Website: Interactive personal portfolio with advanced animations",
    "Shop Management System: Inventory and sales tracking application",
    "AI-powered Content Generator: Using OpenAI's GPT models",
    "Data Visualization Dashboard: Real-time analytics and reporting",
  ],
  certificates: [
    "Business Acumen (Expert Level)",
    "AI for Beginners (Intermediate Level)",
    "Data Science & Analytics (Advanced Level)",
    "Problem Solving and Decision Making (Expert Level)",
    "Cybersecurity Awareness (Beginner Level)",
    "Resume Writing (Intermediate Level)",
  ],
  services: [
    "Web Development: Custom websites and web applications",
    "E-commerce Solutions: Online store setup and optimization",
    "UI/UX Design: User-centered design and prototyping",
    "Amazon FBA Consulting: Product research, listing optimization, and PPC campaigns",
    "Digital Marketing: SEO, content marketing, and social media strategy",
  ],
  contact: {
    email: "kmuzairkhan123@gmail.com",
    phone: "+923433885835",
    location: "Takht-Bhai, Mardan, Khyber PakhtoonKhwa Pakistan",
    facebook: "https://www.facebook.com/share/1BaofcJxgo/",
    linkedin: "https://www.linkedin.com/in/muhammad-uzair-1b7ba8275",
    github: "https://github.com/muzairkattana",
  },
  experience: [
    "Freelance Web Developer (2020-Present): Building custom websites and web applications for clients",
    "Amazon FBA Seller (2019-Present): Managing and growing an e-commerce business on Amazon",
    "Digital Marketing Specialist (2018-2020): SEO, content marketing, and social media management",
    "UI/UX Designer (2017-2018): Creating user-centered designs and prototypes",
  ],
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Muhammad Uzair's Assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [searchQuery, setSearchQuery] = useState("")
  const [voiceSpeed, setVoiceSpeed] = useState(1)
  const [voicePitch, setVoicePitch] = useState(1)
  const [autoRead, setAutoRead] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [conversationHistory, setConversationHistory] = useState<{ id: string; title: string; date: Date }[]>([
    { id: "current", title: "Current Conversation", date: new Date() },
  ])
  const [autoClose, setAutoClose] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [showScrollButtons, setShowScrollButtons] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Enhanced click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        // Check if the click is on the chatbot button
        const chatButton = document.querySelector("[data-chatbot-button]")
        if (chatButton && chatButton.contains(event.target as Node)) {
          return // Don't close if clicking the button
        }
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Auto-close when cursor is removed
  useEffect(() => {
    if (autoClose && !isHovering && isOpen) {
      autoCloseTimeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 5000)
    }

    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current)
      }
    }
  }, [isHovering, autoClose, isOpen])

  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollAreaRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollAreaRef.current
        setShowScrollButtons(scrollHeight > clientHeight)
        setScrollPosition(scrollTop)
      }
    }

    const scrollElement = scrollAreaRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollable)
      checkScrollable()
    }

    window.addEventListener("resize", checkScrollable)

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScrollable)
      }
      window.removeEventListener("resize", checkScrollable)
    }
  }, [messages])

  // Initialize speech recognition and synthesis with improved error handling
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      try {
        // Check if browser supports speech recognition
        const SpeechRecognitionAPI =
          window.SpeechRecognition ||
          (window as any).webkitSpeechRecognition ||
          (window as any).mozSpeechRecognition ||
          (window as any).msSpeechRecognition

        if (SpeechRecognitionAPI) {
          setSpeechSupported(true)
          recognitionRef.current = new SpeechRecognitionAPI() as SpeechRecognition
          recognitionRef.current.continuous = true
          recognitionRef.current.interimResults = true
          recognitionRef.current.lang = "en-US"

          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = ""

            for (let i = 0; i < event.results.length; i++) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript
              }
            }

            if (finalTranscript) {
              setInput(finalTranscript.trim())
            }
          }

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error", event)
            setIsListening(false)
            setError("Speech recognition error. Please try again.")
            setTimeout(() => setError(null), 3000)
          }

          recognitionRef.current.onend = () => {
            setIsListening(false)
          }
        } else {
          console.log("Speech recognition not supported in this browser")
          setSpeechSupported(false)
        }

        // Initialize speech synthesis with improved error handling
        if (synth) {
          const loadVoices = () => {
            const voices = synth.getVoices()
            setAvailableVoices(voices)

            // Set voice with specific ID or default voice
            const specificVoice = voices.find((voice) => voice.voiceURI === VOICE_ID || voice.name.includes(VOICE_ID))
            const defaultVoice =
              specificVoice ||
              voices.find((voice) => voice.lang.includes("en") && voice.name.toLowerCase().includes("female")) ||
              voices.find((voice) => voice.lang.includes("en")) ||
              voices[0]

            if (defaultVoice) {
              setSelectedVoice(defaultVoice)
            }
          }

          // Chrome loads voices asynchronously
          if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices
          }

          // Initial load attempt
          loadVoices()
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error initializing speech features:", error)
        setError("Failed to initialize speech features")
        setTimeout(() => setError(null), 3000)
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          console.error("Error stopping speech recognition:", error)
        }
      }
      if (synth) {
        synth.cancel()
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [isInitialized, synth])

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current || !speechSupported) {
      setError("Speech recognition not supported")
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      if (isListening) {
        recognitionRef.current.stop()
        setIsListening(false)
      } else {
        recognitionRef.current.start()
        setIsListening(true)
        setError(null)
      }
    } catch (error) {
      console.error("Error toggling speech recognition:", error)
      setError("Failed to start speech recognition")
      setTimeout(() => setError(null), 3000)
      setIsListening(false)
    }
  }, [isListening, speechSupported])

  const speakText = useCallback(
    (text: string) => {
      if (!synth) {
        setError("Text-to-speech not supported")
        setTimeout(() => setError(null), 3000)
        return
      }

      try {
        // Cancel any ongoing speech
        synth.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = voiceSpeed
        utterance.pitch = voicePitch
        utterance.volume = 1

        // Set selected voice if available
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)

        // Improved error handling for speech synthesis
        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event)
          setIsSpeaking(false)

          // Only show error for actual failures, not interruptions
          if (event.error && event.error !== "interrupted" && event.error !== "canceled") {
            console.warn(`Speech synthesis error: ${event.error}`)
            // Don't show user-facing error for common speech issues
            // setError("Text-to-speech temporarily unavailable")
            // setTimeout(() => setError(null), 3000)
          }
        }

        synth.speak(utterance)
      } catch (error) {
        console.error("Error speaking text:", error)
        setError("Failed to speak text")
        setTimeout(() => setError(null), 3000)
      }
    },
    [synth, voiceSpeed, voicePitch, selectedVoice],
  )

  const toggleSpeech = useCallback(
    (messageContent?: string) => {
      if (isSpeaking) {
        if (synth) synth.cancel()
        setIsSpeaking(false)
      } else {
        const textToSpeak =
          messageContent ||
          [...messages].reverse().find((m) => m.role === "assistant")?.content ||
          "No message to speak"
        speakText(textToSpeak)
      }
    },
    [isSpeaking, synth, messages, speakText],
  )

  const simulateTyping = useCallback((text: string, callback: () => void) => {
    let i = 0
    setIsTyping(true)
    setTypingText("")

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }

    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setTypingText((prev) => prev + text.charAt(i))
        i++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
        }
        setIsTyping(false)
        setTypingText("")
        callback()
      }
    }, 15)
  }, [])

  const handleVoiceCall = useCallback(async () => {
    try {
      setIsVoiceCallActive(!isVoiceCallActive)

      if (!isVoiceCallActive) {
        console.log("Starting voice call with API key:", VOICE_API_KEY, "Voice ID:", VOICE_ID)

        const response = await fetch("/api/voice-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${VOICE_API_KEY}`,
          },
          body: JSON.stringify({
            action: "start_call",
            user_id: "user_123",
            voice_id: VOICE_ID,
          }),
        })

        if (response.ok) {
          speakText("Voice call started. How can I help you today?")
        } else {
          throw new Error("Failed to start voice call")
        }
      } else {
        if (synth) synth.cancel()
        console.log("Ending voice call")
      }
    } catch (error) {
      console.error("Voice call error:", error)
      setError("Voice call failed. Please try again.")
      setTimeout(() => setError(null), 3000)
      setIsVoiceCallActive(false)
    }
  }, [isVoiceCallActive, speakText, synth])

  const generateResponse = useCallback(
    (userInput: string): { response: string; category: string; isImportant: boolean } => {
      const input = userInput.toLowerCase().trim()

      if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
        return {
          response: "Hello! How can I assist you with Muhammad Uzair's portfolio today?",
          category: "greeting",
          isImportant: false,
        }
      }

      if (input.includes("who are you") || input.includes("your name")) {
        return {
          response:
            "I am Muhammad Uzair's Assistant, a virtual assistant designed to help you navigate through Muhammad Uzair's portfolio and answer any questions you might have about his work, skills, and experience.",
          category: "about",
          isImportant: false,
        }
      }

      if (input.includes("skills") || input.includes("what can you do") || input.includes("what can he do")) {
        return {
          response: "Muhammad Uzair has expertise in several areas including:\n\n" + knowledgeBase.skills.join("\n\n"),
          category: "skills",
          isImportant: false,
        }
      }

      if (
        input.includes("contact") ||
        input.includes("email") ||
        input.includes("reach") ||
        input.includes("get in touch") ||
        input.includes("phone") ||
        input.includes("number") ||
        input.includes("call")
      ) {
        return {
          response: `You can contact Muhammad Uzair via:
        
Email: ${knowledgeBase.contact.email}
Phone: ${knowledgeBase.contact.phone}
Location: ${knowledgeBase.contact.location}
LinkedIn: ${knowledgeBase.contact.linkedin}
GitHub: ${knowledgeBase.contact.github}
Facebook: ${knowledgeBase.contact.facebook}

You can also use the contact form on this portfolio website.`,
          category: "contact",
          isImportant: true,
        }
      }

      if (input.includes("project") || input.includes("work") || input.includes("portfolio")) {
        return {
          response:
            "Muhammad Uzair has worked on various projects including:\n\n" + knowledgeBase.projects.join("\n\n"),
          category: "projects",
          isImportant: false,
        }
      }

      if (input.includes("certificate") || input.includes("certification") || input.includes("qualification")) {
        return {
          response:
            "Muhammad Uzair has earned several professional certificates including:\n\n" +
            knowledgeBase.certificates.join("\n\n") +
            "\n\nYou can view any specific certificate in detail by clicking on it in the Certificates section.",
          category: "certificates",
          isImportant: false,
        }
      }

      if (input.includes("experience") || input.includes("background") || input.includes("history")) {
        return {
          response: "Muhammad Uzair's professional experience includes:\n\n" + knowledgeBase.experience.join("\n\n"),
          category: "experience",
          isImportant: false,
        }
      }

      if (input.includes("education") || input.includes("study") || input.includes("degree")) {
        return {
          response:
            "Muhammad Uzair has a strong educational background in computer science and business. He continuously enhances his knowledge through professional certifications and courses. His education has provided him with a solid foundation in both technical and business domains, enabling him to approach problems from multiple perspectives.",
          category: "education",
          isImportant: false,
        }
      }

      if (
        input.includes("service") ||
        input.includes("offer") ||
        input.includes("provide") ||
        input.includes("help with")
      ) {
        return {
          response: "Muhammad Uzair offers the following services:\n\n" + knowledgeBase.services.join("\n\n"),
          category: "services",
          isImportant: false,
        }
      }

      if (input.includes("thank")) {
        return {
          response:
            "You're welcome! If you have any other questions about Muhammad Uzair's portfolio, skills, or experience, feel free to ask. I'm here to help!",
          category: "thanks",
          isImportant: false,
        }
      }

      if (input.includes("hire") || input.includes("employ") || input.includes("job")) {
        return {
          response: `If you're interested in hiring Muhammad Uzair, you can:

1. Contact him directly at ${knowledgeBase.contact.email}
2. Call him at ${knowledgeBase.contact.phone}
3. Connect with him on LinkedIn: ${knowledgeBase.contact.linkedin}
4. Use the contact form on this portfolio website
5. Check out his GitHub for code samples: ${knowledgeBase.contact.github}

Muhammad Uzair is available for freelance projects, contract work, and full-time positions.`,
          category: "hiring",
          isImportant: true,
        }
      }

      if (input.includes("location") || input.includes("address") || input.includes("where")) {
        return {
          response: `Muhammad Uzair is based in ${knowledgeBase.contact.location}. He is available for remote work worldwide and in-person meetings in his local area.`,
          category: "location",
          isImportant: false,
        }
      }

      return {
        response:
          "Thank you for your question. Muhammad Uzair's portfolio showcases his expertise in web development, AI technologies, and business strategy. Could you please provide more details about what specific information you're looking for? I'd be happy to help you navigate through his work, skills, certifications, or contact information.",
        category: "general",
        isImportant: false,
      }
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault()
      if (!input.trim() || isLoading) return

      const userInput = input.trim()
      setInput("")
      setError(null)

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: userInput,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // Simulate AI thinking
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate response
        const { response, category, isImportant } = generateResponse(userInput)

        // Simulate typing effect
        simulateTyping(response, () => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: response,
            role: "assistant",
            timestamp: new Date(),
            category,
            isImportant,
          }

          setMessages((prev) => [...prev, assistantMessage])
          setIsLoading(false)

          // Automatically speak the response if auto-read is enabled
          if (autoRead) {
            speakText(response)
          }
        })
      } catch (error) {
        console.error("Error generating response:", error)
        setError("Failed to generate response. Please try again.")
        setIsLoading(false)
        setTimeout(() => setError(null), 3000)
      }
    },
    [input, isLoading, generateResponse, simulateTyping, autoRead, speakText],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const handleQuickResponse = useCallback((response: string) => {
    setInput(response)
    inputRef.current?.focus()
  }, [])

  const copyToClipboard = useCallback((text: string, messageId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedMessageId(messageId)
        setTimeout(() => setCopiedMessageId(null), 2000)
      })
      .catch((error) => {
        console.error("Failed to copy text:", error)
        setError("Failed to copy text")
        setTimeout(() => setError(null), 3000)
      })
  }, [])

  const clearConversation = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm Muhammad Uzair's Assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    setError(null)
  }, [])

  const saveConversation = useCallback(() => {
    try {
      const newConversationId = Date.now().toString()
      const title = messages.find((m) => m.role === "user")?.content.slice(0, 30) + "..." || "Saved Conversation"
      setConversationHistory((prev) => [...prev, { id: newConversationId, title, date: new Date() }])
    } catch (error) {
      console.error("Failed to save conversation:", error)
      setError("Failed to save conversation")
      setTimeout(() => setError(null), 3000)
    }
  }, [messages])

  const downloadConversation = useCallback(() => {
    try {
      const conversationText = messages
        .map((m) => `${m.role === "assistant" ? "Muhammad Uzair's Assistant" : "You"}: ${m.content}`)
        .join("\n\n")
      const blob = new Blob([conversationText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "conversation-with-muhammad-uzair-assistant.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download conversation:", error)
      setError("Failed to download conversation")
      setTimeout(() => setError(null), 3000)
    }
  }, [messages])

  const scrollToTop = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (scrollAreaRef.current) {
      setScrollPosition(scrollAreaRef.current.scrollTop)
    }
  }, [])

  const filteredMessages = searchQuery
    ? messages.filter(
        (m) =>
          m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : messages

  return (
    <>
      {/* Enhanced Chat button with gaming-style effects */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="relative">
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Highlight ring when available */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400/60"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <Button
            data-chatbot-button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-2xl relative overflow-hidden group p-0 border-2 border-white/20 transition-all duration-300 hover:shadow-primary/25 hover:shadow-2xl"
            size="icon"
          >
            <motion.div
              className={`absolute inset-0 transition-all duration-300 ${
                isButtonHovered ? "brightness-50 scale-110" : "brightness-100 scale-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/uzair-chatbot.jpg"
                alt="Muhammad Uzair Assistant"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            {/* Dark overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/40 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isButtonHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Gaming-style glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </Button>

          {/* Available badge */}
          <motion.div
            className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full border-2 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
          >
            Available
          </motion.div>
        </div>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed z-50 ${
              isExpanded
                ? "inset-2 sm:inset-4 md:inset-6 lg:inset-8"
                : "bottom-2 right-2 sm:bottom-6 sm:right-6 w-[calc(100vw-16px)] max-w-[95vw] sm:max-w-[400px] md:max-w-[420px] lg:max-w-[450px] h-[calc(100vh-120px)] max-h-[85vh] sm:max-h-[600px] md:max-h-[650px] lg:max-h-[700px]"
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={chatContainerRef}
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden h-full w-full flex flex-col bg-background/98 backdrop-blur-xl border border-border/50">
              <CardHeader className="p-3 sm:p-4 border-b flex flex-row items-center justify-between bg-gradient-to-r from-primary via-primary/90 to-primary/80 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white/20 flex-shrink-0">
                    <AvatarImage src="/images/uzair-chatbot.jpg" alt="Muhammad Uzair" className="object-cover" />
                    <AvatarFallback className="bg-primary-foreground text-primary text-xs sm:text-sm">
                      MU
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                      Muhammad Uzair's Assistant
                    </h3>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs bg-white/10 text-white border-white/20 px-1 sm:px-2 py-0.5"
                      >
                        AI Powered
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs bg-green-500/20 text-green-300 border-green-500/30 px-1 sm:px-2 py-0.5"
                      >
                        Online
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/10 ${
                            isVoiceCallActive ? "bg-green-500/30" : ""
                          }`}
                          onClick={handleVoiceCall}
                        >
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isVoiceCallActive ? "End Voice Call" : "Start Voice Call"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/10"
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Assistant Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={clearConversation}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Clear Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={saveConversation}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={downloadConversation}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Chat
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setAutoClose(!autoClose)}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            Auto-close
                          </div>
                          <Switch checked={autoClose} onCheckedChange={setAutoClose} />
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help & FAQ
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/10"
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          {isExpanded ? (
                            <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          ) : (
                            <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isExpanded ? "Minimize" : "Maximize"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/10"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>

              {/* Error Alert */}
              {error && (
                <Alert className="m-2 border-destructive/50 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
                <TabsList className="w-full justify-start px-2 sm:px-4 pt-2 bg-background flex-shrink-0">
                  <TabsTrigger value="chat" className="flex items-center gap-1 text-xs sm:text-sm">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-1 text-xs sm:text-sm">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">History</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 min-h-0">
                  <div className="p-2 sm:p-4 border-b flex items-center gap-2 flex-shrink-0">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search in conversation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    />
                    {searchQuery && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSearchQuery("")}>
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  <div className="relative flex-1 min-h-0">
                    {/* Scroll buttons */}
                    <Button
                      onClick={scrollToTop}
                      className={`absolute top-2 right-2 z-10 h-8 w-8 rounded-full opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm ${
                        showScrollButtons && scrollPosition > 50 ? "block" : "hidden"
                      }`}
                      size="icon"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={scrollToBottom}
                      className={`absolute bottom-2 right-2 z-10 h-8 w-8 rounded-full opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm ${
                        showScrollButtons &&
                        scrollAreaRef.current &&
                        scrollAreaRef.current.scrollHeight -
                          scrollAreaRef.current.scrollTop -
                          scrollAreaRef.current.clientHeight >
                          50
                          ? "block"
                          : "hidden"
                      }`}
                      size="icon"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>

                    <ScrollArea className="flex-1 p-2 sm:p-4 h-full" ref={scrollAreaRef as any} onScroll={handleScroll}>
                      <div className="space-y-4">
                        {filteredMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-3 group relative ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : message.isImportant
                                    ? "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                                    : "bg-muted"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {message.role === "assistant" ? (
                                  <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                    <AvatarImage
                                      src="/images/uzair-chatbot.jpg"
                                      alt="Muhammad Uzair"
                                      className="object-cover"
                                    />
                                    <AvatarFallback className="text-xs">MU</AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                                <span className="text-[10px] sm:text-xs opacity-70">
                                  {message.role === "assistant" ? "Muhammad Uzair's Assistant" : "You"}
                                </span>
                                {message.category && (
                                  <Badge variant="outline" className="text-[8px] sm:text-[10px] h-3 sm:h-4 px-1">
                                    {message.category}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                                {message.content}
                              </p>
                              <div className="text-[10px] sm:text-xs opacity-50 mt-1 text-right">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </div>

                              {/* Message actions */}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-1">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 sm:h-6 sm:w-6"
                                          onClick={() => copyToClipboard(message.content, message.id)}
                                        >
                                          {copiedMessageId === message.id ? (
                                            <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                                          ) : (
                                            <Copy className="h-2 w-2 sm:h-3 sm:w-3" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        <p>Copy message</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  {message.role === "assistant" && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 sm:h-6 sm:w-6"
                                            onClick={() => toggleSpeech(message.content)}
                                          >
                                            {isSpeaking ? (
                                              <VolumeX className="h-2 w-2 sm:h-3 sm:w-3" />
                                            ) : (
                                              <Volume2 className="h-2 w-2 sm:h-3 sm:w-3" />
                                            )}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                          <p>{isSpeaking ? "Stop speaking" : "Read aloud"}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                  <AvatarImage
                                    src="/images/uzair-chatbot.jpg"
                                    alt="Muhammad Uzair"
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="text-xs">MU</AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] sm:text-xs opacity-70">Muhammad Uzair's Assistant</span>
                              </div>
                              <p className="text-xs sm:text-sm whitespace-pre-wrap">
                                {typingText}
                                <span className="animate-pulse">|</span>
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Loading indicator */}
                        {isLoading && !isTyping && (
                          <div className="flex justify-start">
                            <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                  <AvatarImage
                                    src="/images/uzair-chatbot.jpg"
                                    alt="Muhammad Uzair"
                                    className="object-cover"
                                  />
                                  <AvatarFallback className="text-xs">MU</AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] sm:text-xs opacity-70">Muhammad Uzair's Assistant</span>
                              </div>
                              <div className="flex space-x-1 items-center">
                                <div
                                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Quick responses */}
                  <div className="px-2 sm:px-4 py-2 border-t flex-shrink-0">
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                      {quickResponses.map((response) => (
                        <Button
                          key={response}
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap text-xs bg-transparent"
                          onClick={() => handleQuickResponse(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <CardFooter className="p-2 sm:p-4 border-t flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex w-full gap-2">
                      <div className="flex-1 relative">
                        <Textarea
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message..."
                          className="min-h-[3rem] max-h-32 resize-none text-sm sm:text-base pr-12 border-border/50"
                          disabled={isLoading}
                          rows={1}
                          style={{
                            height: "auto",
                            minHeight: "3rem",
                            maxHeight: "8rem",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1 sm:gap-2">
                        {speechSupported && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={toggleListening}
                                  className={`h-8 w-8 sm:h-10 sm:w-10 ${isListening ? "bg-red-100 dark:bg-red-900/30" : ""}`}
                                  disabled={isLoading}
                                >
                                  {isListening ? (
                                    <MicOff className="h-3 w-3 sm:h-4 sm:w-4" />
                                  ) : (
                                    <Mic className="h-3 w-3 sm:h-4 sm:w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{isListening ? "Stop listening" : "Start voice input"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className={`h-8 w-8 sm:h-10 sm:w-10 ${isSpeaking ? "bg-primary/20" : ""}`}
                            >
                              {isSpeaking ? (
                                <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent side="top" align="end" className="w-80">
                            <div className="space-y-4">
                              <h4 className="font-medium">Voice Settings</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="auto-read">Auto-read responses</Label>
                                  <Switch id="auto-read" checked={autoRead} onCheckedChange={setAutoRead} />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="voice-select">Voice</Label>
                                  <select
                                    id="voice-select"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={selectedVoice?.name || ""}
                                    onChange={(e) => {
                                      const selectedVoiceName = e.target.value
                                      const voice = availableVoices.find((v) => v.name === selectedVoiceName)
                                      if (voice) setSelectedVoice(voice)
                                    }}
                                  >
                                    {availableVoices.map((voice) => (
                                      <option key={voice.name} value={voice.name}>
                                        {voice.name} ({voice.lang})
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="voice-speed">Speed: {voiceSpeed.toFixed(1)}x</Label>
                                  </div>
                                  <Slider
                                    id="voice-speed"
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    value={[voiceSpeed]}
                                    onValueChange={(value) => setVoiceSpeed(value[0])}
                                  />
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="voice-pitch">Pitch: {voicePitch.toFixed(1)}</Label>
                                  </div>
                                  <Slider
                                    id="voice-pitch"
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    value={[voicePitch]}
                                    onValueChange={(value) => setVoicePitch(value[0])}
                                  />
                                </div>

                                <div className="pt-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full bg-transparent"
                                    onClick={() => {
                                      if (isSpeaking) {
                                        if (synth) synth.cancel()
                                        setIsSpeaking(false)
                                      } else {
                                        const testText =
                                          "Hello, I'm Muhammad Uzair's Assistant. How can I help you today?"
                                        speakText(testText)
                                      }
                                    }}
                                  >
                                    {isSpeaking ? "Stop Test" : "Test Voice"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !input.trim()}
                          className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        >
                          {isLoading ? (
                            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          ) : (
                            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardFooter>
                </TabsContent>

                <TabsContent value="history" className="flex-1 p-0 m-0 min-h-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      <h3 className="font-medium text-sm text-muted-foreground">Recent Conversations</h3>
                      {conversationHistory.map((conversation) => (
                        <div
                          key={conversation.id}
                          className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{conversation.title}</p>
                              <p className="text-xs text-muted-foreground">{conversation.date.toLocaleDateString()}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
