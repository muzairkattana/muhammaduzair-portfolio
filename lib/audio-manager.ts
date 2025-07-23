"use client"

// Define sound effect types
type SoundEffect = "click" | "hover" | "success" | "error" | "notification" | "scroll"

// Simple base64 encoded sounds for fallback (very short, lightweight sounds)
const BASE64_SOUNDS = {
  click:
    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAJAQQABmgAAAAPAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
  hover:
    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAJAQQABmgAAAAPAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
  success:
    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAJAQQABmgAAAAPAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
  error:
    "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAJAQQABmgAAAAPAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
}

// Background music as base64 (short loop)
const BASE64_MUSIC =
  "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwBK8AAAAAAAAAABUgJAJAQQABmgAAAAPAAAAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"

class AudioManager {
  private static instance: AudioManager
  private audioElements: Map<SoundEffect, HTMLAudioElement> = new Map()
  private backgroundMusic: HTMLAudioElement | null = null
  private isMuted = false
  private volume = 0.5
  private isInitialized = false
  private soundEnabled = true
  private musicEnabled = true

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Create simple audio elements for each sound
      this.createAudioElements()

      // Create background music element
      this.createBackgroundMusic()

      // Load settings from localStorage
      this.loadSettings()

      this.isInitialized = true
    } catch (error) {
      console.warn("Failed to initialize audio manager:", error)
    }
  }

  private createAudioElements(): void {
    const soundEffects: SoundEffect[] = ["click", "hover", "success", "error", "notification", "scroll"]

    soundEffects.forEach((sound) => {
      try {
        const audio = new Audio()
        audio.volume = this.volume

        // Use base64 encoded sounds as fallback
        if (BASE64_SOUNDS[sound]) {
          audio.src = BASE64_SOUNDS[sound]
        } else {
          audio.src = `/audio/${sound}.mp3`
        }

        // Add error handling
        audio.onerror = () => {
          console.warn(`Failed to load sound: ${sound}`)
          // Try fallback if regular file fails
          if (audio.src !== BASE64_SOUNDS[sound] && BASE64_SOUNDS[sound]) {
            audio.src = BASE64_SOUNDS[sound]
          }
        }

        this.audioElements.set(sound, audio)
      } catch (error) {
        console.warn(`Failed to create audio element for ${sound}:`, error)
      }
    })
  }

  private createBackgroundMusic(): void {
    try {
      this.backgroundMusic = new Audio()

      // Use base64 encoded music as fallback
      this.backgroundMusic.src = BASE64_MUSIC

      // Try to load the actual file
      const actualMusic = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_2D60DOzAO4WRXbrBjQTJZGPjeFoV/Mtm9nnNs9Oc0YeNblCS2hO/public/audio/background-music.mp3")
      actualMusic.oncanplaythrough = () => {
        if (this.backgroundMusic) {
          this.backgroundMusic.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_2D60DOzAO4WRXbrBjQTJZGPjeFoV/Mtm9nnNs9Oc0YeNblCS2hO/public/audio/background-music.mp3"
        }
      }

      actualMusic.onerror = () => {
        console.warn("Failed to load background music, using fallback")
      }

      if (this.backgroundMusic) {
        this.backgroundMusic.loop = true
        this.backgroundMusic.volume = this.volume * 0.3
      }
    } catch (error) {
      console.warn("Failed to create background music:", error)
    }
  }

  private loadSettings(): void {
    // Load sound settings from localStorage
    const soundEnabled = localStorage.getItem("portfolio-sound-enabled")
    if (soundEnabled !== null) {
      this.soundEnabled = soundEnabled === "true"
    }

    const musicEnabled = localStorage.getItem("portfolio-music-enabled")
    if (musicEnabled !== null) {
      this.musicEnabled = musicEnabled === "true"
    }

    const volume = localStorage.getItem("portfolio-volume")
    if (volume !== null) {
      this.volume = Number.parseFloat(volume)
    }

    const muted = localStorage.getItem("portfolio-audio-muted")
    if (muted !== null) {
      this.isMuted = muted === "true"
    }
  }

  public playSound(sound: SoundEffect): void {
    if (!this.isInitialized || this.isMuted || !this.soundEnabled) return

    const audioElement = this.audioElements.get(sound)
    if (!audioElement) return

    try {
      // Reset the audio to the beginning
      audioElement.currentTime = 0
      audioElement.play().catch((error) => {
        console.warn(`Failed to play sound ${sound}:`, error)
      })
    } catch (error) {
      console.warn(`Error playing sound ${sound}:`, error)
    }
  }

  public playBackgroundMusic(): void {
    if (!this.backgroundMusic || this.isMuted || !this.musicEnabled) return

    try {
      this.backgroundMusic.play().catch((error) => {
        console.warn("Failed to play background music:", error)
      })
    } catch (error) {
      console.warn("Error playing background music:", error)
    }
  }

  public pauseBackgroundMusic(): void {
    if (!this.backgroundMusic) return

    try {
      this.backgroundMusic.pause()
    } catch (error) {
      console.warn("Error pausing background music:", error)
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted

    try {
      if (this.backgroundMusic) {
        this.backgroundMusic.muted = this.isMuted
      }

      // Save setting to localStorage
      localStorage.setItem("portfolio-audio-muted", this.isMuted.toString())
    } catch (error) {
      console.warn("Error toggling mute:", error)
    }

    return this.isMuted
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))

    try {
      // Update background music volume
      if (this.backgroundMusic) {
        this.backgroundMusic.volume = this.volume * 0.3
      }

      // Update all sound effect volumes
      this.audioElements.forEach((audio) => {
        audio.volume = this.volume
      })

      // Save setting to localStorage
      localStorage.setItem("portfolio-volume", this.volume.toString())
    } catch (error) {
      console.warn("Error setting volume:", error)
    }
  }

  public toggleSoundEffects(): boolean {
    this.soundEnabled = !this.soundEnabled
    localStorage.setItem("portfolio-sound-enabled", this.soundEnabled.toString())
    return this.soundEnabled
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled

    if (this.musicEnabled && !this.isMuted) {
      this.playBackgroundMusic()
    } else {
      this.pauseBackgroundMusic()
    }

    localStorage.setItem("portfolio-music-enabled", this.musicEnabled.toString())
    return this.musicEnabled
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled
  }

  public getVolume(): number {
    return this.volume
  }
}

export default AudioManager.getInstance()
