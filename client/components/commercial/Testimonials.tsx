"use client";
import SectionHeader from "../common/SectionHeader";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import AutoPlay from "../common/Slider";
import TestimonialCard from "../ui/TestimonialCard";
import SwipeSlider from "../ui/SwipeSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTestimonials } from "@/store/slices/testimonialsSlice";
import Loader from "../ui/Loader";

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

const testimonialsDummy = [
  {
    name: "Emma Johnson",
    role: "Product Manager, Tech Solutions",
    rating: 5,
    feedback:
      "This widget has made our workflow incredibly efficient! The interface is user-friendly, and the performance is seamless. Customer support was quick to respond to our queries. Highly recommend!",
    image: "/images/testimonials/emma-johnson.jpg",
  },
  {
    name: "Michael Reynolds",
    role: "IT Consultant, Reynolds Systems",
    rating: 4,
    feedback:
      "We recently renovated our living room, and the new flooring completely transformed the space. The team helped us pick the perfect design, and the installation was smooth and professional.",
    image: "/images/testimonials/michael-reynolds.jpg",
  },
  {
    name: "Daniel Scott",
    role: "Small Business Owner",
    rating: 4,
    feedback:
      "As a café owner, I needed flooring that could handle high foot traffic while looking inviting. The results exceeded expectations, and our customers notice the difference.",
    image: "/images/testimonials/daniel-scott.jpg",
  },
  {
    name: "Ethan Russell",
    role: "Freelancer",
    rating: 3,
    feedback:
      "They made the whole process stress-free. From consultation to installation, everything was handled with care and precision. Our office now feels modern and professional.",
    image: "/images/testimonials/ethan-russell.jpg",
  },
  {
    name: "David Carter",
    role: "Operations Lead, Carter Enterprises",
    rating: 4,
    feedback:
      "A well-designed widget with great features, but it took some time to fully understand its functionality. A better onboarding guide would be helpful.",
    image: "/images/testimonials/david-carter.jpg",
  },
  {
    name: "Sarah Thompson",
    role: "Digital Marketer, Thompson Media",
    rating: 4,
    feedback:
      "The software has potential, but it crashes too often. Customer support was helpful, but I expected a more stable product.",
    image: "/images/testimonials/sarah-thompson.jpg",
  },
  {
    name: "Olivia Bennett",
    role: "Freelancer",
    rating: 3,
    feedback:
      "I had an issue with my order, and customer support was unresponsive. Took weeks to get a resolution. Disappointed!",
    image: "/images/testimonials/olivia-bennett.jpg",
  },
  {
    name: "Sophia Wilson",
    role: "Small Business Owner",
    rating: 5,
    feedback:
      "The support team was incredibly helpful and resolved my issue in minutes. One of the best experiences I’ve had!",
    image: "/images/testimonials/sophia-wilson.jpg",
  },
];

const breakpoints = {
  340: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 6,
    spaceBetween: 25,
  },
};

export default function TestimonialsCommercial() {
  const dispatch = useDispatch<any>();
  const { testimonials, loading } = useSelector(
    (state: any) => state?.testimonials
  );
  const { data } = testimonials || [];

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, []);

  if (loading) {
    return <Loader />;
  }

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
            <AutoPlay
              data={data}
              CardComponent={TestimonialCard}
              slideToShow={4}
              rtl={false}
              responsive={responsiveSettings}
            />
          </div>
          <div className="mt-[2rem]">
            <AutoPlay
              data={data}
              CardComponent={TestimonialCard}
              slideToShow={4}
              rtl={true}
              responsive={responsiveSettings}
            />
          </div>
        </div>
      </div>
    </>
  );
}
