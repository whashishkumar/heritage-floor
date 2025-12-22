'use client';
import SectionHeader from '../common/SectionHeader';
import Marquee from '../ui/Marquee';
import TestimonialCard from '../ui/TestimonialCard';

export default function TestimonialsCommercial({ testinomialsData }: any) {
  return (
    <>
      <div className="w-full h-full mb-[5rem]">
        <div className="wrapper  mx-auto">
          <div className=" w-full flex flex-col items-center justify-center ">
            <SectionHeader
              heading="Trusted by Our Clients"
              subHeading="Client Testimonials"
              description="We believe success is measured by the satisfaction of our clients. Here’s what they have to say about working with us."
              mainCss="flex flex-col items-center justify-center"
              descriptionCss="leading-[1.5] mb-[2rem] mt-[0.5rem] w-[60%] text-center align-middle"
            />
          </div>
          <div className="mt-[2rem]  ">
            {/* <AutoPlay
              data={testinomialsData}
              CardComponent={TestimonialCard}
              slideToShow={4}
              rtl={false}
              responsive={responsiveSettings}
            /> */}
            <Marquee direction="left" speed="normal" pauseOnHover={true}>
              <div className="flex space-x-6">
                {testinomialsData?.map((testimonial: any, index: number) => (
                  <div key={index}>
                    <TestimonialCard data={testimonial} />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
          <div className="mt-[2rem]">
            <Marquee direction="right" speed="normal" pauseOnHover={true}>
              <div className="flex space-x-6">
                {testinomialsData?.map((testimonial: any, index: number) => (
                  <div key={index}>
                    <TestimonialCard data={testimonial} />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}
