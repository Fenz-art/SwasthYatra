"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Stethoscope, Route, Languages, Shield, Clock, Pill } from "lucide-react"

const features = [
  {
    icon: Stethoscope,
    title: "Find Care",
    description:
      "Locate trusted providers nearby, verified by our network. Filter by language, specialty, and availability.",
  },
  {
    icon: Route,
    title: "Navigate",
    description:
      "Step-by-step guidance through unfamiliar healthcare systems. Know what to expect at every stage.",
  },
  {
    icon: Languages,
    title: "Communicate",
    description:
      "Language barriers removed with built-in interpreter support. Real-time translation for medical conversations.",
  },
  {
    icon: Shield,
    title: "Verified Network",
    description:
      "Every provider is verified for quality, credentials, and experience with international patients.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Around-the-clock assistance from our navigation team. Never feel alone in a healthcare crisis.",
  },
  {
    icon: Pill,
    title: "Medication Guide",
    description:
      "Understand local medication equivalents, dosages, and interactions wherever you travel.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[56px] leading-[1.17] font-medium text-ink mb-4">
            Take shortcuts, not detours.
          </h2>
          <p className="text-[18px] leading-[1.6] text-body max-w-lg mx-auto">
            One interface, everything you need to navigate healthcare anywhere in the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="feature-card group cursor-default"
            >
              <div className="app-icon-tile mb-4 group-hover:scale-105 transition-transform duration-200 text-mute">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] leading-[1.4] font-medium text-ink mb-2">{feature.title}</h3>
              <p className="text-[14px] leading-[1.6] text-body mb-4">{feature.description}</p>
              <button className="text-[14px] font-medium text-on-dark hover:text-accent-cyan transition-colors flex items-center gap-1">
                Learn more
                <span className="text-mute">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
