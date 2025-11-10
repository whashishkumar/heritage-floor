"use client";
import React from "react";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../commercial/Product";
import { useRouter } from "next/navigation";

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
}
const products: Product[] = [
  {
    id: 1,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/pcrain.png",
  },
  {
    id: 11,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p01.png",
  },
  {
    id: 12,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p02.png",
  },
  {
    id: 121,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p03.png",
  },
];

export default function BestsellerProducts({ data }: any) {
  const router = useRouter();

  const handleViewAllProducts = () => {
    router.push("/builder/products");
  };

  return (
    <>
      <div className="bg-[#F4F4F4]">
        <div className="py-12 wrapper mx-auto">
          <div className="flex justify-between items-center">
            <SectionHeader
              heading={data.heading}
              headingCss="text-xl md:text-4xl font-bold !text-[#000] !capitalize !poppins-font"
              subHeading={data.subHeading}
              subHeadingCss=" sm:!text-xl !text-xl md:!text-4xl font-normal text-black !capitalize !poppins-font"
              mainCss="flex flex-row items-center gap-3"
            />
            <button
              className="cursor-pointer poppins-font text-sm md:text-base lg:text-lg capitalize font-medium text-[#000]"
              onClick={handleViewAllProducts}
            >
              View more
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
