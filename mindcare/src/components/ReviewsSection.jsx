import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquarePlus, Star, User, Quote, Sparkles, X } from 'lucide-react';

export const ReviewsSection = ({ onOpenRegister }) => {
  const { t, theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  // Расширенный список первоначальных отзывов
  const defaultReviews = [
    {
      id: '1',
      author: 'Мария Ковалева',
      role: 'Клиент',
      rating: 5,
      text: 'Нашла своего психолога на MindCare всего за пару минут. Очень удобный сервис, бережная поддержка и абсолютная конфиденциальность!',
      date: '15 октября 2026'
    },
    {
      id: '2',
      author: 'Андрей Петров',
      role: 'Клиент',
      rating: 5,
      text: 'Прошел курс по управлению стрессом. Материал подан очень структурировано, реальные практические техники, которые действительно работают.',
      date: '28 октября 2026'
    },
    {
      id: '3',
      author: 'Ольга Василенко',
      role: 'Клиент',
      rating: 5,
      text: 'Долго не могла решиться на первую сессию. Благодаря удобной системе подбора быстро нашла специалиста по тревожным состояниям. Уже после 3 занятий чувствую огромный прогресс.',
      date: '20 октября 2026'
    },
    {
      id: '4',
      author: 'Дмитрий Соколов',
      role: 'Клиент',
      rating: 5,
      text: 'Отличная платформа! Удобный календарь для записи, никаких лишних звонков и сложностей. Курсы тоже на высоте.',
      date: '12 октября 2026'
    },
    {
      id: '5',
      author: 'Екатерина Мельник',
      role: 'Клиент',
      rating: 4,
      text: 'Замечательный сервис и квалифицированные специалисты. Прошла индивидуальную терапию, осталась очень довольна внимательным подходом врача.',
      date: '05 октября 2026'
    },
    {
      id: '6',
      author: 'Сергей Романенко',
      role: 'Клиент',
      rating: 5,
      text: 'Очень порадовала интеграция курсов и личных консультаций. Можно прорабатывать свои вопросы как с психологом, так и самостоятельно в удобном темпе.',
      date: '01 октября 2026'
    }
  ];

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('mindcare_reviews');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { /* ignore */ }
    }
    return defaultReviews;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    localStorage.setItem('mindcare_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReviewClick = () => {
    const clientUser = localStorage.getItem('mindcare_logged_client_id');
    const doctorUser = localStorage.getItem('mindcare_logged_doctor_id');

    if (clientUser || doctorUser) {
      setIsFormOpen(true);
    } else {
      if (onOpenRegister) onOpenRegister();
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    let authorName = 'Пользователь MindCare';
    const clientId = localStorage.getItem('mindcare_logged_client_id');
    const doctorId = localStorage.getItem('mindcare_logged_doctor_id');

    if (clientId) {
      const clients = JSON.parse(localStorage.getItem('mindcare_clients') || '[]');
      const foundClient = clients.find(c => c.id === clientId);
      if (foundClient) authorName = foundClient.name;
    } else if (doctorId) {
      const docs = JSON.parse(localStorage.getItem('mindcare_psychologists') || '[]');
      const foundDoc = docs.find(d => d.id === doctorId);
      if (foundDoc) authorName = foundDoc.name;
    }

    const newReviewItem = {
      id: Date.now().toString(),
      author: authorName,
      role: lang === 'en' ? 'Client' : lang === 'ua' ? 'Клієнт' : 'Клиент',
      rating: Number(newRating),
      text: newText.trim(),
      date: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'ua' ? 'uk-UA' : 'ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    };

    setReviews([newReviewItem, ...reviews]);
    setNewText('');
    setNewRating(5);
    setIsFormOpen(false);
  };

  return (
    <section id="reviews-section" className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800 relative">
      {/* Неоновый акцент сзади для атмосферы */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Заголовок секции */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold mb-3">
            <Quote className="w-4 h-4" />
            <span>{lang === 'en' ? 'Testimonials' : lang === 'ua' ? 'Відгуки' : 'Отзывы клиентов'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'en' ? 'What our users say' : lang === 'ua' ? 'Що кажуть наші користувачі' : 'Что говорят наши пользователи'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-xl">
            {lang === 'en' ? 'Real stories of people who found harmony with MindCare' : lang === 'ua' ? 'Реальні історії людей, які знайшли гармонію з MindCare' : 'Реальные истории людей, нашедших гармонию и поддержку на платформе'}
          </p>
        </div>

        <button
          onClick={handleAddReviewClick}
          className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all shrink-0 active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{lang === 'en' ? 'Leave a review' : lang === 'ua' ? 'Залишити відгук' : 'Оставить отзыв'}</span>
        </button>
      </div>

      {/* Модальное окно добавления отзыва */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
          <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative`}>
            
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black tracking-tight mb-6">
              {lang === 'en' ? 'Write your review' : lang === 'ua' ? 'Напишіть ваш відгук' : 'Написать отзыв'}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Rating' : lang === 'ua' ? 'Оцінка' : 'Оценка'}
                </label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 / 5)</option>
                  <option value="4">⭐⭐⭐⭐ (4 / 5)</option>
                  <option value="3">⭐⭐⭐ (3 / 5)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Your Review' : lang === 'ua' ? 'Ваш відгук' : 'Ваш отзыв'}
                </label>
                <textarea
                  rows="4"
                  placeholder={lang === 'en' ? 'Share your experience...' : lang === 'ua' ? 'Поділіться своїм досвідом...' : 'Поделитесь впечатлениями о сервисе или специалисте...'}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  required
                  className={`w-full px-4 py-3.5 rounded-2xl border text-xs outline-none resize-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  {lang === 'en' ? 'Cancel' : lang === 'ua' ? 'Скасувати' : 'Отмена'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95"
                >
                  {lang === 'en' ? 'Publish' : lang === 'ua' ? 'Опублікувати' : 'Отправить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Сетка отзывов с эффектом Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`group rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800/80 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10' 
                : 'bg-white/80 border-slate-200 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-600/10'
            } backdrop-blur-xl hover:-translate-y-1.5`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">{rev.date}</span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 font-bold text-xs border border-teal-500/20 shadow-sm group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{rev.author}</h4>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};