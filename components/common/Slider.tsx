'use client';
import React, { useState, useEffect, useRef } from 'react';
import { RxArrowLeft, RxArrowRight } from 'react-icons/rx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface SlickSliderProps {
  data: any[];
  CardComponent: React.ComponentType<{ data: any }>;
  slideToShow?: number;
  rtl?: boolean;
  centerMode?: boolean;
  speed?: number;
  responsive?: any; // 👈 Added prop for responsive breakpoints
}

const NextArrow = ({ onClick, currentSlide, slideCount }: any) => {
  const isLast = currentSlide === slideCount! - 1;
  return (
    <button
      className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] right-2 sm:right-4 xl:-right-[8rem] 2xl:-right-[11rem] transform -translate-y-1/2 z-10 ${
        isLast ? 'text-gray-400' : 'text-primary1'
      }`}
      onClick={onClick}
    >
      <RxArrowRight className="w-10 h-10 bg-transparent" />
    </button>
  );
};
//
const PrevArrow = ({ onClick, currentSlide }: { onClick?: () => void; currentSlide?: number }) => {
  const isFirst = currentSlide === 0;
  return (
    <button
      className={`absolute xl:top-[6rem] md:top-[4rem] top-[1.5rem] left-2 sm:left-4 xl:-left-[8rem] 2xl:-left-[11rem] transform -translate-y-1/2 z-10 ${
        isFirst ? 'text-gray-400' : 'text-primary1'
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<any>(null);

  // Only render slider on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reinitialize slider on mount and window resize for mobile
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;

    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: slideToShow || 1,
    slidesToScroll: 1,
    autoplay: isClient,
    autoplaySpeed: 0,
    cssEase: 'linear',
    swipeToSlide: true,
    arrows: false,
    pauseOnHover: true,
    variableWidth: false,
    adaptiveHeight: true,
    rtl,
    responsive: responsive || [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          autoplaySpeed: 2000,
          speed: 3000,
        },
      },
    ],
    onSwipe: () => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    },
  };

  if (!isClient) {
    return <div className="h-24 bg-gray-100 rounded animate-pulse" />;
  }

  return (
    <div className="w-full">
      <Slider ref={sliderRef} {...settings}>
        {data?.map((item, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-center">
              <CardComponent data={item} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
