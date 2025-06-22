"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import dynamic from "next/dynamic"

// Dynamically import the heavy background components
const ParticleBackground = dynamic(() => import("./particle-background"), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-background to-background/80" />
  ),
})

const AIBackground = dynamic(() => import("./ai-background"), {
  ssr: false,
  loading: () => null,
})

export default function DynamicBackground() {
  const [shouldLoadBackgrounds, setShouldLoadBackgrounds] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  useEffect(() => {
    // Check if device is high-end
    const isHighEndDevice = () => {
      // Check for device memory API
      if (navigator.deviceMemory) {
        return navigator.deviceMemory > 4 // More than 4GB RAM
      }

      // Fallback to checking hardware concurrency
      if (navigator.hardwareConcurrency) {
        return navigator.hardwareConcurrency > 4 // More than 4 cores
      }

      // Default to true for desktop devices
      return !("ontouchstart" in window)
    }

    // Only load heavy backgrounds on high-end devices and when in view
    if (inView && isHighEndDevice()) {
      setShouldLoadBackgrounds(true)
    }
  }, [inView])

  return (
    <div ref={ref} className="no-background-effects:hidden">
      {shouldLoadBackgrounds && (
        <>
          <ParticleBackground />
          <AIBackground />
        </>
      )}
    </div>
  )
}
