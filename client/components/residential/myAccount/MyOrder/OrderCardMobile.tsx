export default function OrderCardMobile({
  order,
  getOrderDetail,
  handleCancleOrder,
  handleTrackingOrder,
  handleReOrder,
}: any) {
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
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-3 border border-gray-200 poppins-font">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div className="cursor-pointer" onClick={() => getOrderDetail(order.id)}>
          <p className="text-xs text-gray-500">Order ID</p>
          <p className="text-sm font-semibold text-gray-900">{order.id}</p>
        </div>
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full capitalize
            ${statusStyles[order.status.toLowerCase()] || 'bg-orange-100 text-gray-600'}`}
        >
          {order.status}
        </span>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Customer</p>
          <p className="text-sm text-gray-900">{order.customer_name}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="text-sm text-gray-900">{order.date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-semibold text-gray-900">€{order.price}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Payment</p>
          <p className="text-sm text-gray-900">{order.payment}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={() => handleTrackingOrder(order?.increment_id)}
          className="w-full bg-[#008c99]/90 hover:bg-[#008c99] text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer"
        >
          Track Order
        </button>
        {order.status?.toLowerCase() === 'canceled' || order.status?.toLowerCase() === 'cancelled' ? (
          <button
            onClick={() => handleReOrder(order?.id)}
            className="w-full bg-[#BA0202]/80 hover:bg-[#BA0202] text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer"
          >
            ReOrder
          </button>
        ) : (
          <button
            onClick={() => handleCancleOrder(order?.id)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-xs font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
