'use client';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ButtonCommon from '../ui/Button';
import RatingStars from '../ui/RatingStars';
import { addToGuestCart } from '@/utils/addToGuestCart';
import { useAuth } from '@/context/userAuthContext';
import { useToast } from '../ui/Tooltip';
import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
  discount_percent?: string;
}

interface Props {
  product: Product;
  handleGetProductDetail: (id: any) => void;
}

export default function ProductCard({
  product,
  handleGetProductDetail,
  handleWhshlistAdd,
  isInWishlist,
}: Props | any) {
  const router = useRouter();
  const { is_wishlist } = product || {};
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCartProduct = async (id: any) => {
    if (isAddingToCart) return; // Prevent multiple clicks
    setIsAddingToCart(true);
    try {
      if (isAuthenticated) {
        await CartEndPoint.addItemToCart(id);
        showToast('Product added to cart successfully!', 'success');
        // 🔥 notify all components
        window.dispatchEvent(new Event('cart-updated'));
      } else {
        // addToGuestCart({ id: id });
        showToast('Please sign up or log in to continue.');
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      const errorMessage =
        error?.response?.data?.message || 'Failed to add product to cart. Please try again.';
      showToast(errorMessage, 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const path = process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE;
  const ProductImage = `${path}${product?.image}`;

  return (
    <div className="flex flex-col">
      <div
        className="relative bg-white rounded-[0.625rem] flex justify-center items-center border border-[#E8E8E8] w-full h-[341px]  cursor-pointer rounded-tl-lg"
        onClick={() => handleGetProductDetail(product.id)}
      >
        {product?.discount_percent > 0 && (
          <span className="absolute top-0 left-0 bg-[#BA0202] text-white text-sm px-2 py-1 rounded-tl-lg font-bold poppins-font">
            {product?.discount_percent}% OFF
          </span>
        )}

        <div className="absolute right-0 top-0 font-semibold px-2 py-1 flex  items-center "></div>
        <span className="absolute right-0 top-0 font-semibold px-2 py-1 flex  items-center ">
          {product?.rating && (
            <RatingStars rating={product.rating} className="absolute right-2 top-1" />
          )}
        </span>
        {ProductImage && (
          <Image
            src={ProductImage}
            alt={product?.sku || 'Product'}
            width={340}
            height={240}
            className="h-full  object-cover rounded-tl-lg"
          />
        )}
      </div>
      <div className="py-4">
        <div className="text-[#5A5A5A] text-base poppins-font font-medium leading-[30px]">
          SKU: {product.sku} by {product.brand}
        </div>
        <h3 className="text-[#000000] poppins-font leading-[1.75rem] font-medium text-[1.375rem] h-14 line-clamp-2 ">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="mt-2 text-black poppins-font font-extrabold leading-[1.875rem] text-[1.875rem] ">
            {product?.price ? `$${Number(product.price).toFixed(2)}` : '_'}
          </p>
          {isAuthenticated && (
            <button
              onClick={(e) => handleWhshlistAdd(e, product?.id)}
              className={` hover:cursor-pointer py-2 px-2 rounded-2xl text-lg mb-4  font-semibold transition-colors duration-200`}
            >
              {isInWishlist ? (
                <IoHeart size={30} className="text-[#018C99]" />
              ) : (
                <CiHeart size={30} />
              )}
            </button>
          )}
        </div>
        {/* Button */}
        <div className="mt-[1.5rem]">
          <ButtonCommon
            buttonName={isAddingToCart ? 'Adding...' : 'Add To Cart'}
            image="/icon/arrowRightUp.png"
            cssParent="!rounded-[0.625rem]"
            cssChild="!rounded-r-[0.625rem]"
            onClick={() => handleAddToCartProduct(product?.id)}
            disabled={isAddingToCart}
          />
        </div>
      </div>
    </div>
  );
}
