import React, { useRef, useState } from 'react';
import './loginPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState('');
  

  const handleLogin = () => {
    const api = 'http://localhost:3113';

    const codeData = {
      name: username,
      code: password,
    };

    if (username === '' || password === '') {
      setErrorCode('Заполните все поля');
      
    } else {
      axios.post(`${api}/api/login`, codeData)
        .then(response => {
          // Обрабатываем успешный ответ
          // console.log(response.data);

          if (response.data.valid) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
          } else{
            setErrorCode('Неверный логин или пароль');
          }
          
        })
        .catch(error => {
          // Обрабатываем ошибку
          // console.error('Ошибка при выполнении запроса:', error);
          
        });
    }

    
  };

  const inputRef2 = useRef(null);


  const handleKeyDownInputRef1 = (event) => {
    if (event.key === 'Enter') {
      // Перемещаем фокус на второй инпут
      inputRef2.current.focus();
    }
  };
  const handleKeyDownInputRef2 = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  

  return (
    <div className='login-container'>
      <div className='login-box'>
                  <h1>Вход</h1>
          <input
            type='text'
            // ref={inputRef2}
            placeholder='Имя пользователя'
            value={username}
            onKeyDown={handleKeyDownInputRef1}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            ref={inputRef2}
            placeholder='Пароль'
            value={password}
            onKeyDown={handleKeyDownInputRef2}
            onChange={(e) => setPassword(e.target.value)}
          />
        <div className='error-message'>{errorCode}</div>
        <button onClick={() => handleLogin()}>Войти</button>
      </div>
    </div>
  );
}
