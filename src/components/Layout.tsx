import React, { useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { Shield, LayoutDashboard, Users, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const { t } = useTranslation();
  const { theme, currentUser, logout } = useStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navLinks = [
    { to: '/', icon: LayoutDashboard, label: t('Dashboard') },
    { to: '/admin', icon: Users, label: t('Admin_Panel') },
    { to: '/settings', icon: Settings, label: t('Settings') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-200">
      
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 shadow-sm z-20">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <Shield className="w-6 h-6" />
          {t('App_Title')}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 border rounded-md dark:border-slate-700">
          {sidebarOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white dark:bg-slate-800 shadow-xl md:shadow-md w-64 md:relative md:translate-x-0 transform transition-transform duration-300 ease-in-out z-30 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex items-center gap-3 p-6 font-bold text-2xl text-indigo-600 dark:text-indigo-400 border-b dark:border-slate-700">
          <Shield className="w-8 h-8" />
          {t('App_Title')}
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                isActive 
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 w-full transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            {t('Sign_Out')}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen flex flex-col">
        <header className="hidden md:flex items-center justify-between p-6 bg-white dark:bg-slate-800 shadow-sm z-10 sticky top-0">
          <h1 className="text-2xl font-bold">
            {navLinks.find(l => l.to === location.pathname)?.label || t('App_Title')}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white dark:border-slate-800">
              {currentUser?.avatar || 'U'}
            </div>
          </div>
        </header>
        
        <div className="p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
