'use client';
import React, { useEffect, useState } from 'react';
import Section from './Section';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import PaymentMethodTypes from './PaymentMethodTypes';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';

interface PaymentMethodType {
  method: string;
  method_title: string;
  description?: string;
  formatted_price?: string;
}

export default function PaymentMethod({
  onPaymentMethodSelect,
  onOrderSummaryUpdate,
  orderSummary,
}: {
  onPaymentMethodSelect?: () => void;
  onOrderSummaryUpdate?: (summary: any) => void;
  orderSummary?: any;
}) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const [showPaymentMethodsTypes, setPaymentMethodTypes] = useState(false);
  const [orderSummaryList, setOrderSummaryList] = useState<any | null>(null);

  const getShippingMethods = async () => {
    const resp = await CartEndPoint.getShippingMethods();
    setPaymentMethods(resp?.data || []);
  };

  const handleAddCheckoutMethod = async (method: PaymentMethodType) => {
    setSelectedMethod(method);
    const payload = { shipping_method: method.method };
    const resp = await CartEndPoint.saveShippingAddress(payload);

    if (resp.status === 200) {
      setPaymentMethodTypes(true);
      // Call the callback to notify parent that payment method is selected
      onPaymentMethodSelect?.();
      const orderSummary = await OrderEndPoints.getPlaceOrderSummary();
      setOrderSummaryList(orderSummary);
      onOrderSummaryUpdate?.(orderSummary);
    }
  };

  useEffect(() => {
    getShippingMethods();
  }, []);

  return (
    <>
      <Section title="3. Billing">
        <p className="text-gray-700 mb-3">Choose a Payment Method:</p>

        {/* Payment Method List */}
        <div className="space-y-3 ">
          {paymentMethods.map((method) => (
            <label
              key={method.method}
              className={`flex items-center justify-between p-4 shadow-sm rounded-lg cursor-pointer hover:bg-gray-50 transition
                ${selectedMethod?.method === method.method ? 'border-blue-500 bg-blue-50' : ''}
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod?.method === method.method}
                onChange={() => handleAddCheckoutMethod(method)}
                className="w-4 h-4"
              />

              <div className="flex-1 ml-3">
                <p className="font-semibold">{method.method_title}</p>
                {method.description && (
                  <p className="text-sm text-gray-500">{method.description}</p>
                )}
              </div>

              {/* Show formatted price if exists */}
              {method.formatted_price && (
                <span className="font-medium">{method.formatted_price}</span>
              )}
            </label>
          ))}
        </div>
      </Section>
      {showPaymentMethodsTypes && (
        <PaymentMethodTypes orderSummary={orderSummaryList || orderSummary} />
      )}
    </>
  );
}
