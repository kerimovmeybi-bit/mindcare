import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, CheckCircle, Clock } from 'lucide-react';

export const BookingModal = ({ psychologist, onClose, onConfirm }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Безопасно получаем перевод или fallback данные
  const docInfo = t(`psychologists.${psychologist.id}`) || {};
  const name = typeof docInfo === 'object' && docInfo?.name ? docInfo.name : (psychologist.name || "Специалист");
  const title = typeof docInfo === 'object' && docInfo?.title ? docInfo.title : (psychologist.title || "Психолог");

  // Слоты специалиста
  const slots = psychologist.availableSlots || ["Пн 10:00", "Ср 14:00", "Пт 16:00"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Пожалуйста, выберите удобное время");
      return;
    }

    const bookingData = {
      id: Date.now(),
      psychologistId: psychologist.id,
      clientName,
      clientPhone,
      slot: selectedSlot,
      notes,
      createdAt: new Date().toISOString()
    };

    onConfirm(bookingData);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-white border-slate-100 text-slate-900'
        }`}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Шапка модалки */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <img
                src={psychologist.avatar}
                alt={name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Стоимость: <span className="font-bold text-teal-600 dark:text-teal-400">{psychologist.price} грн</span> / час
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ФИО */}
              <div>
                <label className="block text-xs font-semibold mb-1">Ваше имя и фамилия</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Алексей Иванов"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-xs font-semibold mb-1">Номер телефона</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 (99) 123-45-67"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Выбор слота */}
              <div>
                <label className="text-xs font-semibold mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  Выберите свободное время
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                        selectedSlot === slot
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/30'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Заметка */}
              <div>
                <label className="block text-xs font-semibold mb-1">Кратко опишите ваш запрос (необязательно)</label>
                <textarea
                  rows="2"
                  placeholder="Например: тревога перед работой, проблемы в отношениях..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-teal-600/20 text-sm"
              >
                Подтвердить запись
              </button>
            </form>
          </div>
        ) : (
          /* Успешное подтверждение */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Вы успешно записаны!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Специалист <span className="font-semibold text-slate-800 dark:text-slate-200">{name}</span> свяжется с вами по номеру <span className="font-semibold text-teal-600">{clientPhone}</span> для подтверждения.
            </p>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 mb-6 text-left text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p><strong>Время:</strong> {selectedSlot}</p>
              <p><strong>Клиент:</strong> {clientName}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
            >
              Отлично
            </button>
          </div>
        )}
      </div>
    </div>
  );
};