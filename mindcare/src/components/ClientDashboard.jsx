import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, LogOut, Calendar, Edit2, Save, X, Phone, Mail, Upload, Sparkles, CheckCircle2, Clock, XCircle } from 'lucide-react';

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
    <div className="space-y-6 max-w-5xl mx-auto py-8 relative">
      {/* Мягкое фоновое свечение */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Шапка профиля клиента */}
      <div className={`relative rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'
      } backdrop-blur-xl`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl bg-teal-600 text-white font-bold flex items-center justify-center text-2xl overflow-hidden shadow-lg shadow-teal-600/30 shrink-0 border-2 border-teal-500/30">
              {currentClient.avatar ? (
                <img src={currentClient.avatar} alt={currentClient.name} className="w-full h-full object-cover" />
              ) : (
                currentClient.name ? currentClient.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                {t('clientCabinetBadge') || "Личный кабинет клиента"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{currentClient.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-teal-500" /> {currentClient.email}</span>
                {currentClient.phone && (
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-teal-500" /> {currentClient.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold border transition-all active:scale-95 ${
                isEditing 
                  ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/20' 
                  : isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-500'
              }`}
            >
              <Edit2 className="w-4 h-4 text-teal-500" />
              {isEditing ? (t('dashboard.closeBtn') || "Закрыть") : (t('clientDashboard.editProfile') || "Редактировать профиль")}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('dashboard.logoutBtn') || "Выйти"}</span>
            </button>
          </div>

        </div>

        {/* Форма редактирования профиля */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5 animate-fade-in">
            <h3 className="font-bold text-sm text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {t('clientDashboard.editTitle') || "Редактирование личных данных"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">{t('clientDashboard.nameLabel') || "Имя и Фамилия"}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">{t('clientDashboard.phoneLabel') || "Телефон"}</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">{t('clientDashboard.avatarLabel') || "Загрузить аватарку"}</label>
                <div className="flex items-center gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-dashed cursor-pointer text-xs font-semibold transition-all ${
                    isDark ? 'border-slate-700 bg-slate-800/50 hover:border-teal-500 text-slate-300' : 'border-slate-300 bg-slate-50 hover:border-teal-500 text-slate-600'
                  }`}>
                    <Upload className="w-4 h-4 text-teal-500" />
                    <span>{t('clientDashboard.chooseFile') || "Выберите файл..."}</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {avatar && (
                    <img src={avatar} alt="Preview" className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500 shrink-0 shadow-md" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" /> <span>{t('dashboard.saveBtn') || "Сохранить изменения"}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Блок записей клиента */}
      <div className={`relative rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'
      } backdrop-blur-xl`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black tracking-tight">{t('clientDashboard.bookingsTitle') || "Мои записи на сессии"}</h3>
        </div>

        {clientBookings.length > 0 ? (
          <div className="space-y-4">
            {clientBookings.map((booking) => (
              <div key={booking.id} className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                isDark ? 'bg-slate-800/50 border-slate-700/80 hover:border-teal-500/40' : 'bg-slate-50/80 border-slate-200 hover:border-teal-500/40'
              }`}>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{booking.date}</span>
                    <span>•</span>
                    <span>{booking.time}</span>
                  </div>
                  <h4 className="font-bold text-base">{t('clientDashboard.doctorPrefix') || "Психолог"}: {booking.doctorName}</h4>
                  {booking.notes && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1"><strong>{t('dashboard.notes') || "Запрос"}:</strong> {booking.notes}</p>}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className={`px-3.5 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 ${
                    booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    booking.status === 'cancelled' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                    'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {booking.status === 'confirmed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {booking.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                    {booking.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                    
                    {booking.status === 'confirmed' ? (t('dashboard.statusConfirmed') || "Подтверждена") : booking.status === 'cancelled' ? (t('dashboard.statusCancelled') || "Отменена") : (t('dashboard.statusPending') || "В ожидании")}
                  </span>

                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                      className="px-3.5 py-2 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition-all active:scale-95"
                    >
                      {t('clientDashboard.cancelBtn') || "Отменить"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('clientDashboard.noBookings') || "У вас пока нет активных записей."}</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">{t('clientDashboard.noBookingsHint') || "Выберите психолога на главной странице и запишитесь на первую сессию."}</p>
          </div>
        )}
      </div>
    </div>
  );
};