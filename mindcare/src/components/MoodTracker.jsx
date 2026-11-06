import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Smile, Frown, Meh, Sparkles, HeartPulse, RefreshCw } from 'lucide-react';

export const MoodTracker = () => {
  const { theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { 
      id: 'calm', 
      label: lang === 'en' ? 'Calm' : lang === 'ua' ? 'Спокійно' : 'Спокойно', 
      icon: Smile, 
      color: 'text-teal-400 border-teal-500/30 bg-teal-500/10', 
      advice: lang === 'en' 
        ? 'Great time to solidify your inner harmony. Try a 5-minute breathing exercise.' 
        : lang === 'ua' 
        ? 'Чудовий час для закріплення гармонії. Спробуйте 5 хвилин медитації.' 
        : 'Отличное время для закрепления гармонии. Попробуйте 5 минут медитации.' 
    },
    { 
      id: 'anxious', 
      label: lang === 'en' ? 'Anxious' : lang === 'ua' ? 'Тривожно' : 'Тревожно', 
      icon: HeartPulse, 
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10', 
      advice: lang === 'en' 
        ? 'Inhale for 4 seconds, hold for 4, and exhale for 6. You are safe.' 
        : lang === 'ua' 
        ? 'Зробіть повільний вдих на 4 рахунки та видих на 6. Ви у безпеці.' 
        : 'Сделайте медленный вдох на 4 счета и выдох на 6. Вы в безопасности.' 
    },
    { 
      id: 'tired', 
      label: lang === 'en' ? 'Tired' : lang === 'ua' ? 'Ввтома' : 'Усталость', 
      icon: Meh, 
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10', 
      advice: lang === 'en' 
        ? 'Your body asks for rest. Take a 15-minute screen-free break.' 
        : lang === 'ua' 
        ? 'Ваш організм просить відпочинку. Зробіть паузу від екранів на 15 хвилин.' 
        : 'Ваш организм просит отдыха. Сделайте паузу от экранов на 15 минут.' 
    },
    { 
      id: 'sad', 
      label: lang === 'en' ? 'Sad' : lang === 'ua' ? 'Сумно' : 'Грустно', 
      icon: Frown, 
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10', 
      advice: lang === 'en' 
        ? 'Allow yourself to feel emotions. Our AI assistant is always here to listen.' 
        : lang === 'ua' 
        ? 'Дозвольте собі відчувати емоції. Наш ІІ-асистент завжди готовий вислухати.' 
        : 'Разрешите себе чувствовать эмоции. Наш ИИ-ассистент всегда готов выслушать.' 
    },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
      isDark 
        ? 'bg-slate-900/90 border-slate-800 text-white shadow-teal-500/5' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-xl'
    } backdrop-blur-xl relative overflow-hidden`}>
      
      {/* Декоративный свет */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 
            <span>{lang === 'en' ? 'Mood Tracker' : lang === 'ua' ? 'Щоденник стану' : 'Дневник состояния'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            {lang === 'en' ? 'How are you feeling today?' : lang === 'ua' ? 'Як ви почуваєтесь сьогодні?' : 'Как вы себя чувствуете сегодня?'}
          </h3>
        </div>
        {selectedMood && (
          <button 
            onClick={() => setSelectedMood(null)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white transition font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" /> 
            <span>{lang === 'en' ? 'Reset' : lang === 'ua' ? 'Скинути' : 'Сбросить'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
        {moods.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMood?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m)}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                isSelected 
                  ? `${m.color} ring-2 ring-teal-500/50 scale-[1.02]` 
                  : isDark
                    ? 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <Icon className="w-7 h-7" />
              <span className="text-xs font-bold">{m.label}</span>
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className={`p-4 sm:p-5 rounded-2xl border animate-fade-in flex items-start gap-3 relative z-10 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-teal-50/60 border-teal-100'
        }`}>
          <Sparkles className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-extrabold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {lang === 'en' ? 'MindCare Recommendation' : lang === 'ua' ? 'Рекомендація MindCare' : 'Рекомендация MindCare'}
            </div>
            <p className="text-sm font-medium mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
              {selectedMood.advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};