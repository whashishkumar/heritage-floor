// components/OrderList.tsx

import { useState, useMemo } from 'react';
import OrderCard from './OrderCard';
import orders from './orders.json';

export default function OrderList() {
  const [activeTab, setActiveTab] = useState('all');

  // Calculate counts and filter orders based on status
  const { filteredOrders, processingCount, shippedCount, canceledCount } = useMemo(() => {
    const processingStatuses = ['Pending', 'In Process', 'Processing'];
    const shippedStatuses = ['Deliverde', 'Delivered', 'Shipped'];
    const canceledStatuses = ['Canceled', 'Cancelled'];

    const processing = orders.filter((order) =>
      processingStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );
    const shipped = orders.filter((order) =>
      shippedStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );
    const canceled = orders.filter((order) =>
      canceledStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );

    let filtered = orders;
    if (activeTab === 'processing') {
      filtered = processing;
    } else if (activeTab === 'shipped') {
      filtered = shipped;
    } else if (activeTab === 'canceled') {
      filtered = canceled;
    }

    return {
      filteredOrders: filtered,
      processingCount: processing.length,
      shippedCount: shipped.length,
      canceledCount: canceled.length,
    };
  }, [activeTab]);

  const tabs = [
    { key: 'all', label: `All Orders (${orders.length})` },
    { key: 'processing', label: `Processing (${processingCount})` },
    { key: 'shipped', label: `Shipped (${shippedCount})` },
    { key: 'canceled', label: `Canceled (${canceledCount})` },
  ];

  return (
    <div className="space-y-4 ">
      {/* Tabs */}

      <div className="flex gap-6 text-gray-700 border-b pb-3 ">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-2 cursor-pointer poppins-font font-medium ${
              activeTab === t.key ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Order Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b font-medium poppins-font">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Product</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Price</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Payment</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderCard key={`${order.id}-${index}`} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No orders found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
