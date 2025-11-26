import React, { useState } from 'react';
import { ShoppingCart, Package, X, Star } from 'lucide-react';

const EcommerceApp = () => {
  const [currentPage, setCurrentPage] = useState('products');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', description: 'Premium sound quality with noise cancellation', rating: 4.5, reviews: 87 },
    { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', description: 'Track your fitness goals and stay connected', rating: 4, reviews: 127 },
    { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻', description: 'Ergonomic design for better posture', rating: 4.5, reviews: 56 },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', description: 'RGB backlit keys with tactile feedback', rating: 5, reviews: 2197 },
    { id: 5, name: 'Webcam HD', price: 89.99, image: '📷', description: '1080p video quality for crystal clear calls', rating: 4, reviews: 37 },
    { id: 6, name: 'Phone Case', price: 24.99, image: '📱', description: 'Shockproof protection with slim design', rating: 4.5, reviews: 175 },
    { id: 7, name: 'USB-C Hub', price: 39.99, image: '🔌', description: 'Multiple ports for all your devices', rating: 4, reviews: 89 },
    { id: 8, name: 'Wireless Mouse', price: 34.99, image: '🖱️', description: 'Ergonomic grip for comfortable use', rating: 4.5, reviews: 143 },
    { id: 9, name: 'Bluetooth Speaker', price: 59.99, image: '🔊', description: 'Portable speaker with 12-hour battery', rating: 4.5, reviews: 234 },
    { id: 10, name: 'Power Bank', price: 44.99, image: '🔋', description: '20000mAh capacity for multiple charges', rating: 4, reviews: 156 },
    { id: 11, name: 'Gaming Controller', price: 54.99, image: '🎮', description: 'Wireless controller with vibration feedback', rating: 4.5, reviews: 298 },
    { id: 12, name: 'Tablet Stand', price: 29.99, image: '📱', description: 'Adjustable angle for optimal viewing', rating: 4, reviews: 67 },
  ];

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
    setCurrentPage('orders');
  };

  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{reviews}</span>
    </div>
  );

  const ProductModal = ({ product, onClose }) => {
    const [qty, setQty] = useState(1);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 p-2 hover:bg-gray-100 rounded-full z-10"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
          
          <div className="p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <div className="text-6xl md:text-9xl text-center bg-gray-50 rounded-lg p-4 md:p-8">{product.image}</div>
              </div>
              
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">{product.name}</h2>
                <StarRating rating={product.rating} reviews={product.reviews} />
                <div className="text-2xl md:text-3xl font-bold text-purple-700 my-3 md:my-4">#{product.price}</div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{product.description}</p>
                
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <button
                    onClick={() => addToCart(product, qty)}
                    className="w-full bg-purple-700 text-white py-2 md:py-3 rounded-lg hover:bg-purple-800 transition-colors font-semibold text-sm md:text-base"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product, qty);
                      setCurrentPage('checkout');
                    }}
                    className="w-full bg-orange-500 text-white py-2 md:py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-sm md:text-base"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
                  <h3 className="font-semibold mb-2 text-sm md:text-base">Product Features:</h3>
                  <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                    <li>• High quality materials</li>
                    <li>• Fast shipping available</li>
                    <li>• 30-day return policy</li>
                    <li>• Customer satisfaction guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductsPage = () => (
    <div className="p-3 md:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl sm:text-5xl md:text-6xl text-center py-4 md:py-6 bg-gray-50">{product.image}</div>
            <div className="p-2 md:p-4">
              <h3 className="font-semibold mb-1 md:mb-2 text-xs md:text-sm line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">{product.name}</h3>
              <div className="hidden sm:block">
                <StarRating rating={product.rating} reviews={product.reviews} />
              </div>
              <div className="text-base md:text-lg font-bold text-gray-900 mt-1 md:mt-2 mb-2 md:mb-3">#{product.price}</div>
              
              <div className="flex gap-1 md:gap-2">
                <select
                  value={quantities[product.id] || 1}
                  onChange={(e) => setQuantities({...quantities, [product.id]: Number(e.target.value)})}
                  className="flex-shrink-0 w-12 md:w-14 border rounded px-1 py-1 text-xs md:text-sm"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>

                <button
                  onClick={() => addToCart(product, quantities[product.id] || 1)}
                  className="flex-1 bg-purple-700 text-white py-1.5 md:py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium text-xs md:text-sm"
                >
                  Add
                </button>
                
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 bg-white border-2 border-purple-700 text-purple-700 py-1.5 md:py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium text-xs md:text-sm"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );


  
