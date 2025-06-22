"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import audioManager from "@/lib/audio-manager"

type SoundContextType = {
  isMuted: boolean
  toggleMute: () => void
  setVolume: (volume: number) => void
  playSound: (sound: string) => void
  toggleSoundEffects: () => boolean
  toggleMusic: () => boolean
  isSoundEnabled: () => boolean
  isMusicEnabled: () => boolean
  getVolume: () => number
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => false,
  setVolume: () => {},
  playSound: () => {},
  toggleSoundEffects: () => false,
  toggleMusic: () => false,
  isSoundEnabled: () => false,
  isMusicEnabled: () => false,
  getVolume: () => 0.5,
})

export const useSound = () => useContext(SoundContext)

interface SoundProviderProps {
  children: ReactNode
  initialMuted?: boolean
}

export function SoundProvider({ children, initialMuted = false }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(initialMuted)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize audio on first user interaction
    const initializeAudio = async () => {
      if (isInitialized) return

      try {
        await audioManager.initialize()
        setIsInitialized(true)

        // Check if muted in localStorage
        const savedMuted = localStorage.getItem("portfolio-audio-muted")
        const muted = savedMuted === "true"
        setIsMuted(muted)

        // Play background music if not muted and music is enabled
        if (!muted && audioManager.isMusicEnabled()) {
          audioManager.playBackgroundMusic()
        }
      } catch (error) {
        console.warn("Failed to initialize audio:", error)
        // Still mark as initialized to prevent repeated attempts
        setIsInitialized(true)
      }
    }

    const handleUserInteraction = () => {
      initializeAudio().catch((error) => {
        console.warn("Error during audio initialization:", error)
      })
      // Remove event listeners after initialization
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [isInitialized])

  const toggleMute = () => {
    const newMuted = audioManager.toggleMute()
    setIsMuted(newMuted)

    if (newMuted) {
      audioManager.pauseBackgroundMusic()
    } else if (audioManager.isMusicEnabled()) {
      audioManager.playBackgroundMusic()
    }

    return newMuted
  }

  const setVolume = (volume: number) => {
    audioManager.setVolume(volume)
  }

  const playSound = (sound: string) => {
    try {
      if (isInitialized && !isMuted && audioManager.isSoundEnabled()) {
        audioManager.playSound(sound as any)
      }
    } catch (error) {
      console.warn(`Error playing sound ${sound}:`, error)
    }
  }

  const toggleSoundEffects = () => {
    return audioManager.toggleSoundEffects()
  }

  const toggleMusic = () => {
    return audioManager.toggleMusic()
  }

  const isSoundEnabled = () => {
    return audioManager.isSoundEnabled()
  }

  const isMusicEnabled = () => {
    return audioManager.isMusicEnabled()
  }

  const getVolume = () => {
    return audioManager.getVolume()
  }

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        setVolume,
        playSound,
        toggleSoundEffects,
        toggleMusic,
        isSoundEnabled,
        isMusicEnabled,
        getVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}
