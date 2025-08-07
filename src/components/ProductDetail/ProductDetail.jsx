import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// форма комментария 
import CommentForm from '../CommentForm/CommentForm';
// список всех комментарий продукта
import CommentList from '../CommentList/CommentList';



function ProductDetail(){
    const { id } = useParams(); // получаем id из URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:8001/api/products/${id}/`)
            .then(res => {
                if (!res.ok) throw new Error('Продукт не найден');
                return res.json();

            })
            .then((data)=>{
                setProduct(data);
                setLoading(false);
            })
            .catch((err)=>{
                console.error('Ошибка при загрузке:', err);
                setLoading(false);

            });
            
    },[id])
    if (loading) return <p>Загрузка...</p>;
    if (!product) return <p>Загрузка...</p>;
    return(
        <div style={{ maxWidth: 600, margin: 'auto' }}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Категория: {product.category?.name}</p>

            {/*форма коментария будет работать для авторизованых */}
            <CommentForm productId={product.id} />
            <CommentList productId={product.id} />
        </div>

    );
}
export default ProductDetail;