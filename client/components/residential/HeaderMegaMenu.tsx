'use client';

import { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { PiGreaterThanLight } from 'react-icons/pi';

export function transformMegaMenuData(categories: any[]) {
  return categories?.map((category) => ({
    key: category.name,
    image: category.image,
    slug: category.slug,

    // Sub Menu
    subMenu:
      category.children?.map((sub: any) => ({
        key: sub.name,
        slug: sub.slug,

        // Items (nested children)
        items: sub.children?.map((item: any) => item.name) || [],
      })) || [],
  }));
}

export default function MegaMenu({ isDealsOpen, megaMenu }: any) {
  // Desktop states
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [desktopActiveMenu, setDesktopActiveMenu] = useState<string | null>(null);
  const [desktopActiveSubMenu, setDesktopActiveSubMenu] = useState<string | null>(null);

  // Mobile states
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDesktopMenuHover = (menuKey: string) => {
    setDesktopMenuOpen(true);
    setDesktopActiveMenu(menuKey);
    setDesktopActiveSubMenu(null);
  };

  const handleMenuClose = () => {
    setDesktopMenuOpen(false);
    setDesktopActiveMenu(null);
    setDesktopActiveSubMenu(null);
  };

  const handleMobileMenuClick = (menuKey: string) => {
    if (mobileActiveMenu === menuKey) {
      // Toggle off if clicking the same menu
      setMobileActiveMenu(null);
      setMobileActiveSubMenu(null);
    } else {
      // Open new menu
      setMobileActiveMenu(menuKey);
      setMobileActiveSubMenu(null);
    }
  };

  const megaMenuDataList = transformMegaMenuData(megaMenu);

  return (
    <div className="relative w-full" onMouseLeave={handleMenuClose}>
      {/* 🔹 Desktop Navigation Bar */}
      <div className="flex items-center justify-between wrapper mx-auto lg:h-[3.125rem] px-4 ">
        <div className="hidden lg:flex items-center justify-center gap-[3.5rem] w-full">
          {megaMenuDataList?.map((item: any, index: any) => (
            <button
              key={index}
              onMouseEnter={() => handleDesktopMenuHover(item.key)}
              className="text-menu text-lg font-normal hover:text-primary transition-colors flex items-center gap-2 leading-[1.4222] relative cursor-pointer"
            >
              {item.key}
              <BiChevronDown size={20} />
            </button>
          ))}
        </div>
      </div>
      {/* 🔹 Desktop Mega Menu Dropdown */}
      {desktopMenuOpen && (
        <div className="hidden lg:block bg-white absolute z-50 w-full shadow-md" ref={menuRef}>
          <div className="wrapper mx-auto flex gap-12 ">
            {/* LEFT - SubMenu (Brands list) */}
            <ul className="py-4 w-1/5">
              {desktopActiveMenu ? (
                megaMenuDataList
                  .find((menu: any) => menu.key === desktopActiveMenu)
                  ?.subMenu.map((sub: any, i: any) => (
                    <li
                      key={i}
                      onMouseEnter={() => setDesktopActiveSubMenu(sub?.key)}
                      className={`text-lg flex justify-between py-2 px-2 items-center cursor-pointer transition-colors inter-font text-menu ${
                        desktopActiveSubMenu === sub.key
                          ? 'text-primary font-semibold'
                          : 'hover:text-primary'
                      }`}
                    >
                      {sub.key}
                      <PiGreaterThanLight size={12} className="text-menu" />
                    </li>
                  ))
              ) : (
                <div className="text-gray-500 px-4"></div>
              )}
            </ul>

            {/* RIGHT - Items list */}
            <div className="w-1/3 py-6">
              {desktopActiveSubMenu ? (
                <ul className="grid grid-cols-1 gap-2">
                  {megaMenuDataList
                    .find((menu: any) => menu.key === desktopActiveMenu)
                    ?.subMenu.find((sub: any) => sub.key === desktopActiveSubMenu)
                    ?.items.map((item: any, i: any) => (
                      <li
                        key={i}
                        className="text-gray-700 hover:text-primary cursor-pointer text-base inter-font text-menu py-1"
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="text-gray-500"></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Mobile / Tablet Dropdown */}
      {isDealsOpen && megaMenuDataList && (
        <div className="absolute top-[0rem] left-0 w-full z-50 flex flex-col items-start gap-3 p-4 lg:hidden bg-white inter-font">
          {megaMenuDataList?.map((item: any, index: any) => (
            <div key={index} className="w-full">
              <button
                onClick={() => handleMobileMenuClick(item.key)}
                className="w-full text-base font-medium flex items-center justify-between py-2 border-b border-gray-200 hover:text-primary"
              >
                {item.key || ''}
                <BiChevronDown
                  size={20}
                  className={`transition-transform ${
                    mobileActiveMenu === item.key ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mobile SubMenu */}
              {mobileActiveMenu === item.key && item.subMenu && (
                <div className=" mt-2 rounded-lg overflow-hidden">
                  <div className="flex flex-col">
                    {/* SubMenu List */}
                    <div className="py-2">
                      {item.subMenu.map((sub: any, i: any) => (
                        <div key={i}>
                          <button
                            onClick={() => setMobileActiveSubMenu(sub?.key)}
                            className={`w-full text-sm flex justify-between py-2 px-4 items-center transition-colors ${
                              mobileActiveSubMenu === sub.key
                                ? 'text-primary font-semibold bg-white'
                                : 'hover:text-primary'
                            }`}
                          >
                            {sub.key}
                            <BiChevronDown size={20} className="cursor-pointer" />
                          </button>

                          {/* Items list for selected submenu */}
                          {mobileActiveSubMenu === sub.key && sub.items && sub.items.length > 0 && (
                            <ul className="bg-white pl-6 py-2">
                              {sub.items.map((item: any, idx: any) => (
                                <li
                                  key={idx}
                                  className="text-xs text-gray-700 hover:text-primary cursor-pointer py-1"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
