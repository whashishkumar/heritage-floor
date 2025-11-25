'use client';
import { useAuth } from '@/context/userAuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogout,
} from 'react-icons/ai';
import { MdLocationOn, MdPayment } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

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

  const handleLogOut = () => {
    logout();
    router.push('/residential');
  };

  return (
    <div className="w-full lg:w-[240px] space-y-3">
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
  );
}
