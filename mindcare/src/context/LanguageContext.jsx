import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mindcare_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('mindcare_theme', theme);
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (!current || !current[key]) return keyPath;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, theme, toggleTheme }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);