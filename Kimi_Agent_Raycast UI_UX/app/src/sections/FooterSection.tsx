import { Globe } from 'lucide-react';

const footerColumns = [
  {
    title: 'Product',
    links: ['Dashboard', 'Journey', 'Find Care', 'Interpreter', 'Medications', 'Pricing'],
  },
  {
    title: 'Core Features',
    links: ['Provider Search', 'Care Navigation', 'Language Support', 'Emergency Help', 'Medication Guide', 'Outcome Tracking'],
  },
  {
    title: 'Top Providers',
    links: ['Doctors', 'Hospitals', 'Pharmacies', 'Specialists', 'Emergency Centers', 'Interpreters'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Terms of Service', 'Privacy Policy', 'Contact'],
  },
  {
    title: 'Community',
    links: ['Community Stories', 'Ambassadors', 'Forum', 'X / Twitter', 'GitHub', 'Dribbble'],
  },
  {
    title: 'By SwasthYatra',
    links: ['API Docs', 'Developer Tools', 'Status', 'Changelog', 'Roadmap'],
  },
];

export default function FooterSection() {
  return (
    <footer className="relative bg-canvas border-t border-hairline">
      {/* Faint cyan stripe at top of footer */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, #00E5FF, #0066FF, transparent)',
        }}
      />

      <div className="max-w-content mx-auto px-6 pt-16 pb-8">
        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-body-sm-strong text-on-dark mb-4">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <button className="text-body-sm text-mute hover:text-body transition-colors text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-hairline">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent-cyan" />
            <span className="text-body-sm-strong text-on-dark">SwasthYatra</span>
          </div>
          <p className="text-caption-md text-stone">
            Healthcare Navigation Network. Built for travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
