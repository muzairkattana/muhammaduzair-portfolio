"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function ThemeToggleComponent() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "skyblue">("dark")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | "skyblue" | null
    const initialTheme = storedTheme || "dark"
    setCurrentTheme(initialTheme)

    // Remove all theme classes
    document.body.classList.remove("dark-theme", "skyblue-theme")

    // Apply initial theme
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme")
    } else if (initialTheme === "skyblue") {
      document.body.classList.add("skyblue-theme")
    }

    setIsMounted(true)
  }, [])

  const cycleTheme = () => {
    const themes: ("light" | "dark" | "skyblue")[] = ["light", "dark", "skyblue"]
    const currentIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setCurrentTheme(nextTheme)

    // Remove all theme classes
    document.body.classList.remove("dark-theme", "skyblue-theme")

    // Apply new theme
    if (nextTheme === "dark") {
      document.body.classList.add("dark-theme")
    } else if (nextTheme === "skyblue") {
      document.body.classList.add("skyblue-theme")
    }

    localStorage.setItem("portfolio-theme", nextTheme)
  }

  if (!isMounted) return null

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={cycleTheme}
        className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 shadow-md"
        aria-label={`Switch to ${currentTheme === "light" ? "dark" : currentTheme === "dark" ? "sky blue" : "light"} mode`}
      >
        {currentTheme === "light" && <Sun className="h-5 w-5 text-yellow-500" />}
        {currentTheme === "dark" && <Moon className="h-5 w-5 text-primary" />}
        {currentTheme === "skyblue" && <div className="h-5 w-5 rounded-full bg-sky-400" />}
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
