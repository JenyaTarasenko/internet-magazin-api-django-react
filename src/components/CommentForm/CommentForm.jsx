import React, { useState, useEffect } from 'react';



function CommentForm({ productId }) {
  const [comment, setComment] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      // передает токен если он работает убрать при деплой 
      console.log(savedToken);
    }
  }, []);

  // 🔒 Если не вошли — форму не показываем
  if (!token) {
    return <p>⚠️ Войдите в систему, чтобы оставить комментарий.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8001/api/products/${productId }/comments/`, {
        method: 'POST',// 'POST', метот для добавления коментариев 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        // 'Authorization': `Bearer ${token}` для другой библиотеки 
        },
        body: JSON.stringify({ text: comment })
      });

      if (response.ok) {
        setMessage('Комментарий отправлен!');
        setComment('');
      } else {
        const errorData = await response.json();
        setMessage('Ошибка: ' + (errorData.detail || 'Не удалось отправить комментарий.'));
      }
    } catch (err) {
      setMessage('Ошибка сети: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Добавить комментарий</h1>
      {message && <p style={{ color: 'blue' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Напишите комментарий"
          style={{ width: '100%', minHeight: '100px' }}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default CommentForm;
