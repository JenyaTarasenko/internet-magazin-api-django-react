import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Corzina/Corzina';

export default function CartIcon() {
    const { cart } = useContext(CartContext);


    const totalItems = cart.reduce((sum, item)=>sum + item.quantity, 0);
    return(
        <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
        🛒
        {totalItems > 0 && (
            <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px'
            }}>
                {totalItems}
            </span>
        )}
    </Link>
    )
}