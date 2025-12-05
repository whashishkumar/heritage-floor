import { Suspense } from 'react';
import HeaderTopBar from '../HeaderTopBar';
import HeaderMainBar from '../HeaderMain';
import ThinBanner from '../ThinBanner';
import { CommonComponentData } from '@/lib/api/commonEndPoints';

export default async function Navbar() {
  const menuItemsList = await CommonComponentData.getMenuItemsList();
  const { shop_info, data } = menuItemsList || {};

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <HeaderTopBar data={shop_info} />
        <Suspense fallback={<div className="h-[4.688rem] bg-white" />}>
          <HeaderMainBar megaMenuData={data} />
        </Suspense>
        <ThinBanner />
      </div>
    </>
  );
}
