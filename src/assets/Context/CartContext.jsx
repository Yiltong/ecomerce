import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState({});

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
      setDeliveryOptions({...deliveryOptions, [product.id]: 'standard'});
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    const newOptions = {...deliveryOptions};
    delete newOptions[id];
    setDeliveryOptions(newOptions);
  };

  const placeOrder = (customerInfo) => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: getTotalPrice(),
      customer: customerInfo,
      status: 'Processing'
    };
    setOrders([order, ...orders]);
    setCart([]);
    setDeliveryOptions({});
  };

  const getDeliveryPrice = (option) => {
    const prices = { express: 9.99, standard: 4.99, free: 0 };
    return prices[option] || 0;
  };

  const getTotalPrice = () => {
    const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingTotal = Object.values(deliveryOptions).reduce((sum, option) => sum + getDeliveryPrice(option), 0);
    return (itemsTotal + shippingTotal).toFixed(2);
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const getShippingTotal = () => {
    return Object.values(deliveryOptions).reduce((sum, option) => sum + getDeliveryPrice(option), 0).toFixed(2);
  };

  const value = {
    cart,
    orders,
    deliveryOptions,
    setDeliveryOptions,
    addToCart,
    updateQuantity,
    removeFromCart,
    placeOrder,
    getDeliveryPrice,
    getTotalPrice,
    getSubtotal,
    getShippingTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};