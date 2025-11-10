"use client"

import { getMoodEmoji } from "@/lib/mood-utils"
import type { MoodData } from "@/lib/types"

interface HomeProps {
  lastMood: MoodData | null
  onCheckMood: () => void
  onViewHistory: () => void
}

export function Home({ lastMood, onCheckMood, onViewHistory }: HomeProps) {
  const emoji = lastMood ? getMoodEmoji(lastMood.label) : "😐"

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Large emoji display */}
        <div className="space-y-4 animate-fade-in">
          <div className="text-8xl drop-shadow-lg">{emoji}</div>
          {lastMood && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Your last mood</p>
              <p className="text-xl font-semibold text-foreground">{lastMood.label}</p>
              <p className="text-xs text-muted-foreground">{new Date(lastMood.timestamp).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Main call-to-action button */}
        <button
          onClick={onCheckMood}
          className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-2xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
        >
          Check My Mood Today
        </button>

        {/* View history button */}
        {lastMood && (
          <button
            onClick={onViewHistory}
            className="w-full bg-secondary text-secondary-foreground py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            📊 View My History
          </button>
        )}

        {/* Info card */}
        <div className="bg-card border border-border rounded-xl p-6 text-left space-y-3">
          <h2 className="font-semibold text-foreground">Welcome! 👋</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Track your daily mood, energy levels, and emotional state. Get personalized wellness suggestions tailored to
            how you're feeling.
          </p>
          <p className="text-xs text-muted-foreground">
            All your data is stored locally. Your privacy is our priority.
          </p>
        </div>
      </div>
    </main>
  )
}
