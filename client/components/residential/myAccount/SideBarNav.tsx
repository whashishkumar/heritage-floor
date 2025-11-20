"use client";
import { useAuth } from "@/context/userAuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdLocationOn, MdPayment } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";



const menu = [
  { name: "My Orders", href: "/residential/my-account/orders", icon: AiOutlineClockCircle },
  { name: "My Lists", href: "/residential/my-account/lists", icon: AiOutlineHeart },
  { name: "My Addresses", href: "/residential/my-account/addresses", icon: MdLocationOn },
  { name: "Payment Methods", href: "/residential/my-account/payment-methods", icon: MdPayment },
  { name: "My Profile", href: "/residential/my-account/profile", icon: AiOutlineUser },
  { name: "Password", href: "/residential/my-account/password", icon: RiLockPasswordLine },
];

export default function SidebarNav() {
  const router = useRouter()
  const pathname = usePathname();
  const {logout, isAuthenticated} = useAuth();

  const handleLogOut = () => {
    logout()
    if(!isAuthenticated) {
      router.push('/residential')
    }
  }
  
  return (
    <div className="w-[240px] space-y-3">
      {menu.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
            ${isActive ? "bg-white shadow-sm text-green-700" : "text-gray-700 hover:text-black"}`}
          >
            <Icon
              className={`text-[22px] ${
                isActive ? "text-green-700" : "text-gray-500"
              }`}
            />
            <span className="text-[16px] font-medium">{item.name}</span>
          </Link>
         
        );
      })}
       <button
       onClick={handleLogOut}
        className={`flex items-center gap-3 px-4 py-2 rounded-md transition text-gray-700 hover:text-black cursor-pointer`}>   
          <AiOutlineLogout size={22}/>
         <span className="text-[16px] font-medium">
     
          Sign Out</span>
       </button>
    </div>
  );
}
