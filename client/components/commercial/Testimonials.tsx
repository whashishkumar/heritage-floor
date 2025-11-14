"use client";
import SectionHeader from "../common/SectionHeader";
import AutoPlay from "../common/Slider";
import TestimonialCard from "../ui/TestimonialCard";

const responsiveSettings = [
  {
    breakpoint: 1420,
    settings: { slidesToShow: 4, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 1200,
    settings: { slidesToShow: 3.5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 1050,
    settings: { slidesToShow: 3.5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 770,
    settings: { slidesToShow: 3, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 650,
    settings: { slidesToShow: 3, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 570,
    settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 525,
    settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 450,
    settings: { slidesToShow: 1.75, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 400,
    settings: { slidesToShow: 1.5, slidesToScroll: 1, centerMode: false },
  },
  {
    breakpoint: 350,
    settings: { slidesToShow: 1.25, slidesToScroll: 1, centerMode: false },
  },
];

export default function TestimonialsCommercial({ testinomialsData }: any) {
  return (
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
          <AutoPlay
            data={testinomialsData}
            CardComponent={TestimonialCard}
            slideToShow={4}
            rtl={false}
            responsive={responsiveSettings}
          />
        </div>
        <div className="mt-[2rem]">
          <AutoPlay
            data={testinomialsData}
            CardComponent={TestimonialCard}
            slideToShow={4}
            rtl={true}
            responsive={responsiveSettings}
          />
        </div>
      </div>
    </div>
  );
}
