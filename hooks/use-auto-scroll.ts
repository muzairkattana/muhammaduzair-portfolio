"use client"

import { useEffect } from "react"

export function useAutoScroll() {
  // This hook is intentionally empty now to disable auto-scrolling functionality
  useEffect(() => {
    // No auto-scroll functionality
    return () => {
      // Cleanup
    }
  }, [])

  return null
}
