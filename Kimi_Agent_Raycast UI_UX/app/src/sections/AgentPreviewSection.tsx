import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { useApp } from '../App';

const streamingSteps = [
  { text: 'Searching Tokyo providers matching your symptoms...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, delay: 0 },
  { text: 'Found 24 providers within 5km of your location.', icon: <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />, delay: 1200 },
  { text: 'Ranking providers using care outcome data...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, delay: 2400 },
  { text: 'Contacting Dr. Tanaka at Tokyo Medical Center...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, delay: 3600 },
  { text: 'Provider confirmed and available today at 3:00 PM.', icon: <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />, delay: 4800 },
  { text: 'Preparing interpreter for English-Japanese...', icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />, delay: 6000 },
  { text: 'Care journey ready. Interpreter assigned.', icon: <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />, delay: 7200 },
];

function StreamingLog() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = streamingSteps.map((step, i) =>
      setTimeout(() => setVisibleCount(i + 1), step.delay)
    );
    const resetTimer = setTimeout(() => setVisibleCount(0), 10000);
    const loopTimer = setTimeout(() => {
      streamingSteps.forEach((step, i) => {
        setTimeout(() => setVisibleCount(i + 1), step.delay);
      });
    }, 10500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    <div className="space-y-2">
      {streamingSteps.slice(0, visibleCount).map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 text-body-sm"
        >
          <span className="flex-shrink-0">{step.icon}</span>
          <span className={index === visibleCount - 1 ? 'text-on-dark' : 'text-mute'}>
            {step.text}
          </span>
        </motion.div>
      ))}
      {visibleCount > 0 && visibleCount < streamingSteps.length && (
        <div className="flex items-center gap-2 mt-3">
          <div className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      )}
    </div>
  );
}

export default function AgentPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { setCurrentPage } = useApp();

  return (
    <section className="py-section bg-canvas relative overflow-hidden" ref={ref}>
      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.06] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #00E5FF, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-caption-md text-mute">Navigation Assistant</span>
            </div>

            <h2 className="text-display-lg text-ink mb-4">
              Your Navigation Assistant.
            </h2>
            <p className="text-body-lg text-body mb-8 max-w-md">
              The system actively works on your behalf — searching providers, checking availability,
              preparing interpreters, and tracking outcomes. Not a chatbot. A care coordinator.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: <Zap className="w-4 h-4" />, text: 'Reviews nearby care options automatically' },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Verifies provider credentials and availability' },
                { icon: <Sparkles className="w-4 h-4" />, text: 'Prepares language support before you arrive' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-body-sm text-body">
                  <span className="text-accent-cyan">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage('workspace')}
              className="btn-primary text-button-md"
            >
              See how it works
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right: Agent workspace mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl border border-hairline overflow-hidden bg-surface">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline bg-surface-elevated">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-red/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-amber/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-green/60" />
                </div>
                <span className="text-caption-sm text-mute ml-2">Navigation Assistant</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-caption-sm text-accent-green">Active</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <img
                  src="/agent-workspace.jpg"
                  alt="Agent Workspace"
                  className="w-full rounded-lg border border-hairline mb-5"
                />
                <StreamingLog />
              </div>
            </div>

            {/* Glow */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-12 opacity-20"
              style={{
                background: 'radial-gradient(ellipse, #00E5FF, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
