import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Stethoscope,
  Pill,
  MessageCircle,
  MapPin,
  User,
  Settings,
  FileText,
  HelpCircle,
  ChevronRight,
  Sparkles,
  LogOut,
  Building2,
} from 'lucide-react';
import { useApp } from '../App';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCurrentPage } = useApp();

  const commands: CommandItem[] = [
    {
      id: 'journey',
      title: 'Start a Care Journey',
      subtitle: 'Begin a new healthcare navigation session',
      icon: <Sparkles className="w-4 h-4 text-accent-cyan" />,
      shortcut: 'J',
      action: () => { setCurrentPage('workspace'); onOpenChange(false); },
      category: 'Actions',
    },
    {
      id: 'find-provider',
      title: 'Find Provider',
      subtitle: 'Search for healthcare providers near you',
      icon: <Stethoscope className="w-4 h-4" />,
      shortcut: 'P',
      action: () => { setCurrentPage('dashboard'); onOpenChange(false); },
      category: 'Actions',
    },
    {
      id: 'medication',
      title: 'Search Medication',
      subtitle: 'Look up medications and equivalents',
      icon: <Pill className="w-4 h-4" />,
      shortcut: 'M',
      action: () => { setCurrentPage('dashboard'); onOpenChange(false); },
      category: 'Actions',
    },
    {
      id: 'interpreter',
      title: 'Request Interpreter',
      subtitle: 'Get language support for your appointment',
      icon: <MessageCircle className="w-4 h-4" />,
      shortcut: 'I',
      action: () => { setCurrentPage('workspace'); onOpenChange(false); },
      category: 'Actions',
    },
    {
      id: 'emergency',
      title: 'Emergency Services',
      subtitle: 'Find emergency care immediately',
      icon: <MapPin className="w-4 h-4 text-accent-red" />,
      shortcut: 'E',
      action: () => { setCurrentPage('workspace'); onOpenChange(false); },
      category: 'Actions',
    },
    {
      id: 'dashboard',
      title: 'Open Dashboard',
      subtitle: 'View your healthcare dashboard',
      icon: <Building2 className="w-4 h-4" />,
      shortcut: 'D',
      action: () => { setCurrentPage('dashboard'); onOpenChange(false); },
      category: 'Navigation',
    },
    {
      id: 'agent',
      title: 'Open Agent Workspace',
      subtitle: 'Access the navigation assistant',
      icon: <Sparkles className="w-4 h-4 text-accent-cyan" />,
      shortcut: 'A',
      action: () => { setCurrentPage('workspace'); onOpenChange(false); },
      category: 'Navigation',
    },
    {
      id: 'profile',
      title: 'View Profile',
      subtitle: 'Manage your account settings',
      icon: <User className="w-4 h-4" />,
      action: () => { setCurrentPage('dashboard'); onOpenChange(false); },
      category: 'Settings',
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Application preferences',
      icon: <Settings className="w-4 h-4" />,
      shortcut: ',',
      action: () => { onOpenChange(false); },
      category: 'Settings',
    },
    {
      id: 'docs',
      title: 'Documentation',
      subtitle: 'Browse help articles and guides',
      icon: <FileText className="w-4 h-4" />,
      action: () => { onOpenChange(false); },
      category: 'Help',
    },
    {
      id: 'help',
      title: 'Get Help',
      subtitle: 'Contact support team',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => { onOpenChange(false); },
      category: 'Help',
    },
    {
      id: 'logout',
      title: 'Sign Out',
      subtitle: 'Log out of your account',
      icon: <LogOut className="w-4 h-4" />,
      action: () => { setCurrentPage('landing'); onOpenChange(false); },
      category: 'Account',
    },
  ];

  const filtered = search
    ? commands.filter(
        c =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
          c.category.toLowerCase().includes(search.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!open) setSearch('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, flatFiltered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        flatFiltered[selectedIndex]?.action();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, flatFiltered, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={() => onOpenChange(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-[640px] mx-4 rounded-xl overflow-hidden border border-hairline shadow-2xl"
            style={{ backgroundColor: '#0d0d0d' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-hairline">
              <Search className="w-5 h-5 text-mute flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-on-dark text-body-md placeholder:text-ash outline-none"
              />
              <div className="keycap text-caption-md">ESC</div>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-1.5 text-caption-sm text-mute font-medium uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => {
                    const globalIdx = flatFiltered.findIndex(f => f.id === item.id);
                    const isSelected = globalIdx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 mx-0 text-left transition-colors duration-100 ${
                          isSelected ? 'bg-surface-card' : 'hover:bg-surface-card/50'
                        }`}
                        style={{ borderRadius: 0 }}
                      >
                        <div className="app-icon-tile w-8 h-8">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-body-sm text-on-dark">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-caption-md text-mute truncate">{item.subtitle}</div>
                          )}
                        </div>
                        {item.shortcut && (
                          <div className="keycap text-caption-sm">
                            {item.shortcut}
                          </div>
                        )}
                        <ChevronRight className="w-4 h-4 text-stone flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              ))}

              {flatFiltered.length === 0 && (
                <div className="px-4 py-8 text-center text-mute text-body-sm">
                  No commands found for &ldquo;{search}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2 border-t border-hairline text-caption-sm text-mute">
              <div className="flex items-center gap-1.5">
                <span className="keycap text-caption-sm">↑</span>
                <span className="keycap text-caption-sm">↓</span>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="keycap text-caption-sm">↵</span>
                <span>to select</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
