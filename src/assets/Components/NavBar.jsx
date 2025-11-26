import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
//import { useCart } from '../Context/CartContext';

const Navbar = ({cart}) => {
 // const { cart } = useCart();

  return (
    <nav className="bg-purple-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 md:py-0 md:h-16 gap-3 md:gap-0">
          <Link to="/" className="text-xl md:text-2xl font-bold hover:text-purple-200 transition-colors text-left">
            YILTONGS Shop<span className='text-pink-500'>Hub</span> 
          </Link>
          
          <div className="flex-1 md:max-w-2xl md:mx-8 bg-purple-100 rounded-lg" >
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-lg text-gray-900 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex gap-4 md:gap-6 items-center justify-end">
            <Link to="/orders" className="hover:text-purple-200 transition-colors text-sm md:text-base">
              Orders
            </Link>
            <Link to="/checkout" className="flex items-center gap-1 md:gap-2 hover:text-purple-200 transition-colors relative text-sm md:text-base">
              <ShoppingCart size={20} className="md:w-6 md:h-6" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;