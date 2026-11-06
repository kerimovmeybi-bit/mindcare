import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles, ArrowRight, CheckCircle, Calendar } from 'lucide-react';

export const PsychologistQuizModal = ({ isOpen, onClose, psychologists, onSelectDoctor }) => {
  const { theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const [step, setStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [resultDoctor, setResultDoctor] = useState(null);

  if (!isOpen) return null;

  // Шаг 1: Выбор проблематики
  const topics = [
    { key: 'anxiety', label: lang === 'en' ? 'Anxiety & Panic' : lang === 'ua' ? 'Тривога та паніка' : 'Тревога и паника' },
    { key: 'burnout', label: lang === 'en' ? 'Work Burnout' : lang === 'ua' ? 'Професійне вигорання' : 'Эмоциональное выгорание' },
    { key: 'relationships', label: lang === 'en' ? 'Relationship Issues' : lang === 'ua' ? 'Проблеми у стосунках' : 'Проблемы в отношениях' },
    { key: 'depression', label: lang === 'en' ? 'Depression & Apathy' : lang === 'ua' ? 'Депресія та апатія' : 'Депрессия и апатия' },
    { key: 'selfEsteem', label: lang === 'en' ? 'Low Self-Esteem' : lang === 'ua' ? 'Самооцінка та впевненість' : 'Самооценка и неуверенность' }
  ];

  const handleFinish = (topic) => {
    setSelectedTopic(topic);
    // Подбираем психолога, у которого есть этот тег, или берем первого попавшегося
    const matched = psychologists.find(p => p.topics && p.topics.includes(topic)) || psychologists[0];
    setResultDoctor(matched);
    setStep(2); // Переходим к результату
  };

  const resetQuiz = () => {
    setStep(1);
    setSelectedTopic('');
    setSelectedFormat('');
    setResultDoctor(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className={`relative w-full max-w-lg ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      } border rounded-3xl p-6 sm:p-8 shadow-2xl`}>
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'en' ? 'Quick Match Quiz' : lang === 'ua' ? 'Швидкий підбір фахівця' : 'Экспресс-подбор специалиста'}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {lang === 'en' ? 'What is your main concern right now?' : lang === 'ua' ? 'Що вас турбує найбільше зараз?' : 'Что беспокоит вас больше всего прямо сейчас?'}
            </h3>

            <div className="space-y-2.5">
              {topics.map((t) => (
                <button
                  key={t.key}
                  onClick={() => handleFinish(t.key)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between group ${
                    isDark 
                      ? 'bg-slate-800/60 border-slate-700/80 hover:border-teal-500 hover:bg-teal-500/10' 
                      : 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-teal-500/5'
                  }`}
                >
                  <span>{t.label}</span>
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && resultDoctor && (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-black tracking-tight mb-1">
                {lang === 'en' ? 'We found your perfect match!' : lang === 'ua' ? 'Ми знайшли ідеального фахівця!' : 'Мы нашли идеального специалиста!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Based on your request, this expert has the best experience:' : lang === 'ua' ? 'З огляду на ваш запит, цей експерт має найкращий досвід:' : 'Учитывая ваш запрос, этот эксперт обладает лучшей экспертизой:'}
              </p>
            </div>

            {/* Карточка найденного врача */}
            <div className={`p-4 rounded-2xl border text-left flex items-center gap-4 ${
              isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <img 
                src={resultDoctor.avatar} 
                alt={resultDoctor.name} 
                className="w-16 h-16 rounded-xl object-cover border border-teal-500/40 shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm truncate">{resultDoctor.name}</h4>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-bold truncate">{resultDoctor.title}</p>
                <p className="text-xs text-slate-400 mt-1">{resultDoctor.price} грн / час</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className={`w-1/2 py-3 rounded-xl border text-xs font-bold transition-all ${
                  isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang === 'en' ? 'Retake quiz' : lang === 'ua' ? 'Пройти знову' : 'Пройти снова'}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSelectDoctor(resultDoctor);
                }}
                className="w-1/2 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                {lang === 'en' ? 'Book Session' : lang === 'ua' ? 'Записатися' : 'Записаться'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};