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

export default function OrderCard({
  order,
  getOrderDetail,
  handleCancleOrder,
  handleTrackingOrder,
  handleReOrder,
}: any) {
  console.log(order, 'order');

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors poppins-font">
      <td
        className="p-4 text-sm text-gray-900 font-medium cursor-pointer"
        onClick={() => getOrderDetail(order.id)}
      >
        {order.id}
      </td>
      <td className="p-4 text-sm text-gray-700">{order.customer_name}</td>
      <td className="p-4 text-sm text-gray-600">{order.date}</td>
      {order.price && <td className="p-4 text-sm font-semibold text-gray-900">€{order.price}</td>}
      <td className="p-4 text-sm text-gray-600">{order.payment}</td>
      <td className="p-4">
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full capitalize font-medium
  ${statusStyles[order.status.toLowerCase()] || 'bg-orange-100 text-gray-600'}`}
        >
          {order.status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleTrackingOrder(order?.id)}
            className="bg-[#008c99]/90 hover:bg-[#008c99] text-white py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer"
          >
            Track Order
          </button>
          {order.status?.toLowerCase() === 'Canceled'.toLowerCase() ? (
            <button
              onClick={() => handleReOrder(order?.id)}
              className="bg-[#BA0202]/80 hover:bg-[#BA0202] text-white py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer"
            >
              ReOrder
            </button>
          ) : (
            <button
              onClick={() => handleCancleOrder(order?.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
