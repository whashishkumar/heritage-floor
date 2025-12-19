'use client';
import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import ProductCard from '../common/Product';
import { useRouter } from 'next/navigation';
import SwipeSlider from '../ui/SwipeSlider';
import { usePathSegments } from '@/utils/segmentPath';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { useToast } from '../ui/Tooltip';
import { useAuth } from '@/context/userAuthContext';

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
}
const products: Product[] = [
  {
    id: 1,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: '236',
    brand: 'Crain',
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: '/images/builder/pcrain.png',
  },
  {
    id: 11,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: '236',
    brand: 'Crain',
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: '/images/builder/p01.png',
  },
  {
    id: 12,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: '236',
    brand: 'Crain',
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: '/images/builder/p02.png',
  },
  {
    id: 121,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: '236',
    brand: 'Crain',
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: '/images/builder/p03.png',
  },
];

const breakpoints = {
  340: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 2.1,
    spaceBetween: 25,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 4,
    spaceBetween: 25,
  },
};

export default function BestsellerProducts({ bestSellerProducts, productHeader }: any) {
  const { mainPath } = usePathSegments();
  const router = useRouter();
  const { data } = bestSellerProducts || [];
  const { heading, subHeading } = productHeader || {};
  const [wishlistStatus, setWishlistStatus] = useState<{ [key: number]: boolean }>({});
  const { showToast } = useToast();
  const handleViewAllProducts = () => {
    router.push('/builder/products');
  };
  const { isAuthenticated } = useAuth();

  const handleGetProductDetail = (id: string) => {
    router.push(`${mainPath}/products/get-product-detial/${id}`);
  };

  const handleWhshlistAdd = async (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    e.preventDefault();
    // Optimistic update for just this product
    setWishlistStatus((prev) => ({ ...prev, [productId]: !prev[productId] }));
    try {
      const wishLitItem = await CartEndPoint.addRemoveListItems(productId);
      const { message } = wishLitItem;
      showToast(message);
      window.dispatchEvent(new Event('wishList-update'));
    } catch (error) {
      // Revert optimistic update on error
      setWishlistStatus((prev) => ({ ...prev, [productId]: !prev[productId] }));
      showToast('Failed to update wishlist', 'error');
    }
  };

  return (
    <>
      <div className="bg-[#F4F4F4]">
        <div className="py-12 wrapper mx-auto">
          <div className="flex justify-between items-center">
            <SectionHeader
              heading={heading}
              headingCss="text-xl md:text-4xl font-bold !text-[#000] !capitalize !poppins-font"
              subHeading={subHeading}
              subHeadingCss=" sm:!text-xl !text-xl md:!text-4xl font-normal text-black !capitalize !poppins-font"
              mainCss="flex flex-row items-center gap-3"
            />
            <button
              className="cursor-pointer poppins-font text-sm md:text-base lg:text-lg capitalize font-medium text-[#000]"
              onClick={handleViewAllProducts}
            >
              View more
            </button>
          </div>
          <div className="py-6">
            <SwipeSlider
              slidesPerView={4}
              bottomSwipeBtn={false}
              swipebtn={false}
              spaceBetween={20}
              autoPlay={false}
              loop={false}
              delay={1000}
              speed={4000}
              breakpoints={breakpoints}
            >
              {data?.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleGetProductDetail={handleGetProductDetail}
                  handleWhshlistAdd={handleWhshlistAdd}
                  isInWishlist={wishlistStatus[product.id]}
                />
              ))}
            </SwipeSlider>
          </div>
        </div>
      </div>
    </>
  );
}
