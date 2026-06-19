import { useState, useEffect, createContext, useContext } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AgentWorkspacePage from './pages/AgentWorkspacePage';
import CommandPalette from './components/CommandPalette';
import { Toaster } from '@/components/ui/sonner';

export type Page = 'landing' | 'dashboard' | 'workspace';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
}

export const AppContext = createContext<AppContextType>({
  currentPage: 'landing',
  setCurrentPage: () => {},
  commandPaletteOpen: false,
  setCommandPaletteOpen: () => {},
  userRole: 'patient',
  setUserRole: () => {},
});

export const useApp = () => useContext(AppContext);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [userRole, setUserRole] = useState('patient');

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        commandPaletteOpen,
        setCommandPaletteOpen,
        userRole,
        setUserRole,
      }}
    >
      <div className="min-h-screen bg-canvas text-body font-inter antialiased"
        style={{ fontFeatureSettings: '"calt", "kern", "liga", "ss03"' }}>
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'workspace' && <AgentWorkspacePage />}
        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
        />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0d0d0d',
              border: '1px solid #242728',
              color: '#cdcdcd',
            },
          }}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
