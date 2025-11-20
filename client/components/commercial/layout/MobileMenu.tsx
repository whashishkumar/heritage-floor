'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { IoMailOutline, IoSearchOutline } from 'react-icons/io5';
import { PiPhoneCall } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';

const productsSubMenuItems = [
  {
    key: 'Over View',
    dest: '/commercial/about-us',
  },

  {
    key: 'Our History',
    dest: '/commercial/our-history',
  },
];
export default function PhoneMenuCommercial() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (menu: any) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      <div className="  flex flex-col lg:hidden justify-between  items-center w-full h-full ">
        <div className=" flex lg:hidden justify-between  items-center w-full px-[1.5rem] ">
          {/* Left Menu */}
          <div className=" flex flex-row items-center justify-center gap-4 sm:gap-6  ">
            <button className=" " onClick={toggleMenu}>
              {isMenuOpen ? (
                <FiX size={30} color="white" />
              ) : (
                <RxHamburgerMenu size={30} color="white" />
              )}
            </button>
            <div className=" text-white mt-1">
              <button className=" cursor-pointer ">
                <IoSearchOutline size={26} />
              </button>
            </div>
          </div>

          {/* logo */}
          <div className="">
            <div className="relative h-[2.5rem] w-[8.813rem] ">
              <Image src="/logo/Vector.png" alt="heritage_floor" fill className=" object-cover" />
            </div>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center  text-white text-sm">
            <div className="h-[2.688rem]  flex items-center justify-center rounded-lg gap-2 sm:gap-6">
              <a
                href="tel: 613-224-0300"
                aria-label="Call us"
                className="h-[2.25rem] w-[2.25rem] relative cursor-pointer  "
              >
                <PiPhoneCall size={28} />
              </a>
              <a
                href="https://wa.me/+16132240300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="h-[2.5rem] w-[2.5rem] relative cursor-pointer flex items-center justify-center "
              >
                <IoMailOutline size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-60 lg:hidden transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed   top-0 left-0   w-[80%] bg-gray-800  text-white z-60 lg:hidden transform transition-transform duration-300 ease-in-out h-screen  ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full  justify-between ">
            {/* Sidebar Header */}
            <div className=" flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="">
                  <div className="relative h-[2.5rem] w-[8.813rem] ">
                    <Image
                      src="/logo/Vector.png"
                      alt="heritage_floor"
                      fill
                      className=" object-cover"
                      unoptimized
                      quality={100}
                    />
                  </div>
                </div>
                <button onClick={toggleMenu} className="hover:text-gray-300 transition">
                  <FiX size={30} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex py-4 ">
                <div className="px-2 space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-700 transition">
                    Home
                  </a>

                  {/* About us Mobile Dropdown */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('about')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                      <span>About us</span>
                      <div
                        className={`w-4 h-4 transition-transform   ${
                          activeDropdown === 'about'
                            ? '-rotate-180 duration-500 ease-in-out pr-2'
                            : ''
                        }`}
                      >
                        <FiChevronDown size={16} />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 mr-2 ${
                        activeDropdown === 'about' ? 'max-h-48' : 'max-h-0'
                      }`}
                    >
                      {/* <div className="pl-6 space-y-1 py-1">
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Our Story
                        </a>
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Team
                        </a>
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Careers
                        </a>
                      </div> */}
                      {productsSubMenuItems?.map((menuList, idx) => {
                        return (
                          <Link href={menuList.dest} key={idx}>
                            <p onClick={toggleMenu} className="pl-6 space-y-1 py-1">
                              {menuList.key}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Products Mobile Dropdown */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('products')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700 transition"
                    >
                      {/* activeDropdown === "products" ? "rotate-180" : "" */}
                      <span>Products</span>
                      <div
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === 'products'
                            ? '-rotate-180 duration-500 ease-in-out'
                            : ''
                        }`}
                      >
                        <FiChevronDown size={16} />
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeDropdown === 'products' ? 'max-h-48' : 'max-h-0'
                      }`}
                    >
                      {/* <div className="pl-6 space-y-1 py-1">
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Flooring
                        </a>
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Tiles
                        </a>
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-md transition"
                        >
                          Home Decor
                        </a>
                      </div> */}
                      {productsSubMenuItems?.map((menuList, idx) => {
                        return (
                          <p key={idx} className="pl-6 space-y-1 py-1">
                            {menuList.key}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-700 transition">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t  border-gray-700  mb-[3.125rem]">
              <a
                href="tel:613-224-0300"
                className="block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-center transition"
              >
                <div className="flex items-center justify-center space-x-2">
                  <PiPhoneCall size={16} />
                  <span className="font-medium">613-224-0300</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
