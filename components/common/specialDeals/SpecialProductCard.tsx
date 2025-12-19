'use client';
import ButtonCommon from '@/components/ui/Button';
import { useToast } from '@/components/ui/Tooltip';
import { useAuth } from '@/context/userAuthContext';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoHeart } from 'react-icons/io5';

export default function SpecialProductCard({ specialProducts }: any) {
  const { data } = specialProducts || {};
  const { showToast } = useToast();
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE;
  const { isAuthenticated } = useAuth();
  const [wishlistStatus, setWishlistStatus] = useState<{ [key: number]: boolean }>({});
  const [addingToCart, setAddingToCart] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (data) {
      const initialStatus = data.reduce((acc: any, product: any) => {
        acc[product.id] = product.is_wishlist;
        return acc;
      }, {});
      setWishlistStatus(initialStatus);
    }
  }, [data]);

  const handleAddToCartProduct = async (id: any) => {
    if (addingToCart[id]) return;
    setAddingToCart((prev) => ({ ...prev, [id]: true }));
    try {
      if (isAuthenticated) {
        await CartEndPoint.addItemToCart(id);
        showToast('Product added to cart successfully!', 'success');
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        showToast('Please sign up or log in to continue.');
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      const errorMessage =
        error?.response?.data?.message || 'Failed to add product to cart. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setAddingToCart((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleWhshlistAdd = async (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();
    setWishlistStatus((prev) => ({ ...prev, [productId]: !prev[productId] }));
    try {
      const wishLitItem = await CartEndPoint.addRemoveListItems(productId);
      const { message } = wishLitItem;
      showToast(message);
      window.dispatchEvent(new Event('wishList-update'));
    } catch (error) {
      setWishlistStatus((prev) => ({ ...prev, [productId]: !prev[productId] }));
      showToast('Failed to update wishlist', 'error');
    }
  };

  return (
    <section className="wrapper py-12 m-auto poppins-font">
      <h2 className="text-center text-3xl font-semibold text-red-500 mb-12">
        Last chance! Sale ending soon.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.map((product: any) => (
          <div key={product.id} className="bg-white overflow-hidden rounded-t-xl">
            <div className="relative w-full h-[230px]  overflow-hidden">
              <Image
                src={`${baseImageUrl}${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                Limited Stock
              </span>
            </div>
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-semibold text-[#0B3A53]">{product.name}</h3>
              <div className="flex items-center gap-2 text-orange-400">
                {'★'.repeat(product.rating)}
              </div>
              <div className="space-y-1 flex justify-between">
                <div>
                  <p className="text-gray-400 text-xl font-bold line-through">$ {product.price}</p>
                  <p className="text-green-600 text-2xl font-extrabold">
                    $ {product.special_price}
                  </p>
                </div>
                {isAuthenticated && (
                  <button
                    onClick={(e) => handleWhshlistAdd(e, product?.id)}
                    className={` hover:cursor-pointer py-2 px-2 rounded-2xl text-lg mb-4  font-semibold transition-colors duration-200`}
                  >
                    {wishlistStatus[product.id] ? (
                      <IoHeart size={30} className="text-[#018C99]" />
                    ) : (
                      <CiHeart size={30} />
                    )}
                  </button>
                )}
              </div>
              <div className="mt-[1.5rem]">
                <ButtonCommon
                  buttonName={addingToCart[product.id] ? 'Adding...' : 'Add To Cart'}
                  image="/icon/arrowRightUp.png"
                  cssParent="!rounded-[0.625rem]"
                  cssChild="!rounded-r-[0.625rem]"
                  onClick={() => handleAddToCartProduct(product?.id)}
                  disabled={addingToCart[product.id]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
