'use client';
import React, { useEffect, useState } from 'react';
import Section from './Section';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { useRouter } from 'next/navigation';
import { usePathSegments } from '@/utils/segmentPath';

interface PaymentType {
  code: string;
  label: string;
  status: string;
  method: string;
}

export default function PaymentMethodTypes() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [placeOrderButton, setPlaceOrderButton] = useState(false);
  const { mainPath } = usePathSegments();

  const getPaymentTypes = async () => {
    const resp = await CartEndPoint.getPaymentMethods();
    setPaymentTypes(resp?.data || []);
  };

  const handleSelectMethod = async (code: string) => {
    setSelectedMethod(code);
    const payLoad = {
      payment: {
        method: code,
      },
    };
    const resp = await CartEndPoint.savePayment(payLoad);
    if (resp.status === 200) {
      setPlaceOrderButton(true);
    }
  };

  const handleSaveOrder = async () => {
    const orderSaved = await CartEndPoint.saveOrder();

    if (orderSaved.status === 200) {
      router.push(`${mainPath}/my-account/orders`);
    }
  };

  useEffect(() => {
    getPaymentTypes();
  }, []);

  return (
    <div className="pt-10">
      <Section title="4. Payment Method">
        <p className="text-gray-700 mb-4">Select your preferred payment method:</p>

        <div className="space-y-3">
          {paymentTypes?.map((item: PaymentType) => {
            const isSelected = selectedMethod === item.method;

            return (
              <label
                key={item.code}
                className={`flex items-center justify-between p-4  rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                ${isSelected ? 'border-blue-200 shadow-sm' : ' bg-white hover:border-gray-300'}
              `}
                onClick={() => handleSelectMethod(item.method)}
              >
                {/* Radio Button */}
                <input
                  type="radio"
                  name="paymentType"
                  checked={isSelected}
                  onChange={() => handleSelectMethod(item.method)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                />

                {/* Payment Details */}
                <div className="flex-1 ml-4">
                  <span className="text-lg font-semibold text-gray-800 block">{item.label}</span>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{item.code}</span>
                </div>

                {/* Status Badge */}
                {item.status && (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full
                  ${
                    item.status === 'enabled'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}
                  >
                    {item.status}
                  </span>
                )}
              </label>
            );
          })}
        </div>

        {/* Show selected method */}
        {selectedMethod && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Selected:{' '}
              <span className="font-semibold">
                {paymentTypes.find((p) => p.code === selectedMethod)?.label}
              </span>
            </p>
          </div>
        )}
      </Section>
      {placeOrderButton && (
        <div>
          <button
            onClick={handleSaveOrder}
            type="button"
            className="w-full bg-[#008c99] text-white py-3 rounded-lg font-semibold  shadow-md cursor-pointer my-5"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
