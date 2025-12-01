export default function OrderCard({ order }: any) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-4 text-sm text-gray-900 font-medium">{order.id}</td>
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
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-600">
          {order.status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-col gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-xs font-medium transition-colors">
            Print Label
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium transition-colors">
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
}
