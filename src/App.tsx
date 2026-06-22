/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';
import Layout from './components/Layout';
import './i18n';
import { useStore } from './store';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));

const LoadingFallback = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
    <div className="flex items-center gap-3 font-bold text-2xl text-indigo-600 dark:text-indigo-400 mb-4 animate-pulse">
      <ShieldCheck className="w-10 h-10" />
      SecureTrack
    </div>
    <div className="w-48 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-600 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
  const { language } = useStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <APIProvider apiKey={apiKey}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="admin" element={<Admin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </APIProvider>
  );
}
