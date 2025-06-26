import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ListApi(){
    const [products, setProducts]= useState([]);
    useEffect(() => {
        fetch('http://localhost:8001/api/projects/')
          .then(res => res.json())
          .then(data => setProducts(data))
          .catch(err => console.error('Error loading products:', err));
      }, []);
    return(
        <>
        {products.map(product=>(
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <Link to={`/products/${product.id}`}>
              <h4>{product.name}</h4>
            </Link>
           
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <p>Color: {product.color?.name}</p>
            <p>Category: {product.category?.name}</p>
          
          </div>
        ))}
        </>
        
    );
}
export default ListApi;