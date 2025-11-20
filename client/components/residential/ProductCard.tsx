'use client';
import { FiArrowUpRight } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import ButtonCommon from '../ui/Button';
import { useState } from 'react';
import ModalBox from '../ui/ModalBox';
import QueryForm from '../common/QuearyForm';

interface ProductData {
  data: any;
  handleOpenModal: () => void;
}

export default function ProductCard({ data, handleOpenModal }: ProductData) {
  return (
    <>
      <div className="flex-shrink-0 w-full max-w-[27.5rem] h-[41.75rem] bg-white  overflow-hidden ">
        {/* Product Image */}
        <div className="w-full md:h-[28.375rem] sm:h-[25.375rem] h-[22.375rem]   relative overflow-hidden rounded-[0.625rem]">
          <Image
            src={data?.image || '/images/residential/product/abstractMosaic.png'}
            alt="Abstract Mosaic"
            fill
            className="w-full h-full object-cover"
            unoptimized
            quality={100}
          />
        </div>

        {/* Product Details */}
        <div className=" flex flex-col mt-[1rem]">
          {/* Category */}
          <div className=" flex flex-col -space-y-1.5 ">
            <div className="text-base font-medium text-black">{data.category || ''}</div>

            {/* Title and Price Row */}
            <div className="flex items-start justify-between  -my ">
              <h3 className="text-[1.688rem] font-semibold text-Product  ">{data?.name || ''}</h3>
              <span className="text-2xl  text-black  text-[1.688rem] font-semibold  ">
                ${data?.price || ''}
              </span>
            </div>

            {/* Subtitle */}
            <div className="text-base font-normal text-black  ">By {data?.brand || ' '}</div>

            {/* Star Rating */}
            <div className=" gap-1 mt-3 flex items-start ">
              {[...Array(data?.rating || 5)].map((_, index) => (
                <div className="h-[2rem] w-[2rem] relative  overflow-hidden" key={index}>
                  <Image src="/icon/Star.png" fill alt="Rating" className=" fill object-cover" />
                </div>
              ))}
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
