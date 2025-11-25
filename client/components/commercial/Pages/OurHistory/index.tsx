import SectionHeader from '@/components/common/SectionHeader';
import TimelineSection from './TimelineSection';

export default function OurHistory({ourHistoryData}: any) {
  const {our_legacy,timelineData} = ourHistoryData || {};
  const { heading_legacy, description_one, description_two,description_three } = our_legacy || {};

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center py-16 bg-white relative z-10">
        <SectionHeader
          subHeading={heading_legacy}
          headingCss={`text-darkBlue`}
          description={description_one}
          mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
          subHeadingCss={`text-darkBlue   uppercase text-center`}
        />
        <SectionHeader
          description={description_two}
          mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
        />
        <SectionHeader
          description={description_three}
          mainCss={`flex flex-col items-center justify-center ${`text-darkBlue`}`}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${`text-darkBlue`}`}
        />
      </div>
      <div className="relative">
        <TimelineSection timelineData={timelineData} />
      </div>
    </>
  );
}
