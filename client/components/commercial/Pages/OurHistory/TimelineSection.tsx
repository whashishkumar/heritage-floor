"use client";
import SectionHeader from "@/components/common/SectionHeader";
import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: 2001,
    title: "DAMAC PROPERTIES ESTABLISHMENT",
    description:
      "DAMAC Properties is established following the introduction of freehold ownership rights for expatriate owners in Dubai.",
    image: "/images/commercial/aboutUs/aboutUsbg.jpg",
  },
  {
    year: 2002,
    title: "MARINA TERRACE",
    description:
      "The first land purchase is made, and the Marina Terrace project launched in the heart of Dubai Marina.",
   image: "/images/commercial/aboutUs/aboutCountbg.jpg",
  },
  {
    year: 2003,
    title: "PROJECT EXPANSION",
    description: "Major expansion into new residential and commercial sectors.",
  
      image: "/images/commercial/aboutUs/aboutUsbg.jpg",
  },
   {
    year: 2004,
    title: "DAMAC PROPERTIES ESTABLISHMENT",
    description:
      "DAMAC Properties is established following the introduction of freehold ownership rights for expatriate owners in Dubai.",
    image: "/images/commercial/aboutUs/aboutCountbg.jpg",
  },
  {
    year: 2005,
    title: "MARINA TERRACE",
    description:
      "The first land purchase is made, and the Marina Terrace project launched in the heart of Dubai Marina.",
    image: "/images/commercial/aboutUs/aboutUsbg.jpg",
  },
  {
    year: 2006,
    title: "PROJECT EXPANSION",
    description: "Major expansion into new residential and commercial sectors.",
    image: "/images/commercial/aboutUs/aboutCountbg.jpg",
  },

];

export default function TimelineSection() {
  const [activeBg, setActiveBg] = useState(timelineData[0].image);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isManualScroll = useRef(false);

  // Scroll listener to auto-select cards based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isManualScroll.current) {
        isManualScroll.current = false;
        return;
      }

      const containerRect = scrollContainer.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
        setActiveBg(timelineData[closestIndex].image);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  return (
    <>
       <div className="w-full flex flex-col items-center justify-center py-16">
                    <SectionHeader
                      subHeading="Our Legacy"
                      headingCss={ `text-darkBlue`}
                      description="DAMAC Properties is more than just a luxury real estate development company; it’s the result of two decades of hard work and a steady vision, dedicated to creating developments that tell extraordinary stories. "
                      mainCss={`flex flex-col items-center justify-center  ${
                        `text-darkBlue`
                      }`}
                      descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
                         `text-darkBlue`
                      }`}
                      subHeadingCss={`text-darkBlue uppercase`}
                    />
                       <SectionHeader
                    
                      description="For over 20 years, DAMAC Properties has been committed to shaping the UAE’s urban landscape and has since expanded globally. What started as a venture has grown into a leading real estate developer in the Midde East, with luxury, sustainability, innovation, safety, and placemaking at its core. 
    
    "
                      mainCss={`flex flex-col items-center justify-center  ${
                        `text-darkBlue`
                      }`}
                      descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
                         `text-darkBlue`
                      }`}
                      subHeadingCss={`text-darkBlue`}
                    />
                       <SectionHeader
                  
                      description="For over 20 years, DAMAC Properties has been committed to shaping the UAE’s urban landscape and has since expanded globally. What started as a venture has grown into a leading real estate developer in the Midde East, with luxury, sustainability, innovation, safety, and placemaking at its core. "
                      mainCss={`flex flex-col items-center justify-center  ${
                        `text-darkBlue`
                      }`}
                      descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
                         `text-darkBlue`
                      }`}
                      subHeadingCss={`text-darkBlue`}
                    />
             </div>
    <div className="relative w-full h-screen overflow-hidden isolate">

      {/* BACKGROUND IMAGE - STICKY */}
      <div
        className="sticky top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out -z-10"
        style={{
          backgroundImage: `url(${activeBg})`,
        }}
      >
        {/* DARK OVERLAY FOR READABILITY */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="absolute top-0 left-0 w-full h-full  mx-auto flex items-center py-10 px-4 z-10">
        <div className="flex gap-8 md:gap-20 justify-between md:justify-end w-full h-full items-center">

          {/* CONTENT SECTIONS - SCROLLABLE */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 md:flex-initial md:max-w-xl h-[100vh] overflow-y-auto overflow-x-hidden scrollbar-hide scroll-smooth pr-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex flex-col gap-8 py-8">
              {timelineData.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { 
                    sectionRefs.current[i] = el;
                  }}
                  className={`bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-10 text-white shadow-xl transition-all duration-500 overflow-hidden min-h-[250px] ${
                    activeIndex === i ? 'scale-105 bg-white/30' : 'scale-100'
                  }`}
                >
                  <p className="text-center mb-4 text-sm tracking-widest uppercase font-semibold">
                    {Math.floor(item.year)}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 overflow-hidden">
                    {item.title}
                  </h2>
                  <p className="text-center text-base md:text-lg opacity-90 overflow-hidden">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE YEARS */}
          <div className="flex flex-col gap-4 md:gap-6 h-fit text-white text-lg md:text-xl">
            {timelineData.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  isManualScroll.current = true;
                  setActiveIndex(i);
                  setActiveBg(item.image);
                  // Scroll to the corresponding section
                  sectionRefs.current[i]?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                  });
                }}
                className={`transition-all duration-300 font-semibold whitespace-nowrap ${
                  activeIndex === i
                    ? "border-2 px-3 md:px-4 py-2 rounded-full scale-110 bg-white/20"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
              >
                {Math.floor(item.year)}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>

  </>
  );
}
