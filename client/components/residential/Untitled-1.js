'use client';
import { useState } from 'react';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import ModalBox from '../ui/ModalBox';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-teal-600 font-bold text-xl lg:text-2xl leading-tight">
                  HERITAGE
                </span>
                <span className="text-teal-600 font-bold text-xs lg:text-sm leading-tight">
                  FLOOR & HOME
                </span>
              </div>
            </div>
            <span className="text-gray-400 text-2xl lg:text-3xl font-light">+</span>
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold text-xs lg:text-sm leading-tight">
                GTA
              </span>
              <span className="text-red-600 font-bold text-sm lg:text-base leading-tight">
                FlooringCanada
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium whitespace-nowrap"
              >
                Special Deals
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium whitespace-nowrap"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-medium whitespace-nowrap"
              >
                Get a Quote
              </a>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-700 hover:text-teal-600">
                <FiUser className="w-5 h-5" />
                <span className="text-sm font-medium">Account / Sign In</span>
              </button>
              <button className="relative text-gray-700 hover:text-teal-600">
                <FiShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
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
          <div className="lg:hidden py-4 border-t border-gray-200">
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
              <a href="#" className="text-gray-700 hover:text-teal-600 font-medium py-2">
                Special Deals
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600 font-medium py-2">
                Products
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600 font-medium py-2">
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
          </div>
        )}
      </div>
    </header>
  );
}
