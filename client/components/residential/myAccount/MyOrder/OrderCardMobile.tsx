export default function OrderCardMobile({ order }: any) {
  const statusStyles: any = {
    pending: 'bg-yellow-100 text-yellow-600',
    'in process': 'bg-blue-100 text-blue-600',
    processing: 'bg-blue-100 text-blue-600',
    shipped: 'bg-green-100 text-green-600',
    delivered: 'bg-green-100 text-green-600',
    deliverde: 'bg-green-100 text-green-600',
    canceled: 'bg-red-100 text-red-600',
    cancelled: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-3 border border-gray-200">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 poppins-font">Order ID</p>
          <p className="text-sm font-semibold text-gray-900 poppins-font">{order.id}</p>
        </div>
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full capitalize poppins-font
            ${statusStyles[order.status.toLowerCase()] || 'bg-orange-100 text-gray-600'}`}
        >
          {order.status}
        </span>
      </div>

      {/* Product Info */}
      {/* <div className="flex gap-3 pb-3 border-b border-gray-100">
        <img
          src={order.product.image}
          className="w-16 h-16 object-cover rounded"
          alt={order.product.name}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 poppins-font">{order.product.name}</p>
          <p className="text-xs text-gray-500 poppins-font mt-1">
            Color: {order.product.color} | Size: {order.product.size}
          </p>
          <p className="text-xs text-gray-500 poppins-font">Qty: {order.product.quantity}</p>
        </div>
      </div> */}

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500 poppins-font">Customer</p>
          <p className="text-sm text-gray-900 poppins-font">{order.customer_name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 poppins-font">Date</p>
          <p className="text-sm text-gray-900 poppins-font">{order.date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 poppins-font">Price</p>
          <p className="text-sm font-semibold text-gray-900 poppins-font">€{order.price}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 poppins-font">Payment</p>
          <p className="text-sm text-gray-900 poppins-font">{order.payment}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button className="roboto-font flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer poppins-font">
          Print Label
        </button>
        {order.status.toLowerCase() === 'canceled' || order.status.toLowerCase() === 'cancelled' ? (
          <button className="roboto-font flex-1 bg-[#008c99]/80 hover:bg-[#008c99] text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer poppins-font">
            ReOrder
          </button>
        ) : (
          <button className="roboto-font flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer poppins-font">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
