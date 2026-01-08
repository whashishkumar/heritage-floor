'use client';
import { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { useRouter } from 'next/navigation';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';
import { usePathSegments } from '@/utils/segmentPath';

type CardFormState = {
  pan: string;
  expdate: string;
  cvv: string;
  amount: string;
};

export default function CardPaymentForm({
  customerId,
  orderId,
  storeId,
  grandTotal,
}: {
  customerId: any;
  orderId: any;
  storeId: any;
  grandTotal: any;
}) {
  const { mainPath } = usePathSegments();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [monerisResponse, setMonrisResponse] = useState<any | null>(null);
  const [isProcedding, setIsProcedding] = useState(false);

  const [formData, setFormData] = useState<CardFormState>({
    pan: '',
    expdate: '',
    cvv: '',
    amount: grandTotal,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      setIsProcedding(false);
      const res = await fetch('/api/moneris-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pan: formData.pan,
          expdate: formData.expdate,
          amount: grandTotal,
          orderId,
          customerId,
          cvv: formData.cvv,
          storeId,
        }),
      });
      const responseText = await res.text();
      if (!res.ok) {
        console.error('Moneris error response:', responseText);
        throw new Error('Payment failed. Please check your card details.');
      }
      const parser = new XMLParser({
        ignoreAttributes: false,
        parseTagValue: true,
      });
      const jsonResponse = parser.parse(responseText);
      setMonrisResponse(jsonResponse?.response);
      setSuccess('Payment successful!');
      setIsProcedding(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payLoad = {
      order_id: String(orderId),
      transaction_id: monerisResponse?.receipt?.TransID,
      receipt_id: String(monerisResponse?.receipt?.ReceiptId),
      amount: monerisResponse?.receipt?.TransAmount,
      response_code: String(monerisResponse?.receipt?.ResponseCode),
      payment_data: monerisResponse?.receipt?.payment_data,
    };

    const resp = await OrderEndPoints.paymentUpdate(payLoad);
    console.log(resp, 'resp');
    if (resp.status === 200) {
      router.push(`${mainPath}/my-account/orders`);
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  return (
    <div className="flex items-center justify-center poppins-font">
      <form onSubmit={handleSubmit} className="w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-gray-600">Moneris</h2>
          <p className="text-sm text-gray-500">Enter your card details to complete the payment</p>
        </div>

        {/* Card Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Card Number</label>
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Expiry (YYMM)</label>
            <input
              name="expdate"
              value={formData.expdate}
              onChange={handleChange}
              placeholder="2512"
              maxLength={4}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="***"
              maxLength={4}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
            />
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <input
            name="amount"
            value={grandTotal}
            readOnly
            className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2.5 text-sm text-gray-700 cursor-not-allowed"
          />
        </div>
        {/* Submit */}
        {isProcedding ? (
          <button
            type="submit"
            onClick={(e) => handleProceed(e as unknown as React.FormEvent<HTMLFormElement>)}
            className="w-full rounded-xl bg-[#008c99]/90 py-3 text-white font-semibold hover:bg-[#007a86] active:scale-[0.99] transition-all duration-200"
          >
            Done
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#008c99]/90 py-3 text-white font-semibold hover:bg-[#007a86] active:scale-[0.99] transition-all duration-200"
          >
            {loading ? 'Processing...' : 'Pay Securely'}
          </button>
        )}

        {/* Messages */}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}
        <p className="text-xs text-gray-400 text-center">🔒 Your payment is securely processed</p>
      </form>
    </div>
  );
}
