import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, ShieldCheck, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const { theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t transition-colors mt-20 ${
      isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
    } backdrop-blur-xl`}>
      {/* Фоновое свечение */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-teal-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Бренд и описание */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                MindCare <span className="text-teal-500 text-xs px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 ml-1">PRO</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Professional psychological support platform. Online sessions with verified specialists, total confidentiality, and mental health care.'
                : lang === 'ua'
                ? 'Професійна платформа психологічної підтримки. Онлайн-сесії з перевіреними експертами, повна конфіденційність та турбота про ваше ментальне здоров’я.'
                : 'Профессиональная платформа психологической поддержки. Онлайн-сессии с проверенными экспертами, полная конфиденциальность и забота о вашем ментальном здоровье.'}
            </p>
            <div className="flex items-center gap-3 text-xs text-teal-600 dark:text-teal-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {lang === 'en'
                  ? 'Secure SSL Connection & Data Protection'
                  : lang === 'ua'
                  ? 'Захищене SSL-з’єднання та захист даних'
                  : 'Безопасное SSL-соединение и защита данных'}
              </span>
            </div>
          </div>

          {/* Навигация */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {lang === 'en' ? 'Navigation' : lang === 'ua' ? 'Навігація' : 'Навигация'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={scrollToTop} className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'Home' : lang === 'ua' ? 'Головна' : 'Главная'}
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToTop(); onNavigate && onNavigate('catalog'); }} className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'Catalog' : lang === 'ua' ? 'Каталог фахівців' : 'Каталог специалистов'}
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToTop(); onNavigate && onNavigate('courses'); }} className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'Courses' : lang === 'ua' ? 'Курси та практикуми' : 'Курсы и практикумы'}
                </button>
              </li>
              <li>
                <button onClick={() => { scrollToTop(); onNavigate && onNavigate('news'); }} className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'Blog & Materials' : lang === 'ua' ? 'Блог та матеріали' : 'Блог и материалы'}
                </button>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {lang === 'en' ? 'Information' : lang === 'ua' ? 'Інформація' : 'Информация'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#privacy" className="hover:text-teal-500 transition-colors flex items-center gap-1">
                  {lang === 'en' ? 'Privacy Policy' : lang === 'ua' ? 'Політика конфіденційності' : 'Политика конфиденциальности'} <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-teal-500 transition-colors flex items-center gap-1">
                  {lang === 'en' ? 'Terms of Use' : lang === 'ua' ? 'Умови використання' : 'Условия использования'} <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#ethics" className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'Code of Ethics' : lang === 'ua' ? 'Етичний кодекс' : 'Этический кодекс'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-500 transition-colors">
                  {lang === 'en' ? 'FAQ' : lang === 'ua' ? 'Часті питання (FAQ)' : 'Частые вопросы (FAQ)'}
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              {lang === 'en' ? 'Contacts' : lang === 'ua' ? 'Контакти' : 'Контакты'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>support@mindcare.ua</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>+380 (800) 333-22-11</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>{lang === 'en' ? 'Kyiv, Ukraine (Online 24/7)' : lang === 'ua' ? 'Київ, Україна (Online 24/7)' : 'Киев, Украина (Online 24/7)'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Нижняя строка с копирайтом */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <p>© 2026 MindCare Platform. {lang === 'en' ? 'All rights reserved.' : lang === 'ua' ? 'Усі права захищені.' : 'Все права защищены.'}</p>
          <p className="flex items-center gap-1.5">
            <span>{lang === 'en' ? 'Made with heart for MindCare •' : lang === 'ua' ? 'Зроблено з душею для MindCare •' : 'Сделано с душой для MindCare •'}</span> 
            <span className="font-bold text-teal-600 dark:text-teal-400">Керимли Мейбулла</span>
          </p>
        </div>
      </div>
    </footer>
  );
};