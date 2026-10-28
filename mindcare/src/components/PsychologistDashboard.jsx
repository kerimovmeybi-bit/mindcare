import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, Calendar, Plus, X, Save, Clock, User, Phone, Tag, CheckCircle2, DollarSign, Activity, CheckSquare, Camera, Link as LinkIcon, Award, FileText, Upload } from 'lucide-react';

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
  
  // Состояние сертификатов (теперь объекты: { title, fileUrl })
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

  // Загрузка файла сертификата с ПК
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

  // Функция добавления сертификата
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
    <div className="space-y-8 animate-fade-in">
      {/* Шапка профиля */}
      <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <img 
              src={avatar || currentDoctor.avatar} 
              alt={name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-md group-hover:opacity-80 transition-all"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
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
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" />
          {t('dashboard.logoutBtn') || "Выйти из аккаунта"}
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
          <div className="p-3 bg-teal-500/10 text-teal-500 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{t('dashboard.stats.totalBookings')}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{totalBookingsCount}</p>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{t('dashboard.stats.confirmedSessions')}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{confirmedCount}</p>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{t('dashboard.stats.completedSessions')}</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{completedCount}</p>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-5 flex items-center gap-4 shadow-sm`}>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{t('dashboard.stats.estimatedRevenue')}</p>
            <p className="text-xl font-bold text-teal-600 dark:text-teal-400">{totalRevenue} грн</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Форма редактирования */}
        <div className={`lg:col-span-2 ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-6 sm:p-8 shadow-sm`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-500" />
            {t('dashboard.editSectionTitle') || "Редактирование профиля и услуг"}
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Имя и Специализация */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block">
                  {t('dashboard.nameLabel') || "Ваше имя и фамилия"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold mb-1.5 block">
                  {t('dashboard.titleLabel') || "Специализация / Титул"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Аватар */}
            <div>
              <label className="text-xs font-semibold mb-1.5 flex items-center justify-between">
                <span>{t('dashboard.avatarLabel') || "Ссылка на аватар (URL)"}</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-teal-500 hover:text-teal-400 font-normal flex items-center gap-1 text-xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {t('dashboard.uploadAvatarBtn') || "Загрузить фото с устройства"}
                </button>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Блок дипломов и сертификатов с прикреплением файла */}
            <div className="p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5 space-y-4">
              <label className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
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
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => certFileInputRef.current?.click()}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        newCertFileName 
                          ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400' 
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
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
                        className="text-rose-500 text-xs hover:underline"
                      >
                        Удалить файл
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddCertificate(e)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    {t('dashboard.addBtn') || "Добавить"}
                  </button>
                </div>
              </div>

              {/* Список добавленных сертификатов с файлами */}
              {certificates.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-teal-500/10">
                  {certificates.map((cert, index) => {
                    const titleText = typeof cert === 'string' ? cert : cert.title;
                    const fileUrl = typeof cert === 'object' ? cert.fileUrl : null;
                    const fileName = typeof cert === 'object' ? cert.fileName : null;

                    return (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900/60 text-xs shadow-sm"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Award className="w-4 h-4 text-teal-500 shrink-0" />
                          <span className="font-medium text-slate-700 dark:text-slate-200 truncate">{titleText}</span>
                          {fileUrl && (
                            <a 
                              href={fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 text-[11px] bg-teal-500/10 px-2 py-0.5 rounded-md shrink-0"
                            >
                              <FileText className="w-3 h-3" />
                              {fileName || "Документ"}
                            </a>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCertificate(index)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1 shrink-0 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* О себе */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block">
                {t('dashboard.aboutLabel') || "О себе / Биография"}
              </label>
              <textarea
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={`w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Стоимость */}
            <div>
              <label className="text-xs font-semibold mb-1.5 block">
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

            {/* Теги проблематик */}
            <div>
              <label className="text-xs font-semibold mb-2 flex items-center gap-1.5">
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-600/20'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 opacity-60" />}
                      {t(`topics.${topicKey}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Календарный блок слотов */}
            <div className="p-4 rounded-2xl border border-teal-500/20 bg-teal-500/5 space-y-4">
              <label className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {t('dashboard.slotsLabel') || "Управление расписанием и слотами"}
              </label>
              
              <div className="flex flex-wrap gap-2 items-end">
                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">{t('dashboard.slotDateLabel') || "Дата"}</span>
                  <input
                    type="date"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    className={`p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">{t('dashboard.slotTimeLabel') || "Время"}</span>
                  <input
                    type="text"
                    placeholder={t('dashboard.slotPlaceholder') || "14:00"}
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className={`w-28 p-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={(e) => handleAddSlot(e)}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  {t('dashboard.addBtn') || "Добавить"}
                </button>
              </div>

              {/* Список слотов */}
              <div className="flex flex-wrap gap-2 pt-2">
                {slots.map((slot) => (
                  <span
                    key={slot}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900/60 text-teal-700 dark:text-teal-300 shadow-sm"
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
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                    isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                    <p className="flex items-center gap-1.5 font-semibold text-teal-600 dark:text-teal-400">
                      <Clock className="w-3.5 h-3.5" />
                      {b.slot}
                    </p>
                    {onUpdateBookingStatus && (
                      <select
                        value={b.status || 'pending'}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded-lg border focus:outline-none ${
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