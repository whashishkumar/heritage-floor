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
        <HeaderMainBar megaMenuData={data} />
        <ThinBanner />
      </div>
    </>
  );
}
