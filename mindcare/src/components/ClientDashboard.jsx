import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, LogOut, Calendar, Edit2, Save, X, Phone, Mail, Upload } from 'lucide-react';

export const ClientDashboard = ({ currentClient, bookings, onLogout, onUpdateBookingStatus, onUpdateClient }) => {
  const { theme, t } = useLanguage();
  const isDark = theme === 'dark';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentClient.name || '');
  const [phone, setPhone] = useState(currentClient.phone || '');
  const [email, setEmail] = useState(currentClient.email || '');
  const [avatar, setAvatar] = useState(currentClient.avatar || '');

  const clientBookings = bookings.filter((b) => b.clientEmail?.toLowerCase() === currentClient.email?.toLowerCase());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentClient,
      name,
      phone,
      email,
      avatar,
    };
    if (onUpdateClient) {
      onUpdateClient(updated);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Шапка профиля клиента */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-teal-600 text-white font-bold flex items-center justify-center text-xl overflow-hidden shadow-md shadow-teal-600/30 shrink-0">
              {currentClient.avatar ? (
                <img src={currentClient.avatar} alt={currentClient.name} className="w-full h-full object-cover" />
              ) : (
                currentClient.name ? currentClient.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-teal-600 dark:text-teal-400">
                {t('clientCabinetBadge') || "Личный кабинет клиента"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">{currentClient.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentClient.email}</span>
                {currentClient.phone && (
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {currentClient.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <Edit2 className="w-4 h-4 text-teal-600" />
              {isEditing ? (t('dashboard.closeBtn') || "Закрыть") : (t('clientDashboard.editProfile') || "Редактировать профиль")}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              {t('dashboard.logoutBtn') || "Выйти"}
            </button>
          </div>

        </div>

        {/* Форма редактирования профиля */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-teal-600">{t('clientDashboard.editTitle') || "Редактирование личных данных"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">{t('clientDashboard.nameLabel') || "Имя и Фамилия"}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t('clientDashboard.phoneLabel') || "Телефон"}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">{t('clientDashboard.avatarLabel') || "Загрузить аватарку"}</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 cursor-pointer hover:border-teal-500 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 transition-all">
                    <Upload className="w-4 h-4 text-teal-600" />
                    <span>{t('clientDashboard.chooseFile') || "Выберите файл..."}</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {avatar && (
                    <img src={avatar} alt="Preview" className="w-10 h-10 rounded-xl object-cover border border-teal-500 shrink-0" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <Save className="w-4 h-4" /> {t('dashboard.saveBtn') || "Сохранить изменения"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Блок записей клиента */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-teal-600" />
          <h3 className="text-lg font-bold">{t('clientDashboard.bookingsTitle') || "Мои записи на сессии"}</h3>
        </div>

        {clientBookings.length > 0 ? (
          <div className="space-y-4">
            {clientBookings.map((booking) => (
              <div key={booking.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 mb-1">
                    <span>{booking.date}</span> • <span>{booking.time}</span>
                  </div>
                  <h4 className="font-bold text-sm">{t('clientDashboard.doctorPrefix') || "Психолог"}: {booking.doctorName}</h4>
                  {booking.notes && <p className="text-xs text-slate-500 mt-1">{t('dashboard.notes') || "Запрос"}: {booking.notes}</p>}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                    booking.status === 'cancelled' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' :
                    'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                  }`}>
                    {booking.status === 'confirmed' ? (t('dashboard.statusConfirmed') || "Подтверждена") : booking.status === 'cancelled' ? (t('dashboard.statusCancelled') || "Отменена") : (t('dashboard.statusPending') || "В ожидании")}
                  </span>
                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-all"
                    >
                      {t('clientDashboard.cancelBtn') || "Отменить"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('clientDashboard.noBookings') || "У вас пока нет активных записей."}</p>
            <p className="text-xs text-slate-400 mt-1">{t('clientDashboard.noBookingsHint') || "Выберите психолога на главной странице и запишитесь на первую сессию."}</p>
          </div>
        )}
      </div>
    </div>
  );
};