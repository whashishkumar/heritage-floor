"use client";
import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import HeaderMegaMenu from "./HeaderMegaMenu";
import { IoIosArrowBack } from "react-icons/io";
import ModalBox from "../ui/ModalBox";
import LoginPage from "../auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useAuthCheck } from "@/hook/useAuthCheck";
import { AuthValidation } from "@/lib/api/endpoints";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { CartEndPoint } from "@/lib/api/cartEndPoints";

export default function HeaderMainBar() {
  const dispatch = useDispatch<any>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, token } = useSelector((state: any) => state.loginUser);
  const { success, customer, loading } = useAuthCheck();

  console.log(success, "success");

  const pathname = usePathname();

  // const specialDeals = [
  //   "Flooring Sale",
  //   "Limited-Time Offers",
  //   "New Arrivals",
  //   "Clearance Items",
  //   "Exclusive Online Discounts",
  // ];
  const handleCloseMegaMenu = () => {
    setIsDealsOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLogOut = async () => {
    await AuthValidation.logOut();
  };

  // const getCount = async () => {
  //   const cardCount = await CartEndPoint.getCartItems();
  //   console.log(cardCount, "123456789");
  // };

  // useEffect(() => {
  //   getCount();
  // }, []);

  return (
    <>
      <div className="flex items-center justify-center bg-white text-black min-h-[4.688rem] h-full w-full relative">
        <div className="wrapper w-full min-h-[2.625rem] h-full flex flex-col items-center">
          <div className="flex items-center justify-between w-full py-6">
            {/* Logo Section */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="min-w-[4.813rem] max-w-[8.813rem] lg:w-[8.813rem] h-[2.5rem] relative overflow-hidden">
                <Image
                  src="/logo/heritage.svg"
                  alt="Heritage Floor & Home"
                  fill
                  className="object-center"
                  unoptimized
                  quality={100}
                />
              </div>
              <span className="font-bold text-[1.375rem] text-textGray">+</span>
              <div className="min-w-[5.75rem] max-w-[9.75rem] lg:w-[9.75rem] h-[2.375rem] relative overflow-hidden">
                <Image
                  src="/logo/GTAFlooring.svg"
                  alt="GTAFlooring Canada"
                  fill
                  className="object-center"
                  unoptimized
                  quality={100}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              {/* Search Bar */}
              <div className="relative max-w-[23.125rem] w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="placeholder:text-[#767676] placeholder:text-base pl-10 pr-4 min-h-[2.625rem] border border-[#BDBDBD] rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-primaryTwo w-full"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="h-[1.5rem] w-[1.25rem] relative overflow-hidden">
                    <Image
                      src="/icon/serch.svg"
                      alt="search"
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center gap-6">
                <button
                  onClick={() => setIsDealsOpen(true)}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Special Deals
                </button>
                <a
                  href="#"
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Get a Quote
                </a>
              </nav>

              <div className="h-[1.375rem] border border-[#A7A6A6]"></div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-4 text-gray-700 hover:text-primaryTwo">
                  <div className="h-[1.5rem] w-[1.5rem] relative overflow-hidden">
                    <Image
                      src="/icon/user.png"
                      alt="Cart"
                      fill
                      className="object-center"
                    />
                  </div>
                </button>
                {success ? (
                  <span
                    className="text-textGray text-base leading-[1.6] cursor-pointer"
                    onClick={() => handleLogOut()}
                  >
                    logout
                  </span>
                ) : (
                  <span
                    className="text-textGray text-base leading-[1.6] cursor-pointer"
                    onClick={handleOpenModal}
                  >
                    Account / Sign In
                  </span>
                )}

                <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
                  <LoginPage onClose={handleCloseModal} />
                </ModalBox>
                <Link
                  href={`${pathname}/cart`}
                  className="relative text-gray-700 hover:text-primaryTwo h-[1.5rem] w-[1.5rem]"
                >
                  <Image
                    src="/icon/BagCheck.png"
                    alt="Cart"
                    fill
                    className="object-center"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href={`${pathname}/cart`}
                  className="relative text-gray-700 hover:text-primaryTwo h-[1.5rem] w-[1.5rem]"
                >
                  <Image
                    src="/icon/Heart.png"
                    alt="Wishlist"
                    fill
                    className="object-center"
                  />
                  {cartCount >= 0 && (
                    <span className="absolute -top-2 -right-2 bg-primaryTwo text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-transform ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-transform ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 pt-10 w-full">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-3">
                <a className="flex items-center justify-between text-gray-700 hover:text-teal-600 font-medium py-2">
                  Special Deals
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-teal-600 font-medium py-2"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-teal-600 font-medium py-2"
                >
                  Get a Quote
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium py-2"
                >
                  <FiUser className="w-5 h-5" />
                  Account / Sign In
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium py-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </a>
              </nav>
              <button
                onClick={() => setIsDealsOpen(true)}
                className="flex items-center justify-between text-gray-700 hover:text-teal-600 font-medium py-2"
              >
                Mega Menu
                <IoIosArrowForward className="ml-2" size={18} />
              </button>
            </div>
          )}
        </div>
        {/* Slide-in Special Deals Drawer */}
        <div
          className={`fixed  lg:hidden top-0 right-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-100 ${
            isDealsOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex gap-2 items-center">
              <IoIosArrowBack onClick={() => setIsDealsOpen(false)} />
              Mega Menu
            </h2>
            <button onClick={() => handleCloseMegaMenu()}>
              <FiX className="w-6 h-6 text-gray-600 hover:text-black" />
            </button>
          </div>
          <HeaderMegaMenu isDealsOpen={isDealsOpen} />
        </div>

        {/* Overlay */}
        {isDealsOpen && (
          <div
            onClick={() => setIsDealsOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          ></div>
        )}
      </div>
    </>
  );
}
