'use client';
import { FiArrowLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';
import Loader from '@/components/ui/Loader';

interface OrderTrackingPageProps {
  orderNumber: number;
  onBack: () => void;
}

export default function OrderTrackingPage({ orderNumber, onBack }: OrderTrackingPageProps) {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Destructure tracking data
  const { order, shipments, shipping_address } = trackingData?.data || {};

  useEffect(() => {
    const fetchTrackingData = async () => {
      setIsLoading(true);
      try {
        const payload = {
          order_number: orderNumber,
        };
        const resp = await OrderEndPoints.trackingOrder(payload);
        setTrackingData(resp);
      } catch (err) {
        console.error('Error fetching tracking data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingData();
  }, [orderNumber]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-5">
        <div className="bg-white shadow-sm rounded-xl p-6 text-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="max-w-5xl mx-auto p-5">
        <div className="bg-white shadow-sm rounded-xl p-6 text-center">
          <p className="text-red-500">Tracking data not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 poppins-font">
      {/* Back Button */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Orders</span>
        </button>
      </div>

      {/* Order Header */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Tracking</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-l-4 border-[#008c99] pl-4">
            <p className="text-gray-500 text-sm font-medium">Order Number</p>
            <p className="text-xl font-semibold text-gray-900">{order?.order_number}</p>
          </div>
          <div className="border-l-4 border-[#008c99] pl-4">
            <p className="text-gray-500 text-sm font-medium">Order Date</p>
            <p className="text-xl font-semibold text-gray-900">{order?.order_date}</p>
          </div>
          <div className="border-l-4 border-[#008c99] pl-4">
            <p className="text-gray-500 text-sm font-medium">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order?.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : order?.status === 'processing'
                    ? 'bg-blue-100 text-blue-700'
                    : order?.status === 'shipped'
                    ? 'bg-purple-100 text-purple-700'
                    : order?.status === 'delivered'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {order?.status_label}
              </span>
            </div>
          </div>
          <div className="border-l-4 border-[#008c99] pl-4">
            <p className="text-gray-500 text-sm font-medium">Total Amount</p>
            <p className="text-xl font-semibold text-gray-900">
              {order?.currency} {order?.grand_total}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments Section */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipment Updates</h2>

            {shipments && Array.isArray(shipments) && shipments.length > 0 ? (
              <div className="space-y-6">
                {shipments.map((shipment: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline Indicator */}
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-[#008c99] rounded-full border-4 border-white shadow-md"></div>
                      {index < shipments.length - 1 && (
                        <div className="w-1 h-16 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Shipment Item */}
                    <div className="pb-4 flex-1">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#008c99] transition-colors">
                        <h3 className="text-lg font-bold text-gray-900">
                          {shipment?.status || 'Update'}
                        </h3>
                        {shipment?.message && (
                          <p className="text-gray-600 text-sm mt-2">{shipment.message}</p>
                        )}
                        {shipment?.date && (
                          <p className="text-gray-500 text-xs mt-3">
                            <span className="font-medium">📅 Date:</span> {shipment.date}
                          </p>
                        )}
                        {shipment?.location && (
                          <p className="text-gray-500 text-xs mt-1">
                            <span className="font-medium">📍 Location:</span> {shipment.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No shipment updates available yet.</p>
                <p className="text-gray-500 text-sm mt-1">Your order is being processed.</p>
              </div>
            )}
          </div>
        </div>

        {/* Order & Shipping Details Sidebar */}
        <div className="space-y-6">
          {/* Order Details */}
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Order Details</h3>
            <div className="space-y-3">
              <div className="pb-3 border-b">
                <p className="text-gray-500 text-sm">Customer Name</p>
                <p className="font-semibold text-gray-900">{order?.customer_name}</p>
              </div>
              <div className="pb-3 border-b">
                <p className="text-gray-500 text-sm">Customer Email</p>
                <p className="font-semibold text-gray-900 truncate">{order?.customer_email}</p>
              </div>
              <div className="pb-3 border-b">
                <p className="text-gray-500 text-sm">Shipping Method</p>
                <p className="font-semibold text-gray-900">{order?.shipping_method}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Payment Method</p>
                <p className="font-semibold text-gray-900">{order?.payment_method}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {shipping_address && (
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Shipping Address</h3>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">{shipping_address?.name}</p>
                <p className="text-gray-600">{shipping_address?.address}</p>
                <p className="text-gray-600">
                  {shipping_address?.city}, {shipping_address?.state} {shipping_address?.postcode}
                </p>
                <p className="text-gray-600 pb-3 border-b">{shipping_address?.country}</p>
                <p className="text-gray-600">
                  <span className="font-medium">📞</span> {shipping_address?.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
