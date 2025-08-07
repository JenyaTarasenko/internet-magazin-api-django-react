import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../Corzina/Corzina';
// import { CartContext } from '../CorziNa/Corzina';

function Cart(){
    const{cart, removeFromCart, clearCart } = useContext(CartContext);
    const total = cart.reduce((sum, item)=>sum +item.price * item.quantity, 0)
    return(
        <div>
            <h2>Корзина</h2>
            { cart.length === 0 ? <p>Корзина пуста</p> : (
                <>
                <ul>
                    {cart.map(item => (
                    <li key={item.id}>
                        {item.name} — {item.quantity} шт — {item.price * item.quantity} грн
                        <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                    </li>
                    ))}
                </ul>
                {/* <p><b>Итого: {total} грн</b></p> */}
                <p><b>Итого: {total.toFixed(2)} грн</b></p>
                <button onClick={clearCart}>Очистить корзину</button>
                </>
            )}
        </div>
    )
}

export default Cart;