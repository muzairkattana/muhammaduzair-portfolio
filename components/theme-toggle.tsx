"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function ThemeToggleComponent() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "skyblue" | "navy">("skyblue")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | "skyblue" | "navy" | null
    const initialTheme = storedTheme || "skyblue" // Default to sky blue
    setCurrentTheme(initialTheme)

    // Remove all theme classes
    document.body.classList.remove("dark-theme", "skyblue-theme", "navy-theme")

    // Apply initial theme
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme")
    } else if (initialTheme === "skyblue") {
      document.body.classList.add("skyblue-theme")
    } else if (initialTheme === "navy") {
      document.body.classList.add("navy-theme")
    }

    setIsMounted(true)
  }, [])

  const cycleTheme = () => {
    const themes: ("light" | "dark" | "skyblue" | "navy")[] = ["light", "dark", "skyblue", "navy"]
    const currentIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setCurrentTheme(nextTheme)

    // Remove all theme classes
    document.body.classList.remove("dark-theme", "skyblue-theme", "navy-theme")

    // Apply new theme
    if (nextTheme === "dark") {
      document.body.classList.add("dark-theme")
    } else if (nextTheme === "skyblue") {
      document.body.classList.add("skyblue-theme")
    } else if (nextTheme === "navy") {
      document.body.classList.add("navy-theme")
    }

    localStorage.setItem("portfolio-theme", nextTheme)
  }

  if (!isMounted) return null

  const getThemeIcon = () => {
    switch (currentTheme) {
      case "light":
        return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
      case "dark":
        return <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      case "skyblue":
        return <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-sky-400" />
      case "navy":
        return <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-navy-600" />
      default:
        return <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
    }
  }

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={cycleTheme}
        className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 shadow-md h-8 w-8 sm:h-10 sm:w-10"
        aria-label={`Switch theme (current: ${currentTheme})`}
      >
        {getThemeIcon()}
      </Button>
    </motion.div>
  )
}

/* -------------------------------------------------
   Exports
--------------------------------------------------*/

// Default export (what we had before)
export default ThemeToggleComponent
// Named export so `import { ThemeToggle }` also works
export const ThemeToggle = ThemeToggleComponent
