import React from 'react';
import OrderList from './OrderList';
import OrderDetailsPage from './OrderDetailPage';

interface MyOrdersProps {
  filteredOrders?: any;
  isSearching?: boolean;
}

export default function MyOrders({ filteredOrders, isSearching }: MyOrdersProps) {
  return (
    <div className="py-4">
      <OrderList filteredOrders={filteredOrders} isSearching={isSearching} />
      <OrderDetailsPage />
    </div>
  );
}
