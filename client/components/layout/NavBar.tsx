"use client";
import Link from "next/link";
import React, { useState } from "react";

import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
const globalHeadData = [
  {
    key: "Commercial ",
    dest: "/",
  },
  {
    key: "Residential ",
    dest: "/residential",
  },
  {
    key: "Builder/Pro ",
    dest: "/builder",
  },
];

const mediaData = [
  {
    key: "FaceBool",
    dest: "#",
  },
  {
    key: "Instagram ",
    dest: "#",
  },
  {
    key: "WhatsApp",
    dest: "#",
  },
];
export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className=" w-full bg-primaryTwo h-[3.125rem] justify-center flex items-center  z-100 sticky top-0 transition-all duration-300">
        <div className=" wrapper flex justify-between  items-center w-full">
          {/* Left Menu */}
          <div className="flex items-center">
            {globalHeadData.map((data, index) => (
              <React.Fragment key={index}>
                <Link
                  href={data.dest}
                  onClick={() => setActiveIndex(index)}
                  className={`px-3 h-[3.125rem] flex items-center font-medium text-sm min-[440px]:text-base sm:text-lg transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-white text-primaryTwo"
                      : "text-white hover:bg-white hover:text-primaryTwo mb-[2px]"
                  }`}
                >
                  {data.key}
                </Link>

                {index === 1 && <span className="text-white">|</span>}
              </React.Fragment>
            ))}
          </div>
          {/* Right Social Icons */}
          <div className="flex items-center sm:space-x-4 space-x-2 text-white text-sm">
            <Link
              href="#"
              className="hover:text-secondary-yellow-css transition-colors"
            >
              <FaFacebookF className=" text-lg sm:text-xl" />
            </Link>
            <Link
              href="#"
              className="hover:text-secondary-yellow-css transition-colors"
            >
              <FaWhatsapp className=" text-lg sm:text-xl" />
            </Link>
            <Link
              href="#"
              className="hover:text-secondary-yellow-css transition-colors"
            >
              <FaInstagram className=" text-lg sm:text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
