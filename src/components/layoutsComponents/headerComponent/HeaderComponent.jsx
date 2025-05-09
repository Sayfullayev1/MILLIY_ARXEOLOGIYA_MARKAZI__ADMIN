import React, { useContext, useEffect } from 'react';
import './headerComponent.scss';

import { LanguageContext } from '../../../context/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { checkToken } from '../../../api/api';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useContext(LanguageContext);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate("/login");
    } else {

      checkToken(token, navigate);

    
    }
  }, [navigate]);




  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  
    const pathParts = location.pathname.split("/");
  
    // Если в пути есть язык, заменяем его
    if (lang === "uz") {
      // Если выбран узбекский, удаляем его из URL, если он есть
      if (pathParts[1]?.match(/^[a-z]{2}$/)) {
        pathParts.splice(1, 1); // Удаляем первый элемент (язык)
      }
    } else {
      // Если язык уже есть, заменяем его
      if (pathParts[1]?.match(/^[a-z]{2}$/)) {
        pathParts[1] = lang;
      } else {
        // Если языка нет, добавляем его
        pathParts.splice(1, 0, lang);
      }
    }
  
    const newPath = pathParts.join("/");
    navigate(newPath);
  };


  const handleLogout = () => {

    localStorage.removeItem('token');  

    navigate("/login")
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to={`/${language}`}>Logo</Link>
      </div>

      <div className='header__controls'>
        <div className='header__language-switcher'>
          <select onChange={(e) => handleLanguageChange(e.target.value)} value={language}>
            <option value='uz'>UZ</option>
            <option value='ru'>RU</option>
            <option value='en'>EN</option>
          </select>
        </div>

        <div className='header__logout' onClick={() => handleLogout()}>
          <h3>Выход</h3>
        </div>
      </div>

    </header>
  );
}
