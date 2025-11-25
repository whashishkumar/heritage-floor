'use client';
import { usePathname } from 'next/navigation';
import SectionHeader from '../common/SectionHeader';
import AutoPlay from '../common/Slider';
import ButtonCommon from '../ui/Button';
import { CustomeCard } from './CustomerCard';

interface coustumerData {
  coustumerData?: any;
}

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

// const data = [
//   {
//     image: "/images/commercial/customer/York.png",
//     alt: "York",
//   },
//   {
//     image: "/images/commercial/customer/Shell.png",
//     alt: "Shell",
//   },
//   {
//     image: "/images/commercial/customer/lcbo.png",
//     alt: "lcbo",
//   },
//   {
//     image: "/images/commercial/customer/Jasper.png",
//     alt: "Jasper",
//   },
//   {
//     image: "/images/commercial/customer/Centuty21.png",
//     alt: "Centuty21",
//   },
//   {
//     image: "/images/commercial/customer/Baymont.png",
//     alt: "Baymont",
//   },
//   {
//     image: "/images/commercial/customer/Jasper.png",
//     alt: "Jasper",
//   },
// ];

export default function OurCustomers({ coustumerData }: coustumerData) {
  const pathname = usePathname();

  return (
    <div className="w-full h-full py-12 md:py-16 ">
      <div className="wrapper mx-auto">
        <div className=" w-full flex flex-col items-center justify-center pb-8">
          <SectionHeader
            heading={coustumerData?.heading || 'Our Customers'}
            subHeading={coustumerData?.subheading || 'The People Behind Our Story'}
            description={
              coustumerData?.description ||
              'We’re proud to serve businesses who rely on us for timeless flooring, expert installation, and personalized care.'
            }
            mainCss="flex flex-col items-center justify-center "
            descriptionCss="leading-[1.5] mb-[2rem] mt-[0.5rem] w-[80%] text-center align-middle"
            subHeadingCss="text-center "
          />
          <ButtonCommon
            // link={`${pathname}/products/brands`}
            link="/residential/products/brands"
            buttonName="Shop by Brands"
            image="/icon/arrowRightUp.png"
          />
        </div>
        <div className="mt-[2rem]">
          <AutoPlay
            data={coustumerData.data}
            CardComponent={CustomeCard}
            slideToShow={6}
            rtl={false}
            responsive={responsiveSettings}
          />
        </div>
        <div className=" mt-[2rem]   ">
          <AutoPlay
            data={coustumerData.data}
            CardComponent={CustomeCard}
            slideToShow={6}
            rtl={true}
            responsive={responsiveSettings}
          />
        </div>
      </div>
    </div>
  );
}
