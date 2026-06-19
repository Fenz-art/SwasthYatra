import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Stethoscope, Route, Languages, Shield, Clock, Pill } from 'lucide-react';

const features = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    title: 'Find Care',
    description: 'Locate trusted providers nearby, verified by our network. Filter by language, specialty, and availability.',
    image: '/feature-find-care.jpg',
  },
  {
    icon: <Route className="w-5 h-5" />,
    title: 'Navigate',
    description: 'Step-by-step guidance through unfamiliar healthcare systems. Know what to expect at every stage.',
    image: null,
  },
  {
    icon: <Languages className="w-5 h-5" />,
    title: 'Communicate',
    description: 'Language barriers removed with built-in interpreter support. Real-time translation for medical conversations.',
    image: '/feature-communicate.jpg',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Verified Network',
    description: 'Every provider is verified for quality, credentials, and experience with international patients.',
    image: null,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: '24/7 Support',
    description: 'Around-the-clock assistance from our navigation team. Never feel alone in a healthcare crisis.',
    image: null,
  },
  {
    icon: <Pill className="w-5 h-5" />,
    title: 'Medication Guide',
    description: 'Understand local medication equivalents, dosages, and interactions wherever you travel.',
    image: null,
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-section bg-canvas" ref={ref}>
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-lg text-ink mb-4">
            Take shortcuts, not detours.
          </h2>
          <p className="text-body-lg text-body max-w-lg mx-auto">
            One interface, everything you need to navigate healthcare anywhere in the world.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="feature-card group cursor-default"
            >
              {/* Icon */}
              <div className="app-icon-tile mb-4 group-hover:scale-105 transition-transform duration-180">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-heading-sm text-ink mb-2">{feature.title}</h3>
              <p className="text-body-sm text-body mb-4">{feature.description}</p>

              {/* Optional image */}
              {feature.image && (
                <div className="mt-4 rounded-lg border border-hairline overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              )}

              {/* Learn more link */}
              <button className="mt-4 text-body-sm-strong text-on-dark hover:text-accent-cyan transition-colors flex items-center gap-1">
                Learn more
                <span className="text-mute">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
