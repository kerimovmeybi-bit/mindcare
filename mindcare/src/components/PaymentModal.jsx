import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CreditCard, Lock, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';

export const PaymentModal = ({ course, onClose, onSuccess }) => {
  const { t, theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Форматирование номера карты (16 цифр с пробелами)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Форматирование срока действия (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
  };

  // Обработка отправки оплаты
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    if (onSuccess) onSuccess(course);
  };

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-fade-in">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden transition-all ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 text-white shadow-teal-500/5' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
      } backdrop-blur-xl`}>
        
        {/* Декоративное неоновое свечение на фоне */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Кнопка закрытия */}
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          /* ЭКРАН 1: ФОРМА ОПЛАТЫ КАРТОЙ */
          <div className="relative z-10">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg leading-snug tracking-tight">
                  {lang === 'en' ? 'Course Payment' : lang === 'ua' ? 'Оплата курсу' : 'Оплата курса'}
                </h3>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-bold mt-0.5">
                  {t(course.titleKey)}
                </p>
              </div>
            </div>

            {/* Сумма к оплате */}
            <div className={`p-4 rounded-2xl mb-6 flex justify-between items-center border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'en' ? 'Amount due:' : lang === 'ua' ? 'До сплати:' : 'К оплате:'}
              </span>
              <span className="text-xl font-black text-teal-600 dark:text-teal-400">
                {course.price} <span className="text-xs font-bold text-slate-400">{t('courses.currency') || 'грн'}</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Номер карты */}
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Card Number' : lang === 'ua' ? 'Номер картки' : 'Номер карты'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="4441 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs font-mono font-medium tracking-widest outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                </div>
              </div>

              {/* Срок и CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Expiry Date' : lang === 'ua' ? 'Термін дії' : 'Срок действия'}
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono font-medium text-center outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono font-medium text-center outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Имя держателя */}
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Cardholder Name' : lang === 'ua' ? "Ім'я на картці" : 'Имя владельца'}
                </label>
                <input
                  type="text"
                  placeholder="KERIMLI MEYBULLA"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-mono font-medium uppercase outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {/* Кнопка оплаты */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {lang === 'en' 
                    ? `Pay ${course.price} UAH` 
                    : lang === 'ua' 
                    ? `Сплатити ${course.price} грн` 
                    : `Оплатить ${course.price} грн`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                <span>Безопасное шифрование платежа</span>
              </div>
            </form>
          </div>
        ) : (
          /* ЭКРАН 2: ОПЛАТА УСПЕШНА */
          <div className="text-center py-6 relative z-10 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black tracking-tight mb-2">
              {lang === 'en' ? "Payment Successful!" : lang === 'ua' ? "Оплата успішна!" : "Оплата прошла успешно!"}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed max-w-sm mx-auto">
              {lang === 'en' 
                ? `You have successfully enrolled in "${t(course.titleKey)}". Amount paid: ${course.price} UAH.`
                : lang === 'ua' 
                ? `Ви успішно записалися на курс "${t(course.titleKey)}". Сплачено: ${course.price} грн.`
                : `Вы успешно записались на курс "${t(course.titleKey)}". Списано с карты: ${course.price} грн.`}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95"
            >
              {lang === 'en' ? "Start Learning" : lang === 'ua' ? "Розпочати навчання" : "Перейти к обучению"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};