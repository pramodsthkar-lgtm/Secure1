import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { Moon, Sun, Languages } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, language, setTheme, setLanguage } = useStore();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="max-w-3xl space-y-6">
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold">{t('Settings')}</h2>
        </div>
        
        <div className="p-6 space-y-8">
            
          {/* Theme Settings */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Appearance</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                  theme === 'light' 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-medium">{t('Light_Mode')}</span>
              </button>
              <button
                 onClick={() => setTheme('dark')}
                 className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                   theme === 'dark' 
                     ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                     : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                 }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-medium">{t('Dark_Mode')}</span>
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Language Settings */}
          <div>
             <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                 <Languages className="w-4 h-4"/>
                 {t('Language')}
             </h3>
             <div className="flex items-center gap-4">
               <button
                 onClick={() => handleLanguageChange('en')}
                 className={`flex-1 p-4 rounded-xl border-2 transition-colors font-medium ${
                   language === 'en' 
                     ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                     : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                 }`}
               >
                 English
               </button>
               <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-colors font-medium ${
                    language === 'hi' 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
               >
                 हिंदी
               </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
