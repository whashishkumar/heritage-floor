'use client';
import React, { useEffect } from 'react';
import SidebarNav from './SideBarNav';
import { useAuth } from '@/context/userAuthContext';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import WishListProductCard from '@/components/common/WishListProductCard';

export default function WishLists() {
  const { isAuthenticated } = useAuth();
  const [wishListItems, setWishListItems] = React.useState<any>([]);

  const getAllListItems = async () => {
    const resp = await CartEndPoint.getWishListItems();
    setWishListItems(resp?.data);
  };

  useEffect(() => {
    // if(isAuthenticated) {
    getAllListItems();
    // }
  }, []);

  return (
    <>
      <div className="bg-[#f3f4f6]">
        <div className="wrapper m-auto py-16">
          <div className="flex gap-10">
            <SidebarNav />
            <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">WishList Items</h2>
                <p className="text-gray-500 text-sm mt-1">Here is a list of all your saved Items</p>
                <div className='flex flex-wrap gap-4 py-12'>
                    {wishListItems?.map((item: any) => (
                  <WishListProductCard product={item} handleGetProductDetail={() => {}} />
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
