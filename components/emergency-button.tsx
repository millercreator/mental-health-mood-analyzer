"use client"

import { useState } from "react"
import { AlertCircle, X } from "lucide-react"

const HOTLINES = [
  { name: "988 Suicide & Crisis Lifeline (US)", number: "Call or text 988", link: "tel:988" },
  { name: "Crisis Text Line (US)", number: "Text HOME to 741741", link: "sms:741741?body=HOME" },
  {
    name: "International Association for Suicide Prevention",
    number: "https://www.iasp.info/resources/Crisis_Centres/",
    link: "https://www.iasp.info/resources/Crisis_Centres/",
  },
  { name: "Befrienders (International)", number: "https://www.befrienders.org/", link: "https://www.befrienders.org/" },
  { name: "MIND (UK)", number: "Call 0300 123 3393", link: "tel:03001233393" },
  { name: "Lifeline Australia", number: "Call 13 11 14", link: "tel:131114" },
]

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-destructive text-destructive-foreground p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all active:scale-95 z-40"
        aria-label="Need help"
      >
        <AlertCircle className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full shadow-2xl space-y-6 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground">You're not alone. Here are resources available 24/7:</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {HOTLINES.map((hotline, idx) => (
                <a
                  key={idx}
                  href={hotline.link}
                  target={hotline.link.startsWith("http") ? "_blank" : undefined}
                  rel={hotline.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block p-4 bg-background border border-border rounded-lg hover:border-primary hover:bg-muted transition-all"
                >
                  <p className="font-semibold text-foreground text-sm mb-1">{hotline.name}</p>
                  <p className="text-xs text-muted-foreground">{hotline.number}</p>
                </a>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-xs text-foreground leading-relaxed">
                If you're in immediate danger, please call emergency services (911 in the US) or go to your nearest
                emergency room.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
