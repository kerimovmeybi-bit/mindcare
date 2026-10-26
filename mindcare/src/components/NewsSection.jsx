import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { newsData } from '../data/news';
import { Calendar, ArrowRight, X } from 'lucide-react';

export const NewsSection = () => {
  const { lang, theme } = useLanguage();
  const isDark = theme === 'dark';
  const [selectedArticle, setSelectedArticle] = useState(null);

  const sectionTitle = {
    ru: "Полезные статьи и новости",
    ua: "Корисні статті та новини",
    en: "Useful Articles & News"
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
    <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle[lang] || sectionTitle.ru}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer`}
          >
            <div>
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title[lang]} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-semibold mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date[lang]}
                </div>
                <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {item.title[lang]}
                </h3>
                <p className={`text-sm line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {item.excerpt[lang]}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors">
                {readMoreText[lang] || readMoreText.ru}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно просмотра статьи */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto`}>
            
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-4">
              <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                {selectedArticle.date[lang]}
              </span>
              <h2 className="text-2xl font-bold mt-1 mb-4">
                {selectedArticle.title[lang]}
              </h2>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden mb-6">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title[lang]} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`prose max-w-none text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedArticle.content[lang]}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/20"
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