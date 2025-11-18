import SectionHeader from "@/components/common/SectionHeader";
import TimelineSection from "./TimelineSection";

export default function OurHistory() {
  return (
    <>
        <div className="w-full flex flex-col items-center justify-center py-16 bg-white relative z-10">
          <SectionHeader
            subHeading="Our Legacy"
            headingCss={`text-darkBlue`}
            description="DAMAC Properties is more than just a luxury real estate development company; it's the result of two decades of hard work and a steady vision, dedicated to creating developments that tell extraordinary stories."
            mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
            subHeadingCss={`text-darkBlue   uppercase text-center`}
          />
          <SectionHeader
            description="For over 20 years, DAMAC Properties has been committed to shaping the UAE's urban landscape and has since expanded globally. What started as a venture has grown into a leading real estate developer in the Middle East, with luxury, sustainability, innovation, safety, and placemaking at its core."
            mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
            
            
          />
          <SectionHeader
            description="For over 20 years, DAMAC Properties has been committed to shaping the UAE's urban landscape and has since expanded globally. What started as a venture has grown into a leading real estate developer in the Middle East, with luxury, sustainability, innovation, safety, and placemaking at its core."
            mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
            
            
          />
        </div>
        <div className="relative">
          <TimelineSection/>
        </div>
  
    </>
  )
}
