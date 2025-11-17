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
  const activeIndexRef = useRef(0);

  // Scroll listener disabled - years only change on manual click
  useEffect(() => {
    // Initialize first item as active
    setActiveIndex(0);
    setActiveBg(timelineData[0].image);
  }, []);

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
    <div className="relative w-full min-h-screen overflow-hidden isolate">

      {/* BACKGROUND IMAGE - ABSOLUTE (contained within section) */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${activeBg})`,
          zIndex: 0,
        }}
      ></div>

      {/* DARK OVERLAY FOR READABILITY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" style={{ zIndex: 1 }}></div>

      {/* MAIN CONTENT */}
      <div className="relative container mx-auto min-h-screen flex items-center py-20" style={{ zIndex: 10 }}>
        <div className="flex gap-20 justify-end w-full">

          {/* CONTENT SECTIONS - SCROLLABLE */}
          <div className="flex flex-col gap-10 scrollbar-hide max-w-xl h-[90vh] overflow-y-auto overflow-x-hidden  scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            {timelineData.map((item, i) => (
              <div
                key={i}
                ref={(el) => { 
                  sectionRefs.current[i] = el;
                }}
                className={`bg-white/20 rounded-2xl p-10 text-white shadow-xl transition-all duration-500 ${
                  activeIndex === i ? 'scale-105 bg-white/30' : 'scale-100'
                }`}
              >
                <p className="text-center mb-4 text-sm tracking-widest">
                  {Math.floor(item.year)}
                </p>
                <h2 className="text-3xl font-bold text-center mb-4">
                  {item.title}
                </h2>
                <p className="text-center text-lg opacity-90">{item.description}</p>
              </div>
            ))}
          </div>

              {/* TIMELINE YEARS */}
          <div className="flex flex-col gap-6 h-fit text-white text-xl">
            {timelineData.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIndex(i);
                  setActiveBg(item.image);
                  // Scroll to the corresponding section
                  sectionRefs.current[i]?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                  });
                }}
                className={`transition-all duration-300 ${
                  activeIndex === i
                    ? "border px-4 py-2 rounded-full scale-110"
                    : "opacity-70 hover:opacity-100"
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
