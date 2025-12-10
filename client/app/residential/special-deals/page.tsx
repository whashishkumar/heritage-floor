import GetInTouch from '@/components/commercial/GetInTouch';
import SpecialDeals from '@/components/common/specialDeals';
import CategoriesResidential from '@/components/residential/Categories';
import FeaturedProducts from '@/components/residential/FeaturedProducts';
import SignatureFlooring from '@/components/residential/SignatureFlooring';
import { ResidentailPageData } from '@/lib/api/residentialEndPoints';
import React from 'react';

export default async function page() {
  const categories = await ResidentailPageData.getCategories();
  const flooringSelections = await ResidentailPageData.getFlooringSelections();

  return (
    <div>
      <SpecialDeals />
      <CategoriesResidential data={categories.data} />
      <SignatureFlooring data={flooringSelections.data} />
      <FeaturedProducts />
      <GetInTouch />
    </div>
  );
}
