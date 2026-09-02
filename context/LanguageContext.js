'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const stored = localStorage.getItem('figs-lang');
    if (stored === 'en' || stored === 'el') setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLang = (l) => {
    setLang(l);
    localStorage.setItem('figs-lang', l);
  };

  const tx = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, switchLang, tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
