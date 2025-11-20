import React from 'react';
import SidebarNav from './SideBarNav';

export default function PaymentMethods() {
  return (
    <div>
      <div className="bg-[#f3f4f6]">
        <div className="wrapper m-auto py-16">
          <div className="flex gap-10">
            <SidebarNav />
            <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
              <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Your credit and debit card</h2>
              <p className="text-gray-500 text-sm mt-1">
                Here is a list of all your saved credit and debit cards. You can replace the default payment method, edit or remove any of them.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
