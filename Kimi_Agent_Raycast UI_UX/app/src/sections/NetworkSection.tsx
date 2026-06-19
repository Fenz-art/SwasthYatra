import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Stethoscope, Building2, Pill, MessageSquare, HeartPulse, Ambulance } from 'lucide-react';

const providers = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    name: 'Doctors',
    count: '12,400+',
    description: 'Verified physicians across 80+ countries, screened for international patient experience.',
    color: 'cyan',
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    name: 'Hospitals',
    count: '3,200+',
    description: 'Accredited hospitals and clinics with dedicated international patient services.',
    color: 'green',
  },
  {
    icon: <Pill className="w-5 h-5" />,
    name: 'Pharmacies',
    count: '8,600+',
    description: 'Partnered pharmacies offering medication equivalency and dosage guidance.',
    color: 'amber',
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    name: 'Interpreters',
    count: '2,100+',
    description: 'Medical interpreters specializing in 45+ languages for accurate communication.',
    color: 'cyan',
  },
  {
    icon: <HeartPulse className="w-5 h-5" />,
    name: 'Specialists',
    count: '5,800+',
    description: 'Specialist consultants across cardiology, orthopedics, pediatrics, and more.',
    color: 'green',
  },
  {
    icon: <Ambulance className="w-5 h-5" />,
    name: 'Emergency',
    count: '1,900+',
    description: '24/7 emergency response centers with direct admission protocols.',
    color: 'red',
  },
];

export default function NetworkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="network" className="py-section bg-canvas" ref={ref}>
      <div className="max-w-content mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-lg text-ink mb-4">
            Built for professionals like you.
          </h2>
          <p className="text-body-lg text-body max-w-lg mx-auto">
            A global network of verified healthcare providers, ready to help travelers navigate care anywhere.
          </p>
        </motion.div>

        {/* Provider network image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mb-16 rounded-xl border border-hairline overflow-hidden"
        >
          <img
            src="/provider-network.jpg"
            alt="Provider Network"
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-heading-sm text-ink">Global Provider Network</p>
            <p className="text-body-sm text-body">
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
              <div className={`app-icon-tile ${
                provider.color === 'cyan' ? 'text-accent-cyan bg-accent-cyan-soft' :
                provider.color === 'green' ? 'text-accent-green bg-accent-green-soft' :
                provider.color === 'amber' ? 'text-accent-amber bg-accent-amber-soft' :
                'text-accent-red bg-accent-red-soft'
              }`}>
                {provider.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-body-sm-strong text-on-dark">{provider.name}</h3>
                  <span className="text-caption-sm text-mute">{provider.count}</span>
                </div>
                <p className="text-caption-md text-mute leading-relaxed">{provider.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
