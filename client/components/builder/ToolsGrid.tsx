"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToolsAndEquimentsInfo } from "@/store/slices/builderSlice/toolsEquipmentSlice";

const toolsData = [
  { name: "Ceramic & Stone Tools", image: "/images/builder/stone.png" },
  { name: "Vinyl Tools", image: "/images/builder/vin.png" },
  { name: "Blades", image: "/images/builder/blade.png" },
  { name: "Carpet Tools", image: "/images/builder/carpettool.png" },
  { name: "Trowels", image: "/images/builder/trowels.png" },
  { name: "Jamb Saws", image: "/images/builder/jamb.png" },
  { name: "Common Tools", image: "/images/builder/common.png" },
  { name: "Jobsite Accessories", image: "/images/builder/jobsit.png" },
  { name: "Miscellaneous Power Tools", image: "/images/builder/micesll.png" },
  { name: "Safety & Material Handling", image: "/images/builder/safty.png" },
  { name: "Rug & Carpet Binding", image: "/images/builder/binding.png" },
];

export const ToolsAndEquiments = ({ data }: any) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-12 w-full mx-auto poppins-font">
      {data?.slice(0, 12)?.map((item: any) => (
        <Link
          href={"builder/products"}
          key={item.id || item.title}
          className="flex flex-col items-center text-center space-y-3"
        >
          <div className="max-w-[196px] max-h-[196px] rounded-full border border-[#CBC8C8] flex items-center justify-center overflow-hidden bg-white ">
            <Image
              src={item.image}
              alt={item.title || "image"}
              width={157}
              height={157}
              className="object-contain"
            />
          </div>
          <p className="font-medium text-black text-xl leading-[1.875rem] ">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

//card

export const InstallationSupplies = () => {
  return (
    <Link
      href={"builder/products"}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-12 w-full mx-auto poppins-font"
    >
      {toolsData?.map((item: any) => (
        <div key={item.name} className="flex flex-col items-center text-center space-y-3">
          <div className="max-w-[196px] max-h-[196px] rounded-full border border-[#CBC8C8] flex items-center justify-center overflow-hidden bg-white ">
            <Image
              src={item.image}
              alt={item.name || "alt"}
              width={157}
              height={157}
              className="object-contain"
            />
          </div>
          <p className="font-medium text-black text-xl leading-[1.875rem] ">{item.name}</p>
        </div>
      ))}
    </Link>
  );
};

export default function ToolsGrid() {
  const dispatch = useDispatch<any>();
  const [activeTab, setActiveTab] = useState("Tools & Equipment");
  const { tools } = useSelector((state: any) => state.tools);
  const data = tools?.data || [];

  useEffect(() => {
    dispatch(fetchToolsAndEquimentsInfo());
  }, [dispatch]);

  return (
    <div className="wrapper mx-auto py-10 px-4 sm:px-6 md:px-10 ">
      {/* Tabs */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <div className="inline-flex bg-[#018C99] rounded-lg p-1 poppins-font flex-wrap justify-center gap-2 sm:gap-0">
          {["Tools & Equipment", "Installation Supplies"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-medium rounded-lg transition-all duration-200 text-sm sm:text-base md:text-lg ${
                activeTab === tab
                  ? "bg-white text-black shadow-sm"
                  : "bg-transparent text-white hover:cursor-pointer"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {activeTab === "Tools & Equipment" ? (
        <Suspense fallback={<p>Loading...</p>}>
          <ToolsAndEquiments data={data} />
        </Suspense>
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <InstallationSupplies />
        </Suspense>
      )}
    </div>
  );
}
