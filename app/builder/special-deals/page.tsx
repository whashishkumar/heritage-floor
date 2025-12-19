import BestsellerProducts from '@/components/builder/BestsellerProducts';
// import CategoryProducts from '@/components/builder/CategoryProducts';
import GetInTouch from '@/components/commercial/GetInTouch';
import SpecialDeals from '@/components/common/specialDeals';
import SpecialProductCard from '@/components/common/specialDeals/SpecialProductCard';
import FeaturedProducts from '@/components/residential/FeaturedProducts';
import { BuilderPageData } from '@/lib/api/builderEndPoints';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import React from 'react';

const headerProductBestSeller = {
  heading: 'Bestseller',
  subHeading: 'Products',
};
export default async function page() {
  const bestSellerProducts = await BuilderPageData.bestSellerProducts();
  // const categoryBaseProducts = await BuilderPageData.getCategoryProducts();
  const specialProducts = await CommonComponentData.getFeaturedProducts();

  return (
    <div>
      <SpecialDeals />
      <SpecialProductCard specialProducts={specialProducts} />
      <BestsellerProducts
        bestSellerProducts={bestSellerProducts}
        productHeader={headerProductBestSeller}
      />
      {/* <CategoryProducts catgoryProductsList={categoryBaseProducts} /> */}
      <FeaturedProducts />
      <GetInTouch />
    </div>
  );
}
