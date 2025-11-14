// "use client";
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { useState } from "react";
// interface SlickSliderProps {
//   data: any;
//   CardComponent: React.ComponentType<{ data: any }>;
//   slideToShow: any;
//   rtl?: boolean;
// }
// import { RxArrowRight } from "react-icons/rx";
// import { RxArrowLeft } from "react-icons/rx";

// const NextArrow = ({
//   onClick,
//   currentSlide,
//   slideCount,
// }: {
//   onClick?: () => void;
//   currentSlide?: number;
//   slideCount?: number;
// }) => {
//   const isLast = currentSlide === slideCount! - 1;

//   return (
//     <button
//       className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] right-2 sm:right-4 xl:-right-[8rem] 2xl:-right-[11rem]   transform -translate-y-1/2 z-10  ${
//         isLast ? "text-gray-400 " : "text-primary1"
//       }`}
//       onClick={onClick}
//     >
//       <RxArrowRight className="w-10 h-10 bg-transparent" />
//     </button>
//   );
// };

// const PrevArrow = ({
//   onClick,
//   currentSlide,
// }: {
//   onClick?: () => void;
//   currentSlide?: number;
// }) => {
//   const isFirst = currentSlide === 0;

//   return (
//     <button
//       className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] left-2 sm:left-4 xl:-left-[8rem] 2xl:-left-[11rem] transform -translate-y-1/2 z-10  ${
//         isFirst ? "text-gray-400 " : "text-primary1"
//       }`}
//       onClick={onClick}
//     >
//       <RxArrowLeft className="w-10 h-10 bg-transparent" />
//     </button>
//   );
// };

// export default function AutoPlay({
//   data,
//   CardComponent,
//   slideToShow,
//   rtl = false,
// }: SlickSliderProps) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const settings = {
//     dots: false,
//     infinite: true, // Only infinite if more than 1 product
//     speed: 5000,
//     slidesToShow: slideToShow,
//     slidesToScroll: 1,
//     autoplay: true, // Only autoplay if more than 1 product
//     autoplaySpeed: 0,
//     cssEase: "linear",
//     swipeToSlide: true,
//     arrows: false,
//     pauseOnHover: true,
//     variableWidth: false,
//     adaptiveHeight: true,
//     rtl,
//     responsive: [
//       {
//         breakpoint: 1420,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 1050,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 770,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 650,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 570,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 525,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 450,
//         settings: {
//           slidesToShow: 1.75,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 400,
//         settings: {
//           slidesToShow: 1.5,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 350,
//         settings: {
//           slidesToShow: 1.25,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//     ],
//   };
//   return (
//     <div className="lg:max-w-[81vw] max-w-[90vw] mx-[1rem]">
//       <Slider {...settings}>
//         {data?.map((data: any, index: any) => (
//           <div key={index} className="px-2 ">
//             <div className="flex justify-center ">
//               <CardComponent data={data} />
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

"use client";
import type React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

interface SlickSliderProps {
  data: any[];
  CardComponent: React.ComponentType<{ data: any }>;
  slideToShow?: number;
  rtl?: boolean;
  centerMode?: boolean;
  speed?: number;
  responsive?: any; // 👈 Added prop for responsive breakpoints
}

const _NextArrow = ({ onClick, currentSlide, slideCount }: any) => {
  const isLast = currentSlide === slideCount! - 1;
  return (
    <button
      className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] right-2 sm:right-4 xl:-right-[8rem] 2xl:-right-[11rem] transform -translate-y-1/2 z-10 ${
        isLast ? "text-gray-400" : "text-primary1"
      }`}
      onClick={onClick}
    >
      <RxArrowRight className="w-10 h-10 bg-transparent" />
    </button>
  );
};
//
const _PrevArrow = ({ onClick, currentSlide }: { onClick?: () => void; currentSlide?: number }) => {
  const isFirst = currentSlide === 0;
  return (
    <button
      className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] left-2 sm:left-4 xl:-left-[8rem] 2xl:-left-[11rem] transform -translate-y-1/2 z-10 ${
        isFirst ? "text-gray-400" : "text-primary1"
      }`}
      onClick={onClick}
    >
      <RxArrowLeft className="w-10 h-10 bg-transparent" />
    </button>
  );
};

export default function AutoPlay({
  data,
  CardComponent,
  slideToShow,
  rtl = false,
  responsive,
}: SlickSliderProps) {
  const [_currentSlide, _setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    swipeToSlide: true,
    arrows: false,
    pauseOnHover: true,
    variableWidth: false,
    adaptiveHeight: true,
    rtl,
    responsive,
  };

  return (
    <div className=" ">
      <Slider {...settings}>
        {data?.map((item, index) => (
          <div key={index} className="px-2 ">
            <div className="flex items-center justify-center ">
              <CardComponent data={item} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
