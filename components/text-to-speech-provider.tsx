"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

interface TextToSpeechContextType {
  isReading: boolean
  currentElement: HTMLElement | null
  toggleReading: (text: string, element: HTMLElement) => void
  stopReading: () => void
}

const TextToSpeechContext = createContext<TextToSpeechContextType | undefined>(undefined)

export function TextToSpeechProvider({ children }: { children: React.ReactNode }) {
  const [isReading, setIsReading] = useState(false)
  const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const stopReading = () => {
    if (synthRef.current && utteranceRef.current) {
      synthRef.current.cancel()
      setIsReading(false)
      setCurrentElement(null)
      utteranceRef.current = null
    }
  }

  const toggleReading = (text: string, element: HTMLElement) => {
    if (!synthRef.current) return

    // If currently reading the same element, stop
    if (isReading && currentElement === element) {
      stopReading()
      return
    }

    // Stop any current reading
    if (isReading) {
      stopReading()
    }

    // Start new reading
    const utterance = new SpeechSynthesisUtterance(text)

    // Apply voice ID if available
    const voices = synthRef.current.getVoices()
    const selectedVoice = voices.find((voice) => voice.voiceURI === "RTFg9niKcgGLDwa3RFlz") || voices[0]
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      setIsReading(true)
      setCurrentElement(element)
    }

    utterance.onend = () => {
      setIsReading(false)
      setCurrentElement(null)
      utteranceRef.current = null
    }

    utterance.onerror = () => {
      setIsReading(false)
      setCurrentElement(null)
      utteranceRef.current = null
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }

  return (
    <TextToSpeechContext.Provider value={{ isReading, currentElement, toggleReading, stopReading }}>
      {children}
    </TextToSpeechContext.Provider>
  )
}

export function useTextToSpeech() {
  const context = useContext(TextToSpeechContext)
  if (context === undefined) {
    throw new Error("useTextToSpeech must be used within a TextToSpeechProvider")
  }
  return context
}
