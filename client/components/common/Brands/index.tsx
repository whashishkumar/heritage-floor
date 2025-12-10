'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionHeader from '../SectionHeader';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import { usePathSegments } from '@/utils/segmentPath';
import Loader from '@/components/ui/Loader';
import Image from 'next/image';

function BrandCard({ brandList, onClick }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;
  return (
    <div
      onClick={() => onClick(brandList.id)}
      className="border border-gray-200 rounded-xl py-6 shadow-sm flex flex-col items-center justify-center gap-7 bg-white hover:shadow-md transition cursor-pointer min-h-[5rem] h-[12rem] "
    >
      <Image
        src={`${baseUrl}${brandList?.logoIcon}`}
        height={60}
        width={120}
        alt="logo"
        className="object-contain"
      />
      <p className="text-lg font-semibold text-gray-800 mb-6">{brandList.name}</p>
    </div>
  );
}

export default function Brands() {
  const router = useRouter();
  const [brandList, seBrandsList] = useState<any | null>(null);
  const [lodaing, setLoading] = useState(false);
  const { mainPath } = usePathSegments();
  const { heading, subheading, featured, allBrands } = brandList || {};

  const handleClick = (brandId: number) => {
    router.push(`${mainPath}/products?brand=${brandId}`);
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const resp = await CommonComponentData.getAllBrands();
      seBrandsList(resp);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (lodaing) {
    return (
      <div className="py-16">
        <Loader />;
      </div>
    );
  }

  return (
    <div className="wrapper m-auto py-16 poppins-font">
      <SectionHeader
        heading={heading}
        headingCss="text-xl md:text-4xl font-bold !text-[#000] !capitalize !poppins-font"
        subHeading={subheading}
        subHeadingCss="sm:!text-[1rem] !text-sm md:!text-xl font-normal text-black !capitalize !poppins-font"
        mainCss="flex  flex-col items-center gap-3 text-center"
      />
      {/* Brands Grid */}
      <div>
        {featured && (
          <h2 className="flex justify-center font-semibold text-[1.5rem] py-6">Featured Brands</h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {featured?.map((brand: any) => (
            <BrandCard key={brand.id} brandList={brand} onClick={handleClick} />
          ))}
        </div>
      </div>
      <div>
        {allBrands && (
          <h2 className="flex justify-center font-semibold text-[1.5rem] py-8">
            All Brands Canada
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {allBrands?.map((brand: any) => (
            <BrandCard key={brand.id} brandList={brand} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
