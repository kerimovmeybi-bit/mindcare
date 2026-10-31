import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, CheckCircle, Clock, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div 
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden transition-all ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 text-white shadow-teal-500/5' 
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
        } backdrop-blur-xl`}
      >
        {/* Неоновый элемент свечения на фоне */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Шапка модалки */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800/80 relative z-10">
              <div className="relative shrink-0">
                <img
                  src={psychologist.avatar}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">{name}</h3>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-bold mt-0.5">{title}</p>
                <div className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>Стоимость:</span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400">{psychologist.price} грн</span>
                  <span className="text-[11px]">/ час</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* ФИО */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">Ваше имя и фамилия</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Алексей Иванов"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">Номер телефона</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 (99) 123-45-67"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Выбор слота */}
              <div>
                <label className="text-xs font-bold mb-1.5 flex items-center gap-1.5 text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  Выберите свободное время
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                        selectedSlot === slot
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/30 active:scale-95'
                          : isDark
                            ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-500/50 hover:text-slate-900'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Заметка */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">Кратко опишите ваш запрос (необязательно)</label>
                <textarea
                  rows="2"
                  placeholder="Например: тревога перед работой, проблемы в отношениях..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-600/25 text-sm active:scale-95"
              >
                Подтвердить запись
              </button>
            </form>
          </div>
        ) : (
          /* Успешное подтверждение */
          <div className="text-center py-6 relative z-10 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">Вы успешно записаны!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
              Специалист <span className="font-bold text-slate-800 dark:text-slate-200">{name}</span> свяжется с вами по номеру <span className="font-bold text-teal-600 dark:text-teal-400">{clientPhone}</span> для подтверждения.
            </p>
            <div className={`p-4 rounded-2xl mb-6 text-left text-xs space-y-1.5 border ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <p><strong>Время:</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">{selectedSlot}</span></p>
              <p><strong>Клиент:</strong> {clientName}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-3 rounded-2xl transition-all text-xs active:scale-95 shadow-md"
            >
              Отлично
            </button>
          </div>
        )}
      </div>
    </div>
  );
};