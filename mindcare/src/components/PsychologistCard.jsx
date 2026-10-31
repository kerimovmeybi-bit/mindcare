import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Clock, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className={`group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
      isDark 
        ? 'bg-slate-900/80 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10 text-white' 
        : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/10 text-slate-900'
    } backdrop-blur-xl hover:-translate-y-1.5`}>
      
      <div>
        {/* Шапка карточки с аватаром и метаданными */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img 
              src={psychologist.avatar} 
              alt={name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-black text-base leading-snug mb-0.5 truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-bold mb-2 truncate">{title}</p>
            
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-bold bg-slate-500/5 px-2.5 py-1 rounded-xl border border-slate-500/10">
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              <span>{psychologist.experience} {t('experience') || "лет опыта"}</span>
            </div>
          </div>
        </div>

        {/* Выводим описание о себе */}
        {aboutText && (
          <p className={`text-xs line-clamp-3 mb-5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {aboutText}
          </p>
        )}

        {/* Теги / темы */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {psychologist.topics?.map((topicKey) => (
            <span 
              key={topicKey}
              className={`text-[11px] px-3 py-1 rounded-xl font-bold border transition-colors ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700/80 text-slate-300 group-hover:border-teal-500/30' 
                  : 'bg-slate-100/80 border-slate-200 text-slate-700 group-hover:border-teal-500/30'
              }`}
            >
              {t(`topics.${topicKey}`) || topicKey}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Цена и рейтинг */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Стоимость</span>
            <span className="text-lg font-black text-teal-600 dark:text-teal-400">
              {psychologist.price} <span className="text-xs font-bold text-slate-400">{t('pricePerHour') || "грн / час"}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs font-black shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{psychologist.rating}</span>
            <span className="text-[10px] text-slate-400 font-semibold">({psychologist.reviewsCount})</span>
          </div>
        </div>

        {/* Кнопка записи */}
        <button
          onClick={() => onBook(psychologist)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-teal-600/25 text-xs active:scale-95 flex items-center justify-center gap-2 group-hover:bg-teal-500"
        >
          <span>{t('bookSession') || "Записаться на сессию"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};