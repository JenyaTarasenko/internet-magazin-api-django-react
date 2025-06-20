import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Category(){
    const{slug}= useParams();
    const [products, setProducts ] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8001/api/products/category/${slug}/`)
          .then(res => res.json())
          .then(data => {
            console.log('Loaded products:', data);
            setProducts(data);
          })
          .catch(err => console.error('Error loading products:', err));
    }, [slug]);

    return(
        <>
        <h2>Products in "{slug}"</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {products.map(product => (
                <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p><strong>${product.price}</strong></p>
                </div>
            ))}
            </div>
        </>
    );
}
export default Category;