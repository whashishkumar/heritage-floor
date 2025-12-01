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

export default function OrderCard({ order }: any) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors poppins-font">
      <td className="p-4 text-sm text-gray-900 font-medium ">{order.id}</td>
      <td className="p-4 text-sm text-gray-700">{order.customer}</td>
      <td className="p-4 text-sm text-gray-600">{order.date}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={order.product.image}
            className="w-12 h-12 object-cover rounded"
            alt={order.product.name}
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.product.name}</p>
            <p className="text-xs text-gray-500">
              Color: {order.product.color} | Size: {order.product.size} | Qty:{' '}
              {order.product.quantity}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm font-semibold text-gray-900">€{order.price}</td>
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer">
            Print Label
          </button>
          {order.status === 'canceled' ? (
            <button className="bg-[#008c99]/80 hover:bg-[#008c99] text-white py-1.5 px-3 rounded text-xs font-medium transition-colors cursor-pointer">
              ReOrder
            </button>
          ) : (
            <button className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium transition-colors">
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
