import type { MoodData } from "./types"

// Mood suggestions database
const MOOD_SUGGESTIONS: Record<string, string[]> = {
  "Excellent & Energized": [
    "Keep this positive momentum going! Share your joy with someone today.",
    "Channel this energy into activities you love or have been putting off.",
    "Take a moment to appreciate what brought you to this great place.",
    "Consider helping someone else – spreading joy multiplies it.",
    "Document this feeling so you can recall it when you need motivation.",
  ],
  "Good & Stable": [
    "Maintain your routine and the habits that are keeping you balanced.",
    "Reach out to someone you care about and strengthen your connections.",
    "Invest time in activities that bring you joy and fulfillment.",
    "Reflect on what's working well and protect those positive factors.",
    "Use this stable feeling to tackle something on your to-do list.",
  ],
  "Okay & Neutral": [
    "Practice mindfulness – take 5 minutes to sit with your thoughts.",
    "Go for a walk or do light exercise to boost your mood naturally.",
    "Try something new or revisit an old hobby you enjoyed.",
    "Connect with nature – even a few minutes outside can help reset.",
    "Journal about your day or what might be affecting your mood.",
  ],
  "Low Energy & Stressed": [
    "Try deep breathing: 4 counts in, 6 counts out. Repeat 5 times.",
    "Take a 10-minute break away from your stressors if possible.",
    "Drink water and eat a nourishing snack – self-care basics matter.",
    "Break large tasks into smaller, manageable steps.",
    "Talk to someone you trust about what's weighing on you.",
  ],
  "Low & Overwhelmed": [
    "Pause everything and focus on one small task only.",
    "Try a grounding technique: name 5 things you see, 4 you hear, 3 you feel.",
    "Reach out to a friend, family member, or professional for support.",
    "Get outside for fresh air – even 15 minutes can reset your system.",
    "Remember: this feeling is temporary and you've overcome hard times before.",
  ],
  "Anxious & Tense": [
    "Practice progressive muscle relaxation to release physical tension.",
    "Try a 10-minute guided meditation or calming music.",
    "Limit caffeine and try chamomile tea or warm milk instead.",
    "Write down your worries – externalizing them can reduce their power.",
    "Physical activity helps process anxiety – walk, stretch, or dance.",
  ],
  "Sad & Lonely": [
    "Reach out to someone – a call or text can make a real difference.",
    "Do something kind for yourself: warm bath, favorite meal, cozy space.",
    "Move your body gently – sadness often needs physical processing.",
    "Write about your feelings without judgment – journaling heals.",
    "Remember: you're worthy of connection and this feeling will pass.",
  ],
  "Mixed Emotions": [
    "Take time to identify which emotion is strongest and address that first.",
    "Create space for all your feelings – they're all valid and important.",
    "Try art, music, or movement to express emotions.",
    "Reach out for perspective from someone you trust.",
    "Be patient with yourself – complex emotions need time to process.",
  ],
}

export function calculateMood(data: {
  energy: number
  symptoms: string[]
  thoughts: string
}): MoodData {
  let score = data.energy

  // Adjust score based on symptoms
  const symptomImpact = data.symptoms.length * 2
  score = Math.max(1, Math.min(10, score - symptomImpact))

  // Determine mood label
  let label = "Mixed Emotions"

  if (data.symptoms.length === 0 && data.energy >= 7) {
    label = "Excellent & Energized"
  } else if (data.symptoms.length === 0 && data.energy >= 5) {
    label = "Good & Stable"
  } else if (data.symptoms.length === 0 && data.energy < 5) {
    label = "Okay & Neutral"
  } else if (data.energy < 4 && data.symptoms.includes("Overwhelmed")) {
    label = "Low & Overwhelmed"
  } else if (data.symptoms.includes("Stressed") || data.symptoms.includes("Anxious")) {
    label = "Anxious & Tense"
  } else if (data.symptoms.includes("Sad") || data.symptoms.includes("Lonely")) {
    label = "Sad & Lonely"
  } else if (data.energy < 4) {
    label = "Low Energy & Stressed"
  }

  return {
    timestamp: Date.now(),
    score: Math.round(score),
    energy: data.energy,
    symptoms: data.symptoms,
    thoughts: data.thoughts,
    label,
  }
}

export function getMoodSuggestions(label: string): string[] {
  return MOOD_SUGGESTIONS[label] || MOOD_SUGGESTIONS["Mixed Emotions"]
}

export function getMoodEmoji(label: string): string {
  const emojiMap: Record<string, string> = {
    "Excellent & Energized": "🚀",
    "Good & Stable": "😊",
    "Okay & Neutral": "😐",
    "Low Energy & Stressed": "😟",
    "Low & Overwhelmed": "😫",
    "Anxious & Tense": "😰",
    "Sad & Lonely": "😔",
    "Mixed Emotions": "🌀",
  }
  return emojiMap[label] || "😐"
}
