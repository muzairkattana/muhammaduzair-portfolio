"use client"

import { useEffect } from "react"

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Implement lazy loading for non-critical resources
    const lazyLoadResources = () => {
      // Find all images with data-src attribute and load them when in viewport
      const lazyImages = document.querySelectorAll("img[data-src]")

      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ""
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          })
        })

        lazyImages.forEach((img) => imageObserver.observe(img))
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach((img) => {
          const imgElement = img as HTMLImageElement
          imgElement.src = imgElement.dataset.src || ""
          imgElement.removeAttribute("data-src")
        })
      }
    }

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      setTimeout(() => {
        // Load non-critical scripts here
        const nonCriticalScripts = document.querySelectorAll("script[data-defer]")
        nonCriticalScripts.forEach((script) => {
          const scriptElement = document.createElement("script")
          Array.from(script.attributes).forEach((attr) => {
            if (attr.name !== "data-defer") {
              scriptElement.setAttribute(attr.name, attr.value)
            }
          })
          scriptElement.textContent = script.textContent
          script.parentNode?.replaceChild(scriptElement, script)
        })
      }, 1000) // 1 second delay
    }

    // Optimize animations
    const optimizeAnimations = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (prefersReducedMotion) {
        document.body.classList.add("reduced-motion")
      }

      // Disable animations when page is not visible
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          document.body.classList.add("paused-animations")
        } else {
          document.body.classList.remove("paused-animations")
        }
      })
    }

    // Execute optimizations
    if (typeof window !== "undefined") {
      // Run immediately
      optimizeAnimations()

      // Run after initial render
      window.requestIdleCallback
        ? window.requestIdleCallback(() => {
            lazyLoadResources()
            deferNonCriticalJS()
          })
        : setTimeout(() => {
            lazyLoadResources()
            deferNonCriticalJS()
          }, 200)
    }
  }, [])

  return null
}
