import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useApp } from '../App';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCurrentPage, setCommandPaletteOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product', action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Features', action: () => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Network', action: () => document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Documentation', action: () => {} },
    { label: 'Blog', action: () => {} },
    { label: 'Pricing', action: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center transition-all duration-200 ${
          scrolled || !transparent
            ? 'bg-canvas/90 backdrop-blur-md border-b border-hairline'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-content mx-auto px-6 flex items-center justify-between">
          {/* Left: Wordmark */}
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2 text-on-dark hover:opacity-80 transition-opacity"
          >
            <Globe className="w-5 h-5 text-accent-cyan" />
            <span className="text-body-sm-strong text-on-dark tracking-wide">SwasthYatra</span>
          </button>

          {/* Center: Nav Links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={link.action}
                className="px-3 py-1.5 text-body-sm text-body hover:text-on-dark transition-colors duration-120"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="hidden sm:block text-body-sm text-body hover:text-on-dark transition-colors duration-120"
            >
              Sign in
            </button>
            <button
              onClick={() => setCurrentPage('workspace')}
              className="btn-primary text-button-md"
            >
              Start Journey
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-on-dark p-1"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 left-0 w-72 bg-canvas border-r border-hairline z-[60] md:hidden"
          >
            <div className="p-6 pt-20">
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => { link.action(); setMobileOpen(false); }}
                    className="text-left px-4 py-3 text-body-md text-body hover:text-on-dark hover:bg-surface rounded-lg transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-hairline">
                <button
                  onClick={() => { setCommandPaletteOpen(true); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 text-body-md text-body hover:text-on-dark hover:bg-surface rounded-lg transition-all w-full"
                >
                  <span>Command Palette</span>
                  <span className="keycap ml-auto">⌘K</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
