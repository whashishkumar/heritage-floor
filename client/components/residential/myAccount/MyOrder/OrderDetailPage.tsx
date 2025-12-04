'use client';

import Image from 'next/image';

export default function OrderDetailsPage() {
  // -------------------------------
  //  YOUR JSON DATA DIRECTLY USED
  // -------------------------------
  const order = {
    id: 5,
    increment_id: '5',
    date: '04 Dec, 2025',
    customer_name: 'Nandita Sharma',
    price: '710.0000',
    status: 'PENDING',
    payment: 'Cash On Delivery',
    items: [
      {
        id: 8,
        quantity: 1,
        sku: 'HF-04',
        name: 'Bluenoae Lake 7',
        price: '345.0000',
        tile_details: {
          tile_length: '27.0000',
          tile_width: '27.0000',
          sqft_per_tile: 5.06,
          tiles_per_box: 9,
          sqft_per_box: 45.54,
          price_per_sqft: '345.0000',
          box_price: 15711.3,
        },
        product: {
          images: [
            {
              id: 1,
              src: 'https://heritagefloorandhome.ca/admin/cache/large/product/55/bEfLrdZWwrBkI472WMvyCkbpqcgd9NrCbUdylxrD.webp',
              alt: 'Product Thumbnail 1',
            },
          ],
          name: 'Bluenoae Lake 7',
        },
      },
    ],
  };

  const { increment_id, date, customer_name, price, status, payment, items } = order;

  return (
    <div className="max-w-5xl mx-auto p-5">
      {/* Order Header */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-6 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order #{increment_id}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
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
          {items.map((item) => (
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
