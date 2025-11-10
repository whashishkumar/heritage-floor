"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiStar } from "react-icons/ci";
import ButtonCommon from "../ui/Button";

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

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  const handleGetProductDetail = (product: any) => {
    const { id } = product;
    router.push(`/builder/products/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative bg-white rounded-[0.625rem] flex justify-center items-center border border-[#E8E8E8] h-[341px] cursor-pointer"
        onClick={() => handleGetProductDetail(product)}
      >
        {product.discount && (
          <span className="absolute top-0 left-0 bg-[#BA0202] text-white text-sm px-2 py-1 rounded-tl-lg font-bold poppins-font">
            {product.discount}% OFF
          </span>
        )}
        <span className="absolute right-0 top-0 font-semibold px-2 py-1 flex  items-center ">
          <CiStar className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
          <CiStar className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
          <CiStar className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-black poppins-font font-medium text-base">
            ({product.rating})
          </span>
        </span>

        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={240}
          className="object-contain"
        />
      </div>

      <div className="py-4">
        {/* Info */}
        <div className="text-[#5A5A5A] text-base poppins-font font-medium leading-[30px]">
          SKU: {product.sku} by {product.brand}
        </div>
        <h3 className="text-[#000000]  poppins-font leading-[1.75rem] font-medium text-[1.375rem] line-clamp-2 break-words">
          {product.name}
        </h3>
        <p className="mt-2 text-black poppins-font font-extrabold leading-[1.875rem] text-[1.875rem]">
          ${product.price}
        </p>
        {/* Button */}
        <div className="mt-[1.5rem]">
          <ButtonCommon
            buttonName="Add To Cart"
            link="#"
            image="/icon/arrowRightUp.png"
            cssParent="!rounded-[0.625rem]"
            cssChild="!rounded-r-[0.625rem]"
          />
        </div>
      </div>
    </div>
  );
}
