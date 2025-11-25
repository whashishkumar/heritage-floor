'use client';
import { useEffect, useRef, useState } from 'react';

export default function TimelineSection({ timelineData }: any) {
  const { t_data } = timelineData || {};
  const [activeBg, setActiveBg] = useState(t_data[0]?.image);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isManualScroll = useRef(false);
  const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE;

  // Scroll listener to auto-select cards based on scroll position (using window scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) {
        isManualScroll.current = false;
        return;
      }
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
        setActiveBg(timelineData[closestIndex]?.image);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  return (
    <>
      <div className="relative w-full min-h-screen">
        {/* BACKGROUND IMAGE - FIXED */}
        <div
          className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${imagePath}${activeBg})`,
            zIndex: -1,
          }}
        >
          {/* DARK OVERLAY FOR READABILITY */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* MAIN CONTENT */}
        <div className="relative w-full mx-auto py-10 md:py-20 px-4">
          <div className="flex gap-8 md:gap-20 justify-between md:justify-end w-full items-start">
            {/* CONTENT SECTIONS - SCROLLABLE WITH PAGE */}
            <div ref={scrollContainerRef} className="flex-1 md:flex-initial md:max-w-xl pr-4">
              <div className="flex flex-col gap-8 py-8">
                {t_data?.map((item: any, i: any) => (
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
                      {Math.floor(item?.year)}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 overflow-hidden">
                      {item?.title}
                    </h2>
                    <p className="text-center text-base md:text-lg opacity-90 overflow-hidden">
                      {item?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TIMELINE YEARS - STICKY */}
            <div className="sticky top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 h-fit text-white text-lg md:text-xl mt-30">
              {t_data?.map((item: any, i: any) => (
                <button
                  key={i}
                  onClick={() => {
                    isManualScroll.current = true;
                    setActiveIndex(i);
                    setActiveBg(item?.image);
                    // Scroll to the corresponding section
                    sectionRefs.current[i]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                  }}
                  className={`transition-all duration-300 font-semibold whitespace-nowrap ${
                    activeIndex === i
                      ? 'border-2 px-3 md:px-4 py-2 rounded-full scale-110 bg-white/20'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  {Math.floor(item?.year)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
