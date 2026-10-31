import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cookie, Sparkles } from 'lucide-react';

export const CookieBanner = () => {
  const { t, theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mindcare_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mindcare_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mindcare_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    /* Позиционирование строго по центру внизу экрана с плавной анимацией */
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 animate-fade-in">
      <div className={`relative overflow-hidden ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-2xl shadow-teal-500/5' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-2xl'
      } backdrop-blur-xl border rounded-3xl p-5 flex flex-col gap-4`}>
        
        {/* Фоновое мягкое свечение */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-sm mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="pr-2">
            <h4 className="font-black text-sm mb-1 tracking-tight flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Cookie Notice' : lang === 'ua' ? 'Файли Cookie' : 'Файлы Cookie'}</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('cookie.text')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-1 relative z-10">
          <button
            onClick={handleAccept}
            className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95"
          >
            {t('cookie.accept')}
          </button>
          <button
            onClick={handleDecline}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 border ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t('cookie.decline')}
          </button>
        </div>

      </div>
    </div>
  );
};