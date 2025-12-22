// 'use client';
// import { usePathSegments } from '@/utils/segmentPath';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState, useRef } from 'react';
// import { BiChevronDown } from 'react-icons/bi';
// import { BiChevronRight } from 'react-icons/bi';

// export function transformMegaMenuData(categories: any[]) {
//   return categories?.map((category) => ({
//     key: category.name,
//     image: category.image,
//     slug: category.slug,
//     id: category.id,

//     // Sub Menu
//     subMenu:
//       category.children?.map((sub: any) => ({
//         key: sub.name,
//         slug: sub.slug,
//         id: sub.id,
//         image: category.image,
//         // Items (nested children)
//         items: sub.children?.map((item: any) => item) || [],
//       })) || [],
//   }));
// }

// export default function MegaMenu({ isDealsOpen, megaMenu }: any) {
//   const { mainPath } = usePathSegments();
//   const router = useRouter();
//   // Desktop states
//   const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
//   const [desktopActiveMenu, setDesktopActiveMenu] = useState<string | null>(null);
//   const [desktopActiveSubMenu, setDesktopActiveSubMenu] = useState<string | null>(null);
//   const [activeMenuItem, setActiveMenuItem] = useState<any | null>(null);
//   const [activeSubMenuItem, setActiveSubMenuItem] = useState<any | null>(null);
//   // Mobile states
//   const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
//   const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState<string | null>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const handleDesktopMenuHover = (item: any) => {
//     const { key: menuKey } = item;
//     setDesktopMenuOpen(true);
//     setDesktopActiveMenu(menuKey);
//     setDesktopActiveSubMenu(null);
//     setActiveMenuItem(item);
//     setActiveSubMenuItem(null);
//   };

//   const handleMenuClose = () => {
//     setDesktopMenuOpen(false);
//     setDesktopActiveMenu(null);
//     setDesktopActiveSubMenu(null);
//     setActiveSubMenuItem(null);
//     setActiveMenuItem(null);
//   };

//   const handleSubMenuItems = (sub: any) => {
//     setDesktopActiveSubMenu(sub?.key);
//     setActiveSubMenuItem(sub);
//   };

//   const handleMobileMenuClick = (menuKey: string) => {
//     if (mobileActiveMenu === menuKey) {
//       // Toggle off if clicking the same menu
//       setMobileActiveMenu(null);
//       setMobileActiveSubMenu(null);
//     } else {
//       // Open new menu
//       setMobileActiveMenu(menuKey);
//       setMobileActiveSubMenu(null);
//     }
//   };

//   const handleRedirect = (item: any) => {
//     handleMenuClose();
//     router.push(`${mainPath}/products/${item?.id}`);
//   };

//   const handleRedirectSubMenu = (id: number) => {
//     handleMenuClose();
//     router.push(`${mainPath}/products/${id}`);
//   };

//   const handleChildSubMenu = (id: number) => {
//     handleMenuClose();
//     router.push(`${mainPath}/products/${id}`);
//   };

//   const megaMenuDataList = transformMegaMenuData(megaMenu);

//   return (
//     <div className="relative w-full" onMouseLeave={handleMenuClose}>
//       {/* 🔹 Desktop Navigation Bar */}
//       <div className="flex items-center justify-between wrapper mx-auto lg:h-[3.125rem] px-4 ">
//         <div className="hidden lg:flex items-center justify-center gap-[3.5rem] w-full">
//           {megaMenuDataList?.map((item: any, index: any) => (
//             <button
//               key={index}
//               onClick={() => handleRedirect(item.id)}
//               onMouseEnter={() => handleDesktopMenuHover(item)}
//               className="text-menu text-lg font-normal hover:text-primary transition-colors flex items-center gap-2 leading-[1.4222] relative cursor-pointer"
//             >
//               {item.key}
//               <BiChevronDown size={20} />
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* 🔹 Desktop Mega Menu Dropdown */}
//       {desktopMenuOpen && (
//         <div
//           className="hidden lg:block bg-white absolute left-0 right-0 top-full z-50 w-full shadow-lg border-t border-gray-200"
//           ref={menuRef}
//         >
//           <div className="wrapper mx-auto grid grid-cols-2">
//             <div className="flex gap-12">
//               {/* LEFT - SubMenu (Brands list) */}
//               <ul className="py-4">
//                 {desktopActiveMenu ? (
//                   megaMenuDataList
//                     .find((menu: any) => menu.key === desktopActiveMenu)
//                     ?.subMenu.map((sub: any, i: any) => (
//                       <li
//                         key={i}
//                         onClick={() => handleRedirectSubMenu(sub?.id)}
//                         onMouseEnter={() => handleSubMenuItems(sub)}
//                         className={`text-lg flex justify-between py-2 px-2 items-center cursor-pointer transition-colors inter-font text-menu ${
//                           desktopActiveSubMenu === sub.key
//                             ? 'text-primary font-semibold'
//                             : 'hover:text-lg'
//                         }`}
//                       >
//                         {sub.key}
//                         <BiChevronRight size={12} className="text-menu ml-3" />
//                       </li>
//                     ))
//                 ) : (
//                   <div className="text-gray-500 px-4"></div>
//                 )}
//               </ul>

