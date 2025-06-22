"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
  Bot,
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
  Sparkles,
  Zap,
  ChevronUp,
  Loader2,
  Gamepad2,
  ExternalLink,
  Phone,
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

// Voice API configuration
const VOICE_API_KEY = "sk_b9009a7d8232caabcae2625fa68ac5765b986c450cc5ca98"
const VOICE_ID = "RTFg9niKcgGLDwa3RFlz"

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

const availableGames = [
  {
    id: "deadshot",
    name: "Deadshot.io",
    url: "https://deadshot.io/",
    icon: "🎯",
    description: "Fast-paced multiplayer shooting game",
    category: "Action",
  },
]

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
  const [showGame, setShowGame] = useState(false)
  const [isVoiceCallActive, setIsVoiceCallActive] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const gameIframeRef = useRef<HTMLIFrameElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Auto-close when cursor is removed
  useEffect(() => {
    if (autoClose && !isHovering && isOpen && !showGame) {
      autoCloseTimeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 5000) // 5 seconds delay before closing
    }

    return () => {
      if (autoCloseTimeoutRef.current) {
        clearTimeout(autoCloseTimeoutRef.current)
      }
    }
  }, [isHovering, autoClose, isOpen, showGame])

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
    }

    checkScrollable()
    // Add resize event listener to check when window size changes
    window.addEventListener("resize", checkScrollable)

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScrollable)
      }
      window.removeEventListener("resize", checkScrollable)
    }
  }, [messages])

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
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

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = ""

          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }

          if (finalTranscript) {
            setInput(finalTranscript)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event)
          setIsListening(false)
        }
      } else {
        console.log("Speech recognition not supported in this browser")
        setSpeechSupported(false)
      }

      // Initialize speech synthesis
      if (synth) {
        // Load available voices
        const loadVoices = () => {
          const voices = synth.getVoices()
          setAvailableVoices(voices)

          // Set voice with specific ID or default voice
          const specificVoice = voices.find((voice) => voice.voiceURI === VOICE_ID)
          const defaultVoice =
            specificVoice ||
            voices.find((voice) => voice.lang.includes("en") && voice.name.includes("Female")) ||
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
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synth) {
        synth.cancel()
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  // Handle game iframe pointer lock
  useEffect(() => {
    const handleGameFocus = () => {
      if (gameIframeRef.current && showGame) {
        // Request pointer lock when game is focused
        gameIframeRef.current.requestPointerLock =
          gameIframeRef.current.requestPointerLock ||
          (gameIframeRef.current as any).mozRequestPointerLock ||
          (gameIframeRef.current as any).webkitRequestPointerLock

        if (gameIframeRef.current.requestPointerLock) {
          gameIframeRef.current.requestPointerLock()
        }
      }
    }

    if (showGame && gameIframeRef.current) {
      gameIframeRef.current.addEventListener("click", handleGameFocus)
      return () => {
        if (gameIframeRef.current) {
          gameIframeRef.current.removeEventListener("click", handleGameFocus)
        }
      }
    }
  }, [showGame])

  const toggleListening = () => {
    if (!recognitionRef.current || !speechSupported) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        // If there's an error (like recognition is already started), try stopping first
        try {
          recognitionRef.current.stop()
          setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.start()
              setIsListening(true)
            }
          }, 100)
        } catch (stopError) {
          console.error("Error stopping speech recognition:", stopError)
        }
      }
    }
  }

  const speakText = (text: string) => {
    if (!synth) return

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
    utterance.onerror = () => setIsSpeaking(false)

    synth.speak(utterance)
  }

  const toggleSpeech = (messageContent?: string) => {
    if (isSpeaking) {
      if (synth) synth.cancel()
      setIsSpeaking(false)
    } else {
      // Speak the provided message or the last assistant message
      const textToSpeak =
        messageContent || [...messages].reverse().find((m) => m.role === "assistant")?.content || "No message to speak"

      speakText(textToSpeak)
    }
  }

  const simulateTyping = (text: string, callback: () => void) => {
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
    }, 15) // Adjust speed as needed
  }

  const handleVoiceCall = async () => {
    setIsVoiceCallActive(!isVoiceCallActive)

    if (!isVoiceCallActive) {
      // Start voice call simulation
      try {
        // Here you would integrate with the voice API using the provided key
        console.log("Starting voice call with API key:", VOICE_API_KEY, "Voice ID:", VOICE_ID)

        // Simulate voice call functionality
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
          // Voice call started successfully
          speakText("Voice call started. How can I help you today?")
        }
      } catch (error) {
        console.error("Voice call error:", error)
        setIsVoiceCallActive(false)
      }
    } else {
      // End voice call
      if (synth) synth.cancel()
      console.log("Ending voice call")
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate response based on user input
    let response = ""
    let category = ""
    let isImportant = false
    const userInput = input.toLowerCase().trim()

    if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("hey")) {
      response = "Hello! How can I assist you with Muhammad Uzair's portfolio today?"
    } else if (userInput.includes("who are you") || userInput.includes("your name")) {
      response =
        "I am Muhammad Uzair's Assistant, a virtual assistant designed to help you navigate through Muhammad Uzair's portfolio and answer any questions you might have about his work, skills, and experience."
      category = "about"
    } else if (
      userInput.includes("skills") ||
      userInput.includes("what can you do") ||
      userInput.includes("what can he do")
    ) {
      response = "Muhammad Uzair has expertise in several areas including:\n\n" + knowledgeBase.skills.join("\n\n")
      category = "skills"
    } else if (
      userInput.includes("contact") ||
      userInput.includes("email") ||
      userInput.includes("reach") ||
      userInput.includes("get in touch") ||
      userInput.includes("phone") ||
      userInput.includes("number") ||
      userInput.includes("call")
    ) {
      response = `You can contact Muhammad Uzair via:
      
Email: ${knowledgeBase.contact.email}
Phone: ${knowledgeBase.contact.phone}
Location: ${knowledgeBase.contact.location}
LinkedIn: ${knowledgeBase.contact.linkedin}
GitHub: ${knowledgeBase.contact.github}
Facebook: ${knowledgeBase.contact.facebook}

You can also use the contact form on this portfolio website.`
      category = "contact"
      isImportant = true
    } else if (userInput.includes("project") || userInput.includes("work") || userInput.includes("portfolio")) {
      response = "Muhammad Uzair has worked on various projects including:\n\n" + knowledgeBase.projects.join("\n\n")
      category = "projects"
    } else if (
      userInput.includes("certificate") ||
      userInput.includes("certification") ||
      userInput.includes("qualification")
    ) {
      response =
        "Muhammad Uzair has earned several professional certificates including:\n\n" +
        knowledgeBase.certificates.join("\n\n") +
        "\n\nYou can view any specific certificate in detail by clicking on it in the Certificates section."
      category = "certificates"
    } else if (userInput.includes("experience") || userInput.includes("background") || userInput.includes("history")) {
      response = "Muhammad Uzair's professional experience includes:\n\n" + knowledgeBase.experience.join("\n\n")
      category = "experience"
    } else if (userInput.includes("education") || userInput.includes("study") || userInput.includes("degree")) {
      response =
        "Muhammad Uzair has a strong educational background in computer science and business. He continuously enhances his knowledge through professional certifications and courses. His education has provided him with a solid foundation in both technical and business domains, enabling him to approach problems from multiple perspectives."
      category = "education"
    } else if (
      userInput.includes("service") ||
      userInput.includes("offer") ||
      userInput.includes("provide") ||
      userInput.includes("help with")
    ) {
      response = "Muhammad Uzair offers the following services:\n\n" + knowledgeBase.services.join("\n\n")
      category = "services"
    } else if (userInput.includes("thank")) {
      response =
        "You're welcome! If you have any other questions about Muhammad Uzair's portfolio, skills, or experience, feel free to ask. I'm here to help!"
    } else if (userInput.includes("hire") || userInput.includes("employ") || userInput.includes("job")) {
      response = `If you're interested in hiring Muhammad Uzair, you can:

1. Contact him directly at ${knowledgeBase.contact.email}
2. Call him at ${knowledgeBase.contact.phone}
3. Connect with him on LinkedIn: ${knowledgeBase.contact.linkedin}
4. Use the contact form on this portfolio website
5. Check out his GitHub for code samples: ${knowledgeBase.contact.github}

Muhammad Uzair is available for freelance projects, contract work, and full-time positions.`
      category = "hiring"
      isImportant = true
    } else if (userInput.includes("location") || userInput.includes("address") || userInput.includes("where")) {
      response = `Muhammad Uzair is based in ${knowledgeBase.contact.location}. He is available for remote work worldwide and in-person meetings in his local area.`
      category = "location"
    } else if (userInput.includes("game") || userInput.includes("play") || userInput.includes("gaming")) {
      response = "I have some exciting games available for you to play! Check out the Games section below."
      setShowGame(true)
      category = "games"
    } else {
      response =
        "Thank you for your question. Muhammad Uzair's portfolio showcases his expertise in web development, AI technologies, and business strategy. Could you please provide more details about what specific information you're looking for? I'd be happy to help you navigate through his work, skills, certifications, or contact information."
    }

    // Simulate typing effect for more natural interaction
    simulateTyping(response, () => {
      // Add assistant message after typing animation completes
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
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleQuickResponse = (response: string) => {
    setInput(response)
    // Focus the input field
    inputRef.current?.focus()
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const clearConversation = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm Muhammad Uzair's Assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  const saveConversation = () => {
    const newConversationId = Date.now().toString()
    const title = messages.find((m) => m.role === "user")?.content.slice(0, 30) + "..." || "Saved Conversation"
    setConversationHistory((prev) => [...prev, { id: newConversationId, title, date: new Date() }])
    // In a real app, you would save the conversation to a database or local storage
  }

  const downloadConversation = () => {
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
  }

  const scrollToTop = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      setScrollPosition(scrollAreaRef.current.scrollTop)
    }
  }

  const filteredMessages = searchQuery
    ? messages.filter(
        (m) =>
          m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.category?.includes(searchQuery.toLowerCase()),
      )
    : messages

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg relative overflow-hidden group"
          size="icon"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <Bot className="h-5 w-5 sm:h-6 sm:w-6 relative z-10" />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed z-50 ${
              isExpanded
                ? "inset-2 sm:inset-4"
                : "bottom-2 right-2 sm:bottom-6 sm:right-6 w-[calc(100vw-16px)] max-w-[380px] sm:w-[380px] h-[calc(100vh-80px)] max-h-[600px] sm:h-[600px]"
            }`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={chatContainerRef}
          >
            <Card className={`shadow-xl border-primary/20 overflow-hidden h-full w-full flex flex-col`}>
              <CardHeader className="p-3 sm:p-4 border-b flex flex-row items-center justify-between bg-gradient-to-r from-primary to-primary/70 flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white/20 flex-shrink-0">
                    <AvatarImage src="/images/uzair-logo.jpg" alt="Muhammad Uzair" />
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
                          onClick={() => {
                            setIsOpen(false)
                            setShowGame(false)
                          }}
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

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1 min-h-0">
                <TabsList className="w-full justify-start px-2 sm:px-4 pt-2 bg-background flex-shrink-0">
                  <TabsTrigger value="chat" className="flex items-center gap-1 text-xs sm:text-sm">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="games" className="flex items-center gap-1 text-xs sm:text-sm">
                    <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Games</span>
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
                                    <AvatarImage src="/images/uzair-logo.jpg" alt="Muhammad Uzair" />
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
                              <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
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
                                  <AvatarImage src="/images/uzair-logo.jpg" alt="Muhammad Uzair" />
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
                                  <AvatarImage src="/images/uzair-logo.jpg" alt="Muhammad Uzair" />
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
                          className="whitespace-nowrap text-xs"
                          onClick={() => handleQuickResponse(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <CardFooter className="p-2 sm:p-4 border-t flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex w-full gap-2">
                      <Textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="min-h-8 sm:min-h-10 flex-1 resize-none text-xs sm:text-sm"
                      />
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
                                    className="w-full"
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
                          className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
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

                <TabsContent value="games" className="flex-1 flex flex-col p-0 m-0 min-h-0">
                  {!showGame ? (
                    <div className="flex-1 flex items-center justify-center p-8">
                      <div className="text-center space-y-4">
                        <Gamepad2 className="h-16 w-16 mx-auto text-muted-foreground" />
                        <h3 className="text-lg font-medium">Games Available</h3>
                        <p className="text-muted-foreground">Ask me about games to see available options!</p>
                        <Button onClick={() => setShowGame(true)}>Show Games</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col min-h-0">
                      <div className="p-2 sm:p-4 border-b flex items-center justify-between bg-muted/30 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">🎯</span>
                          <span className="font-medium text-sm sm:text-base">Deadshot.io</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => window.open("https://deadshot.io/", "_blank")}
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => setShowGame(false)}
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 relative min-h-0">
                        <iframe
                          ref={gameIframeRef}
                          src="https://deadshot.io/"
                          className="w-full h-full border-0"
                          title="Deadshot.io Game"
                          allow="fullscreen; gamepad; microphone; camera; pointer-lock"
                          style={{
                            minHeight: "300px",
                            cursor: showGame ? "none" : "default",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="flex-1 p-0 m-0 min-h-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      <h3 className="font-medium text-sm text-muted-foreground">Recent Conversations</h3>
                      {conversationHistory.map((conversation) => (
                        <div
                          key={conversation.id}
                          className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">{conversation.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {conversation.date.toLocaleDateString()} at{" "}
                                {conversation.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4">
                        <h3 className="font-medium text-sm text-muted-foreground">Suggested Topics</h3>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            onClick={() => {
                              setActiveTab("chat")
                              handleQuickResponse("Tell me about your skills")
                            }}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Skills & Expertise
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            onClick={() => {
                              setActiveTab("chat")
                              handleQuickResponse("What projects have you worked on?")
                            }}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Portfolio Projects
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            onClick={() => {
                              setActiveTab("chat")
                              handleQuickResponse("How can I contact you?")
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Information
                          </Button>
                        </div>
                      </div>
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
