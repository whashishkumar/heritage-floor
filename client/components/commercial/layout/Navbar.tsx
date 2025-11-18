import Image from "next/image";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import { RxCaretDown } from "react-icons/rx";
import PhoneMenuCommercial from "./MobileMenu";

const globalHeadData = [
  {
    key: "Home",
    dest: "/commercial",
  },
  {
    key: "About Us",
    dest: "/commercial/about-us",
    icon: <RxCaretDown />,
  },
  {
    key: "Products",
    dest: "/",
    // icon: <RxCaretDown />,
  },
  {
    key: "Contact Us",
    dest: "/",
  },
];

const mediaData = [
  {
    key: "FaceBool",
    dest: "#",
  },
  {
    key: "Instagram ",
    dest: "#",
  },
  {
    key: "WhatsApp",
    dest: "#",
  },
]

const productsSubMenuItems = [
  {
    key: "Over View",
    dest: "/commercial/about-us",
  },
 
    {
    key: "Our History",
    dest: "/commercial/our-history",
  },
      {
    key: "Why Us",
    dest: "/commercial/why-us",
  },
        {
    key: "Global Presence",
    dest: "/commercial/global-presence",
  },
];

export default async function Navbar() {
  return (
    <>
      <div className=" w-full   min-h-[4.563rem] inset-0 justify-center flex items-center  lg:bg-black/60 lg:backdrop-blur-xs bg-black/10 backdrop-blur-xl   top-[3.125rem]    z-100 sticky  transition-all duration-300  ">
        {/* deshtop  Menu */}
        <div className=" wrapper lg:flex hidden justify-between  items-center w-full   ">
          {/* Left Menu */}
          <div className="flex items-center gap-16">
            <div className="relative h-[2.5rem] w-[8.813rem] ">
              <Image
                src="/logo/Vector.png"
                alt="heritage_floor"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-10">
              {/* {globalHeadData.map((data, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={data.dest}
                    className={`px-3 text-white   flex items-center font-normal text-lg transition-all duration-300  relative group
                    `}
                  >
                    {data.key}
                    {data.icon && (
                      <div className="text-white ml-3">{data.icon}</div>
                    )}
                    <div className="absolute top-full left-0 mt-2 w-48 p-4 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {productsSubMenuItems?.map((menuList) => {
                        return <p className="text-black">{menuList?.key}</p>;
                      })}
                    </div>
                  </Link>
                </React.Fragment>
              ))} */}
              {/* {globalHeadData.map((data) => (
                <Link
                  key={data.key}
                  href={data.dest}
                  className={`px-3 text-white flex items-center font-normal text-lg transition-all duration-300 relative group`}
                >
                  {data.key}
                  {data.icon && (
                    <div className="text-white ml-3">{data.icon}</div>
                  )}

                  {(data.key === "About Us" || data.key === "Products") && (
                    <div className="absolute top-full left-0 mt-2 w-48 p-4 lg:bg-black/60 lg:backdrop-blur-xs bg-black/10 backdrop-blur-xl  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {productsSubMenuItems?.map((menuList) => (
                        <p
                          key={menuList.key}
                          className="text-white cursor-pointer py-1 text-lg hover:font-medium"
                        >
                          {menuList.key}
                        </p>
                      ))}
                    </div>
                  )}
                </Link>
              ))} */}
              {globalHeadData.map((data) => (
                <div key={data.key} className="relative group inline-block">
                  <Link
                    href={data.dest}
                    className="px-3 text-white flex items-center font-normal text-lg transition-all duration-300"
                  >
                    {data.key}
                    {data.icon && (
                      <div className="text-white ml-3">{data.icon}</div>
                    )}
                  </Link>
{/* || data.key === "Products" */}
                  {(data.key === "About Us" ) && (
                    <div
                      className="absolute top-full left-0 mt-2 w-48 p-4 lg:bg-black/60 lg:backdrop-blur-xs bg-black/10 backdrop-blur-xl 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                    >
                      {productsSubMenuItems?.map((menuList) => (
                        <Link
                        href={menuList.dest}
                          key={menuList.key}
                          className="text-white cursor-pointer py-2 text-lg hover:font-medium"
                        >
                         <p className="py-2"> {menuList.key}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center space-x-6 text-white text-sm">
            <div className=" text-white">
              <LuSearch size={26} />
            </div>
            <div className="h-[2.688rem] bg-primaryTwo flex items-center justify-center px-6 rounded-lg gap-2">
              <div className="h-[1.5rem] w-[1.5rem] relative">
                <Image
                  src="/icon/call.png"
                  fill
                  alt="Call"
                  className=" object-cover p-0.5"
                />
              </div>
              <div className=" font-[800] text-base text-nowrap">
                613-224-0300
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <PhoneMenuCommercial />
      </div>
    </>
  );
}
