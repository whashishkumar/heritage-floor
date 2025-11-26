import HeaderTopBar from '../HeaderTopBar';
import HeaderMainBar from '../HeaderMain';
import HeaderMegaMenu from '../HeaderMegaMenu';
import ThinBanner from '../ThinBanner';
import Header from '../Untitled-1';
import { CommonComponentData } from '@/lib/api/commonEndPoints';

export default async function Navbar() {
  const menuItemsList = await CommonComponentData.getMenuItemsList();
  const { shop_info, data } = menuItemsList || {};

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <HeaderTopBar data={shop_info} />
        <HeaderMainBar />
        {/* <Header /> */}
        <HeaderMegaMenu megaMenu={data} />
        <ThinBanner />
      </div>
    </>
  );
}
