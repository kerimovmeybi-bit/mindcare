import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, User, Phone, CheckCircle, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const BookingModal = ({ psychologist, onClose, onConfirm }) => {
  const { t, theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  const [step, setStep] = useState('details'); // 'details' | 'success'

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');

  if (!psychologist) return null;

  const docInfo = t(`psychologists.${psychologist.id}`) || {};
  const name = typeof docInfo === 'object' && docInfo?.name ? docInfo.name : (psychologist.name || "Специалист");
  const title = typeof docInfo === 'object' && docInfo?.title ? docInfo.title : (psychologist.title || "Психолог");
  const price = psychologist.price || 1500;

  const slots = psychologist.availableSlots || ["Пн 10:00", "Ср 14:00", "Пт 16:00"];

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert(lang === 'en' ? "Please select a convenient time slot" : lang === 'ua' ? "Будь ласка, виберіть зручний час" : "Пожалуйста, выберите удобное время");
      return;
    }

    const bookingData = {
      id: Date.now(),
      psychologistId: psychologist.id,
      doctorName: name,
      clientName,
      clientPhone,
      clientEmail: clientEmail || 'client@example.com',
      slot: selectedSlot,
      date: selectedSlot.includes(' ') ? selectedSlot.split(' ')[0] : (lang === 'en' ? 'Nearest date' : lang === 'ua' ? 'Найближча дата' : 'Ближайшая дата'),
      time: selectedSlot.includes(' ') ? selectedSlot.split(' ')[1] : selectedSlot,
      notes,
      price: 0, // Первая сессия бесплатная
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onConfirm(bookingData);
    setStep('success');
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
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' && (
          <div>
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
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{lang === 'en' ? 'Regular price:' : lang === 'ua' ? 'Звичайна вартість:' : 'Обычная стоимость:'}</span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400">{price} грн/год</span>
                </div>
                <div className="text-xs text-emerald-500 font-bold flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'First session is FREE' : lang === 'ua' ? 'Перша консультація БЕЗКОШТОВНА' : 'Первая консультация БЕСПЛАТНАЯ'}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 relative z-10">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Full Name' : lang === 'ua' ? "Ім'я та прізвище" : 'Ваше имя и фамилия'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={lang === 'en' ? 'Alex Smith' : lang === 'ua' ? 'Олексій Іванов' : 'Алексей Иванов'}
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Phone Number' : lang === 'ua' ? 'Номер телефону' : 'Номер телефона'}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+380..."
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Email (for video call)' : lang === 'ua' ? 'Email (для відеозв’язку)' : 'Email (для видеосвязи)'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@gmail.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold mb-1.5 flex items-center gap-1.5 text-slate-400 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  {lang === 'en' ? 'Select available time' : lang === 'ua' ? 'Виберіть вільний час' : 'Выберите свободное время'}
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

              <div>
                <label className="block text-xs font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Briefly describe your request (optional)' : lang === 'ua' ? 'Коротко опишіть ваш запит (необов’язково)' : 'Кратко опишите ваш запрос (необязательно)'}
                </label>
                <textarea
                  rows="2"
                  placeholder={lang === 'en' ? 'E.g. work anxiety, relationship issues...' : lang === 'ua' ? 'Наприклад: тривога перед роботою, проблеми у стосунках...' : 'Например: тревога перед работой, проблемы в отношениях...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={!selectedSlot}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/25 text-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === 'en' ? 'Confirm Free Consultation' : lang === 'ua' ? 'Підтвердити безкоштовну консультацію' : 'Подтвердить бесплатную консультацию'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6 relative z-10 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">
              {lang === 'en' ? 'Free Consultation Booked!' : lang === 'ua' ? 'Безкоштовну консультацію заброньовано!' : 'Бесплатная консультация забронирована!'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
              {lang === 'en' 
                ? `You have booked a session with ${name} at ${selectedSlot}. The video room link is active in your dashboard.`
                : lang === 'ua'
                ? `Ви записалися до ${name} на ${selectedSlot}. Посилання на відеокімнату активне у вашому кабінеті.`
                : `Вы записаны к ${name} на ${selectedSlot}. Ссылка для входа в видеокомнату активна в вашем кабинете.`
              }
            </p>
            <div className={`p-4 rounded-2xl mb-6 text-left text-xs space-y-1.5 border ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <p><strong>{lang === 'en' ? 'Time:' : lang === 'ua' ? 'Час:' : 'Время:'}</strong> <span className="text-teal-600 dark:text-teal-400 font-bold">{selectedSlot}</span></p>
              <p><strong>{lang === 'en' ? 'Client:' : lang === 'ua' ? 'Клієнт:' : 'Клиент:'}</strong> {clientName}</p>
              <p><strong>{lang === 'en' ? 'Format:' : lang === 'ua' ? 'Формат:' : 'Формат:'}</strong> {lang === 'en' ? 'Free consultation (0 UAH)' : lang === 'ua' ? 'Безкоштовна консультація (0 грн)' : 'Бесплатная консультация (0 грн)'}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl transition-all text-xs active:scale-95 shadow-md shadow-teal-600/25"
            >
              {lang === 'en' ? 'Great' : lang === 'ua' ? 'Чудово' : 'Отлично'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};