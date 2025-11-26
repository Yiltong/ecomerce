import { ShoppingCart } from "lucide-react";

export default function OrdersPage({cart, orders}) {
  return (

    <div>
       <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600 text-sm">{order.date}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {order.status}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span><img className="product-image" src={item.image} width={300} height={500}/> {item.name} x{item.quantity}</span>
                      <span className="font-medium">#{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Ship to: {order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-green-600">#{order.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
    </div>
  );

  
}

