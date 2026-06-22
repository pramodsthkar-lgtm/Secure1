import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Language = 'en' | 'hi';

export interface Activity {
  id: string;
  type: string;
  timestamp: number;
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  lastLocation?: { lat: number; lng: number };
}

interface CurrentUser {
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  theme: Theme;
  language: Language;
  activities: Activity[];
  users: User[];
  isSosActive: boolean;
  isAuthenticated: boolean;
  currentUser: CurrentUser | null;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: Language) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  triggerSOS: () => void;
  resolveSOS: () => void;
  initMockData: () => void;
  loginWithGoogle: () => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',
      activities: [],
      users: [],
      isSosActive: false,
      isAuthenticated: false,
      currentUser: null,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      loginWithGoogle: () => set({ 
        isAuthenticated: true, 
        currentUser: { name: 'Demo User', email: 'user@gmail.com', avatar: 'D' } 
      }),
      logout: () => set({ 
        isAuthenticated: false, 
        currentUser: null,
        isSosActive: false
      }),
      addActivity: (activity) => 
        set((state) => ({
          activities: [
            {
              ...activity,
              id: Math.random().toString(36).substring(2, 9),
              timestamp: Date.now(),
            },
            ...state.activities,
          ],
        })),
      triggerSOS: () => {
        set({ isSosActive: true });
        get().addActivity({ type: 'sos', message: 'SOS Triggered!', severity: 'critical' });
      },
      resolveSOS: () => {
        set({ isSosActive: false });
        get().addActivity({ type: 'sos_resolved', message: 'SOS Resolved', severity: 'info' });
      },
      initMockData: () => {
        if (get().users.length === 0) {
          set({
            users: [
              { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', lastLocation: { lat: 28.6139, lng: 77.2090 } },
              { id: '2', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', status: 'active', lastLocation: { lat: 19.0760, lng: 72.8777 } }
            ],
            activities: [
              { id: 'a1', type: 'login', timestamp: Date.now() - 3600000, message: 'App Lock enabled', severity: 'info' },
              { id: 'a2', type: 'alert', timestamp: Date.now() - 7200000, message: 'Data backup completed', severity: 'info' }
            ]
          });
        }
      }
    }),
    {
      name: 'securetrack-storage',
    }
  )
);
