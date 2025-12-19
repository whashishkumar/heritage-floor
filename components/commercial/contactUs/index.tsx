import QueryForm from '@/components/common/QuearyForm';
import SectionHeader from '@/components/common/SectionHeader';
import React from 'react';
import ReachUs from './ReachUs';
import AddressCards from './AddressCards';

export default function ContactUs({ contactUsData }: any) {
  const { map, reachUs, socialNetworks, intro } = contactUsData || {};
  const { heading, subheading } = intro || {};

  return (
    <>
      <div className="wrapper m-auto">
        <div className="py-16">
          <div className="bg-gray-20">
            <SectionHeader
              subHeading={heading}
              description={subheading}
              headingCss={`text-darkBlue capitalize text-center `}
              descriptionCss="leading-[1.8889] warapper max-w-7xl text-center py-2 "
              mainCss={`flex flex-col items-center justify-center pb-12 `}
              subHeadingCss={`text-darkBlue  uppercase text-center !capitalize`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-10 lg:gap-20">
              <ReachUs map={map} socialNetworks={socialNetworks} />
              <QueryForm title="Send Us A Message" />
            </div>
          </div>
          <AddressCards reachUs={reachUs} />
        </div>
      </div>
    </>
  );
}
