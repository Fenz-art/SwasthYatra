import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  Stethoscope,
  MessageSquare,
  Phone,
  Shield,
  User,
  Command,
  Zap,
  Clock,
} from 'lucide-react';
import { useApp } from '../App';

interface LogEntry {
  id: string;
  text: string;
  status: 'loading' | 'success' | 'info';
  timestamp: Date;
}

const initialLogs: LogEntry[] = [
  { id: '1', text: 'Searching Tokyo providers matching pharmacy specialty...', status: 'success', timestamp: new Date(Date.now() - 300000) },
  { id: '2', text: 'Found 24 providers within 5km.', status: 'success', timestamp: new Date(Date.now() - 240000) },
  { id: '3', text: 'Ranking providers using care outcome data...', status: 'success', timestamp: new Date(Date.now() - 180000) },
  { id: '4', text: 'Contacting Dr. Tanaka at Tokyo Medical Center...', status: 'success', timestamp: new Date(Date.now() - 120000) },
  { id: '5', text: 'Provider accepted. Available today at 3:00 PM.', status: 'success', timestamp: new Date(Date.now() - 60000) },
];

const streamingPhases = [
  { text: 'Preparing interpreter for English-Japanese session...', status: 'loading' as const, delay: 0 },
  { text: 'Interpreter assigned: Yuki Tanaka (Medical certified)', status: 'success' as const, delay: 2000 },
  { text: 'Generating care journey summary...', status: 'loading' as const, delay: 4000 },
  { text: 'Care journey ready. All systems coordinated.', status: 'success' as const, delay: 6000 },
  { text: 'Preparing appointment reminders and follow-up schedule...', status: 'loading' as const, delay: 8000 },
  { text: 'Follow-up scheduled for 48 hours post-visit.', status: 'success' as const, delay: 10000 },
];

