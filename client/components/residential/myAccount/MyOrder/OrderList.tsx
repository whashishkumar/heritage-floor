// components/OrderList.tsx

import { useState } from 'react';
import OrderCard from './OrderCard';
import orders from './orders.json';
export default function OrderList() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: `All Orders (${orders.length})` },
    { key: 'processing', label: 'Processing (0)' },
    { key: 'shipped', label: 'Shipped (0)' },
    { key: 'canceled', label: 'Canceled (0)' },
  ];

  return (
    <div className="space-y-4 ">
      {/* Tabs */}
      <div className="flex gap-6 text-gray-700 border-b pb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-2 cursor-pointer  ${
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
            <tr className="bg-gray-50 border-b">
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
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
