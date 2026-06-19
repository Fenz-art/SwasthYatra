"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Stethoscope,
  Building2,
  Pill,
  MessageSquare,
  HeartPulse,
  Ambulance,
} from "lucide-react"

const providers = [
  {
    icon: Stethoscope,
    name: "Doctors",
    count: "12,400+",
    description:
      "Verified physicians across 80+ countries, screened for international patient experience.",
    color: "cyan",
  },
  {
    icon: Building2,
    name: "Hospitals",
    count: "3,200+",
    description:
      "Accredited hospitals and clinics with dedicated international patient services.",
    color: "green",
  },
  {
    icon: Pill,
    name: "Pharmacies",
    count: "8,600+",
    description:
      "Partnered pharmacies offering medication equivalency and dosage guidance.",
    color: "amber",
  },
  {
    icon: MessageSquare,
    name: "Interpreters",
    count: "2,100+",
    description:
      "Medical interpreters specializing in 45+ languages for accurate communication.",
    color: "cyan",
  },
  {
    icon: HeartPulse,
    name: "Specialists",
    count: "5,800+",
    description:
      "Specialist consultants across cardiology, orthopedics, pediatrics, and more.",
    color: "green",
  },
  {
    icon: Ambulance,
    name: "Emergency",
    count: "1,900+",
    description:
      "24/7 emergency response centers with direct admission protocols.",
    color: "red",
  },
]

const colorMap = {
  cyan: "text-accent-cyan bg-accent-cyan-soft",
  green: "text-accent-green bg-accent-green-soft",
  amber: "text-accent-amber bg-accent-amber-soft",
  red: "text-accent-red bg-accent-red-soft",
}

export function NetworkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="network" className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[56px] leading-[1.17] font-medium text-ink mb-4">
            Built for professionals like you.
          </h2>
          <p className="text-[18px] leading-[1.6] text-body max-w-lg mx-auto">
            A global network of verified healthcare providers, ready to help travelers
            navigate care anywhere.
          </p>
        </motion.div>

        {/* Network visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mb-16 rounded-xl border border-hairline overflow-hidden bg-surface-elevated"
        >
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Network Coverage", value: "80+ countries", color: "text-accent-cyan" },
              { label: "Active Providers", value: "34,000+", color: "text-accent-green" },
              { label: "Languages", value: "45+", color: "text-accent-amber" },
              { label: "Avg Response", value: "< 18 min", color: "text-on-dark" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-lg border border-hairline bg-surface">
                <div className={`text-2xl font-semibold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-[12px] uppercase tracking-wider text-mute">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6">
            <p className="text-[18px] font-medium text-ink">Global Provider Network</p>
            <p className="text-[14px] text-body">
              Connected across 80+ countries, coordinating care for travelers worldwide.
            </p>
          </div>
        </motion.div>

        {/* Provider cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="provider-card"
            >
              <div
                className={`app-icon-tile ${
                  colorMap[provider.color as keyof typeof colorMap]
                }`}
              >
                <provider.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[14px] font-medium text-on-dark">{provider.name}</h3>
                  <span className="text-[12px] text-mute">{provider.count}</span>
                </div>
                <p className="text-[13px] text-mute leading-relaxed">{provider.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
