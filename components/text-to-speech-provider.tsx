"use client"

import React, { createContext, useContext, useState, useRef, useCallback } from "react"

interface TextToSpeechContextType {
  isReading: boolean
  currentElement: HTMLElement | null
  readText: (text: string, element: HTMLElement) => void
  stopReading: () => void
  toggleReading: (text: string, element: HTMLElement) => void
}

const TextToSpeechContext = createContext<TextToSpeechContextType | undefined>(undefined)

export function TextToSpeechProvider({ children }: { children: React.ReactNode }) {
  const [isReading, setIsReading] = useState(false)
  const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const readText = useCallback((text: string, element: HTMLElement) => {
    if (!synthRef.current) return

    // Stop any current reading
    stopReading()

    // Clean text for better speech
    const cleanText = text
      .replace(/[^\w\s.,!?;:-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    if (!cleanText) return

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    // Set voice preference (English)
    const voices = synthRef.current.getVoices()
    const englishVoice = voices.find(
      (voice) => voice.lang.includes("en") && (voice.name.includes("Female") || voice.name.includes("Google")),
    )
    if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onstart = () => {
      setIsReading(true)
      setCurrentElement(element)
      element.style.backgroundColor = "rgba(59, 130, 246, 0.1)"
      element.style.outline = "2px solid rgba(59, 130, 246, 0.3)"
      element.style.transition = "all 0.3s ease"
    }

    utterance.onend = () => {
      setIsReading(false)
      setCurrentElement(null)
      element.style.backgroundColor = ""
      element.style.outline = ""
    }

    utterance.onerror = () => {
      setIsReading(false)
      setCurrentElement(null)
      element.style.backgroundColor = ""
      element.style.outline = ""
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
  }, [])

  const stopReading = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    if (currentElement) {
      currentElement.style.backgroundColor = ""
      currentElement.style.outline = ""
    }
    setIsReading(false)
    setCurrentElement(null)
    utteranceRef.current = null
  }, [currentElement])

  const toggleReading = useCallback(
    (text: string, element: HTMLElement) => {
      if (isReading && currentElement === element) {
        stopReading()
      } else {
        readText(text, element)
      }
    },
    [isReading, currentElement, readText, stopReading],
  )

  return (
    <TextToSpeechContext.Provider
      value={{
        isReading,
        currentElement,
        readText,
        stopReading,
        toggleReading,
      }}
    >
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
