import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroHome } from './components/HeroHome';
import { initialPsychologists } from './data/psychologists';
import { PsychologistCard } from './components/PsychologistCard';
import { BookingModal } from './components/BookingModal';
import { PsychologistDashboard } from './components/PsychologistDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { NewsSection } from './components/NewsSection';
import { CoursesSection } from './components/CoursesSection';
import { RegisterModal } from './components/RegisterModal';
import { PaymentModal } from './components/PaymentModal';
import { useLanguage } from './context/LanguageContext';
import { Search, Lock, AlertCircle, UserCheck, Stethoscope, User } from 'lucide-react';

function App() {
  const [role, setRole] = useState('client'); // 'client' | 'psychologist'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'catalog' | 'client-cabinet' | 'doctor-cabinet'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isClientLoginOpen, setIsClientLoginOpen] = useState(false);
  const [isDoctorLoginOpen, setIsDoctorLoginOpen] = useState(false);
  
  // Состояние для модального окна оплаты
  const [courseToPay, setCourseToPay] = useState(null);
  
  // Состояние входа специалиста
  const [loggedInDoctorId, setLoggedInDoctorId] = useState(() => {
    return localStorage.getItem('mindcare_logged_doctor_id') || null;
  });

  // Состояние входа клиента
  const [loggedInClientId, setLoggedInClientId] = useState(() => {
    return localStorage.getItem('mindcare_logged_client_id') || null;
  });

  // Поля формы входа для клиентов
  const [clientLoginEmail, setClientLoginEmail] = useState('');
  const [clientLoginPassword, setClientLoginPassword] = useState('');
  const [clientLoginError, setClientLoginError] = useState('');

  // Поля формы входа для врачей
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
        console.error('Ошибка загрузки', e);
      }
    }
    return initialPsychologists;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mindcare_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('mindcare_clients');
    return saved ? JSON.parse(saved) : [];
  });

  const { theme, t } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('mindcare_psychologists', JSON.stringify(psychologists));
  }, [psychologists]);

  useEffect(() => {
    localStorage.setItem('mindcare_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('mindcare_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    if (loggedInDoctorId) localStorage.setItem('mindcare_logged_doctor_id', loggedInDoctorId);
    else localStorage.removeItem('mindcare_logged_doctor_id');
  }, [loggedInDoctorId]);

  useEffect(() => {
    if (loggedInClientId) localStorage.setItem('mindcare_logged_client_id', loggedInClientId);
    else localStorage.removeItem('mindcare_logged_client_id');
  }, [loggedInClientId]);

  const topicsList = ['all', 'anxiety', 'burnout', 'relationships', 'depression', 'selfEsteem'];

  const filteredPsychologists = psychologists.filter((p) => {
    const query = searchQuery.trim().toLowerCase();
    const nameMatch = (p.name || '').toLowerCase().includes(query);
    const titleMatch = (p.title || '').toLowerCase().includes(query);
    const matchesSearch = query === '' || nameMatch || titleMatch;
    const matchesTopic = selectedTopic === 'all' || (p.topics && p.topics.includes(selectedTopic));
    return matchesSearch && matchesTopic;
  });

  const handleBookConfirm = (bookingData) => {
    setBookings((prev) => [...prev, bookingData]);
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleUpdateClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  const handleRegisterSuccess = (newUser) => {
    if (newUser.role === 'psychologist') {
      setPsychologists((prev) => [...prev, newUser]);
      setLoggedInDoctorId(newUser.id);
      setRole('psychologist');
      setActiveTab('doctor-cabinet');
    } else if (newUser.role === 'client') {
      setClients((prev) => [...prev, newUser]);
      setLoggedInClientId(newUser.id);
      setRole('client');
      setActiveTab('client-cabinet');
    }
  };

  const handleClientLogin = (e) => {
    e.preventDefault();
    setClientLoginError('');
    const found = clients.find(
      (c) => c.email.toLowerCase() === clientLoginEmail.trim().toLowerCase() && c.password === clientLoginPassword.trim()
    );
    if (found) {
      setLoggedInClientId(found.id);
      setClientLoginEmail('');
      setClientLoginPassword('');
      setIsClientLoginOpen(false);
      setActiveTab('client-cabinet');
    } else {
      setClientLoginError(t('clientLoginError') || 'Неверный email или пароль клиента');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const foundDoctor = psychologists.find(
      (doc) => doc.email && doc.email.toLowerCase() === loginEmail.trim().toLowerCase() && doc.password === loginPassword.trim()
    );
    if (foundDoctor) {
      setLoggedInDoctorId(foundDoctor.id);
      setLoginEmail('');
      setLoginPassword('');
      setIsDoctorLoginOpen(false);
      setActiveTab('doctor-cabinet');
    } else {
      setLoginError(t('login.error') || 'Неверный email или пароль специалиста');
    }
  };

  const currentDoctor = psychologists.find((p) => p.id === loggedInDoctorId);
  const currentClient = clients.find((c) => c.id === loggedInClientId);

  // Обработчик клика "Записаться на курс"
  const handleCourseEnroll = (course) => {
    if (currentClient || currentDoctor) {
      // Есть аккаунт -> открываем окно ввода данных карты
      setCourseToPay(course);
    } else {
      // Нет аккаунта -> окно регистрации
      setIsRegisterOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      <div>
        <Header 
          currentRole={role} 
          setRole={setRole}
          isClientLoggedIn={!!currentClient}
          onOpenClientLogin={() => {
            setRole('client');
            setActiveTab('client-cabinet');
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {role === 'client' ? (
            activeTab === 'client-cabinet' ? (
              currentClient ? (
                /* Личный кабинет авторизованного клиента */
                <ClientDashboard 
                  currentClient={currentClient}
                  bookings={bookings}
                  onLogout={() => {
                    setLoggedInClientId(null);
                    setActiveTab('home');
                  }}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onUpdateClient={handleUpdateClient}
                />
              ) : (
                /* Заглушка для неавторизованного клиента */
                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl mx-auto p-8 shadow-sm">
                  <User className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{t('clientDashboardNotLogged.title') || "Личный кабинет клиента"}</h2>
                  <p className="text-xs text-slate-500 mb-6">{t('clientDashboardNotLogged.prompt') || "Чтобы просматривать и управлять своими записями на сессию, пожалуйста, войдите в систему."}</p>
                  <button
                    onClick={() => setIsClientLoginOpen(true)}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-600/30 transition-all"
                  >
                    {t('clientDashboardNotLogged.loginBtn') || "Войти в кабинет клиента"}
                  </button>
                </div>
              )
            ) : (
              /* Главная страница */
              <div className="space-y-16">
                <HeroHome 
                  onExploreCatalog={() => {
                    setActiveTab('catalog');
                    const catalogElement = document.getElementById('psychologists-catalog');
                    catalogElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenRegister={() => setIsRegisterOpen(true)}
                />

                <div id="psychologists-catalog" className="pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="mb-8 space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Наши специалисты</h2>
                    <div className="relative max-w-xl">
                      <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('searchPlaceholder') || "Поиск по имени или проблематике..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {topicsList.map((topicKey) => (
                        <button
                          key={topicKey}
                          onClick={() => setSelectedTopic(topicKey)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedTopic === topicKey
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {t(`topics.${topicKey}`) || topicKey}
                        </button>
                      ))}
                    </div>
                  </div>

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
                      <p className="text-slate-500">Ничего не найдено.</p>
                    </div>
                  )}

                  <NewsSection />
                  <CoursesSection 
                    onEnroll={handleCourseEnroll} 
                    onOpenRegister={() => setIsRegisterOpen(true)} 
                  />
                </div>
              </div>
            )
          ) : (
            /* Кабинет психолога */
            <div>
              {currentDoctor ? (
                <PsychologistDashboard 
                  currentDoctor={currentDoctor}
                  bookings={bookings}
                  onUpdatePsychologist={(doc) => setPsychologists(prev => prev.map(p => p.id === doc.id ? doc : p))}
                  onLogout={() => {
                    setLoggedInDoctorId(null);
                    setActiveTab('home');
                  }}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                />
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl mx-auto p-8 shadow-sm">
                  <Stethoscope className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{t('psychologistView') || "Кабинет специалиста"}</h2>
                  <p className="text-xs text-slate-500 mb-6">{t('doctorDashboard.loginPrompt') || "Чтобы управлять своими сессиями и расписанием, пожалуйста, войдите в систему."}</p>
                  <button
                    onClick={() => setIsDoctorLoginOpen(true)}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-600/30 transition-all"
                  >
                    {t('doctorDashboard.loginBtn') || "Войти в кабинет врача"}
                  </button>
                </div>
              )}
            </div>
          )}

          {selectedDoctorForBooking && (
            <BookingModal 
              psychologist={selectedDoctorForBooking}
              onClose={() => setSelectedDoctorForBooking(null)}
              onConfirm={handleBookConfirm}
            />
          )}

          <RegisterModal 
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onRegisterSuccess={handleRegisterSuccess}
          />

          {/* Модальное окно оплаты курса */}
          {courseToPay && (
            <PaymentModal 
              course={courseToPay}
              onClose={() => setCourseToPay(null)}
            />
          )}

          {/* Модальное окно входа для клиента */}
          {isClientLoginOpen && !currentClient && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative`}>
                <button 
                  onClick={() => setIsClientLoginOpen(false)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-teal-600" />
                  <h3 className="font-bold text-lg">{t('clientLoginTitle') || "Вход в кабинет клиента"}</h3>
                </div>

                {clientLoginError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {clientLoginError}
                  </div>
                )}

                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={clientLoginEmail}
                      onChange={(e) => setClientLoginEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">{t('login.passwordLabel') || "Пароль"}</label>
                    <input
                      type="password"
                      value={clientLoginPassword}
                      onChange={(e) => setClientLoginPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold">
                    {t('login.submitBtn') || "Войти в кабинет"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button 
                    type="button"
                    onClick={() => { setIsClientLoginOpen(false); setIsRegisterOpen(true); }} 
                    className="text-xs text-teal-600 hover:underline font-semibold"
                  >
                    {t('clientNoAccount') || "Нет аккаунта? Зарегистрироваться"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Модальное окно входа для специалиста */}
          {isDoctorLoginOpen && !currentDoctor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative`}>
                <button 
                  onClick={() => setIsDoctorLoginOpen(false)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full"
                >
                  ✕
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-6 h-6 text-teal-600" />
                  <h3 className="font-bold text-lg">{t('login.title') || "Вход для специалистов"}</h3>
                </div>
                <p className="text-slate-500 text-xs mb-4">
                  {t('login.subtitle') || "Тестовый:"} <span className="text-teal-500 font-semibold">anna@mindcare.com</span>, {t('login.passwordLabel') || "пароль"}: <span className="text-teal-500 font-semibold">123</span>
                </p>

                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">{t('login.passwordLabel') || "Пароль"}</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold">
                    {t('login.submitBtn') || "Войти в кабинет"}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button 
                    type="button"
                    onClick={() => { setIsDoctorLoginOpen(false); setIsRegisterOpen(true); }} 
                    className="text-xs text-teal-600 hover:underline font-semibold"
                  >
                    {t('doctorNoAccount') || "Нет аккаунта специалиста? Зарегистрироваться"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-400 font-medium">{t('madeBy') || "Сделано с душой для MindCare • Керимли Мейбулла"}</p>
      </footer>
    </div>
  );
}

export default App;