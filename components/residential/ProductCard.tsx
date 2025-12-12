'use client';
import { FiArrowUpRight } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import ButtonCommon from '../ui/Button';
import { useState } from 'react';
import ModalBox from '../ui/ModalBox';
import QueryForm from '../common/QuearyForm';
import RatingStars from '../ui/RatingStars';
import { useParams, useRouter } from 'next/navigation';
import { usePathSegments } from '@/utils/segmentPath';

interface ProductData {
  data: any;
  handleOpenModal: () => void;
}

export default function ProductCard({ data, handleOpenModal }: ProductData) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE;
  const { mainPath } = usePathSegments();
  const param = useParams();
  const { slug } = param;
  const router = useRouter();

  const handleProductDetail = (id: number) => {
    if (!slug) {
      router.push(`${mainPath}/products/${'get-product-detial'}/${id}`);
    } else {
      router.push(`${mainPath}/products/${slug}/${id}`);
    }
  };

  return (
    <>
      <div className="flex-shrink-0 w-full max-w-[27.5rem] h-[41.75rem] bg-white overflow-hidden rounded-[0.75rem] flex flex-col justify-between">
        {/* Product Image */}
        <div
          onClick={() => handleProductDetail(data?.id)}
          className="w-full h-[26rem] relative overflow-hidden rounded-[0.625rem]"
        >
          <Image
            src={`${baseUrl}${data?.image}`}
            alt={data?.name || 'Product Image'}
            fill
            className="w-full h-full object-cover"
            unoptimized
            quality={100}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 mt-4">
          {/* Category + Title + Price */}
          <div className="flex flex-col space-y-2">
            {/* Category */}
            <div className="text-base font-medium text-black capitalize min-h-5">
              {data?.sku || ''}
            </div>

            {/* Title + Price */}
            <div className="flex items-start justify-between min-h-[2.5rem]">
              <h3 className="text-[1.688rem] font-semibold text-Product line-clamp-1">
                {data?.name || ''}
              </h3>
              <span className="text-[1.1rem] font-semibold text-black">
                ${Number(data?.price_per_sqft)?.toFixed(2) || '0.00'} /sq.ft
              </span>
            </div>

            {/* Brand (fixed row height) */}
            <div className="min-h-[1.25rem]">
              {data?.brand && (
                <div className="text-base font-normal text-black">By {data?.brand}</div>
              )}
            </div>

            {/* Rating (fixed height to avoid shifting) */}
            <div className="min-h-6 mt-2 flex items-center">
              {data?.rating && <RatingStars rating={data.rating} />}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto pt-4">
            <ButtonCommon
              buttonName="Send Query"
              link="#"
              image="/icon/arrowRightUp.png"
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>
    </>
  );
}
