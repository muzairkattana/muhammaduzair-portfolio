"use client"

import React from "react"
import { useTextToSpeech } from "./text-to-speech-provider"
import type { JSX } from "react/jsx-runtime"

interface ClickableTextProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ClickableText({ children, className = "", as: Component = "div" }: ClickableTextProps) {
  const { toggleReading } = useTextToSpeech()
  const elementRef = React.useRef<HTMLElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (elementRef.current) {
      const text = elementRef.current.textContent || ""
      toggleReading(text, elementRef.current)
    }
  }

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: `cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors duration-200 ${className}`,
      onClick: handleClick,
      title: "Click to read aloud",
    },
    children,
  )
}
