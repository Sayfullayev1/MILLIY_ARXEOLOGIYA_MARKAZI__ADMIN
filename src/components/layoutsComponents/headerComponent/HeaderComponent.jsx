import React, { useCallback, useContext, useEffect } from 'react';
import './headerComponent.scss';

import { LanguageContext } from '../../../context/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { checkToken } from '../../../api/api';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useContext(LanguageContext);

  const navigateWithLanguage = useCallback((path) => {
    const pathParts = path.split("/");

    if (!pathParts[1]?.match(/^[a-z]{2}$/)) {
      pathParts.splice(1, 0, language || 'en'); // Добавляем текущий язык или 'en' по умолчанию
    }

    const newPath = pathParts.join("/");
    navigate(newPath);
  }, [language, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigateWithLanguage("/login");
    } else {
      checkToken(token, navigateWithLanguage);
    }

    // Проверяем, есть ли язык в URL
    const pathParts = location.pathname.split("/");
    if (!pathParts[1]?.match(/^[a-z]{2}$/)) {
      navigateWithLanguage(location.pathname); // Добавляем язык в текущий путь
    }
  }, [navigateWithLanguage, location.pathname]);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);

    const pathParts = location.pathname.split("/");

    // Если в пути есть язык, заменяем его
    if (pathParts[1]?.match(/^[a-z]{2}$/)) {
      pathParts[1] = lang; // Заменяем текущий язык
    } else {
      // Если языка нет, добавляем его
      pathParts.splice(1, 0, lang);
    }

    const newPath = pathParts.join("/");
    navigate(newPath);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigateWithLanguage("/login");
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to={`/${language || 'en'}`}>Logo</Link> {/* Используем 'en' по умолчанию */}
      </div>

      <div className='header__controls'>
        <div className='header__language-switcher'>
          <select onChange={(e) => handleLanguageChange(e.target.value)} value={language || 'en'}>
            <option value='uz'>UZ</option>
            <option value='ru'>RU</option>
            <option value='en'>EN</option>
          </select>
        </div>

        <div className='header__logout' onClick={handleLogout}>
          <h3>Выход</h3>
        </div>
      </div>
    </header>
  );
}