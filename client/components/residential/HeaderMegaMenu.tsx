'use client';

const megaMenuData = [
  {
    key: 'Brands',
    dest: '/brands',
    subMenu: [
      {
        key: 'Johnson',
        dest: '/brands/johnson',
        items: ['Tiles', 'Granite', 'Marble', 'Bathroom Accessories'],
      },
      {
        key: 'Kajaria',
        dest: '/brands/kajaria',
        items: ['Wall Tiles', 'Floor Tiles', 'Bathroom Fittings', 'Outdoor Tiles'],
      },
      {
        key: 'Somany',
        dest: '/brands/somany',
        items: ['Vitrified Tiles', 'Ceramic Tiles', 'Outdoor Tiles', 'Wall Cladding'],
      },
      {
        key: 'Nitco',
        dest: '/brands/nitco',
        items: ['Designer Tiles', 'Marble', 'Mosaic', 'Granite'],
      },
      {
        key: 'Orient Bell',
        dest: '/brands/orient-bell',
        items: ['Digital Wall Tiles', 'Floor Tiles', 'Parking Tiles', 'Wood Look Tiles'],
      },
      {
        key: 'Varmora',
        dest: '/brands/varmora',
        items: ['Porcelain Tiles', 'Vitrified Tiles', 'Ceramic Tiles', 'Bathroom Fittings'],
      },
      {
        key: 'Simpolo',
        dest: '/brands/simpolo',
        items: ['Luxury Tiles', 'Quartz Surfaces', 'Outdoor Tiles', 'Bathroom Products'],
      },
      {
        key: 'Asian Granito',
        dest: '/brands/asian-granito',
        items: ['Wall Tiles', 'Floor Tiles', 'Engineered Marble', 'Quartz'],
      },
    ],
  },

  {
    key: 'Hardware',
    dest: '/hardware',
    subMenu: [
      {
        key: 'Hettich',
        dest: '/hardware/hettich',
        items: ['Hinges', 'Drawer Systems', 'Handles'],
      },
      {
        key: 'Godrej',
        dest: '/hardware/godrej',
        items: ['Locks', 'Door Closers', 'Safes'],
      },
      {
        key: 'Dorset',
        dest: '/hardware/dorset',
        items: ['Smart Locks', 'Glass Fittings', 'Door Handles'],
      },
    ],
  },
  {
    key: 'Tile & Stone',
    dest: '/tile-stone',
    subMenu: [
      {
        key: 'Wall Tiles',
        dest: '/tile-stone/wall-tiles',
        items: ['Glossy Finish', 'Matt Finish'],
      },
      {
        key: 'Floor Tiles',
        dest: '/tile-stone/floor-tiles',
        items: ['Vitrified', 'Ceramic', 'Wood Look'],
      },
      {
        key: 'Mosaic & Marble',
        dest: '/tile-stone/mosaic-marble',
        items: ['Italian Marble', 'Mosaic Stone', 'Granite'],
      },
    ],
  },
  {
    key: 'Carpet',
    dest: '/carpet',
    subMenu: [
      {
        key: 'Shaw',
        dest: '/carpet/shaw',
        items: ['Pattern Carpet', 'Nylon Carpet'],
      },
      {
        key: 'Mohawk',
        dest: '/carpet/mohawk',
        items: ['Wool Carpet', 'Custom Rugs'],
      },
    ],
  },
  {
    key: 'Laminate',
    dest: '/laminate',
    subMenu: [
      {
        key: 'Wood Look',
        dest: '/laminate/wood-look',
        items: ['Oak Finish', 'Pine Finish'],
      },
      {
        key: 'Stone Look',
        dest: '/laminate/stone-look',
        items: ['Granite', 'Marble Effect'],
      },
      {
        key: 'Waterproof',
        dest: '/laminate/waterproof',
        items: ['AquaGuard', 'HydroShield'],
      },
    ],
  },
  {
    key: 'Vinyl & LVT',
    dest: '/vinyl-lvt',
    subMenu: [
      {
        key: 'Luxury Vinyl Plank',
        dest: '/vinyl-lvt/luxury-plank',
        items: ['Rigid Core', 'Flexible Core'],
      },
      {
        key: 'Vinyl Sheet',
        dest: '/vinyl-lvt/vinyl-sheet',
        items: ['Patterned', 'Plain'],
      },
      {
        key: 'Glue Down',
        dest: '/vinyl-lvt/glue-down',
        items: ['Heavy Duty', 'Light Duty'],
      },
    ],
  },
  {
    key: 'Resources',
    dest: '/resources',
    subMenu: [
      {
        key: 'Installation Guides',
        dest: '/resources/installation',
        items: [],
      },
      {
        key: 'Care & Maintenance',
        dest: '/resources/care',
        items: [],
      },
      {
        key: 'Inspiration Gallery',
        dest: '/resources/gallery',
        items: [],
      },
    ],
  },
];

import { useState, useEffect, useRef } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { PiGreaterThanLight } from 'react-icons/pi';

export default function MegaMenu({ isDealsOpen }: any) {
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

  return (
    <div className="relative w-full" onMouseLeave={handleMenuClose}>
      {/* 🔹 Desktop Navigation Bar */}
      <div className="flex items-center justify-between wrapper mx-auto lg:h-[3.125rem] px-4 ">
        <div className="hidden lg:flex items-center justify-center gap-[3.5rem] w-full">
          {megaMenuData?.map((item: any, index: any) => (
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
                megaMenuData
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
                <div className="text-gray-500 px-4">Select a category to see brands</div>
              )}
            </ul>

            {/* RIGHT - Items list */}
            <div className="w-1/3 py-6">
              {desktopActiveSubMenu ? (
                <ul className="grid grid-cols-1 gap-2">
                  {megaMenuData
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
                <div className="text-gray-500">Select a brand to see available items</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Mobile / Tablet Dropdown */}
      {isDealsOpen && megaMenuData && (
        <div className="absolute top-[0rem] left-0 w-full z-50 flex flex-col items-start gap-3 p-4 lg:hidden bg-white inter-font">
          {megaMenuData.map((item: any, index: any) => (
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
