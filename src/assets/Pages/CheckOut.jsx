import { useState } from "react";
import { Navigate, Link } from "react-router";

export default function CheckoutPage({cart, setCart, orders, setOrders, deliveryOptions, setDeliveryOptions, addToCart}) {


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
   // Navigate('/orders');
    //setCurrentPage('orders');
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

  const getDeliveryPrice = (option) => {
    const prices = { express: 9.99, standard: 4.99, free: 0 };
    return prices[option] || 0;
  };

  const getDeliveryDate = (option) => {
    const today = new Date();
    const dates = {
      express: new Date(today.getTime() + 86400000),
      standard: new Date(today.getTime() + 86400000 * 5),
      free: new Date(today.getTime() + 86400000 * 8)
    };
    return dates[option]?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) || '';
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

    const [customerInfo, setCustomerInfo] = useState({
      name: '',
      email: '',
      address: ''
    });

    const handleSubmit = () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
        alert('Please fill in all fields');
        return;
      }
      placeOrder(customerInfo);
    };

    return (
      <div className="p-3 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Review your order</h1>
        
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
                  <h3 className="text-purple-700 font-semibold text-base md:text-lg mb-3 md:mb-4">
                    Delivery date: {getDeliveryDate(deliveryOptions[item.id] || 'standard')}
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-1">
                      <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="text-4xl md:text-5xl"><img className="product-image" src={item.image} /></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base md:text-lg mb-1">{item.name}</h4>
                          <p className="text-base md:text-lg font-bold mb-2">#{item.price}</p>
                          <div className="flex items-center gap-2 text-xs md:text-sm">
                            <span>Quantity: {item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-purple-600 hover:underline"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-purple-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Choose a delivery option:</h4>
                      <div className="space-y-2 md:space-y-3">
                        <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`delivery-${item.id}`}
                            checked={deliveryOptions[item.id] === 'free'}
                            onChange={() => setDeliveryOptions({...deliveryOptions, [item.id]: 'free'})}
                            className="mt-1"
                          />
                          <div className="text-sm md:text-base">
                            <div className="font-medium">{getDeliveryDate('free')}</div>
                            <div className="text-xs md:text-sm text-green-600">FREE Shipping</div>
                          </div>
                        </label>

                        <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`delivery-${item.id}`}
                            checked={deliveryOptions[item.id] === 'standard'}
                            onChange={() => setDeliveryOptions({...deliveryOptions, [item.id]: 'standard'})}
                            className="mt-1"
                          />
                          <div className="text-sm md:text-base">
                            <div className="font-medium">{getDeliveryDate('standard')}</div>
                            <div className="text-xs md:text-sm text-gray-600">#{getDeliveryPrice('standard')} - Shipping</div>
                          </div>
                        </label>

                        <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`delivery-${item.id}`}
                            checked={deliveryOptions[item.id] === 'express'}
                            onChange={() => setDeliveryOptions({...deliveryOptions, [item.id]: 'express'})}
                            className="mt-1"
                          />
                          <div className="text-sm md:text-base">
                            <div className="font-medium">{getDeliveryDate('express')}</div>
                            <div className="text-xs md:text-sm text-gray-600">#{getDeliveryPrice('express')} - Shipping</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Payment Summary</h2>
              
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 pb-3 md:pb-4 border-b text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span>#{getSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & handling:</span>
                  <span>#{getShippingTotal()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total before tax:</span>
                  <span>#{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span>Estimated tax (10%):</span>
                  <span>#{(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg md:text-xl font-bold text-purple-700 mb-4 md:mb-6">
                <span>Order total:</span>
                <span>#{(parseFloat(getTotalPrice()) * 1.1).toFixed(2)}</span>
              </div>

              <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Email"
                />
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  rows="2"
                  placeholder="Shipping Address"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-30 bg-purple-700 text-white py-2 md:py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold text-sm md:text-base"
              >
                <Link to="/orders" >
                 Place your order
                </Link>
               
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

