'use client';
import React, { useState } from 'react';
import OrderList from './OrderList';
import OrderDetailsPage from './OrderDetailPage';

interface MyOrdersProps {
  filteredOrders?: any;
  isSearching?: boolean;
}

export default function MyOrders({ filteredOrders, isSearching }: MyOrdersProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className="py-4">
      {selectedOrderId ? (
        <OrderDetailsPage orderId={selectedOrderId} onBack={handleBackToList} />
      ) : (
        <OrderList
          filteredOrders={filteredOrders}
          isSearching={isSearching}
          onOrderSelect={handleOrderSelect}
        />
      )}
    </div>
  );
}
