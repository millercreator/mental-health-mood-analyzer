"use client"

import { useEffect, useState } from "react"

export function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
    }))
    setPieces(confettiPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2 h-2 rounded-full animate-pulse"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            backgroundColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"][Math.floor(Math.random() * 4)],
            animation: `fall ${piece.duration}s linear ${piece.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
