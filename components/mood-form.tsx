"use client"

import type React from "react"

import { useState } from "react"
import { calculateMood } from "@/lib/mood-utils"
import type { MoodData } from "@/lib/types"
import { Spinner } from "@/components/spinner"

const SYMPTOMS = ["Stressed", "Sad", "Anxious", "Lonely", "Tired", "Overwhelmed"]

interface MoodFormProps {
  onSubmit: (mood: MoodData) => void
}

export function MoodForm({ onSubmit }: MoodFormProps) {
  const [energy, setEnergy] = useState(5)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [thoughts, setThoughts] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call with small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mood = calculateMood({
      energy,
      symptoms: selectedSymptoms,
      thoughts,
    })

    onSubmit(mood)
    setIsLoading(false)
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-card to-background py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-foreground">How are you feeling?</h2>
          <p className="text-sm text-muted-foreground">Answer a few quick questions about your mood today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Energy Level Slider */}
          <div className="space-y-3 bg-background rounded-xl p-5 border border-border">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-foreground">Energy Level</label>
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                {energy}/10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(Number.parseInt(e.target.value))}
              className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Symptoms Checkboxes */}
          <div className="space-y-3 bg-background rounded-xl p-5 border border-border">
            <label className="font-semibold text-foreground block">How are you feeling?</label>
            <div className="space-y-2">
              {SYMPTOMS.map((symptom) => (
                <label key={symptom} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="w-5 h-5 rounded border-2 border-border bg-background cursor-pointer accent-primary"
                  />
                  <span className="text-foreground group-hover:text-primary transition-colors">{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Thoughts Text Input */}
          <div className="space-y-3 bg-background rounded-xl p-5 border border-border">
            <label htmlFor="thoughts" className="font-semibold text-foreground block">
              What's on your mind? (optional)
            </label>
            <textarea
              id="thoughts"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="Share what you're thinking or feeling..."
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner className="w-5 h-5" />
                Analyzing your mood...
              </>
            ) : (
              "Get My Mood Analysis"
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
