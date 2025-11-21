'use client';
import AutoPlay from '@/components/common/Slider';
import { log } from 'console';
import Image from 'next/image';

const brandData = [
  {
    id: 1,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 2,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 3,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 4,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 5,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 6,
    title: 'Mandarin Oriental',
    location: 'Malè, Maldives',
    image: '/images/commercial/brands/bgCard01.webp',
    logo: '/images/commercial/brands/brand01.webp',
  },
];

const responsiveSettings = [
  {
    breakpoint: 1420,
    settings: { slidesToShow: 6, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 1200,
    settings: { slidesToShow: 5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 1050,
    settings: { slidesToShow: 5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 770,
    settings: { slidesToShow: 4, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 650,
    settings: { slidesToShow: 3, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 570,
    settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 525,
    settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 450,
    settings: { slidesToShow: 1.75, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 400,
    settings: { slidesToShow: 1.5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 320,
    settings: { slidesToShow: 1.25, slidesToScroll: 1, centerMode: false },
  },
];

export const BrandCard = (brand: any) => {
  const { data } = brand || {};

  return (
    <div className="relative w-[340px] h-[219px] rounded-xl overflow-hidden poppins-font">
      {data?.image && (
        <Image src={data?.image} alt={data?.title || 'log'} fill className="object-center" />
      )}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-4 w-full flex justify-center">
        {data?.logo && (
          <Image src={data?.logo} alt={'logo'} width={120} height={80} className="object-contain" />
        )}
      </div>
      <div className="absolute bottom-4 w-full text-center px-4">
        <h2 className="text-white text-xl font-medium tracking-wide tracking-[0.8rem]">
          {data?.title?.toUpperCase()}
        </h2>
        <p className="text-gray-200 text-base mt-2 font-normal">{data?.location}</p>
      </div>
      <Image src={'/images/commercial/brands/bgCard01.webp'} height={30} width={30} alt="img" />
    </div>
  );
};

export default function GlobalPresence({ countries }: any) {
  const { heading, description, items } = countries || {};

  console.log(countries, 'countries');

  return (
    <div className="py-16">
      <h2 className="text-[2.5rem] sm:text-[2.5rem]  text-darkBlue  leading-[1.3750] text-darkBlue uppercase  tracking-[0.6rem] text-center pb-12 poppins-font">
        Our Global Presence
      </h2>
      <div className="mb-4">
        <AutoPlay
          data={brandData}
          CardComponent={BrandCard}
          slideToShow={4}
          rtl={false}
          responsive={responsiveSettings}
        />
      </div>
      <AutoPlay
        data={brandData}
        CardComponent={BrandCard}
        slideToShow={4}
        rtl={true}
        responsive={responsiveSettings}
      />
    </div>
  );
}
