"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FullscreenLauncher() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Show fullscreen prompt after a short delay
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 1000)

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = async () => {
    try {
      const element = document.documentElement

      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen()
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen()
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen()
      }

      setShowPrompt(false)
    } catch (error) {
      console.error("Failed to enter fullscreen:", error)
      setShowPrompt(false)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (error) {
      console.error("Failed to exit fullscreen:", error)
    }
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
  }

  return (
    <>
      {/* Fullscreen Launch Prompt */}
      <AnimatePresence>
        {showPrompt && !isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Maximize className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Immersive Experience
                </h2>
                <p className="text-muted-foreground">
                  Launch Muhammad Uzair's portfolio in fullscreen mode for the best gaming-style experience
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={enterFullscreen}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Maximize className="h-4 w-4 mr-2" />
                  Launch Fullscreen
                </Button>
                <Button
                  variant="outline"
                  onClick={dismissPrompt}
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-muted"
                >
                  <X className="h-4 w-4 mr-2" />
                  Continue Normal
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">F11</kbd> or{" "}
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> to toggle fullscreen anytime
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Exit Button */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={exitFullscreen}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-background/90 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
