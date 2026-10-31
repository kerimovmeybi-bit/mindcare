import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Handshake, Home, Search, GraduationCap, Newspaper, Stethoscope, User, Sun, Moon, Menu, X, Sparkles } from 'lucide-react';

export const Header = ({ currentRole, setRole, isClientLoggedIn, onOpenClientLogin, activeTab, setActiveTab }) => {
  const { language, setLanguage, theme, setTheme, t } = useLanguage();
  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    setRole('client');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleCatalogClick = () => {
    setRole('client');
    setActiveTab('catalog');
    const catalogElement = document.getElementById('psychologists-catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCoursesClick = () => {
    setRole('client');
    setActiveTab('courses');
    const coursesElement = document.getElementById('courses-section');
    if (coursesElement) {
      coursesElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNewsClick = () => {
    setRole('client');
    setActiveTab('news');
    const newsElement = document.getElementById('news-section');
    if (newsElement) {
      newsElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDoctorClick = () => {
    setRole('psychologist');
    setActiveTab('doctor-cabinet');
    setIsMobileMenuOpen(false);
  };

  const handleClientClick = () => {
    setActiveTab('client-cabinet');
    if (!isClientLoggedIn && onOpenClientLogin) {
      onOpenClientLogin();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
      isDark ? 'bg-slate-900/80 border-slate-800 text-white shadow-2xl shadow-teal-500/5' : 'bg-white/80 border-slate-200 text-slate-900 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Логотип */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer group" onClick={handleHomeClick}>
          <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/30 group-hover:scale-105 transition-transform">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {t('brand') || "MindCare"}
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold">
              Platform
            </span>
          </div>
        </div>

        {/* Навигационная капсула (СКРЫТА на мобилках, ВИДНА на экранах md и выше) */}
        <div className={`hidden md:flex items-center p-1.5 rounded-2xl border backdrop-blur-md ${
          isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-100/80 border-slate-200/80'
        }`}>
          {/* 1. Главная */}
          <button
            type="button"
            onClick={handleHomeClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'home'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'catalog'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'courses'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'news'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            {t('header.news') || "Новости"}
          </button>

          {/* 5. Кабинет врача */}
          <button
            type="button"
            onClick={handleDoctorClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'psychologist'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            {t('header.doctorCabinet') || "Кабинет врача"}
          </button>

          {/* 6. Кабинет клиента */}
          <button
            type="button"
            onClick={handleClientClick}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'client-cabinet'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            {t('header.clientCabinet') || "Кабинет клиента"}
          </button>
        </div>

        {/* Правая часть: Тема + Языки + Кнопка мобильного бургера */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Сменить тему"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className={`hidden sm:flex items-center p-1 rounded-2xl border ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            {['ru', 'ua', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase transition-all ${
                  language === lang
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Кнопка Бургер-меню для мобилок */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ (БУРГЕР) */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-5 space-y-2.5 animate-fade-in backdrop-blur-xl ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          {/* Языки в мобильном меню */}
          <div className="flex sm:hidden items-center justify-between pb-3.5 mb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Язык / Мова:</span>
            <div className={`flex items-center p-1 rounded-2xl border ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              {['ru', 'ua', 'en'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase transition-all ${
                    language === lang
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleHomeClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'home'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Home className="w-4 h-4" />
            {t('header.home') || "Главная"}
          </button>

          <button
            type="button"
            onClick={handleCatalogClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'catalog'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Search className="w-4 h-4" />
            {t('header.catalog') || "Каталог"}
          </button>

          <button
            type="button"
            onClick={handleCoursesClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'courses'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            {t('header.courses') || "Курсы"}
          </button>

          <button
            type="button"
            onClick={handleNewsClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'news'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            {t('header.news') || "Новости"}
          </button>

          <button
            type="button"
            onClick={handleDoctorClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'psychologist'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            {t('header.doctorCabinet') || "Кабинет врача"}
          </button>

          <button
            type="button"
            onClick={handleClientClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
              currentRole === 'client' && activeTab === 'client-cabinet'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <User className="w-4 h-4" />
            {t('header.clientCabinet') || "Кабинет клиента"}
          </button>
        </div>
      )}
    </header>
  );
};