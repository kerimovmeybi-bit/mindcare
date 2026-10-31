import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { newsData } from '../data/news';
import { Calendar, ArrowRight, X, Newspaper, Sparkles } from 'lucide-react';

export const NewsSection = () => {
  const { language: lang, theme } = useLanguage();
  const isDark = theme === 'dark';
  const [selectedArticle, setSelectedArticle] = useState(null);

  const sectionTitle = {
    ru: "Полезные статьи и новости",
    ua: "Корисні статті та новини",
    en: "Useful Articles & News"
  };

  const badgeTitle = {
    ru: "Блог и материалы",
    ua: "Блог та матеріали",
    en: "Blog & Insights"
  };

  const readMoreText = {
    ru: "Читать далее",
    ua: "Читати далі",
    en: "Read more"
  };

  const closeText = {
    ru: "Закрыть",
    ua: "Закрити",
    en: "Close"
  };

  return (
    <section id="news-section" className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800 relative">
      {/* Неоновый акцент сзади */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-72 h-72 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Заголовок секции */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 relative z-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold mb-3">
            <Newspaper className="w-4 h-4" />
            <span>{badgeTitle[lang] || badgeTitle.ru}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {sectionTitle[lang] || sectionTitle.ru}
          </h2>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {newsData.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10 text-white' 
                : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/10 text-slate-900'
            } backdrop-blur-xl hover:-translate-y-1.5`}
          >
            <div>
              {/* Картинка с зумом при наведении */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title[lang] || item.title.ru} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date[lang] || item.date.ru}
                </div>
                
                <h3 className={`font-bold text-base line-clamp-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title[lang] || item.title.ru}
                </h3>
                
                <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.excerpt[lang] || item.excerpt.ru}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                {readMoreText[lang] || readMoreText.ru}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно просмотра статьи */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar`}>
            
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 pr-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date[lang] || selectedArticle.date.ru}
              </span>
              <h2 className="text-2xl font-black tracking-tight">
                {selectedArticle.title[lang] || selectedArticle.title.ru}
              </h2>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden mb-6 relative shadow-md">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title[lang] || selectedArticle.title.ru} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`prose max-w-none text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedArticle.content[lang] || selectedArticle.content.ru}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-teal-600/25 text-xs sm:text-sm active:scale-95"
              >
                {closeText[lang] || closeText.ru}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};