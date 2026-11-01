import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldCheck, Video, PhoneOff } from 'lucide-react';

export const VideoCallModal = ({ isOpen, onClose, booking }) => {
  const { theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  if (!isOpen || !booking) return null;

  // Генерируем уникальную комнату на основе ID бронирования
  const roomName = `MindCare_Session_${booking.id}`;
  const displayName = booking.clientName || 'Пользователь';
  const jitsiRoomUrl = `https://meet.jit.si/${roomName}#userInfo.displayName="${encodeURIComponent(displayName)}"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-fade-in">
      <div className={`relative w-full max-w-5xl h-[85vh] rounded-3xl border overflow-hidden shadow-2xl flex flex-col transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Шапка модалки */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <h3 className="font-black text-sm text-white tracking-tight">
                  {lang === 'en' ? 'Online Session MindCare' : lang === 'ua' ? 'Онлайн-сесія MindCare' : 'Онлайн-сессия MindCare'}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {lang === 'en' ? 'Specialist:' : lang === 'ua' ? 'Фахівець:' : 'Специалист:'} <strong className="text-teal-400">{booking.doctorName}</strong> | {booking.slot || `${booking.date} ${booking.time}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Encrypted Connection' : lang === 'ua' ? 'Захищене з’єднання' : 'Защищенное соединение'}</span>
            </span>

            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              <PhoneOff className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'en' ? 'End Call' : lang === 'ua' ? 'Завершити' : 'Завершить'}</span>
            </button>
          </div>
        </div>

        {/* Видео-фрейм Jitsi Meet */}
        <div className="flex-1 w-full bg-slate-950 relative">
          <iframe
            src={jitsiRoomUrl}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="w-full h-full border-0"
            title="MindCare Session Video Call"
          />
        </div>

      </div>
    </div>
  );
};