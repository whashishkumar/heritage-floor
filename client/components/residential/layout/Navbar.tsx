import HeaderMainBar from "../HeaderMain";
import HeaderMegaMenu from "../HeaderMegaMenu";
import HeaderTopBar from "../HeaderTopBar";
import ThinBanner from "../ThinBanner";

export default async function Navbar() {
  return (
    <div className="flex items-center justify-center flex-col">
      <HeaderTopBar />
      <HeaderMainBar />
      {/* <Header /> */}
      <HeaderMegaMenu />
      <ThinBanner />
    </div>
  );
}
