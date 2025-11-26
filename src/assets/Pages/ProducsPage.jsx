import { useState } from "react";
import ProductModal from "../Components/ProductModal";
import StarRating from "../Components/StarRating";
import { products } from "../Context/datas";

   
    
export default function ProductsPage({ addToCart, selectedProduct, setSelectedProduct}) {

      const [quantities, setQuantities] = useState({});
      

    return (
          <div className="p-3 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl sm:text-5xl md:text-6xl text-center py-4 md:py-6 bg-gray-50"><img className="product-image" src={product.image} /></div>
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
        <ProductModal product={selectedProduct} addToCart={addToCart} onClose={() => setSelectedProduct(null)} />
      )}
        </div>
  );
}
