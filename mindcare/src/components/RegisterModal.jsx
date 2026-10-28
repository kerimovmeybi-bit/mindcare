import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Stethoscope, ArrowLeft, X, AlertCircle } from 'lucide-react';

export const RegisterModal = ({ isOpen, onClose, onRegisterSuccess }) => {
  const { t, theme } = useLanguage();
  const isDark = theme === 'dark';

  const [step, setStep] = useState('selectRole'); // 'selectRole' | 'clientForm' | 'doctorForm'
  
  // Общие поля
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Поля специалиста
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('1200');

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setStep('selectRole');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setTitle('');
    setPrice('1200');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError(t('register.errorRequired') || 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.trim().toLowerCase(),
      password: password.trim(),
      phone,
      role: step === 'clientForm' ? 'client' : 'psychologist',
    };

    if (step === 'doctorForm') {
      newUser.title = title || t('register.titlePlaceholder') || 'Психолог';
      newUser.price = Number(price) || 1200;
      newUser.experience = 1;
      newUser.rating = 5.0;
      newUser.reviewsCount = 0;
      newUser.topics = ['anxiety'];
      newUser.about = 'Новый специалист платформы MindCare.';
      newUser.avatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250';
      newUser.slots = [
        { id: '1', date: 'Завтра', time: '14:00', isBooked: false },
        { id: '2', date: 'Завтра', time: '16:00', isBooked: false }
      ];
    }

    onRegisterSuccess(newUser);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className={`${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      } border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative transition-all`}>
        
        {/* Кнопка закрытия */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ШАГ 1: Выбор роли */}
        {step === 'selectRole' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="font-bold text-xl mb-1">{t('register.title') || "Присоединяйтесь к MindCare"}</h3>
              <p className="text-xs text-slate-500">{t('register.subtitle') || "Выберите, в качестве кого вы хотите зарегистрироваться:"}</p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStep('clientForm')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                  isDark 
                    ? 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-teal-500' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-teal-500'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('register.clientTitle') || "Я клиент"}</h4>
                  <p className="text-xs text-slate-500">{t('register.clientSubtitle') || "Ищу квалифицированного психолога"}</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStep('doctorForm')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                  isDark 
                    ? 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-teal-500' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-teal-500'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t('register.doctorTitle') || "Я психолог / специалист"}</h4>
                  <p className="text-xs text-slate-500">{t('register.doctorSubtitle') || "Хочу разместить профиль и вести прием"}</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ШАГ 2: Форма регистрации для клиента или специалиста */}
        {(step === 'clientForm' || step === 'doctorForm') && (
          <div>
            <button 
              onClick={() => setStep('selectRole')}
              className="flex items-center gap-1.5 text-xs text-teal-600 font-semibold mb-4 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('register.backLink') || "← Изменить роль"}
            </button>

            <h3 className="font-bold text-xl mb-4">
              {step === 'clientForm' 
                ? (t('register.clientFormTitle') || "Регистрация клиента") 
                : (t('register.doctorFormTitle') || "Регистрация специалиста")}
            </h3>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">{t('register.nameLabel') || "Имя и Фамилия"}</label>
                <input
                  type="text"
                  placeholder={t('register.namePlaceholder') || "Анна Смирнова"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">{t('register.emailLabel') || "Email"}</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">{t('register.passwordLabel') || "Пароль"}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">{t('register.phoneLabel') || "Телефон"}</label>
                <input
                  type="tel"
                  placeholder="+380..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              {/* Дополнительные поля для врача */}
              {step === 'doctorForm' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold mb-1">{t('register.titleLabel') || "Специализация / Направление"}</label>
                    <input
                      type="text"
                      placeholder={t('register.titlePlaceholder') || "Клинический психолог, КПТ-терапевт"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">{t('register.priceLabel') || "Стоимость сессии (грн/час)"}</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-teal-600/30 transition-all"
              >
                {t('register.submitBtn') || "Зарегистрироваться"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};