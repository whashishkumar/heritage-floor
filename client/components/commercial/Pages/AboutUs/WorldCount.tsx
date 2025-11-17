import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";
import { CiDeliveryTruck, CiHospital1 } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";



 const statsData = [
  {
    id: 1,
    icon: CiDeliveryTruck,
    value: "48,000+",
    label: "Units delivered",
  },
  {
    id: 2,
    icon: CiHospital1,
    value: "50,000+",
    label: "Units in progress and planning",
  },
  {
    id: 3,
    icon: IoKeyOutline,
    value: "100+ M Sq.ft.",
    label: "Project area in planning and progress",
  },
];

export default function WorldCount() {
  return (
   <div className="wrapper m-auto">
     <div className="w-full flex flex-col items-center justify-center py-16 poppins-font">
        <div className="mb-8 lg:mb-18">
            <Image src={"/images/commercial/aboutUs/countTag.webp"} height={80} width={80} alt="tag" />
        </div>
        <div>
        <SectionHeader
               subHeading="A WORLD OF LUXURY"
               headingCss={ `text-darkBlue tracking-[0.7rem] text-[2rem] `}
               description="From world-class master communities and luxurious residential towers to expansive master-planned developments and exclusive island resort residences, DAMAC Properties is renowned for creating projects that blend innovative design with exceptional amenities, offering an unparalleled living experience in prime locations around the globe."
               mainCss={`flex flex-col items-center justify-center  ${
               `text-darkBlue`
               }`}
               descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
               subHeadingCss={`text-darkBlue`}
             />  
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center w-full poppins-font">
            {statsData?.map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.id} className="flex flex-col items-center py-6">
                    <Icon className="text-[#C9A96A] mb-4" size={60} />
                    <h2 className="text-4xl sm:text-5xl font-medium text-black tracking-wide">
                    {item.value}
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">{item.label}</p>
                </div>
                );
            })}
    </div>
            <div className="my-20 w-full">
                     <div className="relative w-full h-[38rem] ">
  <div
    className="absolute inset-0 rounded-2xl"
    style={{
      backgroundImage: "url('/images/commercial/aboutUs/aboutCountbg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div className="relative w-full h-full flex items-center justify-end pr-15">
    <div className="rounded-xl p-4 sm:p-10 bg-[#858a82]/85  border border-white/60 ">
      <h1 className="tracking-[0.8rem] poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] font-extrabold uppercase tracking-widest text-white">
       Hussain Sajwani

      </h1>
      <p className="poppins-font text-center font-normal t text-white mb-4 uppercase">Founder</p>
      <p className="text-center w-[420px] mx-auto text-base lg:text-lg text-white roboto-font">
        Hussain Sajwani is an Emirati global entrepreneur, self-made billionaire, and founder of The DAMAC Group of Companies.
      </p>
      <button className="bg-white text-gray-500 py-4 w-full rounded-full uppercase mt-6">Reaed More</button>
    </div>
  </div>
  </div>
            </div>
      </div>
    </div>
  )
}
