"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function ThemeToggleComponent() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const isDark = document.body.classList.contains("dark-theme")
    setIsDarkMode(isDark)
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.body.classList.toggle("dark-theme", newDarkMode)
    localStorage.setItem("portfolio-dark-mode", newDarkMode.toString())
  }

  if (!isMounted) return null

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 shadow-md"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary" />}
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
