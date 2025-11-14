"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import Accordion from "../ui/Accordian";
import SwipeSlider from "../ui/SwipeSlider";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { FaExclamationCircle } from "react-icons/fa";
import { ResidentailPageData } from "@/lib/api/residentialEndPoints";
import { useParams } from "next/navigation";

const benefits = [
  {
    id: 1,
    title: "Best price guarantee",
    description: "If you find a lower price, we will gladly match it!",
    icon: "/images/residential/dollar.png",
  },
  {
    id: 2,
    title: "30 days money back guarantee",
    description: "See our return policy.",
    icon: "/images/residential/sign01.png",
  },
  {
    id: 3,
    title: "Canadian business",
    description: "Learn more about us.",
    icon: "/images/residential/group01.png",
  },
];

const socialLinks = [
  {
    id: 1,
    icon: "/images/residential/fb.svg",
    link: "https://www.facebook.com/",
    alt: "Facebook",
  },
  {
    id: 2,
    icon: "/images/residential/insta.svg",
    link: "https://www.instagram.com/",
    alt: "Instagram",
  },
  {
    id: 3,
    icon: "/images/residential/whatsApp.svg",
    link: "https://web.whatsapp.com/",
    alt: "whatsApp",
  },
];

const productImages = [
  {
    id: 1,
    src: "/images/residential/prodetail.png",
    alt: "Product Thumbnail 1",
  },
  {
    id: 2,
    src: "/images/residential/prodetail.png",
    alt: "Product Thumbnail 2",
  },
  {
    id: 3,
    src: "/images/residential/prodetail.png",
    alt: "Product Thumbnail 3",
  },
];

const productImagesMoreAbstraction = [
  {
    id: 0,
    src: "/images/residential/abstract3.png",
    alt: "Product Thumbnail 1",
  },
  {
    id: 1,
    src: "/images/residential/abstract1.png",
    alt: "Product Thumbnail 1",
  },
  {
    id: 2,
    src: "/images/residential/abstract4.png",
    alt: "Product Thumbnail 2",
  },
  {
    id: 3,
    src: "/images/residential/abstract2.png",
    alt: "Product Thumbnail 3",
  },
  {
    id: 4,
    src: "/images/residential/abstract3.png",
    alt: "Product Thumbnail 1",
  },
  {
    id: 5,
    src: "/images/residential/abstract4.png",
    alt: "Product Thumbnail 2",
  },
  {
    id: 6,
    src: "/images/residential/abstract5.png",
    alt: "Product Thumbnail 3",
  },
  {
    id: 30,
    src: "/images/residential/abstract2.png",
    alt: "Product Thumbnail 3",
  },
  {
    id: 42,
    src: "/images/residential/abstract3.png",
    alt: "Product Thumbnail 1",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Description",
    answer:
      "Crafted with precision, this flooring features intricate mosaic patterns that bring texture, depth, and personality to any environment. Made from high-quality materials, it is engineered for long-lasting performance, easy maintenance, and resistance to daily wear. Whether you’re refreshing your home or designing a commercial space, the Abstract Mosaic Floor delivers both beauty and practicality.",
  },
  {
    id: 2,
    question: "Specifications",
    answer:
      '- Dimensions: 11.93" x 11.93"\n- PEI Rating: 4 (Suitable for heavy traffic areas)\n- Finish: Matte\n- Material: Durable ceramic/porcelain\n- Installation: Suitable for both residential and commercial applications\n- Maintenance: Easy to clean with regular sweeping and mopping\n- Warranty: 10-year limited warranty against manufacturing defects',
  },
  {
    id: 3,
    question: "FAQs",
    answer: "Q: Is this flooring suitable for outdoor use?",
  },
  {
    id: 4,
    question: "Additional Details",
    answer:
      "For more information about installation guidelines, care instructions, or to explore complementary products, please contact our customer service team or visit our website.",
  },
];

const breakpoints = {
  340: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 8,
    spaceBetween: 25,
  },
};

