'use client';
import { useAuth } from '@/context/userAuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineFilter,
} from 'react-icons/ai';
import { MdLocationOn, MdPayment } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiX } from 'react-icons/fi';

const menu = [
  { name: 'My Orders', href: '/residential/my-account/orders', icon: AiOutlineClockCircle },
  { name: 'My Lists', href: '/residential/my-account/lists', icon: AiOutlineHeart },
  { name: 'My Addresses', href: '/residential/my-account/addresses', icon: MdLocationOn },
  { name: 'Payment Methods', href: '/residential/my-account/payment-methods', icon: MdPayment },
  { name: 'My Profile', href: '/residential/my-account/profile', icon: AiOutlineUser },
  { name: 'Password', href: '/residential/my-account/password', icon: RiLockPasswordLine },
];

export default function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    router.push('/residential');
    setIsDrawerOpen(false);
  };

  const handleMenuClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden bg-[#008c99]/80 text-white p-3  h-20 w-full rounded-sm shadow-md  transition-all mb-4 flex flex-col items-center gap-2 justify-center "
        aria-label="Filter Menu"
      >
        <AiOutlineFilter size={20} />
        <span className="text-sm font-medium">Filter</span>
      </button>

      {/* Desktop Sidebar */}
      <div className="w-full lg:w-[240px] space-y-3 hidden md:block lg:block">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all
            ${isActive ? 'bg-white shadow text-[#008c99]' : 'text-gray-700 hover:bg-gray-100'}
          `}
            >
              <Icon
                className={`text-[22px] ${
                  isActive ? 'text-[#008c99]' : 'text-gray-500 group-hover:text-black'
                }`}
              />
              <span className="text-sm lg:text-base font-medium">{item.name}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition cursor-pointer w-full"
        >
          <AiOutlineLogout size={22} />
          <span className="text-sm lg:text-base font-medium">Sign Out</span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">My Account</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-600 hover:text-black transition"
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleMenuClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all
                ${isActive ? 'bg-[#008c99] text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
              >
                <Icon className={`text-[22px] ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition cursor-pointer w-full"
          >
            <AiOutlineLogout size={22} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </>
  );
}
