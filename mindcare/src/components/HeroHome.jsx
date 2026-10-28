import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Handshake, ShieldCheck, Clock, HeartHandshake, ArrowRight } from 'lucide-react';

export const HeroHome = ({ onExploreCatalog, onOpenRegister }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-6">
      {/* Главный блок (Hero Section) */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <Handshake className="w-4 h-4" />
          <span>{t('hero.badge') || "Ваше пространство психологического благополучия"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          {t('hero.title') || "Найдите своего психолога для гармонии и поддержки"}
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('hero.subtitle') || "MindCare — это профессиональная платформа, объединяющая проверенных специалистов. Получайте бережную помощь онлайн, записывайтесь на сессии в удобное время и возвращайте душевное равновесие."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRegister}
            className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl text-sm font-semibold transition-all shadow-sm"
          >
            {t('hero.registerBtn') || "Зарегистрироваться"}
          </button>
        </div>
      </div>

      {/* Блок преимуществ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">{t('hero.feature1Title') || "Проверенные эксперты"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('hero.feature1Desc') || "Все специалисты проходят строгую верификацию дипломов, квалификации и практического опыта."}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">{t('hero.feature2Title') || "Удобная запись"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('hero.feature2Desc') || "Выбирайте свободное время и бронируйте сессии в несколько кликов без лишних звонков и ожиданий."}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base">{t('hero.feature3Title') || "Конфиденциальность"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('hero.feature3Desc') || "Мы гарантируем абсолютную безопасность ваших персональных данных и конфиденциальность сессий."}
          </p>
        </div>
      </div>
    </div>
  );
};