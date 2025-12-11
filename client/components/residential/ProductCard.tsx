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
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;
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
      <div className="flex-shrink-0 w-full max-w-[27.5rem] h-[41.75rem] bg-white  overflow-hidden ">
        {/* Product Image */}
        <div
          onClick={() => handleProductDetail(data?.id)}
          className="w-full md:h-[28.375rem] sm:h-[25.375rem] h-[22.375rem]   relative overflow-hidden rounded-[0.625rem]"
        >
          <Image
            src={`${baseUrl}${data?.image}`}
            alt="Abstract Mosaic"
            fill
            className="w-full h-full object-cover"
            unoptimized
            quality={100}
          />
        </div>

        {/* Product Details */}
        <div className=" flex flex-col mt-[1rem] ">
          {/* Category */}
          <div className=" flex flex-col -space-y-1.5 ">
            <div className="text-base font-medium text-black capitalize">{data.type || ''}</div>
            {/* Title and Price Row */}
            <div className="flex items-start justify-between">
              <h3 className="text-[1.688rem] font-semibold text-Product  line-clamp-1  ">
                {data?.name || ''}
              </h3>
              <span className="text-lg  text-black  text-[1.1rem] font-semibold  ">
                ${Number(data?.price_per_sqft)?.toFixed(2) || ''} /sq.ft
              </span>
            </div>

            {/* Subtitle */}
            <div className="h-4">
              {data?.brand && (
                <div className="text-base font-normal text-black">By {data?.brand || ' '}</div>
              )}
            </div>

            {/* Star Rating */}
            <div className=" gap-1 mt-3 flex items-start">
              {data?.rating && <RatingStars rating={data.rating} className="" />}
            </div>
          </div>
          <div className=" mt-[1.5rem]">
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
