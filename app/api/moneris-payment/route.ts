import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, customerId, pan, expdate, amount, cvv } = body;

    // Validate required fields
    if (!orderId || !customerId || !pan || !expdate || !amount) {
      return new NextResponse(
        JSON.stringify({ message: 'Missing required payment information.', body }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // These should be stored as environment variables, not hardcoded.
    const storeId = process.env.MONERIS_STORE_ID || 'store5';
    const apiToken = process.env.MONERIS_API_TOKEN || 'yesguy';

    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<request>
  <store_id>${storeId}</store_id>
  <api_token>${apiToken}</api_token>
  <purchase>
    <order_id>${orderId}</order_id>
    <cust_id>${customerId}</cust_id>
    <amount>${amount}</amount>
    <pan>${pan}</pan>
    <expdate>${expdate}</expdate>
    <crypt_type>7</crypt_type>
  </purchase>
</request>`;

    const monerisResponse = await fetch('https://esqa.moneris.com/gateway2/servlet/MpgRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        Accept: 'application/xml',
      },
      body: xmlPayload,
    });

    const responseText = await monerisResponse.text();

    if (!monerisResponse.ok) {
      // Forward the error from Moneris
      console.error('Moneris API Error:', responseText);
      return new NextResponse(responseText, {
        status: monerisResponse.status,
        headers: { 'Content-Type': 'application/xml' },
      });
    }

    // Moneris responds with XML, so we forward it as is.
    return new NextResponse(responseText, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error: any) {
    console.error('Moneris proxy API error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'An internal server error occurred.', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
