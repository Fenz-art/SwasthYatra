import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  Stethoscope,
  MessageSquare,
  Pill,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Shield,
  Phone,
  Activity,
  Globe,
  Command,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useApp } from '../App';

const sidebarNav = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', id: 'dashboard' },
  { icon: <Map className="w-4 h-4" />, label: 'My Journey', id: 'journey' },
  { icon: <Stethoscope className="w-4 h-4" />, label: 'Find Care', id: 'care' },
  { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages', id: 'messages' },
  { icon: <Pill className="w-4 h-4" />, label: 'Medications', id: 'medications' },
  { icon: <Settings className="w-4 h-4" />, label: 'Settings', id: 'settings' },
];

const recentActivity = [
  { text: 'Provider confirmed for your appointment', time: '2 min ago', type: 'success' },
  { text: 'Translation ready for Tokyo Medical Center visit', time: '5 min ago', type: 'info' },
  { text: 'Follow-up scheduled for next week', time: '8 min ago', type: 'neutral' },
  { text: 'Care journey updated with new notes', time: '15 min ago', type: 'neutral' },
];

const quickActions = [
  { icon: <Stethoscope className="w-4 h-4" />, label: 'Find Provider' },
  { icon: <Shield className="w-4 h-4" />, label: 'View Passport' },
  { icon: <MessageSquare className="w-4 h-4" />, label: 'Open Interpreter' },
  { icon: <Phone className="w-4 h-4" />, label: 'Contact Support' },
];

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { setCurrentPage, setCommandPaletteOpen } = useApp();

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-canvas border-r border-hairline flex flex-col"
      >
        {/* Wordmark */}
        <div className="h-14 flex items-center px-4 border-b border-hairline">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2 text-on-dark"
          >
            <Globe className="w-5 h-5 text-accent-cyan flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-body-sm-strong text-on-dark whitespace-nowrap">SwasthYatra</span>
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-120 ${
                activeTab === item.id
                  ? 'bg-surface text-on-dark'
                  : 'text-mute hover:text-body hover:bg-surface/50'
              }`}
            >
              {item.icon}
              {!sidebarCollapsed && (
                <span className="text-body-sm whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}

          {/* Command Palette trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-mute hover:text-body hover:bg-surface/50 transition-all mt-4"
          >
            <Command className="w-4 h-4" />
            {!sidebarCollapsed && (
              <>
                <span className="text-body-sm whitespace-nowrap flex-1">Commands</span>
                <span className="keycap text-caption-sm">⌘K</span>
              </>
            )}
          </button>
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-hairline">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-md text-mute hover:text-body hover:bg-surface/50 transition-all"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main
        className="flex-1 min-h-screen transition-all duration-250"
        style={{ marginLeft: sidebarCollapsed ? 64 : 240 }}
      >
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-hairline bg-canvas/90 backdrop-blur-md sticky top-0 z-30">
          <h1 className="text-body-strong text-on-dark">Patient Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('workspace')}
              className="btn-primary text-button-md"
            >
              <Plus className="w-4 h-4" />
              New Journey
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-caption-sm text-on-dark">
              SM
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6 max-w-6xl mx-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-heading-lg text-ink mb-1">
              Good evening, Sarah.
            </h2>
            <p className="text-body-md text-body">
              You&apos;re currently in Tokyo, Japan. Everything you need to manage your care journey is in one place.
            </p>
          </motion.div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Journey Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 rounded-xl border border-hairline bg-surface"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent-cyan" />
                    <h3 className="text-heading-sm text-ink">Current Care Journey</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-xs bg-accent-cyan-soft text-accent-cyan text-caption-sm">
                    Active
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-surface-elevated border border-hairline mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body-sm-strong text-on-dark">Food Poisoning Assessment</span>
                    <span className="text-caption-md text-mute">Started 12 minutes ago</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-body-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                      <span className="text-body">Provider response received</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                      <span className="text-body">Conversation ready</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm">
                      <Loader2 className="w-4 h-4 text-accent-cyan animate-spin flex-shrink-0" />
                      <span className="text-on-dark">Waiting for interpreter confirmation...</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="btn-primary text-button-md">Continue Journey</button>
                  <button className="btn-secondary text-button-md">View Details</button>
                </div>
              </motion.div>

              {/* Journey Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 rounded-xl border border-hairline bg-surface"
              >
                <h3 className="text-heading-sm text-ink mb-6">Journey Progress</h3>
                <div className="space-y-0">
                  {[
                    { title: 'Assessment Complete', desc: 'Symptoms reviewed', done: true },
                    { title: 'Care Options Reviewed', desc: 'Providers evaluated', done: true },
                    { title: 'Provider Confirmed', desc: 'Dr. Tanaka assigned', done: true },
                    { title: 'Communication Ready', desc: 'Interpreter preparing', done: false, active: true },
                    { title: 'Treatment', desc: 'Upcoming', done: false },
                    { title: 'Outcome', desc: 'Pending', done: false },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.done
                              ? 'bg-accent-green-soft text-accent-green'
                              : step.active
                              ? 'bg-accent-cyan-soft text-accent-cyan'
                              : 'bg-surface-card text-stone'
                          }`}
                        >
                          {step.done ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-caption-sm">{i + 1}</span>
                          )}
                        </div>
                        {i < arr.length - 1 && (
                          <div
                            className={`w-px h-8 ${
                              step.done ? 'bg-accent-green/30' : 'bg-hairline'
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`text-body-sm ${step.done || step.active ? 'text-on-dark' : 'text-mute'}`}>
                          {step.title}
                        </p>
                        <p className="text-caption-md text-mute">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - 1/3 */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-5 rounded-xl border border-hairline bg-surface"
              >
                <h3 className="text-body-sm-strong text-ink mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-surface-elevated border border-hairline hover:border-hairline-strong transition-all"
                    >
                      <span className="text-on-dark">{action.icon}</span>
                      <span className="text-caption-md text-body">{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Travel Context */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-5 rounded-xl border border-hairline bg-surface"
              >
                <h3 className="text-body-sm-strong text-ink mb-4">Travel Context</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-mute" />
                    <div>
                      <p className="text-caption-md text-mute">Location</p>
                      <p className="text-body-sm text-on-dark">Tokyo, Japan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-mute" />
                    <div>
                      <p className="text-caption-md text-mute">Language</p>
                      <p className="text-body-sm text-on-dark">English (Interpreter: Japanese)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-mute" />
                    <div>
                      <p className="text-caption-md text-mute">Insurance</p>
                      <p className="text-body-sm text-on-dark">Aetna Global</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent-green" />
                    <div>
                      <p className="text-caption-md text-mute">Emergency Contact</p>
                      <p className="text-body-sm text-accent-green">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="p-5 rounded-xl border border-hairline bg-surface"
              >
                <h3 className="text-body-sm-strong text-ink mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          activity.type === 'success'
                            ? 'bg-accent-green'
                            : activity.type === 'info'
                            ? 'bg-accent-cyan'
                            : 'bg-stone'
                        }`}
                      />
                      <div>
                        <p className="text-body-sm text-body">{activity.text}</p>
                        <p className="text-caption-md text-mute">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Provider Status */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-5 rounded-xl border border-hairline bg-surface"
              >
                <h3 className="text-body-sm-strong text-ink mb-3">Current Provider</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated border border-hairline flex items-center justify-center text-body-sm-strong text-on-dark">
                    DT
                  </div>
                  <div>
                    <p className="text-body-sm text-on-dark">Dr. Hiroshi Tanaka</p>
                    <p className="text-caption-md text-mute">General Medicine</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-caption-sm text-accent-green">Online</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
