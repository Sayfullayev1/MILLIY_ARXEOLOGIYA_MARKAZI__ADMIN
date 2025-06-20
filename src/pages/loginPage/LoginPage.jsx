import React, { useRef, useState } from 'react';
import './loginPage.scss';
import { useNavigate } from 'react-router-dom';
import { passwordCheck } from '../../api/api';

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState('');

  const inputRef2 = useRef(null);

  const handleKeyDownInputRef1 = (event) => {
    if (event.key === 'Enter') {
      inputRef2.current.focus(); // Перемещаем фокус на второй инпут
    }
  };

  const handleKeyDownInputRef2 = (event) => {
    if (event.key === 'Enter') {
      passwordCheck(navigate("/"), username, password, setErrorCode);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Вход</h1>
        <input
          type='text'
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
        <button onClick={() => passwordCheck(navigate, username, password, setErrorCode)}>
          Войти
        </button>
      </div>
    </div>
  );
}
