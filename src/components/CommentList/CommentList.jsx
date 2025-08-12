// import React, { useEffect, useState } from 'react';


// function CommentList({productId}){
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     useEffect(()=>{
//         fetch(`http://localhost:8001/api/products/${productId}/comments/`)

//         .then(res=>{
//             if(!res.ok)throw new Error('Ошибка загрузки комментариев');
//             return res.json();
//         })

//         .then(data=>{
//             setComments(data);
//             setLoading(false);
//         })

//         .catch(err=>{
//             setError(err.message);
//             setLoading(false);
//         });

//     },[productId])

//     // обработка при загрузках 
//     if(loading) return <p>Загрузка коментариев</p>
//     if(error) return <p style={{ color: 'red'}}>Ошибка {error}</p>
//     if(comments.length === 0) return <p>Пока еще нет комментариев </p>

//     return(
//         <>
//         <div>
//             <h3>Все комментарии продукта</h3>
//             <ul>
//                 {comments.map(c=>(
//                     <li key={c.id}>
//                         <b>{c.user}</b>:{c.text}
//                         <small>{new Date(c.created_at).toLocaleString()}</small>
//                     </li>
//                 ))}
               
//             </ul>
//         </div>
//         </>
//     );
// }
// export default CommentList


import React, { useEffect, useState } from 'react';

function CommentList({ productId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productId == null) {
      // Если productId ещё не пришёл, не делаем запрос
      setComments([]);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('authToken');

    if(!token){
      setError("Нет токена авторизации");
      setLoading(false);
      return;
    }
    
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError('');

    console.log("Загружаю комментарии для productId:", productId);


    // path('products/<int:product_id>/comment-list/', ComentListAPIView.as_view(), name="comment-list"),
    //путь должен совпадать 
    fetch(`http://localhost:8001/api/products/${productId}/comment-list/`, {
    method: 'GET',
    signal, // просто указываем signal как свойство объекта
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
      })
      .then(res => {
        if (!res.ok) {
          // попробуй распечатать статус для отладки
          throw new Error(`Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Ответ API:", data);
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Запрос отменён');
          return;
        }
        console.error(err);
        setError(err.message);
        setLoading(false);
      });

    // cleanup: отмена fetch при размонтировании или смене productId
    return () => controller.abort();
  }, [productId]);

  if (loading) return <p>Загрузка комментариев...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  if (!comments || comments.length === 0) return <p>Пока ещё нет комментариев</p>;

  return (
    <div>
      <h3>Все комментарии продукта</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <b>{c.user}</b>: {c.text}
            <small> — {new Date(c.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
