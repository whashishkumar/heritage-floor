import ProductDetailPage from '@/components/residential/productDetail';
import React, { Suspense } from 'react';

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
}

export default async function Page({ params }: any) {
  return (
    <div>
      <Suspense
        fallback={<div className="min-h-[8rem] flex items-center justify-center">Loading...</div>}
      >
        <ProductDetailPage />
      </Suspense>
    </div>
  );
}
