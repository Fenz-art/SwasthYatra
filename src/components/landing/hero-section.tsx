"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Keyboard } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Cyan diagonal stripe gradient band */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[60%] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, #00E5FF 45%, #0066FF 50%, #00E5FF 55%, transparent 70%)",
            transform: "rotate(-5deg) scale(1.2)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -top-[10%] -right-[10%] w-[80%] h-[40%] opacity-[0.08]"
          style={{
            background:
              "linear-gradient(225deg, transparent 20%, #00E5FF 40%, #0066FF 50%, transparent 80%)",
            transform: "rotate(10deg)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[13px] text-mute">Healthcare Navigation Network</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[64px] leading-[1.1] font-semibold text-ink max-w-3xl mx-auto mb-6"
          style={{ fontFeatureSettings: '"ss02", "ss08"' }}
        >
          Healthcare, without the{" "}
          <span className="text-accent-cyan">uncertainty</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[18px] leading-[1.6] text-body max-w-xl mx-auto mb-10"
        >
          Find trusted care, understand your options, and get help navigating
          unfamiliar healthcare systems wherever you travel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <Link href="/auth/signin" className="btn-primary text-button-md px-6">
            Start a Journey
          </Link>
          <button
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-secondary text-button-md flex items-center gap-2"
          >
            Explore the Platform
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Keyboard shortcut hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-mute text-[13px] mb-16"
        >
          <span>Press</span>
          <span className="keycap cursor-pointer hover:border-hairline-strong transition-colors flex items-center gap-1">
            <Keyboard className="w-3 h-3" />K
          </span>
          <span>for commands</span>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full max-w-4xl mx-auto"
        >
          <div className="relative rounded-xl border border-hairline overflow-hidden bg-surface">
            {/* Mockup header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline bg-surface-elevated">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-accent-red/60" />
                <div className="w-3 h-3 rounded-full bg-accent-amber/60" />
                <div className="w-3 h-3 rounded-full bg-accent-green/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[12px] text-mute">SwasthYatra — Navigation Assistant</span>
              </div>
            </div>
            {/* Dashboard preview placeholder */}
            <div className="p-6 space-y-4 min-h-[280px]">
              <div className="grid grid-cols-3 gap-4">
                {["Assessment Complete", "Provider Confirmed", "Interpreter Ready"].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-lg border border-hairline bg-surface-elevated p-4 space-y-2"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0
                          ? "bg-accent-green"
                          : i === 1
                          ? "bg-accent-cyan"
                          : "bg-accent-amber animate-pulse"
                      }`}
                    />
                    <p className="text-[12px] font-medium text-on-dark">{label}</p>
                    <div className="h-1 rounded-full bg-surface-card overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          i === 0
                            ? "bg-accent-green w-full"
                            : i === 1
                            ? "bg-accent-cyan w-[85%]"
                            : "bg-accent-amber w-[60%]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-hairline bg-surface-elevated p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[12px] font-medium text-on-dark">Navigation Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-[11px] text-accent-green">Active</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { text: "Searching Tokyo providers matching your symptoms...", done: true },
                    { text: "Found 24 providers within 5km of your location.", done: true },
                    { text: "Contacting Dr. Tanaka at Tokyo Medical Center...", done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12px]">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.done ? "bg-accent-green" : "bg-accent-cyan animate-pulse"
                        }`}
                      />
                      <span className={item.done ? "text-mute" : "text-on-dark"}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect behind */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-16 opacity-20"
            style={{
              background: "radial-gradient(ellipse, #00E5FF, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 w-full max-w-[1240px] mx-auto px-6 mt-16"
      >
        <div className="grid grid-cols-3 gap-6 border-t border-hairline pt-8 max-w-2xl mx-auto">
          {[
            ["10,482", "providers in network"],
            ["32", "countries"],
            ["18m", "average resolution"],
          ].map(([value, label]) => (
            <div key={label} className="text-center space-y-1">
              <div className="text-xl font-semibold tracking-tight text-on-dark">{value}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-mute">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
    </section>
  )
}
