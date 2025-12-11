'use client';
import { useEffect, useState } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiX } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import HeaderMegaMenu from './HeaderMegaMenu';
import { IoIosArrowBack } from 'react-icons/io';
import ModalBox from '../ui/ModalBox';
import LoginPage from '../auth/LoginForm';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { useAuth } from '@/context/userAuthContext';
import { getGuestCartCount } from '@/utils/addToGuestCart';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import QueryForm from '../common/QuearyForm';
import { usePathSegments } from '@/utils/segmentPath';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HeaderMainBar({ megaMenuData }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsInCart, setItemsInCart] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalItem = getGuestCartCount();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [isQuoteModel, setIsQuoteModel] = useState(false);
  const { mainPath } = usePathSegments();

  const handleOpenMegaMenu = () => {
    setIsDealsOpen(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMegaMenu = () => {
    setIsDealsOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenQuoteModal = () => setIsQuoteModel(true);
  const handleCloseQuoteModal = () => setIsQuoteModel(false);

  const getCount = async () => {
    const cardCount = await CartEndPoint.getCartItems();
    setItemsInCart(cardCount?.data?.items_count);
  };

  const getUserDetail = async () => {
    const resp = await UserMyAccountEndpoints.getUserDetail();
    setUserDetail(resp.data);
  };

  const handleProductPageRedirection = () => {
    setIsMenuOpen(false);
    router.push(`${mainPath}/products`);
  };

  const handleMobileGetQuate = () => {
    setIsQuoteModel(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetail();
    }
    getCount();
  }, [isAuthenticated]);

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
                    <Image src="/icon/serch.svg" alt="search" className="object-cover" fill />
                  </div>
                </div>
              </div>
              {/* Navigation Links */}
              <nav className="flex items-center gap-6">
                <Link
                  onClick={() => setIsDealsOpen(true)}
                  href={`${mainPath}/brands`}
                  className="hidden lg:block text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6] cursor-pointer"
                >
                  Brands
                </Link>
                {/* <button
                  onClick={() => setIsDealsOpen(true)}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Special Deals
                </button> */}
                <Link
                  onClick={() => setIsDealsOpen(true)}
                  href={`${mainPath}/special-deals`}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Special Deals
                </Link>
                <Link
                  href={`${mainPath}/products`}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Products
                </Link>
                <button
                  onClick={handleOpenQuoteModal}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6] cursor-pointer"
                >
                  Get a Quote
                </button>
                <ModalBox isOpen={isQuoteModel} onClose={handleCloseQuoteModal}>
                  <QueryForm onClose={handleCloseQuoteModal} />
                </ModalBox>
              </nav>
              <div className="h-[1.375rem] border border-[#A7A6A6]"></div>
              {/* Icons */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {!isAuthenticated ? (
                    <button
                      className="text-gray-700 hover:text-primaryTwo cursor-pointer flex gap-2"
                      onClick={handleOpenModal}
                    >
                      <div className="h-[1.5rem] w-[1.5rem] relative overflow-hidden">
                        <Image src="/icon/user.png" alt="User" fill className="object-center" />
                      </div>
                      <span className="text-textGray text-base leading-[1.6] cursor-pointer">
                        Account / Sign In
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={`${mainPath}/my-account/profile`}
                      className="text-gray-700 hover:text-primaryTwo cursor-pointer flex gap-2"
                    >
                      <div className="h-[1.5rem] w-[1.5rem] relative overflow-hidden rounded-full">
                        {userDetail?.profile_image && (
                          <Image
                            src={userDetail?.profile_image}
                            alt="User"
                            fill
                            className="object-center"
                          />
                        )}
                      </div>
                      <span className="text-textGray text-base leading-[1.6] cursor-pointer">
                        {userDetail?.name}
                      </span>
                    </Link>
                  )}
                </div>

                <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
                  <LoginPage onClose={handleCloseModal} />
                </ModalBox>
                {/* {!isAuthenticated && ( */}
                <>
                  <Link
                    href={`${mainPath}/cart`}
                    className="relative text-gray-700 hover:text-primaryTwo h-[1.5rem] w-[1.5rem]"
                  >
                    <Image src="/icon/BagCheck.png" alt="Cart" fill className="object-center" />
                    {isAuthenticated
                      ? itemsInCart && (
                          <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {itemsInCart}
                          </span>
                        )
                      : totalItem && (
                          <p className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItem}
                          </p>
                        )}
                  </Link>
                  <Link
                    href={`${mainPath}/my-account/lists`}
                    className="relative text-gray-700 hover:text-primaryTwo h-[1.5rem] w-[1.5rem]"
                  >
                    <Image src="/icon/Heart.png" alt="Wishlist" fill className="object-center" />
                    {cartCount >= 0 && (
                      <span className="absolute -top-2 -right-2 bg-primaryTwo text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
                {/* )} */}
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
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-opacity ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-700 transition-transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
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
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={`${mainPath}/brands`}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Brands
                </Link>
                {/* <p className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]">
                  Special Deals
                </p> */}
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={`${mainPath}/special-deals`}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Special Deals
                </Link>
                <p
                  // href={`${mainPath}/products`}
                  onClick={handleProductPageRedirection}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6]"
                >
                  Products
                </p>
                <p
                  onClick={handleMobileGetQuate}
                  className="text-textGray hover:text-primaryTwo font-normal text-base leading-[1.6] cursor-pointer"
                >
                  Get a Quote
                </p>
                <ModalBox isOpen={isQuoteModel} onClose={handleCloseQuoteModal}>
                  <QueryForm onClose={handleCloseQuoteModal} />
                </ModalBox>

                {!isAuthenticated ? (
                  <button
                    className="text-gray-700 hover:text-primaryTwo cursor-pointer flex gap-2"
                    onClick={() => {
                      handleOpenModal();
                    }}
                  >
                    <div className="h-[1.5rem] w-[1.5rem] relative overflow-hidden">
                      <Image src="/icon/user.png" alt="User" fill className="object-center" />
                    </div>
                    <span className="text-textGray text-base leading-[1.6] cursor-pointer">
                      Account / Sign In
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`${mainPath}/my-account/profile`}
                    className="text-gray-700 hover:text-primaryTwo cursor-pointer flex gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="h-[1.5rem] w-[1.5rem] relative overflow-hidden rounded-full">
                      {userDetail?.profile_image && (
                        <Image
                          src={userDetail?.profile_image}
                          alt="User"
                          fill
                          className="object-center"
                        />
                      )}
                    </div>
                    <span className="text-textGray text-base leading-[1.6] cursor-pointer">
                      {userDetail?.name}
                    </span>
                  </Link>
                )}
                <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
                  <LoginPage onClose={handleCloseModal} />
                </ModalBox>
                <Link
                  href={`${mainPath}/cart`}
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </nav>
              <button
                onClick={() => {
                  setIsDealsOpen(true);
                  setIsMenuOpen(false);
                }}
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
          className={`fixed lg:hidden top-0 right-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-[100] ${
            isDealsOpen ? 'translate-x-0' : 'translate-x-full'
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
          <HeaderMegaMenu isDealsOpen={isDealsOpen} megaMenu={megaMenuData} />
        </div>

        {/* Overlay */}
        {isDealsOpen && (
          <div
            onClick={() => setIsDealsOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          ></div>
        )}
      </div>

      {/* Desktop Mega Menu - Rendered outside main header */}
      <HeaderMegaMenu isDealsOpen={false} megaMenu={megaMenuData} />
    </>
  );
}
