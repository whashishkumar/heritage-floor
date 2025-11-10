import HeaderTopBar from "../HeaderTopBar";
import HeaderMainBar from "../HeaderMain";
import HeaderMegaMenu from "../HeaderMegaMenu";
import ThinBanner from "../ThinBanner";
import Header from "../Untitled-1";

export default async function Navbar() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <HeaderTopBar />
        <HeaderMainBar />
        {/* <Header /> */}
        <HeaderMegaMenu />
        <ThinBanner />
      </div>
    </>
  );
}
