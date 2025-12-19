import React from 'react';
import SectionHeader from '../SectionHeader';

export default function SpecialDeals() {
  return (
    <div className="wrapper m-auto pt-16">
      <SectionHeader
        heading={'Specials & Offers'}
        headingCss="text-xl md:text-4xl font-bold !text-[#000] !capitalize !poppins-font"
        subHeading={
          'We offer you a carefully picked selection of on-trend high quality products from top brands in Canada'
        }
        subHeadingCss="sm:!text-[1rem] !text-sm md:!text-xl font-normal text-black !capitalize !poppins-font"
        mainCss="flex  flex-col items-center gap-3 text-center"
      />
    </div>
  );
}
