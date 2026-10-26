import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Clock } from 'lucide-react';

export const PsychologistCard = ({ psychologist, onBook }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  // Получаем перевод по ID или по числу
  const docInfo = t(`psychologists.${psychologist.id}`) || {};

  // Берём значения из переводов, либо fallback из самого объекта
  const name = docInfo.name || psychologist.name || "Специалист";
  const title = docInfo.title || psychologist.title || "Практикующий психолог";
  
  // В translations.js это поле называется about!
  const aboutText = docInfo.about || psychologist.about || psychologist.bio || "";

  return (
    <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all`}>
      <div>
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={psychologist.avatar} 
            alt={name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shrink-0"
          />
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{name}</h3>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-2">{title}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{psychologist.experience} {t('experience') || "лет опыта"}</span>
            </div>
          </div>
        </div>

        {/* Выводим описание о себе */}
        {aboutText && (
          <p className={`text-xs line-clamp-3 mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {aboutText}
          </p>
        )}

        {/* Теги / темы */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {psychologist.topics?.map((topicKey) => (
            <span 
              key={topicKey}
              className={`text-xs px-2.5 py-1 rounded-xl font-medium ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {t(`topics.${topicKey}`) || topicKey}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-slate-400 block">Стоимость</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {psychologist.price} <span className="text-xs font-normal text-slate-500">{t('pricePerHour') || "грн / час"}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2.5 py-1.5 rounded-xl text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{psychologist.rating} ({psychologist.reviewsCount})</span>
          </div>
        </div>

        <button
          onClick={() => onBook(psychologist)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm shadow-teal-600/20 text-sm"
        >
          {t('bookSession') || "Записаться на сессию"}
        </button>
      </div>
    </div>
  );
};