export default function AgentWorkspacePage() {
  const { setCurrentPage, setCommandPaletteOpen } = useApp();
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [inputValue, setInputValue] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Streaming effect
  useEffect(() => {
    if (currentPhase >= streamingPhases.length) {
      setIsStreaming(false);
      return;
    }

    const phase = streamingPhases[currentPhase];
    const timer = setTimeout(() => {
      setLogs(prev => [
        ...prev,
        {
          id: `stream-${currentPhase}`,
          text: phase.text,
          status: phase.status,
          timestamp: new Date(),
        },
      ]);
      setCurrentPhase(prev => prev + 1);
    }, phase.delay);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  // Auto-scroll
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setLogs(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        text: `You: ${inputValue}`,
        status: 'info',
        timestamp: new Date(),
      },
    ]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        {
          id: `resp-${Date.now()}`,
          text: 'Reviewing your request and checking provider availability...',
          status: 'loading',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const contextCards = [
    { icon: <MapPin className="w-4 h-4" />, label: 'Tokyo, Japan', sub: 'Current location' },
    { icon: <Stethoscope className="w-4 h-4" />, label: 'Dr. Tanaka', sub: 'General Medicine' },
    { icon: <Clock className="w-4 h-4" />, label: 'Today 3:00 PM', sub: 'Appointment' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'EN → JA', sub: 'Interpreter ready' },
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-hairline bg-canvas/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-mute hover:text-on-dark transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <h1 className="text-body-strong text-on-dark">Navigation Assistant</h1>
          </div>
          {isStreaming && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-cyan-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-caption-sm text-accent-cyan">Working</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="keycap text-caption-sm cursor-pointer hover:border-hairline-strong"
          >
            <Command className="w-3 h-3" />
            K
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-caption-sm text-on-dark">
            SM
          </div>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main: Activity Log */}
        <main className="flex-1 flex flex-col min-h-0">
          {/* Context bar */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-hairline bg-surface/50 overflow-x-auto">
            {contextCards.map((card) => (
              <div
                key={card.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-hairline flex-shrink-0"
              >
                <span className="text-mute">{card.icon}</span>
                <div>
                  <p className="text-caption-md text-on-dark">{card.label}</p>
                  <p className="text-caption-sm text-mute">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Log area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  {log.status === 'loading' ? (
                    <Loader2 className="w-4 h-4 text-accent-cyan animate-spin flex-shrink-0 mt-0.5" />
                  ) : log.status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                  ) : (
                    <User className="w-4 h-4 text-mute flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-body-sm ${
                        log.status === 'info'
                          ? 'text-body'
                          : log.status === 'loading'
                          ? 'text-on-dark'
                          : 'text-body'
                      }`}
                    >
                      {log.text}
                    </p>
                    <p className="text-caption-sm text-stone mt-0.5">
                      {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isStreaming && (
              <div className="flex items-center gap-2 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
            )}

            <div ref={logEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-hairline bg-canvas">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your care journey..."
                className="flex-1 px-4 py-2.5 rounded-md bg-surface-elevated border border-hairline text-on-dark text-body-sm placeholder:text-ash outline-none focus:border-hairline-strong transition-colors"
              />
              <button
                onClick={handleSend}
                className="btn-primary px-4"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-caption-sm text-stone mt-2">
              The Navigation Assistant coordinates care on your behalf. No prompts needed.
            </p>
          </div>
        </main>

        {/* Right panel: Context & Actions */}
        <aside className="w-full lg:w-80 border-l border-hairline bg-surface/30 overflow-y-auto">
          <div className="p-5 space-y-5">
            {/* Journey Status */}
            <div className="p-4 rounded-xl border border-hairline bg-surface">
              <h3 className="text-body-sm-strong text-ink mb-3">Journey Status</h3>
              <div className="space-y-2">
                {[
                  { label: 'Assessment', done: true },
                  { label: 'Provider Match', done: true },
                  { label: 'Interpreter', done: true },
                  { label: 'Appointment', done: false, current: true },
                  { label: 'Follow-up', done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        step.done ? 'bg-accent-green' : step.current ? 'bg-accent-cyan animate-pulse' : 'bg-stone'
                      }`}
                    />
                    <span
                      className={`text-caption-md ${
                        step.done || step.current ? 'text-body' : 'text-stone'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Card */}
            <div className="p-4 rounded-xl border border-hairline bg-surface">
              <h3 className="text-body-sm-strong text-ink mb-3">Confirmed Provider</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-body-sm-strong text-on-dark">
                  DT
                </div>
                <div>
                  <p className="text-body-sm text-on-dark">Dr. Hiroshi Tanaka</p>
                  <p className="text-caption-md text-mute">General Medicine</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-caption-md text-mute">
                  <MapPin className="w-3.5 h-3.5" />
                  Tokyo Medical Center, 2.3km
                </div>
                <div className="flex items-center gap-2 text-caption-md text-mute">
                  <MessageSquare className="w-3.5 h-3.5" />
                  English, Japanese
                </div>
                <div className="flex items-center gap-2 text-caption-md text-accent-green">
                  <Shield className="w-3.5 h-3.5" />
                  Accepts International Patients
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 rounded-xl border border-hairline bg-surface">
              <h3 className="text-body-sm-strong text-ink mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: <Phone className="w-4 h-4" />, label: 'Call Provider' },
                  { icon: <MessageSquare className="w-4 h-4" />, label: 'Message Interpreter' },
                  { icon: <Zap className="w-4 h-4" />, label: 'Reschedule' },
                  { icon: <Shield className="w-4 h-4" />, label: 'Emergency Help' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-surface-elevated border border-hairline hover:border-hairline-strong transition-all text-left"
                  >
                    <span className="text-mute">{action.icon}</span>
                    <span className="text-body-sm text-body">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl border border-hairline bg-accent-cyan-soft/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent-cyan" />
                <span className="text-body-sm-strong text-accent-cyan">Tip</span>
              </div>
              <p className="text-caption-md text-body">
                Bring your passport and insurance card to the appointment. The interpreter will meet you at the reception.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
