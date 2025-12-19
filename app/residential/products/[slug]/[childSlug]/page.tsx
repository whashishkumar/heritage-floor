import GetInTouch from '@/components/commercial/GetInTouch';
import ProductDetailPage from '@/components/residential/ProductDetailPage';
import React, { Suspense } from 'react';

export default function page() {
  return (
    <>
      <Suspense
        fallback={<div className="min-h-[8rem] flex items-center justify-center">Loading...</div>}
      >
        <ProductDetailPage />
      </Suspense>
      <GetInTouch />
    </>
  );
}
