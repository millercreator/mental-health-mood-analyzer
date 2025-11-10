"use client"

import { Moon, Sun } from "lucide-react"

interface HeaderProps {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Mental Health Mood Analyzer 👁️
        </h1>
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-foreground/60" />}
        </button>
      </div>
    </header>
  )
}
