import ProductDetailPage from '@/components/residential/productDetail';
import React, { Suspense } from 'react';

export default function page() {
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
