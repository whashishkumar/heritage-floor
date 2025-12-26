'use client';

import Image from 'next/image';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';

interface OrderDetailsPageProps {
  orderId: number;
  onBack: () => void;
}

export default function OrderDetailsPage({ orderId, onBack }: OrderDetailsPageProps) {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const resp = await OrderEndPoints.getOrderByid(orderId);
        setOrder(resp);
      } catch (err) {
        console.error('Error fetching order details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-5">
        <div className="bg-white shadow-sm rounded-xl p-6 text-center">
          <p className="text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-5xl mx-auto p-5">
        <div className="bg-white shadow-sm rounded-xl p-6 text-center">
          <p className="text-red-500">Order not found</p>
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

  const { increment_id, date, customer_name, price, status, payment, items, store_address } =
    order?.data;
  const { address } = store_address || {};

  return (
    <div className="max-w-5xl mx-auto p-5 poppins-font">
      {/* Back Button */}
      <div className="mb-4 flex items-center gap-4">
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order #{increment_id}</h1>
        <div className="mb-6">
          <p className="font-medium text-gray-500">Store Address</p>
          <p>{address?.complete_address || '_'}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm ">
          <div>
            <p className="font-medium text-gray-500">Date</p>
            <p>{date}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Customer</p>
            <p>{customer_name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Payment</p>
            <p>{payment}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Order Items</h2>

        <div className="space-y-6">
          {items?.map((item: any) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-5">
              {/* Product Image */}
              <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.product.images[0].src}
                  width={120}
                  height={120}
                  alt={item.product.images[0].alt}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-500 text-sm">SKU: {item.sku}</p>

                <div className="mt-3">
                  <p className="text-sm">
                    <span className="font-medium">Quantity:</span> {item.quantity}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Price:</span> ${item.price}
                  </p>
                </div>

                {/* Tile Details */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p>Tile Length: {item.tile_details.tile_length} cm</p>
                  <p>Tile Width: {item.tile_details.tile_width} cm</p>
                  <p>Sqft/Tile: {item.tile_details.sqft_per_tile}</p>
                  <p>Tiles/Box: {item.tile_details.tiles_per_box}</p>
                  <p>Price Sqft: ${item.tile_details.price_per_sqft}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="mt-6 flex justify-end">
          <p className="text-lg font-semibold">
            Total Amount: <span className="text-primary">${price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
