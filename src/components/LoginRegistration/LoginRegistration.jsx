import React, { useState } from 'react';

function LoginRegistration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [token, setToken] = useState('');


//   Это обновление сосстояния не теряя предыдущего
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setToken('');

    try {
      const response = await fetch('http://localhost:8001/api/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.auth_token);
        localStorage.setItem('authToken', data.auth_token);
        // throw new Error(data.detail || 'Ошибка входа');
      }else{
        setError(data.detail || 'Ошибка входа');
      }

    //   setToken(data.auth_token);
    //   localStorage.setItem('authToken', data.auth_token);
    } catch (err) {
      setError(err.message || 'Что-то пошло не так');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Вход</h1>
      {token && <p style={{ color: 'green' }}>Успешный вход! Токен: {token}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Имя пользователя:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Пароль:</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginRegistration;
