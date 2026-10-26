import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { initialPsychologists } from './data/psychologists';
import { PsychologistCard } from './components/PsychologistCard';
import { BookingModal } from './components/BookingModal';
import { PsychologistDashboard } from './components/PsychologistDashboard';
import { NewsSection } from './components/NewsSection';
import { useLanguage } from './context/LanguageContext';
import { Search, Lock, Mail, KeyRound, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [role, setRole] = useState('client');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  
  // Состояние авторизации
  const [loggedInDoctorId, setLoggedInDoctorId] = useState(() => {
    return localStorage.getItem('mindcare_logged_doctor_id') || null;
  });

  // Поля формы входа
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [psychologists, setPsychologists] = useState(() => {
    const saved = localStorage.getItem('mindcare_psychologists');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Ошибка загрузки из localStorage', e);
      }
    }
    return initialPsychologists;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mindcare_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('mindcare_psychologists', JSON.stringify(psychologists));
  }, [psychologists]);

  useEffect(() => {
    localStorage.setItem('mindcare_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (loggedInDoctorId) {
      localStorage.setItem('mindcare_logged_doctor_id', loggedInDoctorId);
    } else {
      localStorage.removeItem('mindcare_logged_doctor_id');
    }
  }, [loggedInDoctorId]);

  const topicsList = ['all', 'anxiety', 'burnout', 'relationships', 'depression', 'selfEsteem'];

  // Безопасная фильтрация специалистов
  const filteredPsychologists = psychologists.filter((p) => {
    const query = searchQuery.trim().toLowerCase();
    
    // Получаем переводы, если они есть
    const docInfo = t(`psychologists.${p.id}`) || {};
    const translatedName = typeof docInfo === 'object' ? docInfo.name : '';
    const translatedTitle = typeof docInfo === 'object' ? docInfo.title : '';

    // Ищем как в переводах, так и напрямую в объекте
    const nameMatch = (translatedName || p.name || '').toLowerCase().includes(query);
    const titleMatch = (translatedTitle || p.title || '').toLowerCase().includes(query);

    const matchesSearch = query === '' || nameMatch || titleMatch;
    const matchesTopic = selectedTopic === 'all' || (p.topics && p.topics.includes(selectedTopic));

    return matchesSearch && matchesTopic;
  });

  const handleBookConfirm = (bookingData) => {
    setBookings((prev) => [...prev, bookingData]);
  };

  const handleUpdatePsychologist = (updatedDoc) => {
    setPsychologists((prev) =>
      prev.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc))
    );
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    const foundDoctor = psychologists.find(
      (doc) => doc.email && doc.email.toLowerCase() === cleanEmail && doc.password === cleanPassword
    );

    if (foundDoctor) {
      setLoggedInDoctorId(foundDoctor.id);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError(t('login.error') || 'Неверный email или пароль');
    }
  };

  const handleLogout = () => {
    setLoggedInDoctorId(null);
    localStorage.removeItem('mindcare_logged_doctor_id');
  };

  const handleResetData = () => {
    localStorage.removeItem('mindcare_psychologists');
    setPsychologists(initialPsychologists);
    setLoginError('');
  };

  const currentDoctor = psychologists.find((p) => p.id === loggedInDoctorId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      <div>
        <Header currentRole={role} setRole={setRole} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {role === 'client' ? (
            <div>
              {/* Поисковая строка и фильтры */}
              <div className="mb-8 space-y-4">
                <div className="relative max-w-xl">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {topicsList.map((topicKey) => (
                    <button
                      key={topicKey}
                      onClick={() => setSelectedTopic(topicKey)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedTopic === topicKey
                          ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {topicKey === 'all' ? t('allTopics') : t(`topics.${topicKey}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Сетка карточек */}
              {filteredPsychologists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPsychologists.map((psychologist) => (
                    <PsychologistCard 
                      key={psychologist.id} 
                      psychologist={psychologist} 
                      onBook={(doc) => setSelectedDoctorForBooking(doc)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">Ничего не найдено по вашему запросу.</p>
                  <button 
                    onClick={handleResetData} 
                    className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-all"
                  >
                    Восстановить список специалистов
                  </button>
                </div>
              )}

              {/* Секция полезных новостей */}
              <NewsSection />
            </div>
          ) : (
            /* Кабинет психолога */
            <div>
              {currentDoctor ? (
                <PsychologistDashboard 
                  currentDoctor={currentDoctor}
                  bookings={bookings}
                  onUpdatePsychologist={handleUpdatePsychologist}
                  onLogout={handleLogout}
                />
              ) : (
                /* Экран ввода логина и пароля */
                <div className="max-w-md mx-auto py-12">
                  <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl p-8 shadow-lg`}>
                    <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-2">{t('login.title')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-6">
                      {t('login.subtitle')} <span className="font-semibold text-teal-500">anna@mindcare.com</span>, пароль: <span className="font-semibold text-teal-500">123</span>)
                    </p>

                    {loginError && (
                      <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="doctor@mindcare.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                            }`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1">{t('login.passwordLabel')}</label>
                        <div className="relative">
                          <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                            }`}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-teal-600/20 text-sm"
                      >
                        {t('login.submitBtn')}
                      </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                      <button
                        onClick={handleResetData}
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-500 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {t('login.resetCache')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Модалка бронирования */}
          {selectedDoctorForBooking && (
            <BookingModal 
              psychologist={selectedDoctorForBooking}
              onClose={() => setSelectedDoctorForBooking(null)}
              onConfirm={handleBookConfirm}
            />
          )}
        </main>
      </div>

      {/* Футер */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-slate-200 dark:border-slate-800/80 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {t('madeBy') || "Сделано с душой для MindCare • Керимли Мейбулла"}
        </p>
      </footer>
    </div>
  );
}

export default App;