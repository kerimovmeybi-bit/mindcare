import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Handshake, ShieldCheck, Clock, HeartHandshake, ArrowRight } from 'lucide-react';

export const HeroHome = ({ onExploreCatalog, onOpenRegister }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);
  const translateY = scrollY * 0.3;

  return (
    <div className="relative overflow-hidden py-12 sm:py-20">
      {/* Мягкое, еле заметное глубокое свечение вместо резких пятен */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[500px] bg-teal-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Главный блок с параллаксом */}
      <div 
        style={{
          opacity: opacity,
          transform: `translateY(${translateY}px)`,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
        }}
        className="text-center max-w-3xl mx-auto space-y-6 relative z-10 px-4"
      >
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold tracking-wide">
          <Handshake className="w-4 h-4" />
          <span>{t('hero.badge') || "Ваше пространство психологического благополучия"}</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
          {t('hero.title') || "Найдите своего психолога для гармонии и поддержки"}
        </h1>

        {/* Описание */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle') || "MindCare — это профессиональная платформа, объединяющая проверенных специалистов. Получайте бережную помощь онлайн, записывайтесь на сессии в удобное время и возвращайте душевное равновесие."}
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-teal-600/25 hover:shadow-teal-600/40 transition-all duration-300 flex items-center justify-center gap-2.5 group active:scale-95"
          >
            <span>Выбрать специалиста</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenRegister}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border transition-all duration-300 active:scale-95 ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-teal-500/40' 
                : 'bg-white/80 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-teal-500/40'
            } backdrop-blur-xl shadow-sm`}
          >
            {t('hero.registerBtn') || "Зарегистрироваться"}
          </button>
        </div>
      </div>

      {/* Карточки преимуществ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto relative z-10 px-4">
        
        <div className={`group p-6 rounded-3xl border transition-all duration-300 ${
          isDark 
            ? 'bg-slate-900/60 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5' 
            : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/5'
        } backdrop-blur-xl hover:-translate-y-1.5 space-y-3`}>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
            {t('hero.feature1Title') || "Проверенные эксперты"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('hero.feature1Desc') || "Все специалисты проходят строгую верификацию дипломов, квалификации и практического опыта."}
          </p>
        </div>

        <div className={`group p-6 rounded-3xl border transition-all duration-300 ${
          isDark 
            ? 'bg-slate-900/60 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5' 
            : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/5'
        } backdrop-blur-xl hover:-translate-y-1.5 space-y-3`}>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
            {t('hero.feature2Title') || "Удобная запись"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('hero.feature2Desc') || "Выбирайте свободное время и бронируйте сессии в несколько кликов без лишних звонков и ожиданий."}
          </p>
        </div>

        <div className={`group p-6 rounded-3xl border transition-all duration-300 ${
          isDark 
            ? 'bg-slate-900/60 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5' 
            : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/5'
        } backdrop-blur-xl hover:-translate-y-1.5 space-y-3`}>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
            {t('hero.feature3Title') || "Конфиденциальность"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('hero.feature3Desc') || "Мы гарантируем абсолютную безопасность ваших персональных данных и конфиденциальность сессий."}
          </p>
        </div>

      </div>
    </div>
  );
};