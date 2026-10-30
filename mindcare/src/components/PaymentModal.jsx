import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CreditCard, Lock, CheckCircle2, X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative transition-all`}>
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          /* ЭКРАН 1: ФОРМА ОПЛАТЫ КАРТОЙ */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-snug">
                  {lang === 'en' ? 'Course Payment' : lang === 'ua' ? 'Оплата курсу' : 'Оплата курса'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t(course.titleKey)}
                </p>
              </div>
            </div>

            {/* Сумма к оплате */}
            <div className={`p-4 rounded-2xl mb-6 flex justify-between items-center border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-xs font-semibold text-slate-500">
                {lang === 'en' ? 'Amount due:' : lang === 'ua' ? 'До сплати:' : 'К оплате:'}
              </span>
              <span className="text-xl font-extrabold text-teal-600">
                {course.price} {t('courses.currency')}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Номер карты */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'Card Number' : lang === 'ua' ? 'Номер картки' : 'Номер карты'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="4441 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none tracking-widest font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Срок и CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-500 dark:text-slate-400">
                    {lang === 'en' ? 'Expiry Date' : lang === 'ua' ? 'Термін дії' : 'Срок действия'}
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-500 dark:text-slate-400">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none text-center font-mono"
                  />
                </div>
              </div>

              {/* Имя держателя */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'Cardholder Name' : lang === 'ua' ? "Ім'я на картці" : 'Имя владельца'}
                </label>
                <input
                  type="text"
                  placeholder="KERIMLI MEYBULLA"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none uppercase font-mono"
                />
              </div>

              {/* Кнопка оплаты */}
              <button
                type="submit"
                className="w-full mt-2 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {lang === 'en' 
                    ? `Pay ${course.price} UAH` 
                    : lang === 'ua' 
                    ? `Сплатити ${course.price} грн` 
                    : `Оплатить ${course.price} грн`}
                </span>
              </button>
            </form>
          </div>
        ) : (
          /* ЭКРАН 2: ОПЛАТА УСПЕШНА */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold mb-2">
              {lang === 'en' ? "Payment Successful!" : lang === 'ua' ? "Оплата успішна!" : "Оплата прошла успешно!"}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {lang === 'en' 
                ? `You have successfully enrolled in "${t(course.titleKey)}". Amount paid: ${course.price} UAH.`
                : lang === 'ua' 
                ? `Ви успішно записалися на курс "${t(course.titleKey)}". Сплачено: ${course.price} грн.`
                : `Вы успешно записались на курс "${t(course.titleKey)}". Списано с карты: ${course.price} грн.`}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-600/30 transition-all"
            >
              {lang === 'en' ? "Start Learning" : lang === 'ua' ? "Розпочати навчання" : "Перейти к обучению"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};