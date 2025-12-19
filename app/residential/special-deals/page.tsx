import GetInTouch from '@/components/commercial/GetInTouch';
import SpecialDeals from '@/components/common/specialDeals';
import SpecialProductCard from '@/components/common/specialDeals/SpecialProductCard';
import CategoriesResidential from '@/components/residential/Categories';
import FeaturedProducts from '@/components/residential/FeaturedProducts';
import SignatureFlooring from '@/components/residential/SignatureFlooring';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import { ResidentailPageData } from '@/lib/api/residentialEndPoints';

import React from 'react';

export default async function page() {
  const categories = await ResidentailPageData.getCategories();
  const flooringSelections = await ResidentailPageData.getFlooringSelections();
  const specialProducts = await CommonComponentData.getFeaturedProducts();

  return (
    <div>
      <SpecialDeals />
      <CategoriesResidential data={categories.data} />
      <SpecialProductCard specialProducts={specialProducts} />
      {/* <SignatureFlooring data={flooringSelections.data} /> */}
      <FeaturedProducts />
      <GetInTouch />
    </div>
  );
}
