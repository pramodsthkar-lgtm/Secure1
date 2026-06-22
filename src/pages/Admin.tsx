import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { ShieldAlert, UserCheck, UserX } from 'lucide-react';

export default function Admin() {
  const { t } = useTranslation();
  const { users } = useStore();

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold">{t('User_Management')}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Name')}</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Email')}</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Role')}</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Status')}</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold tracking-wide rounded-full ${
                      user.role === 'admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm capitalize text-slate-600 dark:text-slate-400">{user.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <UserX className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">{t('Reports')}</h2>
        </div>
        <div className="p-8 flex flex-col items-center justify-center text-slate-500 text-center">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-full p-4 mb-4">
                <ShieldAlert className="w-8 h-8 opacity-50" />
            </div>
            <p>Admin security reports will appear here based on tracked incidents.</p>
        </div>
      </div>

    </div>
  );
}
