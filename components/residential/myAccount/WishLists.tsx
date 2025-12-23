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

  const result = {
    wishlist_ids: wishListItems?.map((item: any) => item.id),
    quantities: wishListItems?.reduce((acc: Record<number, number>, item: any) => {
      acc[item.id] = 1;
      return acc;
    }, {}),
  };

  const handleMoveAllItemsToCart = async () => {
    if (wishListItems.length === 0) {
      showToast('Your wishlist is empty');
      return;
    }
    const resp = await CartEndPoint.moveAllItemsToCart(result);
    showToast(resp.message, 'success');
    getAllListItems();
    // 🔥 notify all components
    window.dispatchEvent(new Event('cart-updated'));
    window.dispatchEvent(new Event('wishList-update'));
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
                  <div>
                    <button
                      onClick={handleClearAllWishList}
                      className="bg-gradient-to-r from-primaryOne to-primaryTwo text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold cursor-pointer"
                    >
                      Clear All
                    </button>
                    <button
                      className=" ml-4 bg-gradient-to-r from-primaryOne to-primaryTwo text-white px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-bold cursor-pointer"
                      onClick={handleMoveAllItemsToCart}
                    >
                      Move All to Cart
                    </button>
                  </div>
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
