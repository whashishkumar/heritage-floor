"use client";

import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const teamMembers = [
  {
    id: 1,
    name: "Nav Brar",
    title: "Director",
    email: "Nbrar@Gtaflooringcanada.Ca",
    bgColor: "bg-emerald-50",
    image: "/api/placeholder/400/400",
  },
  {
    id: 2,
    name: "Mandy Brar",
    title: "Managing Director",
    email: "Mandy@Gtaflooringcanada.Ca",
    bgColor: "bg-rose-100",
    image: "/api/placeholder/400/400",
  },
  {
    id: 3,
    name: "Vikram Brar",
    title: "Marketing Manager",
    email: "Vbrar@Gtaflooringcanada.Ca",
    bgColor: "bg-blue-100",
    image: "/api/placeholder/400/400",
  },
  {
    id: 4,
    name: "Parm Gill",
    title: "Operations Manager",
    email: "Pgill@Gtaflooringcanada.Ca",
    bgColor: "bg-rose-100",
    image: "/api/placeholder/400/400",
  },
  {
    id: 5,
    name: "John Doe",
    title: "Sales Manager",
    email: "John@Gtaflooringcanada.Ca",
    bgColor: "bg-emerald-50",
    image: "/api/placeholder/400/400",
  },
  {
    id: 6,
    name: "Jane Smith",
    title: "Customer Relations",
    email: "Jane@Gtaflooringcanada.Ca",
    bgColor: "bg-blue-100",
    image: "/api/placeholder/400/400",
  },
];

export default function FlooringTeamSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // Breakpoints - similar to react-slick
  const breakpoints = {
    320: 1, // Mobile
    640: 2, // Small tablets
    1024: 3, // Tablets
    1280: 4, // Desktop
  };

  // Get slides to show based on screen width
  const getSlidesToShow = () => {
    if (typeof window === "undefined") {
      return 4;
    }

    const width = window.innerWidth;
    let slides = 1;

    Object.keys(breakpoints).forEach((breakpoint) => {
      if (width >= parseInt(breakpoint, 10)) {
        slides = breakpoints[breakpoint];
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
  }, [currentSlide, getSlidesToShow]);

  // Touch handling
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      return;
    }

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
    if (isTransitioning || currentSlide === 0) {
      return;
    }
    setIsTransitioning(true);
    setCurrentSlide((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    const maxSlide = teamMembers.length - slidesToShow;
    if (isTransitioning || currentSlide >= maxSlide) {
      return;
    }
    setIsTransitioning(true);
    setCurrentSlide((prev) => Math.min(maxSlide, prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) {
      return;
    }
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
    <div className="w-full bg-white py-12 px-4 sm:py-16 sm:px-6 lg:py-20">
      {/* Slider Container */}
      <div className="relative px-12 sm:px-16 lg:px-20">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-md ${
            canGoPrev
              ? "border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-lg cursor-pointer"
              : "border-gray-200 opacity-40 cursor-not-allowed"
          }`}
          aria-label="Previous slide"
        >
          <FaAngleLeft
            className={`w-5 h-5 sm:w-6 sm:h-6 ${canGoPrev ? "text-gray-700" : "text-gray-400"}`}
          />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 shadow-md ${
            canGoNext
              ? "border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-lg cursor-pointer"
              : "border-gray-200 opacity-40 cursor-not-allowed"
          }`}
          aria-label="Next slide"
        >
          <FaAngleRight
            className={`w-5 h-5 sm:w-6 sm:h-6 ${canGoNext ? "text-gray-700" : "text-gray-400"}`}
          />
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden">
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
            {teamMembers.map((member, _index) => (
              <div
                key={member.id}
                className="flex-shrink-0 px-2 sm:px-3 lg:px-4"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="relative group">
                  {/* Card with curved background */}
                  <div
                    className={`${member.bgColor} rounded-t-[200px] pt-8 pb-6 px-4 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <div className="aspect-square rounded-full overflow-hidden mx-auto mb-4 max-w-[280px]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="text-center pt-6 pb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2">{member.title}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-800 text-sm sm:text-base hover:text-cyan-600 transition-colors inline-block"
                    >
                      {member.email}
                    </a>
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
      <div className="text-center mt-4 text-sm text-gray-500">
        Showing {slidesToShow} of {teamMembers.length} • Slide {currentSlide + 1} of {totalDots}
      </div>
    </div>
  );
}
