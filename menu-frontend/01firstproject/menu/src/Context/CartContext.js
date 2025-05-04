// src/Context/CartContext.js
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // عشان نربطه بتسجيل الدخول

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (!user) {
      alert('يجب تسجيل الدخول أولاً لإضافة منتجات للسلة');
      return;
    }
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
