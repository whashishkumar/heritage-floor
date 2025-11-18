import Image from "next/image";
import ButtonCommon from "../ui/Button";

export default function HeroSectionCommercial() {
  return (
    <>
      <div className="sm:h-[59.75rem] h-[45.75rem] w-full relative -mt-[4.563rem] md:px-0 px-[1.75rem] ">
        <video
          src="/videos/hertiage.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Bottom-left content box with gradient */}
        <div className=" relative h-full w-full flex items-center justify-center  ">
          <div className="absolute lg:bottom-24 lg:left-56   md:h-[27.375rem]  md:w-[55.25rem] w-fit  rounded-[0.75rem] flex flex-col px-[1.5rem] sm:px-[4rem] bg-black/40 py-[2rem]">
            <h1 className=" roboto-font lg:text-[4.938rem] text-[2.75rem] leading-[1.2025] font-medium text-white mb-2 align-middle ">
              Innovative Floors for Modern Workspaces
            </h1>
            <p className="inter-font text-white font-medium sm:text-[1.625rem] text-[1.25rem] align-middle ">
              Durable, stylish, and performance-driven flooring materials
              designed
            </p>
            <div className=" mt-[2rem]">
              <ButtonCommon
                cssParent=" bg-white "
                cssButtonName=" text-black"
                buttonName="Explore More"
                image="/icon/rightDown.png"
                link="/commercial/global-presence"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