const ProductDetailPage = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [productDetail, setProductDetail] = useState(null);
  const { childSlug } = params;
  const { images }: any = productDetail || {};

  console.log(productDetail, "dataproductDetail");

  const handleSelectProductImage = (image: {
    id: number;
    src: string;
    alt: string;
  }) => {
    setSelectedImage(image);
  };

  const getProductDetails = async () => {
    const { data } = await ResidentailPageData.getProductDetail(childSlug);
    setProductDetail(data);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="wrapper m-auto py-12">
      <div className="p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-15">
        <div className="mb-4 lrft-col">
          <div className="overflow-hidden rounded-2xl ">
            <InnerImageZoom
              src={selectedImage.src}
              zoomSrc={selectedImage.src}
              width={750}
              height={500}
              hasSpacer={true}
              imgAttributes={{
                className:
                  "rounded-2xl object-cover w-full h-[400px] lg:h-[500px]",
                alt: selectedImage.alt,
              }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 py-10">
            {productImages.map((image) => (
              <div
                key={image.id}
                className={`cursor-pointer rounded-lg overflow-hidden border w-[120px] h-[80px] p-2 ${
                  selectedImage.id === image.id
                    ? "border-[#018C99] p-0.5"
                    : "border-transparent"
                }`}
                onClick={() => handleSelectProductImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={120}
                  height={80}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="border  border-[#DDDDDD] p-6 rounded-2xl bg-[#F6F6F6]">
            {benefits?.map((benefit) => (
              <div key={benefit.id} className="flex gap-4 mb-6 poppins-font">
                <div className="flex items-start justify-center  ">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    height={40}
                    width={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl  mb-2 text-black font-semibold">
                    {benefit.title}
                  </h3>
                  <Link href="#">
                    <p className="text-black text-sm font-normal underline">
                      {benefit.description}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          <div className="flex gap-4 items-center">
            {socialLinks?.map((social) => (
              <Link key={social.id} href={social.link} target="_blank">
                <Image
                  src={social.icon}
                  alt={social.alt}
                  height={20}
                  width={20}
                  className="object-contain w-5 h-5 cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="right-col ">
          {/* Product Information */}
          <div className="mb-4 poppins-font">
            <p className="text-base mb-2 font-medium">
              SKU: mOSAIC18BW{" "}
              <span className="ml-2 text-[#018C99] font-medium">
                By Hertiage
              </span>
            </p>
            <h2 className="font-medium mb-2 text-[1.688rem] text-black">
              Abstract Mosaic
            </h2>
            <p className="text-base mb-2 text-black">
              11.93" x 11.93" | PEI of 4 - Heavy Traffic | Matte
            </p>
            <p className="text-[1.688rem] font-bold">$9.20 / sq. ft</p>
            <p className="text-sm mt-2 text-black">
              $75.45 / box (9.9 sq. ft. / box)
            </p>
            <p className="bg-[#FFC107] p-3 px-4  poppins-font mt-4 w-fit flex items-center ">
              <span className="text-sm text-black font-medium">
                Want a better Price?
              </span>{" "}
              <span className="font-bold flex justify-center items-center gap-2 ">
                Ask for a quote!
                <FaExclamationCircle size={14} />
              </span>
            </p>
            <p className="mt-4">
              <Image
                src="/images/residential/Unread.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-medium text-[1rem]">
                In stock and ready to ship
              </span>
            </p>
            <div className="mt-4">
              <Image
                src="/images/residential/delivery01.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-semibold text-[1rem]">
                Scheduled Delivery: $80.00
              </span>
              <div className="mt-2 text-sm">
                Get it in 2 - 4 business days or on your preferred date
                <p className=" ">
                  Delivery to : 
                  <span className="underline cursor-pointer text-[#018C99] font-medium">
                    Toronto - Mos18BW
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Image
                src="/images/residential/calculation.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <span className="text-black font-semibold text-[1rem]">
                How many do you need ?
              </span>
              <Link href="#" className="underline ml-2 text-sm  font-medium">
                <p className="mt-2 text-sm">Use our flooring area calculator</p>
              </Link>
            </div>
          </div>
          {/* Quantity and Add to Cart */}
          <div className="mb-4 flex items-start flex-col">
            <div>
              <form>
                <div className="relative w-[312px] h-[56px]">
                  <input
                    type="number"
                    id="quantity"
                    className="w-full h-full border rounded text-sm border-[#018C99] outline-none p-4 pr-12 "
                    defaultValue="1"
                    placeholder="Enter the quantity"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-600">
                    sq.ft
                  </span>
                </div>
              </form>
            </div>
            <p className="mt-2 text-sm">
              Shipping fees based on minimum of 138 sq. ft.. We will contact you
              if additional fees apply.
            </p>
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          {/* Buttons */}
          <div className="flex flex-col mb-4 space-y-4 ">
            <button className="bg-[#018C99] hover:cursor-pointer text-white font-semibold py-4 px-2 rounded-2xl text-sm flex gap-2 justify-center items-center">
              Add To Cart
              <BsCart4 size={18} />
            </button>
            <div className="flex gap-4">
              <button className="bg-[#F5F5F5] hover:cursor-pointer   py-2 px-2 rounded-2xl text-lg mb-4 border border-[#018C99] font-semibold w-[540px] md:w-full">
                Ask For Quote
                <p className="mt-1 text-xs">
                  Get custom pricing for your project
                </p>
              </button>
              <button className="bg-[#F5F5F5] hover:cursor-pointer   py-2 px-2 rounded-2xl text-lg mb-4 border border-[#018C99] font-semibold">
                <CiHeart size={26} />
              </button>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="mb-4 poppins-font">
            <div className="flex justify-start items-center ">
              <Image
                src="/images/residential/delivery01.png"
                alt="In Stock"
                height={20}
                width={20}
                className="inline-block mr-2 object-contain"
              />
              <h2 className="font-medium  text-xl text-black">
                Shipping Options
              </h2>
            </div>
            <div className="py-2">
              <div className=" text-xs">
                Delivery to : 
                <Link href={"#"}>
                  <span className="underline cursor-pointer  font-medium">
                    Toronto - Mos18BW
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex gap-10 py-4">
              <div className="bg-white p-6 rounded-lg border border-[#DDDDDD]">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/images/residential/warehouse1.svg"
                    alt="In Stock"
                    height={37}
                    width={37}
                    className=" object-contain"
                  />
                </div>
                <h2 className="text-base font-semibold text-black mb-2 text-center">
                  Warehouse Pickup
                </h2>
                <p className="mb-2 text-center font-normal text-sm">
                  Vaughan, ON
                </p>
                <p className=" mb-2 text-center font-normal text-sm">
                  2 - 4 Business Days
                </p>
                <p className="text-center font-normal font-normal text-sm">
                  Free
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#DDDDDD]">
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src="/images/residential/delivery-truck1.svg"
                    alt="In Stock"
                    height={37}
                    width={37}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-base font-semibold text-black mb-2 text-center">
                  Scheduled Delivery
                </h2>
                <p className="mb-2 text-center font-normal text-sm">
                  2 - 4 business days{" "}
                </p>
                <p className="mb-2 text-center font-normal text-sm">$80.00</p>
              </div>
            </div>
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] my-5"></p>
          {/* More Abstractions */}
          <div className="poppins-font">
            <div className="flex justify-start items-center gap-2 ">
              <Image
                src="/images/residential/calander.png"
                alt="In Stock"
                height={18}
                width={18}
                className="object-contain"
              />
              <h2 className="font-medium  text-xl text-black">
                Visit more Abstract Mosaic 6 products
              </h2>
            </div>
            <div className="flex gap-4 py-10 ">
              <SwipeSlider
                slidesPerView={6}
                bottomSwipeBtn={false}
                swipebtn={true}
                spaceBetween={10}
                autoPlay={false}
                breakpoints={breakpoints}
              >
                {productImagesMoreAbstraction?.map((image) => (
                  <div
                    key={image.id}
                    className="cursor-pointer w-[78px] h-[78px] overflow-hidden rounded-lg"
                    onClick={() => handleSelectProductImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={78}
                      height={78}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </SwipeSlider>
            </div>
          </div>
          <p className=" bg-[#F1F1F1] h-[1px] "></p>
          {/* Description */}
          <div className="accordian-section">
            <Accordion faqs={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
