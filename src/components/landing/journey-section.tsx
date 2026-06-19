"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  ClipboardCheck,
  ListChecks,
  UserCheck,
  MessageCircle,
  HeartPulse,
  Flag,
} from "lucide-react"

const stages = [
  {
    icon: ClipboardCheck,
    title: "Assessment Complete",
    description:
      "Your symptoms have been reviewed and the safest next step has been identified.",
    status: "done",
  },
  {
    icon: ListChecks,
    title: "Care Options Reviewed",
    description:
      "Nearby providers were evaluated based on language support, availability, and previous care outcomes.",
    status: "done",
  },
  {
    icon: UserCheck,
    title: "Provider Confirmed",
    description: "A provider is available and ready to assist with your healthcare needs.",
    status: "active",
  },
  {
    icon: MessageCircle,
    title: "Communication Ready",
    description:
      "Translation support has been prepared automatically for your appointment.",
    status: "pending",
  },
  {
    icon: HeartPulse,
    title: "Treatment Received",
    description:
      "Your care journey continues with follow-up support and outcome tracking.",
    status: "pending",
  },
  {
    icon: Flag,
    title: "Journey Completed",
    description:
      "Your treatment journey has been recorded for future reference and learning.",
    status: "pending",
  },
]

export function JourneySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="journey" className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface mb-6">
            <span className="text-[13px] text-mute">Journey Timeline</span>
          </div>
          <h2 className="text-[56px] leading-[1.17] font-medium text-ink mb-4">
            Your care journey, simplified.
          </h2>
          <p className="text-[18px] leading-[1.6] text-body max-w-lg mx-auto">
            From assessment to outcome, we guide you through every step with clarity and
            confidence.
          </p>
        </motion.div>

        {/* Journey visual block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-16 rounded-xl border border-hairline overflow-hidden bg-surface-elevated"
        >
          <div className="p-8">
            <div className="flex flex-col gap-0">
              {stages.slice(0, 4).map((stage, i) => (
                <div key={stage.title} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                        stage.status === "done"
                          ? "bg-accent-green-soft text-accent-green"
                          : stage.status === "active"
                          ? "bg-accent-cyan-soft text-accent-cyan"
                          : "bg-surface-card text-stone"
                      }`}
                    >
                      <stage.icon className="w-4 h-4" />
                    </div>
                    {i < 3 && (
                      <div
                        className={`w-px h-8 ${
                          stage.status === "done" ? "bg-accent-green/30" : "bg-hairline"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[14px] font-medium text-on-dark">{stage.title}</p>
                      {stage.status === "active" && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-accent-cyan-soft text-accent-cyan text-[12px]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-mute leading-relaxed">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              className="relative flex gap-4 p-4 rounded-lg border border-hairline bg-surface hover:bg-surface-elevated transition-all duration-200"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    stage.status === "done"
                      ? "bg-accent-green-soft text-accent-green"
                      : stage.status === "active"
                      ? "bg-accent-cyan-soft text-accent-cyan"
                      : "bg-surface-card text-stone"
                  }`}
                >
                  <stage.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[14px] font-medium text-on-dark">{stage.title}</h3>
                  {stage.status === "active" && (
                    <span className="px-1.5 py-0.5 rounded-sm bg-accent-cyan-soft text-accent-cyan text-[12px]">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-mute leading-relaxed">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
