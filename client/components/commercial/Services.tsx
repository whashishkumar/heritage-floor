import Image from "next/image";
import SectionHeader from "../common/SectionHeader";
export default async function ServicesCommercial() {
  const flooringTypes = [
    {
      id: 1,
      title: "Carpet & Carpet Tile",
      image: "/images/commercial/services/Carpet.png",
    },
    {
      id: 2,
      title: "Sheet Vinyl",
      image: "/images/commercial/services/Sheet Vinyl.png",
    },
    {
      id: 3,
      title: "Hardwood & Laminate",
      image: "/images/commercial/services/Hardwood & Laminate.png",
    },
    {
      id: 4,
      title: "Rubber Flooring",
      image: "/images/commercial/services/Rubber Flooring.png",
    },
    {
      id: 5,
      title: "Vinyl Baseboard",
      image: "/images/commercial/services/Viny Baseboard.png",
    },
  ];
  return (
    <div
      className="w-full lg:h-[51.313rem] relative overflow-hidden lg:mt-[2rem] bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url('/images/commercial/services/serviceBackground.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className=" wrapper  mx-auto relative z-10 ">
        <div className=" w-full flex flex-col items-center justify-center">
          <SectionHeader
            heading="Services"
            subHeading="Flooring Types Available for Commercial Needs"
            description="If you’re in the Vaughan, Windsor, Hamilton, or Ottawa area and seeking timeless flooring solutions that combine elegance, durability, and expert installation, Heritage Floor & Home stands out as a trusted choice."
            mainCss="flex flex-col items-center justify-center mt-[4rem] md:mt-[6rem]"
            subHeadingCss=" text-white text-center"
            descriptionCss="leading-[1.5]  mt-[0.5rem] sm:w-[65%] w-[85%] text-center align-middle text-white leading-[1.5000]"
          />
          <div className="mt-[4rem] md:mt-[5.625rem] pb-[4rem]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-[4.125rem] ">
              {flooringTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex flex-col items-center group cursor-pointer  "
                >
                  {/* Circular Image */}
                  {/* <div className="relative w-48 h-48 md:w-[15.25rem] md:h-[15.25rem] mb-6 overflow-hidden rounded-full"> */}
                  <div className="relative w-[15.25rem] h-[15.25rem]  overflow-hidden rounded-full">
                    <Image
                      src={type.image}
                      alt={type.title}
                      height={30}
                      width={30}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primaryTwo opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white  text-xl md:text-[2.048rem] font-normal text-center align-middle mt-[2.688rem] leading-[1.3211]">
                    {type.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