//               {/* RIGHT - Items list */}
//               <div className="w-1/2 py-6 ">
//                 {desktopActiveSubMenu ? (
//                   <ul className="grid grid-cols-1 gap-2">
//                     {megaMenuDataList
//                       .find((menu: any) => menu.key === desktopActiveMenu)
//                       ?.subMenu.find((sub: any) => sub.key === desktopActiveSubMenu)
//                       ?.items.map((item: any, i: any) => (
//                         <li
//                           key={i}
//                           className="text-gray-700 hover:text-primary cursor-pointer text-base inter-font text-menu py-1"
//                           onClick={() => handleChildSubMenu(item?.id)}
//                         >
//                           {item.name}
//                         </li>
//                       ))}
//                   </ul>
//                 ) : (
//                   <div className="text-gray-500"></div>
//                 )}
//               </div>
//             </div>
//             <div className="flex justify-center items-start gap-10 py-10">
//               {/* Main Menu Item */}

//               {activeMenuItem && (
//                 <div className="group flex flex-col items-center gap-2 p-5 bg-white">
//                   {/* Image wrapper */}
//                   <div className="relative h-[280px] w-[280px]">
//                     <Image
//                       src={activeMenuItem?.image}
//                       // src="/images/residential/wood/abstract.png"
//                       fill
//                       alt="product-image"
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Button */}
//                   <button
//                     onClick={() => handleRedirectSubMenu(activeMenuItem?.id)}
//                     className="w-full py-3 text-center bg-[#008c99] text-white rounded-lg  font-medium capitalize cursor-pointer"
//                   >
//                     {activeMenuItem?.key}
//                   </button>
//                 </div>
//               )}
//               {/* Sub Menu Item */}
//               {activeSubMenuItem && (
//                 <div className="group flex flex-col items-center gap-4 p-5 bg-white">
//                   {/* Image wrapper */}
//                   <div className="relative h-[280px] w-[280px]">
//                     <Image
//                       src={activeSubMenuItem?.image}
//                       // src="/images/residential/wood/abstract.png"
//                       fill
//                       alt="product-image"
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Button */}
//                   <button
//                     onClick={() => handleRedirectSubMenu(activeSubMenuItem?.id)}
//                     className="w-full py-3 text-center bg-[#008c99] text-white rounded-lg  font-medium capitalize cursor-pointer"
//                   >
//                     {activeSubMenuItem?.key}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Mobile / Tablet Dropdown */}
//       {isDealsOpen && megaMenuDataList && (
//         <div className="w-full flex flex-col items-start gap-3 p-4 lg:hidden bg-white inter-font overflow-y-auto max-h-[calc(100vh-8rem)]">
//           {megaMenuDataList?.map((item: any, index: any) => (
//             <div key={index} className="w-full">
//               <button
//                 onClick={() => handleMobileMenuClick(item.key)}
//                 className="w-full text-base font-medium flex items-center justify-between py-2 border-b border-gray-200 hover:text-primary"
//               >
//                 {item.key || ''}
//                 <BiChevronDown
//                   size={20}
//                   className={`transition-transform ${
//                     mobileActiveMenu === item.key ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>

