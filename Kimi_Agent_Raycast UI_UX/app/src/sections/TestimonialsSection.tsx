import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I got food poisoning in Bangkok and had no idea where to go. SwasthYatra found me an English-speaking doctor within 20 minutes and arranged an interpreter. I felt supported the entire time.",
    author: 'Sarah Mitchell',
    role: 'Traveler in Thailand',
    avatar: 'SM',
  },
  {
    quote: "As a doctor who frequently treats international patients, SwasthYatra makes the coordination effortless. The interpreter integration alone saves us hours every day.",
    author: 'Dr. Hiroshi Tanaka',
    role: 'General Practitioner, Tokyo',
    avatar: 'HT',
  },
  {
    quote: "We used SwasthYatra when my daughter got sick during our trip to Barcelona. The medication equivalency feature was incredibly helpful — we knew exactly what to ask for at the pharmacy.",
    author: 'Marcus Johnson',
    role: 'Traveler in Spain',
    avatar: 'MJ',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-section bg-canvas" ref={ref}>
      <div className="max-w-content mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-lg text-ink mb-4">
            Used by travelers worldwide.
          </h2>
          <p className="text-body-lg text-body max-w-lg mx-auto">
            Trusted by thousands of travelers and healthcare providers across the globe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-xl border border-hairline bg-surface"
            >
              <Quote className="w-6 h-6 text-accent-cyan/40 mb-4" />
              <p className="text-body-sm text-body mb-6 leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-caption-sm text-on-dark font-medium">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-body-sm-strong text-on-dark">{t.author}</p>
                  <p className="text-caption-md text-mute">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
