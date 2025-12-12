import React from 'react';
import SidebarNav from './SideBarNav';
import TrackingOrdersList from './TrackingOrders';

export default function OrderTracking() {
  return (
    <div>
      <div className="bg-[#f3f4f6]">
        <div className="wrapper m-auto py-10 md:py-16">
          <div className="flex gap-5 md:gap-10 flex-col md:flex-row lg:flex-row">
            <div className="md:sticky  top-20 h-fit z-10">
              <SidebarNav />
            </div>
            <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Order status</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Keep track of all your orders and their status.
                </p>
              </div>
              <TrackingOrdersList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
