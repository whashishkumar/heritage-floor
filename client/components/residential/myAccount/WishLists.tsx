'use client';
import React, { useEffect } from 'react';
import SidebarNav from './SideBarNav';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import WishListProductCard from '@/components/common/WishListProductCard';
import { useToast } from '@/components/ui/Tooltip';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function WishLists() {
  const { showToast } = useToast();
  const [wishListItems, setWishListItems] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const getAllListItems = async () => {
    try {
      setIsLoading(true);
      const resp = await CartEndPoint.getWishListItems();
      setWishListItems(resp?.data);
    } catch (error: any) {
      showToast(error?.message || 'Failed to fetch wishlist items', 'error');
      console.error('Error fetching wishlist items:', error);
    } finally {
      setIsLoading(false);
    }
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
        <div className="wrapper m-auto py-10 md:py-16">
          <div className="flex gap-5 md:gap-10 flex-col md:flex-row lg:flex-row">
            <div className="md:sticky  top-20 h-fit z-10">
              <SidebarNav />
            </div>

            <div className="border border-gray-300 rounded-lg p-4 md:p-8 bg-white w-full mx-auto">
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                      WishList Items
                    </h2>
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
                  {isLoading ? (
                    <div className="w-full flex justify-center items-center py-12">
                      <Loader />
                    </div>
                  ) : (
                    wishListItems?.map((item: any) => (
                      <WishListProductCard
                        key={item?.product?.id || item?.id}
                        product={item?.product}
                        handleGetProductDetail={handleGetProductDetail}
                        handleMoveToCartProduct={handleMoveToCartProduct}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
