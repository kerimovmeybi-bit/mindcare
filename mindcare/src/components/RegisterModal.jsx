import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ArrowLeft, User, Stethoscope, Sparkles, ArrowRight } from 'lucide-react';

export const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const { t, theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const [step, setStep] = useState('role'); // 'role' | 'form'
  const [selectedRole, setSelectedRole] = useState('client'); // 'client' | 'psychologist'

  // Поля формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      role: selectedRole,
      title: selectedRole === 'psychologist' ? (title || 'Практический психолог') : undefined,
      price: selectedRole === 'psychologist' ? (price || '1500') : undefined,
    };

    onRegisterSuccess(newUser);
    resetAndClose();
  };

  // Быстрый вход / регистрация через соцсети
  const handleSocialRegister = (provider) => {
    const isGoogle = provider === 'Google';
    const newUser = {
      id: Date.now().toString(),
      name: isGoogle ? 'Пользователь Google' : 'Пользователь Facebook',
      email: isGoogle ? 'user.google@gmail.com' : 'user.fb@facebook.com',
      password: 'social_login_pwd',
      phone: '+380000000000',
      role: selectedRole,
      title: selectedRole === 'psychologist' ? 'Практический психолог' : undefined,
      price: selectedRole === 'psychologist' ? '1500' : undefined,
    };

    onRegisterSuccess(newUser);
    resetAndClose();
  };

  const resetAndClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setTitle('');
    setPrice('');
    setStep('role');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden transition-all ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-teal-500/5' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
      } backdrop-blur-xl`}>
        
        {/* Декоративное неоновое свечение сзади */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Кнопка закрытия */}
        <button 
          onClick={resetAndClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'role' ? (
          /* ШАГ 1: ВЫБОР РОЛИ */
          <div className="relative z-10">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MindCare Platform</span>
              </span>
              <h3 className="text-2xl font-black tracking-tight mb-1.5">
                {lang === 'en' ? 'Join MindCare' : lang === 'ua' ? 'Приєднуйтесь до MindCare' : 'Присоединяйтесь к MindCare'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'Choose how you want to use the platform' : lang === 'ua' ? 'Оберіть як ви хочете використовувати платформу' : 'Выберите роль для регистрации на платформе'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 mb-2">
              <button
                onClick={() => { setSelectedRole('client'); setStep('form'); }}
                className={`group p-4 rounded-2xl border text-left flex items-center gap-4 transition-all hover:border-teal-500 hover:shadow-lg hover:-translate-y-0.5 ${
                  isDark ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800' : 'bg-slate-50/80 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {lang === 'en' ? 'I am a Client' : lang === 'ua' ? 'Я Клієнт' : 'Я Клиент'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? 'Looking for therapy or courses' : lang === 'ua' ? 'Шукаю психолога або курси' : 'Ищу психолога, консультацию или курсы'}
                  </p>
                </div>
              </button>

              <button
                onClick={() => { setSelectedRole('psychologist'); setStep('form'); }}
                className={`group p-4 rounded-2xl border text-left flex items-center gap-4 transition-all hover:border-teal-500 hover:shadow-lg hover:-translate-y-0.5 ${
                  isDark ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800' : 'bg-slate-50/80 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {lang === 'en' ? 'I am a Specialist' : lang === 'ua' ? 'Я Фахівець' : 'Я Специалист'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? 'Want to provide psychological help' : lang === 'ua' ? 'Хочу надавати психологічну допомогу' : 'Хочу консультировать и вести прием'}
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* ШАГ 2: ФОРМА РЕГИСТРАЦИИ */
          <div className="relative z-10">
            <button
              onClick={() => setStep('role')}
              className="inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold mb-4 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'en' ? 'Change role' : lang === 'ua' ? 'Змінити роль' : 'Изменить роль'}</span>
            </button>

            <h3 className="text-xl font-black tracking-tight mb-5">
              {selectedRole === 'client' 
                ? (lang === 'en' ? 'Client Registration' : lang === 'ua' ? 'Реєстрація клієнта' : 'Регистрация клиента')
                : (lang === 'en' ? 'Specialist Registration' : lang === 'ua' ? 'Реєстрація фахівця' : 'Регистрация специалиста')}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Full Name' : lang === 'ua' ? "Ім'я та Прізвище" : 'Имя и Фамилия'}
                </label>
                <input
                  type="text"
                  placeholder="Анна Смирнова"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Password' : lang === 'ua' ? 'Пароль' : 'Пароль'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Phone Number' : lang === 'ua' ? 'Телефон' : 'Телефон'}
                </label>
                <input
                  type="tel"
                  placeholder="+380..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {selectedRole === 'psychologist' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">
                      {lang === 'en' ? 'Specialization' : lang === 'ua' ? 'Спеціалізація' : 'Специализация'}
                    </label>
                    <input
                      type="text"
                      placeholder="Гештальт-терапевт"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold mb-1 text-slate-400 uppercase tracking-wider">
                      {lang === 'en' ? 'Session Price (UAH)' : lang === 'ua' ? 'Ціна сесії (грн)' : 'Стоимость сессии (грн)'}
                    </label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{lang === 'en' ? 'Register' : lang === 'ua' ? 'Зареєструватися' : 'Зарегистрироваться'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* РАЗДЕЛИТЕЛЬ С СОЦСЕТЯМИ */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <span className={`relative px-3 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'}`}>
                {lang === 'en' ? 'or continue with' : lang === 'ua' ? 'або увійдіть через' : 'или войти через'}
              </span>
            </div>

            {/* КНОПКИ GOOGLE И FACEBOOK */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialRegister('Google')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all active:scale-95 ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialRegister('Facebook')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-xs font-bold transition-all active:scale-95 ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};