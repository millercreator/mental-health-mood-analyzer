"use client"

import { useState, useEffect } from "react"
import { Home } from "@/components/home"
import { MoodForm } from "@/components/mood-form"
import { MoodResult } from "@/components/mood-result"
import { MoodHistory } from "@/components/mood-history"
import { Header } from "@/components/header"
import { EmergencyButton } from "@/components/emergency-button"

type Page = "home" | "form" | "result" | "history"

interface MoodData {
  timestamp: number
  score: number
  energy: number
  symptoms: string[]
  thoughts: string
  label: string
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [darkMode, setDarkMode] = useState(false)
  const [lastMood, setLastMood] = useState<MoodData | null>(null)
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([])
  const [currentMood, setCurrentMood] = useState<MoodData | null>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLastMood = localStorage.getItem("lastMood")
      const savedHistory = localStorage.getItem("moodHistory")
      const savedDarkMode = localStorage.getItem("darkMode")

      if (savedLastMood) {
        setLastMood(JSON.parse(savedLastMood))
      }
      if (savedHistory) {
        setMoodHistory(JSON.parse(savedHistory))
      }
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode))
      }
    }
  }, [])

  // Apply dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("darkMode", JSON.stringify(darkMode))
    }
  }, [darkMode])

  const handleMoodSubmit = (mood: MoodData) => {
    setCurrentMood(mood)
    setLastMood(mood)

    // Add to history
    const newHistory = [mood, ...moodHistory].slice(0, 7)
    setMoodHistory(newHistory)
    localStorage.setItem("moodHistory", JSON.stringify(newHistory))
    localStorage.setItem("lastMood", JSON.stringify(mood))

    setCurrentPage("result")
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

        {currentPage === "home" && (
          <Home
            lastMood={lastMood}
            onCheckMood={() => setCurrentPage("form")}
            onViewHistory={() => setCurrentPage("history")}
          />
        )}

        {currentPage === "form" && <MoodForm onSubmit={handleMoodSubmit} />}

        {currentPage === "result" && currentMood && (
          <MoodResult mood={currentMood} onBackHome={() => setCurrentPage("home")} />
        )}

        {currentPage === "history" && <MoodHistory history={moodHistory} onBackHome={() => setCurrentPage("home")} />}

        <EmergencyButton />
      </div>
    </div>
  )
}