//               {/* Mobile SubMenu */}
//               {mobileActiveMenu === item.key && item.subMenu && (
//                 <div className=" mt-2 rounded-lg overflow-hidden">
//                   <div className="flex flex-col">
//                     {/* SubMenu List */}
//                     <div className="py-2">
//                       {item.subMenu.map((sub: any, i: any) => (
//                         <div key={i}>
//                           <button
//                             onClick={() => setMobileActiveSubMenu(sub?.key)}
//                             className={`w-full text-sm flex justify-between py-2 px-4 items-center transition-colors ${
//                               mobileActiveSubMenu === sub.key
//                                 ? 'text-primary font-semibold bg-white'
//                                 : 'hover:text-primary'
//                             }`}
//                           >
//                             {sub.key}
//                             <BiChevronDown size={20} className="cursor-pointer" />
//                           </button>

//                           {/* Items list for selected submenu */}
//                           {mobileActiveSubMenu === sub.key && sub.items && sub.items.length > 0 && (
//                             <ul className="bg-white pl-6 py-2">
//                               {sub.items.map((item: any, idx: any) => (
//                                 <li
//                                   onClick={() => handleChildSubMenu(item?.id)}
//                                   key={idx}
//                                   className="text-xs text-gray-700 hover:text-primary cursor-pointer py-1"
//                                 >
//                                   {item.name}
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { usePathSegments } from '@/utils/segmentPath';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

export function transformMegaMenuData(categories: any[]) {
  return categories?.map((category) => ({
    key: category.name,
    image: category.image,
    slug: category.slug,
    id: category.id,
    subMenu:
      category.children?.map((sub: any) => ({
        key: sub.name,
        slug: sub.slug,
        id: sub.id,
        image: category.image,
        items: sub.children || [],
      })) || [],
  }));
}

