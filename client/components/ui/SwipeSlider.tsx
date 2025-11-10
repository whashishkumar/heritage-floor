"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, ReactNode } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

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
        loop={loop}
        breakpoints={breakpoints}
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
        <div className="flex gap-5 mt-4 justify-start">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="border border-[#81A694] p-3 flex items-center justify-center rounded"
          >
            <IoIosArrowBack />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="border border-[#81A694] p-3 flex items-center justify-center rounded"
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
}
