"use client";

import { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

const teamMembers = [
  {
    name: "Nav Brar",
    designation: "Director",
    email: "Nbrar@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/1.png",
    bgColor: "bg-[#E5F3EC]", // replace with actual image path
  },
  {
    name: "Mandy Brar",
    designation: "Managing Director",
    email: "Mandy@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/2.png",
    bgColor: "bg-[#F8E3E3]", // replace with actual image path
  },
  {
    name: "Vikram Brar",
    designation: "Marketing Manager",
    email: "Vbrar@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/3.png", // replace with actual image path
    bgColor: "bg-[#E3EFF8]",
  },
  {
    name: "Parm Gill",
    designation: "Operations Manager",
    email: "Pgill@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/4.png", // replace with actual image path
    bgColor: "bg-[#F8E3E3]",
  },
  {
    name: "Nav Brar",
    designation: "Director",
    email: "Nbrar@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/1.png",
    bgColor: "bg-[#E5F3EC]", // replace with actual image path
  },
  {
    name: "Mandy Brar",
    designation: "Managing Director",
    email: "Mandy@Gtaflooringcanada.Ca",
    image: "/images/commercial/flooringOptions/2.png",
    bgColor: "bg-[#F8E3E3]", // replace with actual image path
  },
];

export default function FlooringTeamSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // Breakpoints - similar to react-slick
  const breakpoints: Record<string, number> = {
    320: 1, // Mobile
    640: 3, // Small tablets
    1024: 4, // Tablets
    1280: 4, // Desktop
  };

  // Get slides to show based on screen width
  const getSlidesToShow = () => {
    if (typeof window === "undefined") return 4;

    const width = window.innerWidth;
    let slides = 1;

    Object.keys(breakpoints).forEach((breakpoint) => {
      const bp = Number(breakpoint);
      //   if (width >= parseInt(breakpoint)) {
      //     slides = breakpoints[breakpoint];
      //   }
      if (width >= bp) {
        slides = breakpoints[bp];
      }
    });

    return slides;
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newSlidesToShow = getSlidesToShow();
      setSlidesToShow(newSlidesToShow);

      // Adjust current slide if needed
      const maxSlide = teamMembers.length - newSlidesToShow;
      if (currentSlide > maxSlide) {
        setCurrentSlide(Math.max(0, maxSlide));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  // Touch handling
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: any) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Navigation
  const handlePrev = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    const maxSlide = teamMembers.length - slidesToShow;
    if (isTransitioning || currentSlide >= maxSlide) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: any) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Calculate if navigation is possible
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < teamMembers.length - slidesToShow;

  // Calculate translate percentage
  const translateX = -(currentSlide * (100 / slidesToShow));

  // Calculate total dots
  const totalDots = Math.ceil(teamMembers.length - slidesToShow + 1);

  return (
    <div className="w-full bg-white  ">
      {/* Slider Container */}
      <div className="relative ">
        {/* Previous Button */}

        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`absolute left-0 -top-24 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-[8.125rem] lg:h-[8.125rem] rounded-full border    border-dashed  flex items-center justify-center transition-all duration-300  ${
            canGoPrev
              ? "border-[#444444] hover:border-cyan-500 hover:bg-cyan-50  cursor-pointer"
              : "border-[#444444] opacity-40 cursor-not-allowed"
          }`}
          aria-label="Previous slide"
        >
          {/* <FaAngleLeft
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              canGoPrev ? "text-gray-700" : "text-gray-400"
            }`}
          /> */}
          <div className=" w-[3.75rem] h-[2.875rem] relative">
            <Image
              fill
              src="/images/commercial/prev.svg"
              alt="Left Arrow"
              className="object-contain"
            />
          </div>
        </button>

        {/* Next Button */}

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`absolute right-0 -top-24 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-[8.125rem] lg:h-[8.125rem] rounded-full border    border-dashed flex items-center justify-center transition-all duration-300 ${
            canGoNext
              ? "border-[#444444] hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-lg cursor-pointer"
              : "border-[#444444] opacity-40 cursor-not-allowed"
          }`}
          aria-label="Next slide"
        >
          <div className=" w-[3.75rem] h-[2.875rem] relative">
            <Image
              fill
              src="/images/commercial/next.svg"
              alt="Left Arrow"
              className="object-contain"
            />
          </div>
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden ">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(${translateX}%)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {teamMembers.map((member, index) => (
              //   <div
              //     key={index}
              //     className=" border flex-shrink-0 px-2 sm:px-3 lg:px-4"
              //     style={{ width: `${100 / slidesToShow}%` }}
              //   >
              //     <div className="relative group">
              //       {/* Card with curved background */}
              //       <div
              //         className={`${member.bgColor} rounded-t-[200px] pt-8 pb-6 px-4 transition-transform duration-300 group-hover:scale-105`}
              //       >
              //         <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 max-w-[280px]">
              //           <img
              //             src={member.image}
              //             alt={member.name}
              //             className="w-full h-full object-cover"
              //           />
              //         </div>
              //       </div>

              //       {/* Info Section */}
              //       <div className="text-center pt-6 pb-4">
              //         <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              //           {member.name}
              //         </h3>
              //         <p className="text-gray-600 text-sm sm:text-base mb-2">
              //           {member.designation}
              //         </p>
              //         <a
              //           href={`mailto:${member.email}`}
              //           className="text-gray-800 text-sm sm:text-base hover:text-cyan-600 transition-colors inline-block"
              //         >
              //           {member.email}
              //         </a>
              //       </div>
              //     </div>
              //   </div>
              <div
                className={`  flex-shrink-0  h-[35.625rem] px-1.5   ${
                  index % 2 === 0 ? "mt-[4.063rem] " : " "
                }`}
                style={{ width: `${100 / slidesToShow}%` }}
                key={index}
              >
                <div
                  className={` ${
                    index % 2 === 0 ? "h-[30.875rem]" : "h-[28.063rem]"
                  }  w-full overflow-hidden relative`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-center ${index % 2 === 0 ? "" : ""}`}
                  />
                </div>
                <div
                  className={`flex flex-col items-center justify-center inter-font ${
                    index % 2 === 0 ? " " : "mt-[2.125rem]"
                  } `}
                >
                  <div className=" font-semibold text-[1.688rem] text-[#564F4F] leading-[1.1700]">
                    {member.name}
                  </div>
                  <div className=" text-base font-medium text-black  flex justify-center leading-[1.1700] my-[0.4rem]">
                    {member.designation}
                  </div>
                  <div className=" text-base font-medium text-black  flex justify-center leading-[1.1700]">
                    {member.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {totalDots > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? "bg-cyan-500 w-8 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentSlide}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Display - Debug Info (Remove in production) */}
      {/* <div className="text-center mt-4 text-sm text-gray-500">
        Showing {slidesToShow} of {teamMembers.length} • Slide{" "}
        {currentSlide + 1} of {totalDots}
      </div> */}
    </div>
  );
}
