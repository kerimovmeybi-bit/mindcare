import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, Calendar, Plus, X, Save, Clock, User, Phone, Tag, CheckCircle2, DollarSign, Activity, CheckSquare, Camera, Link as LinkIcon, Award, FileText, Upload, Sparkles, Check } from 'lucide-react';

export const PsychologistDashboard = ({ currentDoctor, bookings, onUpdatePsychologist, onLogout, onUpdateBookingStatus }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';
  const fileInputRef = useRef(null);
  const certFileInputRef = useRef(null);

  const docInfo = t(`psychologists.${currentDoctor.id}`) || {};
  
  const [name, setName] = useState(currentDoctor.name || docInfo.name || '');
  const [title, setTitle] = useState(currentDoctor.title || docInfo.title || '');
  const [about, setAbout] = useState(currentDoctor.about || docInfo.about || '');
  const [avatar, setAvatar] = useState(currentDoctor.avatar || '');
  const [price, setPrice] = useState(currentDoctor.price || 1000);
  const [slots, setSlots] = useState(currentDoctor.availableSlots || []);
  const [selectedTopics, setSelectedTopics] = useState(currentDoctor.topics || ['anxiety', 'burnout']);
  
  // Состояние сертификатов
  const [certificates, setCertificates] = useState(currentDoctor.certificates || []);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertFile, setNewCertFile] = useState(null);
  const [newCertFileName, setNewCertFileName] = useState('');

  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  const availableTopics = ['anxiety', 'burnout', 'relationships', 'depression', 'selfEsteem'];

  const toggleTopic = (topicKey) => {
    if (selectedTopics.includes(topicKey)) {
      setSelectedTopics(selectedTopics.filter((tKey) => tKey !== topicKey));
    } else {
      setSelectedTopics([...selectedTopics, topicKey]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCertFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCertFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCertificate = (e) => {
    if (e) e.preventDefault();
    if (!newCertTitle.trim()) return;

    const certItem = {
      title: newCertTitle.trim(),
      fileUrl: newCertFile || null,
      fileName: newCertFileName || null
    };

    setCertificates(prev => [...prev, certItem]);
    setNewCertTitle('');
    setNewCertFile(null);
    setNewCertFileName('');
    if (certFileInputRef.current) certFileInputRef.current.value = '';
  };

  const handleRemoveCertificate = (indexToRemove) => {
    setCertificates(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddSlot = (e) => {
    if (e) e.preventDefault();
    let slotString = '';
    
    if (slotDate && slotTime) {
      const dateObj = new Date(slotDate);
      const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const formattedDate = `${dayNames[dateObj.getDay()]}, ${dateObj.getDate()}.${dateObj.getMonth() + 1}`;
      slotString = `${formattedDate} ${slotTime}`;
    } else if (slotTime) {
      slotString = slotTime.trim();
    }

    if (!slotString) return;
    if (slots.includes(slotString)) return;

    setSlots([...slots, slotString]);
    setSlotTime('');
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter((s) => s !== slotToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...currentDoctor,
      name,
      title,
      about,
      avatar,
      price: Number(price),
      availableSlots: slots,
      topics: selectedTopics,
      certificates
    };
    onUpdatePsychologist(updated);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const doctorBookings = bookings.filter((b) => String(b.psychologistId) === String(currentDoctor.id));

  const totalBookingsCount = doctorBookings.length;
  const confirmedCount = doctorBookings.filter(b => b.status === 'confirmed').length;
  const completedCount = doctorBookings.filter(b => b.status === 'completed').length;
  const totalRevenue = (confirmedCount + completedCount) * (Number(price) || 0);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-8">
      
      {/* Шапка профиля с премиальным эффектом стекла */}
      <div className={`relative overflow-hidden ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-white shadow-2xl shadow-teal-500/5' : 'bg-white/80 border-slate-200 text-slate-900 shadow-xl'
      } backdrop-blur-xl border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all`}>
        
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <img 
              src={avatar || currentDoctor.avatar} 
              alt={name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-lg group-hover:opacity-80 transition-all group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">{name}</h2>
              <span className="inline-flex items-center gap-1 text-xs bg-teal-500/10 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full font-bold border border-teal-500/20">
                <Sparkles className="w-3 h-3" />
                {t('dashboard.badge') || "Специалист"}
              </span>
            </div>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-1">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email: <span className="text-slate-700 dark:text-slate-300">{currentDoctor.email}</span></p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          {t('dashboard.logoutBtn') || "Выйти из аккаунта"}
        </button>
      </div>

      {/* Статистика с неоновыми акцентами */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`group ${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/40' : 'bg-white/80 border-slate-200 hover:border-teal-500/40'} backdrop-blur-xl border rounded-3xl p-5 flex items-center gap-4 shadow-lg shadow-teal-500/5 transition-all hover:-translate-y-1`}>
          <div className="p-3.5 bg-teal-500/10 text-teal-500 rounded-2xl group-hover:scale-110 transition-transform border border-teal-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('dashboard.stats.totalBookings')}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalBookingsCount}</p>
          </div>
        </div>

        <div className={`group ${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40' : 'bg-white/80 border-slate-200 hover:border-blue-500/40'} backdrop-blur-xl border rounded-3xl p-5 flex items-center gap-4 shadow-lg shadow-blue-500/5 transition-all hover:-translate-y-1`}>
          <div className="p-3.5 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform border border-blue-500/20">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('dashboard.stats.confirmedSessions')}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{confirmedCount}</p>
          </div>
        </div>

        <div className={`group ${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40' : 'bg-white/80 border-slate-200 hover:border-emerald-500/40'} backdrop-blur-xl border rounded-3xl p-5 flex items-center gap-4 shadow-lg shadow-emerald-500/5 transition-all hover:-translate-y-1`}>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:scale-110 transition-transform border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('dashboard.stats.completedSessions')}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{completedCount}</p>
          </div>
        </div>

        <div className={`group ${isDark ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40' : 'bg-white/80 border-slate-200 hover:border-amber-500/40'} backdrop-blur-xl border rounded-3xl p-5 flex items-center gap-4 shadow-lg shadow-amber-500/5 transition-all hover:-translate-y-1`}>
          <div className="p-3.5 bg-amber-500/10 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform border border-amber-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('dashboard.stats.estimatedRevenue')}</p>
            <p className="text-xl font-black text-teal-600 dark:text-teal-400 mt-0.5">{totalRevenue} грн</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Форма редактирования */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'} backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl`}>
          <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-500" />
            {t('dashboard.editSectionTitle') || "Редактирование профиля и услуг"}
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {t('dashboard.nameLabel') || "Ваше имя и фамилия"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                  {t('dashboard.titleLabel') || "Специализация / Титул"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold mb-1.5 flex items-center justify-between text-slate-400 uppercase tracking-wider">
                <span>{t('dashboard.avatarLabel') || "Ссылка на аватар (URL)"}</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1 text-xs hover:underline lowercase"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {t('dashboard.uploadAvatarBtn') || "Загрузить фото"}
                </button>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Блок дипломов и сертификатов */}
            <div className="p-5 rounded-2xl border border-teal-500/20 bg-teal-500/5 space-y-4 shadow-sm">
              <label className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                {t('dashboard.certificatesLabel') || "Дипломы и сертификаты"}
              </label>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={t('dashboard.certificatePlaceholder') || "например: Сертификат по КПТ"}
                  value={newCertTitle}
                  onChange={(e) => setNewCertTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCertificate(e);
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-2xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => certFileInputRef.current?.click()}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        newCertFileName 
                          ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400' 
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {newCertFileName ? newCertFileName : "Прикрепить документ (PDF/Фото)"}
                    </button>
                    <input 
                      type="file" 
                      ref={certFileInputRef} 
                      onChange={handleCertFileSelect} 
                      accept=".pdf,image/*" 
                      className="hidden" 
                    />
                    {newCertFileName && (
                      <button 
                        type="button" 
                        onClick={() => { setNewCertFile(null); setNewCertFileName(''); }}
                        className="text-rose-500 text-xs hover:underline font-bold"
                      >
                        Удалить
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddCertificate(e)}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/20 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    {t('dashboard.addBtn') || "Добавить"}
                  </button>
                </div>
              </div>

              {certificates.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-teal-500/10">
                  {certificates.map((cert, index) => {
                    const titleText = typeof cert === 'string' ? cert : cert.title;
                    const fileUrl = typeof cert === 'object' ? cert.fileUrl : null;
                    const fileName = typeof cert === 'object' ? cert.fileName : null;

                    return (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900/60 text-xs shadow-sm"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Award className="w-4 h-4 text-teal-500 shrink-0" />
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate">{titleText}</span>
                          {fileUrl && (
                            <a 
                              href={fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 text-[11px] bg-teal-500/10 px-3 py-1 rounded-xl font-bold shrink-0"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              {fileName || "Документ"}
                            </a>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCertificate(index)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1 shrink-0 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                {t('dashboard.aboutLabel') || "О себе / Биография"}
              </label>
              <textarea
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={`w-full p-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-400 uppercase tracking-wider">
                {t('dashboard.priceLabel') || "Стоимость сессии (грн/час)"}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full sm:w-64 px-4 py-3.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                required
              />
            </div>

            {/* Теги проблематик */}
            <div>
              <label className="text-xs font-bold mb-2.5 flex items-center gap-2 text-slate-400 uppercase tracking-wider">
                <Tag className="w-4 h-4 text-teal-500" />
                {t('dashboard.topicsLabel') || "Специализация (теги проблематик)"}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topicKey) => {
                  const isSelected = selectedTopics.includes(topicKey);
                  return (
                    <button
                      key={topicKey}
                      type="button"
                      onClick={() => toggleTopic(topicKey)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/25'
                          : isDark
                            ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 opacity-60" />}
                      {t(`topics.${topicKey}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Управление слотами */}
            <div className="p-5 rounded-2xl border border-teal-500/20 bg-teal-500/5 space-y-4 shadow-sm">
              <label className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                {t('dashboard.slotsLabel') || "Управление расписанием и слотами"}
              </label>
              
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('dashboard.slotDateLabel') || "Дата"}</span>
                  <input
                    type="date"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    className={`px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{t('dashboard.slotTimeLabel') || "Время"}</span>
                  <input
                    type="text"
                    placeholder={t('dashboard.slotPlaceholder') || "14:00"}
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className={`w-32 px-4 py-3 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={(e) => handleAddSlot(e)}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/20 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  {t('dashboard.addBtn') || "Добавить"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {slots.map((slot) => (
                  <span
                    key={slot}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900/60 text-teal-700 dark:text-teal-300 shadow-sm"
                  >
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
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
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-teal-600/25 flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                {t('dashboard.saveBtn') || "Сохранить изменения"}
              </button>

              {savedMessage && (
                <span className="text-xs font-bold text-emerald-500 animate-fade-in flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Успешно сохранено!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Записи клиентов */}
        <div className={`h-fit ${isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900'} backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl`}>
          <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-teal-500" />
            {t('dashboard.bookingsTitle') || "Ваши записи"} ({doctorBookings.length})
          </h3>

          {doctorBookings.length > 0 ? (
            <div className="space-y-4">
              {doctorBookings.map((b) => (
                <div 
                  key={b.id}
                  className={`p-4 rounded-2xl border text-xs space-y-3 transition-all ${
                    isDark ? 'bg-slate-800/50 border-slate-700/80 hover:border-teal-500/40' : 'bg-slate-50 border-slate-200 hover:border-teal-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
                    <p className="flex items-center gap-1.5 font-bold text-teal-600 dark:text-teal-400">
                      <Clock className="w-3.5 h-3.5" />
                      {b.slot}
                    </p>
                    {onUpdateBookingStatus && (
                      <select
                        value={b.status || 'pending'}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border focus:outline-none transition-colors ${
                          isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <option value="pending">{t('dashboard.statusPending') || "В ожидании"}</option>
                        <option value="confirmed">{t('dashboard.statusConfirmed') || "Подтверждена"}</option>
                        <option value="completed">{t('dashboard.statusCompleted') || "Завершена"}</option>
                        <option value="cancelled">{t('dashboard.statusCancelled') || "Отменена"}</option>
                      </select>
                    )}
                  </div>
                  <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <strong>{t('dashboard.clientName') || "Клиент:"}</strong> {b.clientName}
                  </p>
                  <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <strong>{t('dashboard.phone') || "Телефон:"}</strong> {b.clientPhone}
                  </p>
                  {b.notes && (
                    <p className="text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                      <strong>{t('dashboard.notes') || "Запрос:"}</strong> {b.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              {t('dashboard.noBookings') || "На данный момент записей от клиентов нет."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};