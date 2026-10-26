import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartHandshake, Globe, UserCheck, Search, Sun, Moon } from 'lucide-react';

export const Header = ({ currentRole, setRole }) => {
  const { lang, setLang, t, theme, toggleTheme } = useLanguage();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Логотип */}
        <div className="flex items-center gap-2">
          <div className="bg-teal-600 text-white p-2 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            {t('brand')}
          </span>
        </div>

        {/* Переключатель ролей (Клиент / Врач) */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setRole('client')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentRole === 'client'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            {t('clientView')}
          </button>
          
          <button
            onClick={() => setRole('psychologist')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentRole === 'psychologist'
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            {t('psychologistView')}
          </button>
        </div>

        {/* Правая часть: Языки + Кнопка темы */}
        <div className="flex items-center gap-3">
          
          {/* Переключатель темы */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            title="Переключить тему"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Переключатель языков */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            <Globe className="w-4 h-4 text-slate-400 ml-1 mr-1" />
            {['ru', 'ua', 'en'].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-0.5 rounded text-xs font-semibold uppercase transition-all ${
                  lang === code
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

        </div>

      </div>
    </header>
  );
};