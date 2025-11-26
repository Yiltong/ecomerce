import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
// import { useCart } from '../Context/CartContext';
import StarRating from './StarRating';

const ProductModal = ({ product, onClose, addToCart }) => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8 md:p-4">
        <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
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
                <div className="text-6xl md:text-9xl text-center bg-gray-50 rounded-lg p-4 md:p-8"><img className="product-image" src={product.image} /></div>
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


export default ProductModal;