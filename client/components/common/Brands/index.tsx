'use client';
import React, { useEffect, useState } from 'react';
import SectionHeader from '../SectionHeader';
import { CommonComponentData } from '@/lib/api/commonEndPoints';

const brands = [
  {
    id: 1,
    name: 'Anatolia',
    logoText: 'anatolia',
  },
  {
    id: 2,
    name: 'Brand Two',
    logoText: 'brandtwo',
  },
  {
    id: 3,
    name: 'Anatolia',
    logoText: 'anatolia',
  },
  {
    id: 4,
    name: 'Brand Two',
    logoText: 'brandtwo',
  },
  {
    id: 5,
    name: 'Anatolia',
    logoText: 'anatolia',
  },
  {
    id: 6,
    name: 'Brand Two',
    logoText: 'brandtwo',
  },
];

function BrandCard({ brandList }: any) {
  return (
    <div className="border border-gray-200 rounded-xl py-6 shadow-sm flex flex-col items-center justify-center gap-14 bg-white hover:shadow-md transition cursor-pointer min-h-[5rem] h-[12rem] ">
      <div className="text-4xl font-light tracking-wide">{brandList.logoText}</div>
      <p className="text-lg font-semibold text-gray-800">{brandList.name}</p>
    </div>
  );
}

export default function Brands() {
  const [brandList, seBrandsList] = useState<any | null>(null);
  const [lodaing, setLoading] = useState(false);

  const { heading, subheading, featured, allBrands } = brandList || {};

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
        <h2 className="flex justify-center font-semibold text-[1.5rem] py-6">Featured Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {featured?.map((brand: any) => (
            <BrandCard key={brand.id} brandList={brand} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="flex justify-center font-semibold text-[1.5rem] py-8">All Brands Canada</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {allBrands?.map((brand: any) => (
            <BrandCard key={brand.id} brandList={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
