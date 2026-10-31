import React, { useState } from 'react';
import { initialCourses } from '../data/courses';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Clock, BookOpen, ArrowRight, X, Sparkles, CheckCircle } from 'lucide-react';

export const CoursesSection = ({ onEnroll, onOpenRegister }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnrollClick = (course) => {
    setSelectedCourse(null); // Закрываем модальное окно курса
    if (onEnroll) {
      onEnroll(course); // Вызываем логику проверки авторизации из App.jsx
    } else if (onOpenRegister) {
      onOpenRegister();
    }
  };

  return (
    <section id="courses-section" className="pt-16 pb-12 relative">
      {/* Неоновый акцент на фоне */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Заголовок секции */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>{t('courses.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('courses.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-xl">
            {t('courses.subtitle')}
          </p>
        </div>
      </div>

      {/* Сетка курсов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {initialCourses.map((course) => (
          <div
            key={course.id}
            className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10' 
                : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/10'
            } backdrop-blur-xl hover:-translate-y-1.5`}
          >
            <div>
              {/* Обложка курса */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={t(course.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wide uppercase">
                  {t(course.badgeKey)}
                </span>
              </div>

              {/* Контент */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    {t(course.durationKey)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                    {t(course.lessonsKey)}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                  {t(course.titleKey)}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {t(course.descKey)}
                </p>
              </div>
            </div>

            {/* Подвал карточки */}
            <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                  {t('courses.priceLabel')}
                </span>
                <span className="text-lg font-black text-teal-600 dark:text-teal-400">
                  {course.price} {t('courses.currency')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
              >
                <span>{t('courses.moreBtn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно подробной информации о курсе */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div className={`${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar`}>
            
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Заголовок и бэйдж */}
            <div className="mb-4 pr-8">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase mb-2">
                {t(selectedCourse.badgeKey)}
              </span>
              <h2 className="text-2xl font-black tracking-tight mt-1">
                {t(selectedCourse.titleKey)}
              </h2>
            </div>

            {/* Обложка курса */}
            <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
              <img 
                src={selectedCourse.image} 
                alt={t(selectedCourse.titleKey)} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            {/* Информация о преподавателе с фото */}
            <div className={`p-4 rounded-2xl mb-6 flex items-center gap-4 border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <img 
                src={selectedCourse.doctorImage} 
                alt={t(selectedCourse.authorKey)} 
                className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-md border-2 border-teal-500/40"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 tracking-wider block">
                  {t('courses.teacherLabel')}
                </span>
                <h4 className="font-bold text-base">{t(selectedCourse.authorKey)}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t(selectedCourse.authorTitleKey)}</p>
              </div>
            </div>

            {/* Длительность и уроки */}
            <div className="flex items-center gap-6 text-xs font-bold text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-500" />
                {t(selectedCourse.durationKey)}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-500" />
                {t(selectedCourse.lessonsKey)}
              </span>
            </div>

            {/* Подробное описание */}
            <div className="space-y-3 mb-8">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                {t('courses.programLabel')}
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {t(selectedCourse.fullDescKey)}
              </p>
            </div>

            {/* Подвал модального окна */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">{t('courses.priceLabel')}</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">{selectedCourse.price} {t('courses.currency')}</span>
              </div>
              <button
                onClick={() => handleEnrollClick(selectedCourse)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-600/25 text-xs sm:text-sm active:scale-95"
              >
                {t('courses.enrollBtn')}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};