"use client";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "./ProductCard";
import SwipeSlider from "../ui/SwipeSlider";
import { useState } from "react";
import ModalBox from "../ui/ModalBox";
import QueryForm from "../common/QuearyForm";
export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      category: "Carpet",
      name: "Abstract Mosaic",
      brand: "Nourison",
      price: 345,
      rating: 5,
      image: "/images/residential/product/abstractMosaic.png",
    },
    {
      id: 2,
      category: "Carpet",
      name: "Accra",
      brand: "Stanton",
      price: 345,
      rating: 5,
      image: "/images/residential/product/accra.png",
    },
    {
      id: 3,
      category: "Hardwood",
      name: 'Bluenoae Lake 7"',
      brand: "Provenza",
      price: 325,
      rating: 5,
      image: "/images/residential/product/bluenoae.png",
    },
    {
      id: 4,
      category: "Hardwood",
      name: "Baffin Island",
      brand: "Provenza",
      price: 245,
      rating: 5,
      image: "/images/residential/product/accra.png", // replace with actual image path
    },
  ];
  const breakpoints = {
    340: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    440: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 1.6,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1.8,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.7,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3.1,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 3.1,
      spaceBetween: 20,
    },
  };
  const [quearyModalOpen, setQuearyModalOpen] = useState(false);

  const handleOpenModal = () => setQuearyModalOpen(true);
  const handleCloseModal = () => setQuearyModalOpen(false);

  return (
    <>
      <div className="w-full h-full  flex items-center justify-center mb-[5rem] ">
        <div className=" wrapper w-full mx-auto  ">
          <SectionHeader
            heading="FEATURED PRODUCTS"
            subHeading="Our Featured Products"
            mainCss=""
            headingCss=" font-semibold text-base tracking-[1.4px]"
            subHeadingCss=" text-[2.5rem] font-bold leading-[1.3500] text-black align-middle"
          />
          <div className="mt-[2rem] flex w-full   ">
            <SwipeSlider
              slidesPerView={3.1}
              bottomSwipeBtn={false}
              swipebtn={false}
              spaceBetween={10}
              autoPlay={true}
              loop={true}
              delay={1000}
              speed={1000}
              breakpoints={breakpoints}
            >
              {products.map((data, index) => (
                <div className=" w-full" key={index}>
                  <ProductCard data={data} handleOpenModal={handleOpenModal} />
                </div>
              ))}
            </SwipeSlider>
          </div>

          <ModalBox isOpen={quearyModalOpen} onClose={handleCloseModal}>
            <QueryForm onClose={handleCloseModal} />
          </ModalBox>
        </div>
      </div>
    </>
  );
}
