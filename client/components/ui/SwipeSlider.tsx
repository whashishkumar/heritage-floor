"use client";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SwipeSliderProps {
  children: ReactNode | ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoPlay?: boolean;
  delay?: number;
  bottomSwipeBtn?: boolean;
  textQuort?: boolean;
  swipebtn?: boolean;
  breakpoints?: any;
  loop?: boolean;
  speed?: number;
}

export default function SwipeSlider({
  children,
  slidesPerView = 3,
  spaceBetween = 20,
  autoPlay = true,
  delay = 1000,
  bottomSwipeBtn = false,
  textQuort = false,
  swipebtn = false,
  loop = true,
  breakpoints,
  speed = 800,
}: SwipeSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  // Calculate the number of slides
  const slideCount = Array.isArray(children) ? children.length : 1;

  // Determine if loop should be enabled based on slide count
  // Loop mode requires at least 2x the number of visible slides to work properly
  // This prevents the "not enough slides for loop mode" warning
  const getMaxSlidesPerView = () => {
    if (!breakpoints) return slidesPerView;

    // Find the maximum slidesPerView from breakpoints
    const breakpointValues = Object.values(breakpoints).map(
      (bp: any) => bp.slidesPerView || slidesPerView
    );
    return Math.max(slidesPerView, ...breakpointValues);
  };

  const maxSlidesPerView = getMaxSlidesPerView();

  // Enable loop only if we have at least 2x the slides per view
  // This ensures smooth looping without duplicates issues
  const shouldEnableLoop = loop && slideCount >= maxSlidesPerView * 2;

  return (
    <div className="relative w-full">
      {/* Optional Quote Icon */}
      {textQuort && (
        <Image
          src="/images/strReview.png"
          alt="quote"
          height={40}
          width={40}
          className="mb-4"
        />
      )}

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={spaceBetween}
        autoplay={autoPlay ? { delay, disableOnInteraction: false } : undefined}
        speed={speed}
        onBeforeInit={(swiper: any) => {
          swiperRef.current = swiper;
        }}
        className="w-full smooth-swiper"
        loop={shouldEnableLoop}
        breakpoints={breakpoints}
        slidesPerView={slidesPerView}
      >
        {Array.isArray(children) ? (
          children.map((child, idx) => (
            <SwiperSlide key={idx}>{child}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide key="single">{children}</SwiperSlide>
        )}
      </Swiper>

      {/* Left Arrow */}
      {swipebtn && (
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="arrow-btn-box absolute top-1/2 -translate-y-1/2 left-[-20px] z-10 flex items-center justify-center "
        >
          <IoIosArrowBack className="text-2xl hover:cursor-pointer" />
        </button>
      )}

      {/* Right Arrow */}
      {swipebtn && (
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="arrow-btn-box absolute top-1/2 -translate-y-1/2 right-[-20px] z-10 flex items-center justify-center "
        >
          <IoIosArrowForward className="text-2xl hover:cursor-pointer" />
        </button>
      )}

      {/* Bottom Navigation Buttons */}
      {bottomSwipeBtn && (
        <div className="flex gap-5 mt-4 justify-end mr-10 ">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="border border-[#858a82] p-3 flex items-center justify-center rounded cursor-pointer"
          >
            <IoIosArrowBack />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="border border-[#858a82] p-3 flex items-center justify-center rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
}
