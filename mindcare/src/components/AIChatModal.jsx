import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';

export const AIChatModal = ({ isOpen, onClose }) => {
  const { theme, language: lang } = useLanguage();
  const isDark = theme === 'dark';

  // Начальное приветствие на нужном языке
  const getInitialGreeting = () => {
    if (lang === 'en') return "Hello! I am MindCare AI Assistant. How can I help you today?";
    if (lang === 'ua') return "Вітаю! Я ІІ-асистент MindCare. Чим можу вам допомогти?";
    return "Здравствуйте! Я ИИ-ассистент MindCare. Чем я могу вам помочь?";
  };

  const [messages, setMessages] = useState([
    { sender: 'ai', text: getInitialGreeting() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Обновляем приветствие, если пользователь сменил язык сайта
  useEffect(() => {
    setMessages([
      { sender: 'ai', text: getInitialGreeting() }
    ]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lower = userMsg.toLowerCase();

      if (lower.includes('запис') || lower.includes('заброниров') || lower.includes('book')) {
        botResponse = lang === 'en'
          ? "You can choose a psychologist in our Catalog and select a convenient time slot."
          : lang === 'ua'
          ? "Ви можете обрати психолога в нашому Каталозі та вибрати зручний час для сесії."
          : "Вы можете выбрать психолога в нашем Каталоге и подобрать удобный временной слот.";
      } else if (lower.includes('тревог') || lower.includes('паник') || lower.includes('anxiety') || lower.includes('выгоран') || lower.includes('burnout')) {
        botResponse = lang === 'en'
          ? "We have verified specialists working with anxiety and burnout. Try our Psychologist Match Quiz!"
          : lang === 'ua'
          ? "У нас є перевірені фахівці, які працюють з тривогою та вигоранням. Спробуйте наш Квіз підбору!"
          : "У нас есть проверенные специалисты, работающие с тревогой и выгоранием. Попробуйте наш Экспресс-квиз подбора!";
      } else if (lower.includes('цен') || lower.includes('стоимост') || lower.includes('оплат') || lower.includes('price')) {
        botResponse = lang === 'en'
          ? "Session prices range from 1000 UAH to 1800 UAH per hour depending on the specialist's experience."
          : lang === 'ua'
          ? "Вартість сесій варіюється від 1000 грн до 1800 грн за годину залежно від досвіду фахівця."
          : "Стоимость сессий варьируется от 1000 грн до 1800 грн за час в зависимости от опыта специалиста.";
      } else {
        botResponse = lang === 'en'
          ? "I am here to assist with booking, finding a specialist, or resolving platform issues. What would you like to know?"
          : lang === 'ua'
          ? "Я тут, щоб допомогти з записом, вибором спеціаліста або питаннями щодо платформи. Що саме вас цікавить?"
          : "Я здесь, чтобы помочь с записью, выбором специалиста или вопросами по платформе. Что именно вас интересует?";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 left-6 z-50 w-full max-w-sm sm:max-w-md animate-fade-in">
      <div className={`relative flex flex-col h-[500px] ${
        isDark ? 'bg-slate-900 border-slate-800 text-white shadow-teal-500/10' : 'bg-white border-slate-200 text-slate-900'
      } border rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden`}>
        
        {/* Шапка чата */}
        <div className="p-4 bg-teal-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                MindCare AI <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </h4>
              <p className="text-[10px] text-teal-100 font-medium">Online 24/7</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-teal-100 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-teal-500/10 text-teal-500 border border-teal-500/20'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : isDark 
                  ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none' 
                  : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium pt-1">
              <Bot className="w-4 h-4 text-teal-500 animate-bounce" />
              <span>{lang === 'en' ? 'AI is typing...' : lang === 'ua' ? 'ШІ друкує...' : 'ИИ печатает...'}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Форма ввода */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'en' ? "Ask a question..." : lang === 'ua' ? "Задайте питання..." : "Задайте вопрос..."}
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
          <button
            type="submit"
            className="w-9 h-9 bg-teal-600 hover:bg-teal-500 text-white rounded-xl flex items-center justify-center shrink-0 transition-all shadow-md shadow-teal-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};