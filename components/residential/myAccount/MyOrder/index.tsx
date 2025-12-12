'use client';
import React, { useState } from 'react';
import OrderList from './OrderList';
import OrderDetailsPage from './OrderDetailPage';
import OrderTrackingPage from './OrderTrackingPage';

interface MyOrdersProps {
  filteredOrders?: any;
  isSearching?: boolean;
}

export default function MyOrders({ filteredOrders, isSearching }: MyOrdersProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<number | null>(null);

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleTrackingOrder = (orderNumber: number) => {
    setTrackingOrderNumber(orderNumber);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
    setTrackingOrderNumber(null);
  };

  return (
    <div className="py-4">
      {trackingOrderNumber ? (
        <OrderTrackingPage orderNumber={trackingOrderNumber} onBack={handleBackToList} />
      ) : selectedOrderId ? (
        <OrderDetailsPage orderId={selectedOrderId} onBack={handleBackToList} />
      ) : (
        <OrderList
          filteredOrders={filteredOrders}
          isSearching={isSearching}
          onOrderSelect={handleOrderSelect}
          onTrackingOrder={handleTrackingOrder}
        />
      )}
    </div>
  );
}
