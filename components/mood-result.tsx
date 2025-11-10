"use client"

import { useState } from "react"
import { getMoodEmoji, getMoodSuggestions } from "@/lib/mood-utils"
import { Confetti } from "@/components/confetti"
import type { MoodData } from "@/lib/types"

interface MoodResultProps {
  mood: MoodData
  onBackHome: () => void
}

export function MoodResult({ mood, onBackHome }: MoodResultProps) {
  const [showConfetti, setShowConfetti] = useState(mood.score > 7)
  const suggestions = getMoodSuggestions(mood.label)
  const emoji = getMoodEmoji(mood.label)
  const shareText = `My mood today: ${mood.label} ${emoji} – trying to take care of myself!`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mental Health Mood Check",
          text: shareText,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert("Copied to clipboard!")
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-background via-card to-background py-8 px-4">
      {showConfetti && mood.score > 7 && <Confetti />}

      <div className="max-w-md mx-auto space-y-6 animate-fade-in">
        {/* Mood Display */}
        <div className="text-center space-y-4">
          <div className="text-9xl drop-shadow-lg">{emoji}</div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-foreground text-balance">{mood.label}</h2>
            <p className="text-sm text-muted-foreground">Score: {mood.score}/10</p>
          </div>
        </div>

        {/* Suggestions Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-foreground text-lg">Suggestions for you 💡</h3>
          <ul className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span className="text-foreground text-sm leading-relaxed">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Symptoms Display */}
        {mood.symptoms.length > 0 && (
          <div className="bg-background border border-border rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">You mentioned feeling:</p>
            <div className="flex flex-wrap gap-2">
              {mood.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Thoughts Display */}
        {mood.thoughts && (
          <div className="bg-background border border-border rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Your thoughts:</p>
            <p className="text-sm text-muted-foreground italic">"{mood.thoughts}"</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleShare}
            className="w-full bg-secondary text-secondary-foreground py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            📤 Share My Result
          </button>
          <button
            onClick={onBackHome}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Check Again Tomorrow
          </button>
        </div>

        {/* Encouragement */}
        {mood.score > 7 && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
            <p className="text-sm font-semibold text-accent">Great job taking care of yourself! 🌟</p>
          </div>
        )}
      </div>
    </main>
  )
}
