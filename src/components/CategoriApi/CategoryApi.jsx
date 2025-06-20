import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryApi(){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8001/api/categories/')
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(err => console.error('Error loading colors:', err));
      }, []);
    return(
        <div>
        <h2>Categories</h2>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>{cat.name}
              <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
            </li>
          

          ))}
        </ul>
      </div>
    );
}
export default CategoryApi;