export default function MegaMenu({ isDealsOpen, megaMenu, onOpenDeals }: any) {
  const { mainPath } = usePathSegments();
  const router = useRouter();

  /* ---------------- Desktop State ---------------- */
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [desktopActiveMenu, setDesktopActiveMenu] = useState<string | null>(null);
  const [desktopActiveSubMenu, setDesktopActiveSubMenu] = useState<string | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState<any | null>(null);
  const [activeSubMenuItem, setActiveSubMenuItem] = useState<any | null>(null);

  /* ---------------- Mobile State ---------------- */
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const [mobileActiveSubMenu, setMobileActiveSubMenu] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const megaMenuDataList = transformMegaMenuData(megaMenu);

  /* ---------------- Handlers ---------------- */
  const closeMenu = () => {
    setDesktopMenuOpen(false);
    setDesktopActiveMenu(null);
    setDesktopActiveSubMenu(null);
    setActiveMenuItem(null);
    setActiveSubMenuItem(null);
  };

  const handleDesktopMenuClick = (item: any) => {
    if (desktopActiveMenu === item.key) {
      closeMenu();
      return;
    }
    const firstSubMenu = item.subMenu?.[0] || null;

    setDesktopMenuOpen(true);
    setDesktopActiveMenu(item.key);
    setDesktopActiveSubMenu(firstSubMenu?.key || null);
    setActiveMenuItem(item);
    setActiveSubMenuItem(firstSubMenu);
  };

  const handleSubMenuClick = (sub: any) => {
    setDesktopActiveSubMenu(sub.key);
    setActiveSubMenuItem(sub);
  };

  const navigateTo = (id: number) => {
    router.push(`${mainPath}/products/${id}`);
    onOpenDeals();
    // closeMenu?.();
  };

  const handleMobileMenuClick = (menuKey: string) => {
    setMobileActiveMenu((prev) => (prev === menuKey ? null : menuKey));
    setMobileActiveSubMenu(null);
  };

  // Close desktop menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!desktopMenuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopMenuOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* 🔹 Desktop Navigation Bar */}
      <div className="flex items-center justify-between wrapper mx-auto lg:h-[3.125rem] px-4">
        <div className="hidden lg:flex items-center justify-center gap-[3.5rem] w-full">
          {megaMenuDataList?.map((item: any, index: number) => (
            <button
              key={index}
              onClick={() => handleDesktopMenuClick(item)}
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
        <div
          ref={menuRef}
          className="hidden lg:block bg-white absolute left-0 right-0 top-full z-50 w-full shadow-lg border-t border-gray-200"
        >
          <div className="wrapper mx-auto grid grid-cols-2">
            <div className="flex gap-12">
              {/* LEFT - SubMenu */}
              <ul className="py-4">
                {megaMenuDataList
                  ?.find((m: any) => m.key === desktopActiveMenu)
                  ?.subMenu.map((sub: any, i: number) => (
                    <li
                      key={i}
                      onClick={() => handleSubMenuClick(sub)}
                      className={`text-lg flex justify-between py-2 px-2 items-center cursor-pointer transition-colors inter-font text-menu ${
                        desktopActiveSubMenu === sub.key
                          ? 'text-primary font-semibold'
                          : 'hover:text-lg'
                      }`}
                    >
                      {sub.key}
                      <BiChevronRight size={12} className="text-menu ml-3" />
                    </li>
                  ))}
              </ul>

              {/* RIGHT - Items */}
              <div className="w-1/2 py-6">
                {desktopActiveSubMenu && (
                  <ul className="grid grid-cols-1 gap-2">
                    {megaMenuDataList
                      ?.find((m: any) => m.key === desktopActiveMenu)
                      ?.subMenu.find((s: any) => s.key === desktopActiveSubMenu)
                      ?.items.map((item: any, i: number) => (
                        <li
                          key={i}
                          onClick={() => navigateTo(item.id)}
                          className="text-gray-700 hover:text-primary cursor-pointer text-base inter-font text-menu py-1"
                        >
                          {item.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {/* RIGHT SIDE IMAGES */}
            <div className="flex justify-center items-start gap-10 py-10">
              {activeMenuItem && (
                <div className="group flex flex-col items-center gap-2 p-5 bg-white">
                  <div className="relative h-[280px] w-[280px]">
                    <Image
                      src={activeMenuItem.image}
                      fill
                      alt="product-image"
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => navigateTo(activeMenuItem.id)}
                    className="w-full py-3 bg-[#008c99] text-white rounded-lg font-medium capitalize cursor-pointer"
                  >
                    {activeMenuItem.key}
                  </button>
                </div>
              )}

              {activeSubMenuItem && (
                <div className="group flex flex-col items-center gap-4 p-5 bg-white">
                  <div className="relative h-[280px] w-[280px]">
                    <Image
                      src={activeSubMenuItem.image}
                      fill
                      alt="product-image"
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => navigateTo(activeSubMenuItem.id)}
                    className="w-full py-3 bg-[#008c99] text-white rounded-lg font-medium capitalize cursor-pointer"
                  >
                    {activeSubMenuItem.key}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Mobile / Tablet Menu (UNCHANGED) */}
      {isDealsOpen && (
        <div className="w-full flex flex-col items-start gap-3 p-4 lg:hidden bg-white inter-font overflow-y-auto max-h-[calc(100vh-8rem)]">
          {megaMenuDataList?.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <button
                onClick={() => handleMobileMenuClick(item.key)}
                className="w-full text-base font-medium flex items-center justify-between py-2 border-b border-gray-200 hover:text-primary"
              >
                {item.key}
                <BiChevronDown
                  size={20}
                  className={`transition-transform ${
                    mobileActiveMenu === item.key ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileActiveMenu === item.key && (
                <div className="mt-2">
                  {item.subMenu.map((sub: any, i: number) => (
                    <div key={i}>
                      <button
                        onClick={() => setMobileActiveSubMenu(sub.key)}
                        className="w-full text-sm flex justify-between py-2 px-4"
                      >
                        {sub.key}
                        <BiChevronDown size={20} />
                      </button>

                      {mobileActiveSubMenu === sub.key && (
                        <ul className="pl-6 py-2">
                          {sub.items.map((child: any, idx: number) => (
                            <li
                              key={idx}
                              onClick={() => navigateTo(child.id)}
                              className="text-xs text-gray-700 hover:text-primary cursor-pointer py-1"
                            >
                              {child.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
