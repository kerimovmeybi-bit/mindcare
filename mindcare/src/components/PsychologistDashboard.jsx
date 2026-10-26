import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, Calendar, Plus, X, Save, Clock, User, Phone } from 'lucide-react';

export const PsychologistDashboard = ({ currentDoctor, bookings, onUpdatePsychologist, onLogout }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  const [price, setPrice] = useState(currentDoctor.price || 1000);
  const [slots, setSlots] = useState(currentDoctor.availableSlots || []);
  const [newSlot, setNewSlot] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  // Получаем переведенные данные врача
  const docInfo = t(`psychologists.${currentDoctor.id}`) || {};
  const name = docInfo.name || currentDoctor.name;
  const title = docInfo.title || currentDoctor.title;

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.trim()) return;
    setSlots([...slots, newSlot.trim()]);
    setNewSlot('');
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter((s) => s !== slotToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...currentDoctor,
      price: Number(price),
      availableSlots: slots
    };
    onUpdatePsychologist(updated);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  // Фильтруем записи именно для этого доктора
  const doctorBookings = bookings.filter((b) => String(b.psychologistId) === String(currentDoctor.id));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Верхняя карточка профиля */}
      <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="flex items-center gap-5">
          <img 
            src={currentDoctor.avatar} 
            alt={name} 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{name}</h2>
              <span className="text-xs bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-full font-semibold">
                {t('dashboard.badge') || "Специалист"}
              </span>
            </div>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mb-2">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Email: <span className="font-medium text-slate-700 dark:text-slate-300">{currentDoctor.email}</span></p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('dashboard.logoutBtn') || "Выйти из аккаунта"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Форма редактирования */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 sm:p-8 shadow-sm`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-500" />
            {t('dashboard.editSectionTitle') || "Редактирование профиля и услуг"}
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold mb-1.5">
                {t('dashboard.priceLabel') || "Стоимость сессии (грн/час)"}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full sm:w-64 p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">
                {t('dashboard.slotsLabel') || "Свободные слоты для записи"}
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder={t('dashboard.slotPlaceholder') || "например: Пн, 14:00"}
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className={`flex-1 sm:max-w-xs p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  {t('dashboard.addBtn') || "Добавить"}
                </button>
              </div>

              {/* Список слотов */}
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <span
                    key={slot}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-900 text-teal-700 dark:text-teal-300"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {slot}
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(slot)}
                      className="hover:text-rose-500 transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-teal-600/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {t('dashboard.saveBtn') || "Сохранить изменения"}
              </button>

              {savedMessage && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
                  ✓ Успешно сохранено!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Записи клиентов */}
        <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 sm:p-8 shadow-sm`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-500" />
            {t('dashboard.bookingsTitle') || "Ваши записи"} ({doctorBookings.length})
          </h3>

          {doctorBookings.length > 0 ? (
            <div className="space-y-4">
              {doctorBookings.map((b) => (
                <div 
                  key={b.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="flex items-center gap-2 font-semibold text-teal-600 dark:text-teal-400">
                    <Clock className="w-3.5 h-3.5" />
                    {b.slot}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{t('dashboard.clientName') || "Клиент:"}</strong> {b.clientName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{t('dashboard.phone') || "Телефон:"}</strong> {b.clientPhone}
                  </p>
                  {b.notes && (
                    <p className="text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                      <strong>{t('dashboard.notes') || "Запрос:"}</strong> {b.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              {t('dashboard.noBookings') || "На данный момент записей от клиентов нет."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};