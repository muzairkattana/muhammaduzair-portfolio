"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FullscreenLauncher() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Auto-enter fullscreen after page load
    const timer = setTimeout(() => {
      enterFullscreen()
    }, 2000)

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      }
    } catch (error) {
      // Silently handle fullscreen errors
      console.log("Fullscreen not supported or blocked")
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.log("Error exiting fullscreen")
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-4 right-4 z-50"
        >
          <Button
            onClick={exitFullscreen}
            variant="outline"
            size="sm"
            className="bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/30 shadow-lg"
          >
            <X className="h-4 w-4 mr-2" />
            Exit Fullscreen
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
