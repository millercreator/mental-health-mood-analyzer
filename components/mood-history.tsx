"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { MoodData } from "@/lib/types"

interface MoodHistoryProps {
  history: MoodData[]
  onBackHome: () => void
}

export function MoodHistory({ history, onBackHome }: MoodHistoryProps) {
  const chartData = history
    .slice()
    .reverse()
    .map((mood, idx) => ({
      name: `Day ${idx + 1}`,
      score: mood.score,
      label: mood.label,
    }))

  const avgScore = history.length > 0 ? (history.reduce((sum, m) => sum + m.score, 0) / history.length).toFixed(1) : 0

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-background via-card to-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-foreground">Your Mood Trend</h2>
          <p className="text-sm text-muted-foreground">Last 7 days of mood tracking</p>
        </div>

        {history.length > 0 ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Average Mood</p>
                <p className="text-2xl font-bold text-primary">{avgScore}/10</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Days Tracked</p>
                <p className="text-2xl font-bold text-accent">{history.length}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-xl p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis domain={[1, 10]} stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-foreground)",
                    }}
                    formatter={(value) => `${value}/10`}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-primary)", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Moods */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg">Recent Checks</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {history.map((mood, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">{mood.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(mood.timestamp).toLocaleDateString()}{" "}
                        {new Date(mood.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">{mood.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
            <p className="text-lg font-semibold text-foreground">No mood data yet</p>
            <p className="text-sm text-muted-foreground">Start tracking your mood to see your trends</p>
          </div>
        )}

        <button
          onClick={onBackHome}
          className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Back to Home
        </button>
      </div>
    </main>
  )
}
