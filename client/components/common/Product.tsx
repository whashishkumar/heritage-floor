'use client';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ButtonCommon from '../ui/Button';
import RatingStars from '../ui/RatingStars';
import { addToGuestCart } from '@/utils/addToGuestCart';

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

export default function ProductCard({ product, handleGetProductDetail }: Props) {
  const router = useRouter();

  const handleAddToCartProduct = async (id: any) => {
    // await CartEndPoint.addItemToCart(id);
    addToGuestCart({ id: id });
  };

  const path = process.env.NEXT_PUBLIC_IMAGE_PATH;
  const ProductImage = `${path}${product.image}`;

  return (
    <div className="flex flex-col">
      <div
        className="relative bg-white rounded-[0.625rem] flex justify-center items-center border border-[#E8E8E8] h-[341px] cursor-pointer rounded-tl-lg"
        onClick={() => handleGetProductDetail(product.id)}
      >
        {product.discount_percent && (
          <span className="absolute top-0 left-0 bg-[#BA0202] text-white text-sm px-2 py-1 rounded-tl-lg font-bold poppins-font">
            {product.discount_percent}% OFF
          </span>
        )}
        <span className="absolute right-0 top-0 font-semibold px-2 py-1 flex  items-center ">
          {product.rating && (
            <RatingStars rating={product.rating} className="absolute right-2 top-1" />
          )}
        </span>
        {ProductImage && (
          <Image
            src={ProductImage}
            alt={product.sku}
            width={340}
            height={240}
            className="h-full w-auto object-cover rounded-tl-lg"
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
        <p className="mt-2 text-black poppins-font font-extrabold leading-[1.875rem] text-[1.875rem] ">
          {product.price ? '$' + `${product.price}` : '_'}
        </p>
        {/* Button */}
        <div className="mt-[1.5rem]">
          <ButtonCommon
            buttonName="Add To Cart"
            image="/icon/arrowRightUp.png"
            cssParent="!rounded-[0.625rem]"
            cssChild="!rounded-r-[0.625rem]"
            onClick={() => handleAddToCartProduct(product?.id)}
          />
        </div>
      </div>
    </div>
  );
}
