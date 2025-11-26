// import { useState } from 'react'
// import './index.css'
// import Home from './components/Hero'
// import NotFound from './components/Generator'
// import { BrowserRouter, Route, Routes } from 'react-router'

// import EcommerceApp from "./Ecom"



// function App() {
 
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Home />} /> 
//             <Route path='*' element={<NotFound />} />
      
      
//         </Routes>
        
//       </BrowserRouter>
//     </>
    
    
//   )
// }

// export default App

// function App() {
 
//   return (
//     <>
//       <EcommerceApp />
//     </>
    
    
//   )
// } 

// export default App

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { CartProvider } from './assets/Context/CartContext';
import Navbar from './assets/Components/NavBar';
import ProductsPage from './assets/Pages/ProducsPage';
import CheckoutPage from './assets/Pages/CheckOut';
import OrdersPage from './assets/Pages/OrdersPage';

function App() {

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

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
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar cart={cart} />
          <main>
            <Routes>

              <Route path="/" element={<ProductsPage addToCart={addToCart} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />} />
              <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} orders={orders} setOrders={setOrders} deliveryOptions={deliveryOptions} setDeliveryOptions={setDeliveryOptions} />} />
              <Route path="/orders" element={<OrdersPage cart={cart} orders={orders}/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
