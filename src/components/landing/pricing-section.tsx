"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Free",
    description: "For occasional travelers who want basic healthcare navigation.",
    price: "$0",
    period: "/month",
    cta: "Get Started",
    ctaHref: "/auth/signin",
    featured: false,
    features: [
      "Provider search (5 searches/month)",
      "Basic medication lookup",
      "Emergency contact directory",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "For frequent travelers who need comprehensive healthcare support.",
    price: "$12",
    period: "/month",
    cta: "Get Pro",
    ctaHref: "/auth/signin",
    featured: true,
    features: [
      "Unlimited provider search",
      "Advanced medication equivalency",
      "Interpreter booking (3/month)",
      "Care journey tracking",
      "Priority support",
      "Travel health reports",
    ],
  },
  {
    name: "Teams",
    description: "For organizations with traveling employees or groups.",
    price: "$49",
    period: "/month",
    cta: "Contact Sales",
    ctaHref: "/auth/signin",
    featured: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Organization dashboard",
      "Bulk interpreter booking",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[56px] leading-[1.17] font-medium text-ink mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-[18px] leading-[1.6] text-body max-w-lg mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-xl border ${
                tier.featured
                  ? "border-hairline-strong bg-surface-elevated"
                  : "border-hairline bg-surface"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-cyan-soft text-accent-cyan text-[12px] font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[24px] font-medium text-ink mb-1">{tier.name}</h3>
                <p className="text-[14px] text-mute">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[56px] leading-[1.17] font-medium text-ink">{tier.price}</span>
                <span className="text-[14px] text-mute">{tier.period}</span>
              </div>

              <Link
                href={tier.ctaHref}
                className={`block w-full mb-6 text-center ${
                  tier.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[14px] text-body"
                  >
                    <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
