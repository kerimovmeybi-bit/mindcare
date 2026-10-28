import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Search, Stethoscope, User, Sun, Moon, UserPlus } from 'lucide-react';

export const Header = ({ currentRole, setRole, onOpenRegister, isClientLoggedIn, onOpenClientLogin, isCatalogView }) => {
  const { language, setLanguage, theme, setTheme, t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Логотип */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setRole('client')}>
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">{t('brand') || "MindCare"}</span>
        </div>

        {/* Единая объединяющая капсула для переключателей */}
        <div className={`flex items-center p-1.5 rounded-2xl border ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {/* 1. Каталог (подсвечивается, если активна роль клиента и открыт каталог) */}
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && (isCatalogView || !isClientLoggedIn)
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            {t('header.catalog') || "Каталог"}
          </button>

          {/* 2. Кабинет врача */}
          <button
            type="button"
            onClick={() => setRole('psychologist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'psychologist'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            {t('header.doctorCabinet') || "Кабинет врача"}
          </button>

          {/* 3. Кабинет клиента / Вход для клиента (подсвечивается, если открыт именно кабинет) */}
          <button
            type="button"
            onClick={onOpenClientLogin}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && isClientLoggedIn && !isCatalogView
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            {isClientLoggedIn 
              ? (t('header.clientCabinet') || "Кабинет клиента") 
              : (t('header.clientLogin') || "Вход для клиента")}
          </button>
        </div>

        {/* Правая часть: Регистрация + Тема + Язык */}
        <div className="flex items-center gap-3 shrink-0">
          
          {onOpenRegister && (
            <button
              type="button"
              onClick={onOpenRegister}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm shadow-teal-600/20"
            >
              <UserPlus className="w-4 h-4" />
              {t('header.register') || "Регистрация"}
            </button>
          )}

          {/* Кнопка смены темы */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title="Сменить тему"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Переключатель языков */}
          <div className={`flex items-center p-1 rounded-xl border ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            {['ru', 'ua', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                  language === lang
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
};