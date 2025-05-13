import React, { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    const pathLanguage = location.pathname.match(/\/([a-z]{2})/)?.[1] || 'uz';
    return pathLanguage;
  });
  const navigate = useNavigate();

  const changeLanguage = (lang) => {  
    setLanguage(lang);
    
    navigate(`/${lang}`);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

