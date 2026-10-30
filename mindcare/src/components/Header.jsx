import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Handshake, Home, Search, GraduationCap, Newspaper, Stethoscope, User, Sun, Moon } from 'lucide-react';

export const Header = ({ currentRole, setRole, isClientLoggedIn, onOpenClientLogin, activeTab, setActiveTab }) => {
  const { language, setLanguage, theme, setTheme, t } = useLanguage();
  const isDark = theme === 'dark';

  const handleHomeClick = () => {
    setRole('client');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalogClick = () => {
    setRole('client');
    setActiveTab('catalog');
    const catalogElement = document.getElementById('psychologists-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCoursesClick = () => {
    setRole('client');
    setActiveTab('courses');
    const coursesElement = document.getElementById('courses-section');
    if (coursesElement) {
      coursesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsClick = () => {
    setRole('client');
    setActiveTab('news');
    const newsElement = document.getElementById('news-section');
    if (newsElement) {
      newsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
      isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Логотип */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={handleHomeClick}>
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <Handshake className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">{t('brand') || "MindCare"}</span>
        </div>

        {/* Навигационная капсула */}
        <div className={`flex items-center p-1.5 rounded-2xl border ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {/* 1. Главная */}
          <button
            type="button"
            onClick={handleHomeClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && activeTab === 'home'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            {t('header.home') || "Главная"}
          </button>

          {/* 2. Каталог */}
          <button
            type="button"
            onClick={handleCatalogClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && activeTab === 'catalog'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            {t('header.catalog') || "Каталог"}
          </button>

          {/* 3. Курсы */}
          <button
            type="button"
            onClick={handleCoursesClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && activeTab === 'courses'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            {t('header.courses') || "Курсы"}
          </button>

          {/* 4. Новости */}
          <button
            type="button"
            onClick={handleNewsClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && activeTab === 'news'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            {t('header.news') || "Новости"}
          </button>

          {/* 5. Кабинет врача */}
          <button
            type="button"
            onClick={() => setRole('psychologist')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'psychologist'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            {t('header.doctorCabinet') || "Кабинет врача"}
          </button>

          {/* 6. Кабинет клиента */}
          <button
            type="button"
            onClick={onOpenClientLogin}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentRole === 'client' && activeTab === 'client-cabinet'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            {t('header.clientCabinet') || "Кабинет клиента"}
          </button>
        </div>

        {/* Правая часть: Тема + Языки */}
        <div className="flex items-center gap-3 shrink-0">
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