'use client';
import React, { useEffect } from 'react';
import SidebarNav from './SideBarNav';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import WishListProductCard from '@/components/common/WishListProductCard';
import { useToast } from '@/components/ui/Tooltip';
import { useRouter } from 'next/navigation';

export default function WishLists() {
  const { showToast } = useToast();
  const [wishListItems, setWishListItems] = React.useState<any>([]);
  const router = useRouter();

  const getAllListItems = async () => {
    const resp = await CartEndPoint.getWishListItems();
    setWishListItems(resp?.data);
  };

  const handleClearAllWishList = async () => {
    await CartEndPoint.removeAllWishList();
    getAllListItems();
  };

  const handleMoveToCartProduct = async (id: any) => {
    const resp = await CartEndPoint.moveWishListToCart(id);
    showToast(resp.message, 'success');
    getAllListItems();
  };

  const handleGetProductDetail = (id: any) => {
    router.push(`/residential/products/${'wish-list'}/${id}`);
  };

  useEffect(() => {
    getAllListItems();
  }, []);

  return (
    <>
      <div className="bg-[#f3f4f6]">
        <div className="wrapper m-auto py-16">
          <div className="flex gap-10">
            <div className="sticky top-20 h-fit">
              <SidebarNav />
            </div>

            <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">WishList Items</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Here is a list of all your saved Items
                    </p>
                  </div>
                  <button
                    onClick={handleClearAllWishList}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 py-12">
                  {wishListItems?.map((item: any) => (
                    <WishListProductCard
                      product={item?.product}
                      handleGetProductDetail={handleGetProductDetail}
                      handleMoveToCartProduct={handleMoveToCartProduct}
                    />
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
