'use client';

import React, { useEffect, useState } from 'react';
import Section from './Section';
import { CartEndPoint } from '@/lib/api/cartEndPoints';

interface PaymentMethodType {
  method: string;
  method_title: string;
  description?: string;
  formatted_price?: string;
}

export default function PaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);

  const getPaymentMethods = async () => {
    const resp = await CartEndPoint.getPaymentMethods();
    // resp.data should contain your payment methods (adjust if different)
    setPaymentMethods(resp?.data || []);
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  return (
    <div>
      <Section title="3. Billing">
        <p className="text-gray-700 mb-3">Choose a Payment Method:</p>

        {/* Payment Method List */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.method}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition
                ${selectedMethod?.method === method.method ? 'border-blue-500 bg-blue-50' : ''}
              `}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod?.method === method.method}
                onChange={() => setSelectedMethod(method)}
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

        {/* Selected Method (Debug) */}
        {selectedMethod && (
          <p className="mt-4 text-sm text-green-700">
            Selected: <strong>{selectedMethod.method_title}</strong>
          </p>
        )}
      </Section>
    </div>
  );
}
