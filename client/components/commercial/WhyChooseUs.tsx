import { CommonComponentData } from "@/lib/api/commonEndPoints";
import SectionHeader from "../common/SectionHeader";

const _features = [
  {
    number: 1,
    title: "Timeless Designs",
    description:
      "We bring you flooring solutions that balance tradition with modern style, ensuring your home always looks elegant.",
    active: true,
  },
  {
    number: 2,
    title: "Premium Quality Materials",
    description:
      "From classic hardwood to durable vinyl and tile, we source only the best products for lasting performance.",
    active: false,
  },
  {
    number: 3,
    title: "Expert Installation",
    description:
      "Our skilled team ensures precise installation, giving your floors a flawless finish every time.",
    active: false,
  },
  {
    number: 4,
    title: "Personalized Service",
    description:
      "We take the time to understand your needs, offering customized solutions that fit your property.",
    active: false,
  },
  {
    number: 5,
    title: "Trusted Local Experts",
    description:
      "Proudly serving Vaughan, Windsor, Hamilton, and Ottawa with years of experience and a strong reputation.",
    active: false,
  },
];

export default async function WhyChooseUsCommercial({ bgColor }: { bgColor?: string }) {
  const whyChooseUs = await CommonComponentData.getWhyChooseUs();

  const _data = ["", ""];
  return (
    <div className={`w-full h-full pb-[5rem]   ${bgColor ? `bg-[${bgColor}] pt-16` : `bg-[#fff]`}`}>
      <div className="wrapper mx-auto">
        <div className=" w-full flex flex-col items-center justify-center">
          <SectionHeader
            heading="Our Promise to You"
            subHeading="Why Choose Us"
            headingCss={`${bgColor ? `text-white` : `text-darkBlue`}`}
            description="Heritage Floor & Home delivers durable, stylish flooring solutions that elevate commercial spaces, enhance functionality, and stand the test of time."
            mainCss={`flex flex-col items-center justify-center  ${
              bgColor ? `text-white` : `text-darkBlue`
            }`}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
              bgColor ? `text-white` : `text-darkBlue`
            }`}
            subHeadingCss={`${bgColor ? `text-white` : `text-darkBlue`}`}
          />
        </div>
        <div className="lg:mt-[2.75rem]">
          <div className="mx-auto">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0  rounded-[0.75rem] ${
                bgColor ? `` : `  md:border-0 lg:border  border-[#E8E8E8]`
              }`}
            >
              {whyChooseUs?.data?.slice(0, 5)?.map((feature: any, index: any) => (
                <div
                  key={index}
                  className={` 
                      md:mb-[2rem] lg:mb-0
                      ${
                        index < whyChooseUs?.data.length - 1
                          ? " border-[#E8E8E8]"
                          : "border-[#E8E8E8]"
                      } 
                    ${
                      index === 0 ? " md:pl-12 pl-8 pr-8 " : "pl-8 pr-11 "
                    } border-r-0 border-b md:border-b-0 md:border-r lg:border-r lg:last:border-r-0 py-8 ${
                      index === whyChooseUs?.data.length - 1 ? "pr-8" : ""
                    }`}
                >
                  {/* Number Circle */}
                  <div className="mb-8">
                    {feature.active ? (
                      <div
                        className={`w-[3.75rem] h-[3.75rem] rounded-full  flex items-center justify-center ${
                          bgColor ? "border-black border-2 bg-[#000]" : "bg-primaryTwo"
                        }`}
                      >
                        <span
                          className={`text-white text-2xl font-normal leading-[0.1245] ${
                            bgColor ? "border-black border-2 " : "text-darkBlue"
                          }`}
                        >
                          {feature.number}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`w-[3.75rem] h-[3.75rem] rounded-full border-1 border-black flex items-center justify-center ${
                          bgColor ? "bg-white" : ""
                        }`}
                      >
                        <span className="text-darkBluetext-2xl font-normal leading-[0.1245]">
                          {feature.number}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={` text-[1.625rem] font-normal text-darkBlue mb-4  leading-[1.2615] align-middle max-h-[4rem]  line-clamp-2 ${
                      bgColor ? "text-white" : "text-darkBlue"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-[#555555] text-base leading-[1.5000] font-medium align-middle ${
                      bgColor ? "text-white" : "text-darkBlue"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
