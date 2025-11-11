"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoriesResidential {
  id: number;
  name: string;
  image: string;
}
interface CategoriesResidentialProps {
  data: CategoriesResidential[];
}
export default function CategoriesResidential({
  data,
}: CategoriesResidentialProps) {
  const categories = [
    {
      id: 1,
      name: "Hardwood",
      image: "/images/residential/category/hardWood.jpg",
    },
    {
      id: 2,
      name: "Laminate",
      image: "/images/residential/category/laminate.jpg",
    },
    {
      id: 3,
      name: "Tile & Store",
      image: "/images/residential/category/tile&store.jpg",
    },
    {
      id: 4,
      name: "Carpet",
      image: "/images/residential/category/carpet.jpg",
    },
    {
      id: 5,
      name: "Vinyl & LVT",
      image: "/images/residential/category/vinyl.jpg",
    },
    {
      id: 6,
      name: "Eco-Friendly Options",
      image: "/images/residential/category/Eco.jpg",
    },
  ];
  const router = useRouter();

  const handleCategoryDetail = (category: any) => {
    const { name } = category;
    router.push(`/residential/products/${name}`);
  };

  return (
    <>
      <div className="w-full min-h-[35.688rem] h-full relative flex flex-col items-center justify-center ">
        <div
          className="absolute inset-0 bg-cover opacity-5  bg-no-repeat overflow-hidden z-0"
          style={{
            backgroundImage: "url('/images/commercial/aboutUs/bg.png')",
          }}
        />
        <div className="absolute top-0 bg-gradient-to-b from-white via-white/10 to-transparent min-h-[6.938rem]  w-full  z-10"></div>
        <div className="absolute bottom-0 bg-gradient-to-b from-transparent via-white/10 to-white min-h-[6.938rem]   w-full "></div>
        <div className=" wrapper w-full mx-auto flex flex-col items-center justify-center mb-[2rem] relative z-20">
          <div className=" font-bold text-black text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem]">
            Categories
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-[2.5rem]">
            {data.map((categ: CategoriesResidential, index: number) => (
              <div
                className="h-[18.5rem] w-[14rem]  flex flex-col justify-between group"
                key={categ.id}
              >
                <div className=" h-[14rem] w-[14rem] rounded-[7rem] overflow-hidden relative">
                  <Image
                    src={categ.image}
                    alt={categ.name}
                    fill
                    className=" object-cover group-hover:scale-105 ease-in-out duration-300 "
                  />
                </div>
                <button
                  className="w-full h-[3.563rem] bg-black rounded-[0.625rem] cursor-pointer flex items-center justify-center"
                  onClick={() => handleCategoryDetail(categ)}
                >
                  <div className="text-white text-lg font-bold align-middle ">
                    {categ?.name || " "}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
