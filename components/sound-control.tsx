"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Music, Volume1, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSound } from "./sound-provider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SoundControl() {
  const {
    isMuted,
    toggleMute,
    setVolume,
    playSound,
    toggleSoundEffects,
    toggleMusic,
    isSoundEnabled,
    isMusicEnabled,
    getVolume,
  } = useSound()

  const [volume, setVolumeState] = useState(50)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)

  useEffect(() => {
    // Initialize state from audio manager
    setVolumeState(getVolume() * 100)
    setSoundEnabled(isSoundEnabled())
    setMusicEnabled(isMusicEnabled())
  }, [getVolume, isSoundEnabled, isMusicEnabled])

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolumeState(newVolume)
    setVolume(newVolume / 100)
    playSound("click")
  }

  const handleSoundToggle = () => {
    const enabled = toggleSoundEffects()
    setSoundEnabled(enabled)
    if (enabled) {
      playSound("click")
    }
  }

  const handleMusicToggle = () => {
    const enabled = toggleMusic()
    setMusicEnabled(enabled)
    if (enabled && !isMuted) {
      playSound("click")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : volume > 50 ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <Volume1 className="h-5 w-5" />
          )}
          <span className="sr-only">Sound settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Sound Settings</h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => {
                toggleMute()
                playSound("click")
              }}
            >
              {isMuted ? "Unmute" : "Mute"}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                <Label htmlFor="master-volume" className="text-sm">
                  Master Volume
                </Label>
              </div>
              <span className="text-sm">{volume}%</span>
            </div>
            <Slider
              id="master-volume"
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                <Label htmlFor="music-toggle" className="text-sm">
                  Background Music
                </Label>
              </div>
              <Switch
                id="music-toggle"
                checked={musicEnabled}
                onCheckedChange={() => {
                  handleMusicToggle()
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume1 className="h-4 w-4 text-primary" />
                <Label htmlFor="sound-toggle" className="text-sm">
                  Sound Effects
                </Label>
              </div>
              <Switch
                id="sound-toggle"
                checked={soundEnabled}
                onCheckedChange={() => {
                  handleSoundToggle()
                }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Sound settings are saved automatically and will be remembered on your next visit.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
