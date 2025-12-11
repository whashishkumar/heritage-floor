import BestsellerProducts from '@/components/builder/BestsellerProducts';
import CategoryProducts from '@/components/builder/CategoryProducts';
import Solutions from '@/components/builder/Solutions';
import GetInTouch from '@/components/commercial/GetInTouch';
import FeaturedProducts from '@/components/residential/FeaturedProducts';
import ProductDetailPage from '@/components/residential/ProductDetailPage';
import { BuilderPageData } from '@/lib/api/builderEndPoints';
import React, { Suspense } from 'react';

const headerProductBestSeller = {
  heading: 'our Featured',
  subHeading: 'Products',
};
export default async function page() {
  const bestSellerProducts = await BuilderPageData.bestSellerProducts();
  const categoryBaseProducts = await BuilderPageData.getCategoryProducts();

  return (
    <>
      <Suspense
        fallback={<div className="min-h-[8rem] flex items-center justify-center">Loading...</div>}
      >
        <ProductDetailPage />
        <BestsellerProducts
          bestSellerProducts={bestSellerProducts}
          productHeader={headerProductBestSeller}
        />
        <Solutions />
        <CategoryProducts catgoryProductsList={categoryBaseProducts} />
      </Suspense>
      <GetInTouch />
    </>
  );
}
