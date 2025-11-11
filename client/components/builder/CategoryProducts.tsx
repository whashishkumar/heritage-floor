"use client";
import React from "react";
import SectionHeader from "../common/SectionHeader";
import Image from "next/image";
import SwipeSlider from "../ui/SwipeSlider";
import Link from "next/link";

export interface Category {
  id: number;
  title: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Ceramic & Stone Tools",
    image: "/images/builder/categoryp1.png",
  },
  {
    id: 2,
    title: "Carpet Tools",
    image: "/images/builder/cat2.png",
  },
  {
    id: 3,
    title: "Heat Welding Tools",
    image: "/images/builder/cat03.png",
  },
  {
    id: 0,
    title: "Carpet Tools",
    image: "/images/builder/cat2.png",
  },
];

const breakpoints = {
  340: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 4,
    spaceBetween: 25,
  },
};
const CategoryProductsCard: React.FC<{ data: any }> = ({ data: product }) => {
  return (
    <div
      className="category-products relative h-[460px] px-3 py-8"
      key={product?.title}
    >
      <Image
        src={product?.image}
        alt="Category Product"
        width={440}
        height={460}
        className="object-cover rounded-lg h-full w-full"
      />
      <Link
        href={"builder/products"}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 border border-[#D9D9D9] backdrop-blur-lg bg-[#0C0C0C66]/70 px-6 py-3 rounded-lg text-center text-[#fff] font-medium w-[80%] cursor-pointer"
      >
        {product?.title}
      </Link>
    </div>
  );
};

export default function CategoryProducts() {
  return (
    <div className="wrapper mx-auto py-12">
      <SectionHeader
        heading="Category"
        headingCss="!text-xl md:!text-2xl  font-bold !text-[#000] !capitalize !poppins-font"
        subHeading="Products"
        subHeadingCss="!text-xl md:!text-2xl font-normal text-black !capitalize !poppins-font"
        mainCss="flex flex-row items-center gap-3 "
      />
      <SwipeSlider
        slidesPerView={3}
        bottomSwipeBtn={false}
        swipebtn={false}
        spaceBetween={10}
        autoPlay={true}
        breakpoints={breakpoints}
      >
        {categories?.map((card) => {
          return <CategoryProductsCard data={card} />;
        })}
      </SwipeSlider>
    </div>
  );
}
