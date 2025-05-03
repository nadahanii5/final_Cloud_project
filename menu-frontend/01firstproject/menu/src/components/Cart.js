import React from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">سلة التسوق</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          {/* صورة السلة جنب النص */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '30px' }}>🛒</span>
            <span>السلة فارغة</span>
          </div>

          <div style={{ marginTop: '10px' }}>
            <Link to="/" className="cart-back">عودة للتسوق</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imgUrl} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">{item.price} جنيه</p>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                  حذف
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            الإجمالي: <span>{totalPrice} جنيه</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
