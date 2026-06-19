"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, ArrowRight } from "lucide-react"

const communities = [
  {
    name: "Community Forum",
    members: "8.2k members",
    description:
      "Get the inside track on new features and learn how other travelers use SwasthYatra.",
    cta: "Join",
  },
  {
    name: "X / Twitter",
    members: "24k followers",
    description: "Keep up to date with the latest releases, features and improvements.",
    cta: "Follow",
  },
]

export function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-canvas" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[22px] font-medium text-ink mb-2">Stay in the loop.</h2>
          <p className="text-[16px] text-body">
            Join the community and learn how others get the most out of SwasthYatra.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {communities.map((community, index) => (
            <motion.div
              key={community.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="app-icon-tile w-10 h-10 text-mute">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-on-dark">{community.name}</h3>
                  <p className="text-[13px] text-mute">{community.members}</p>
                </div>
              </div>
              <p className="text-[14px] text-body mb-4">{community.description}</p>
              <button className="text-[14px] font-medium text-on-dark hover:text-accent-cyan transition-colors flex items-center gap-1">
                {community.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-lg mx-auto text-center"
        >
          <h3 className="text-[18px] font-medium text-ink mb-2">
            Subscribe to our newsletter.
          </h3>
          <p className="text-[14px] text-mute mb-6">
            Get product updates and news in your inbox. No spam.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-surface-elevated border border-hairline text-on-dark text-[14px] placeholder:text-ash outline-none focus:border-hairline-strong transition-colors"
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
