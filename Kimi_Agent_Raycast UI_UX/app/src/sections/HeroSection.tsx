import { motion } from 'framer-motion';
import { ArrowRight, Keyboard } from 'lucide-react';
import { useApp } from '../App';

export default function HeroSection() {
  const { setCurrentPage, setCommandPaletteOpen } = useApp();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Cyan diagonal stripe gradient band */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[60%] opacity-[0.12]"
          style={{
            background: 'linear-gradient(135deg, transparent 30%, #00E5FF 45%, #0066FF 50%, #00E5FF 55%, transparent 70%)',
            transform: 'rotate(-5deg) scale(1.2)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -top-[10%] -right-[10%] w-[80%] h-[40%] opacity-[0.08]"
          style={{
            background: 'linear-gradient(225deg, transparent 20%, #00E5FF 40%, #0066FF 50%, transparent 80%)',
            transform: 'rotate(10deg)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-content mx-auto px-6 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-caption-md text-mute">Healthcare Navigation Network</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-display-xl text-ink max-w-3xl mx-auto mb-6"
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
          className="text-body-lg text-body max-w-xl mx-auto mb-10"
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
          <button
            onClick={() => setCurrentPage('workspace')}
            className="btn-primary text-button-md px-6"
          >
            Start a Journey
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-button-md"
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
          className="flex items-center justify-center gap-2 text-mute text-caption-md mb-16"
        >
          <span>Press</span>
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="keycap cursor-pointer hover:border-hairline-strong transition-colors"
          >
            <Keyboard className="w-3 h-3" />
            K
          </button>
          <span>for commands</span>
        </motion.div>

        {/* Hero mockup image */}
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
                <span className="text-caption-sm text-mute">SwasthYatra Command Palette</span>
              </div>
            </div>
            <img
              src="/hero-mockup.jpg"
              alt="SwasthYatra Command Palette"
              className="w-full"
            />
          </div>
          {/* Glow effect behind */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-16 opacity-20"
            style={{
              background: 'radial-gradient(ellipse, #00E5FF, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
    </section>
  );
}
