import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ClipboardCheck, ListChecks, UserCheck, MessageCircle, HeartPulse, Flag } from 'lucide-react';

const stages = [
  {
    icon: <ClipboardCheck className="w-5 h-5" />,
    title: 'Assessment Complete',
    description: 'Your symptoms have been reviewed and the safest next step has been identified.',
    status: 'done',
  },
  {
    icon: <ListChecks className="w-5 h-5" />,
    title: 'Care Options Reviewed',
    description: 'Nearby providers were evaluated based on language support, availability, and previous care outcomes.',
    status: 'done',
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Provider Confirmed',
    description: 'A provider is available and ready to assist with your healthcare needs.',
    status: 'active',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Communication Ready',
    description: 'Translation support has been prepared automatically for your appointment.',
    status: 'pending',
  },
  {
    icon: <HeartPulse className="w-5 h-5" />,
    title: 'Treatment Received',
    description: 'Your care journey continues with follow-up support and outcome tracking.',
    status: 'pending',
  },
  {
    icon: <Flag className="w-5 h-5" />,
    title: 'Journey Completed',
    description: 'Your treatment journey has been recorded for future reference and learning.',
    status: 'pending',
  },
];

export default function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="py-section bg-canvas" ref={ref}>
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface mb-6">
            <span className="text-caption-md text-mute">Journey Timeline</span>
          </div>
          <h2 className="text-display-lg text-ink mb-4">
            Your care journey, simplified.
          </h2>
          <p className="text-body-lg text-body max-w-lg mx-auto">
            From assessment to outcome, we guide you through every step with clarity and confidence.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="relative rounded-xl border border-hairline overflow-hidden bg-surface">
            <img
              src="/journey-timeline.jpg"
              alt="Care Journey Timeline"
              className="w-full"
            />
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
              className="relative flex gap-4 p-4 rounded-lg border border-hairline bg-surface hover:bg-surface-elevated transition-all duration-180"
            >
              {/* Status indicator */}
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    stage.status === 'done'
                      ? 'bg-accent-green-soft text-accent-green'
                      : stage.status === 'active'
                      ? 'bg-accent-cyan-soft text-accent-cyan'
                      : 'bg-surface-card text-stone'
                  }`}
                >
                  {stage.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-body-sm-strong text-on-dark">{stage.title}</h3>
                  {stage.status === 'active' && (
                    <span className="px-1.5 py-0.5 rounded-xs bg-accent-cyan-soft text-accent-cyan text-caption-sm">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-caption-md text-mute leading-relaxed">{stage.description}</p>
              </div>

              {/* Connecting line (not on last item) */}
              {index < stages.length - 1 && (
                <div
                  className={`hidden lg:block absolute left-[27px] top-12 w-px h-6 ${
                    stage.status === 'done' ? 'bg-accent-green/30' : 'bg-hairline'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
