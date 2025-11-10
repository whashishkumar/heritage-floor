import { title } from "process";
import Image from "next/image";
import SectionHeader from "../common/SectionHeader";
const MajorProjectData = [
  {
    image: "/images/commercial/majorProject/hyatt.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/Hyatt-Place-Logo.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/nationalBank.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/National_Bank_of_Canada-Logo.wine 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/shell.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/shell 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/tim.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/Toronto_Pearson_logo.svg 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/bramalea.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/BCC_black 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/toronto.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/Toronto_Pearson_logo.svg 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/rm.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/Royal_Ontario_Museum_logo.svg 1.png",
    title: "hyatt palace ",
  },
  {
    image: "/images/commercial/majorProject/york.png",
    area: "Worked Area 5000 sqft ",
    logo: "/images/commercial/majorProject/Logo_York_University 1.png",
    title: "hyatt palace ",
  },
];
export default async function OurMajorProjectsCommercial() {
  return (
    <>
      <div className="w-full h-full ">
        <div className=" wrapper  mx-auto">
          <div className=" w-full flex flex-col items-center justify-center ">
            <SectionHeader
              heading="Our major Projects"
              subHeading="Successful Projects We’ve Delivered"
              description="We’re proud to collaborate with leading clients, delivering projects that reflect innovation, precision, and lasting value. Each project showcases our commitment to quality and trust."
              mainCss="flex flex-col items-center justify-center  mt-[2rem]"
              subHeadingCss="text-center"
              descriptionCss="leading-[1.5] mb-[2rem] mt-[0.5rem] sm:w-[60%] w-[90%] text-center align-middle"
            />
          </div>
          <div className=" overflow-x-scroll lg:overflow-x-hidden flex lg:grid  lg:grid-cols-4 gap-2 space-y-2 lg:px-[5.063rem] mt-[1.75rem] lg:mt-[2.75rem]">
            {MajorProjectData.map((project: any, index: any) => (
              <div
                className={`h-[30.563rem]  min-w-[18.875rem] lg:max-w-[18.875rem] w-full relative rounded-[1.25rem] overflow-hidden ${
                  index % 2 !== 0 ? "" : "mt-[2.313rem]"
                }`}
                key={index}
              >
                <Image
                  src={
                    project.image || "/images/commercial/majorProject/hyatt.png"
                  }
                  alt={project.title || "hyatt"}
                  fill
                  className="object-center rounded-[1.25rem]"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 30.09%, rgba(0, 0, 0, 0.76) 84.69%)",
                  }}
                />
                <div
                  className={`absolute bottom-5 flex items-center  w-full  ${
                    index % 2 !== 0
                      ? "justify-between flex-row-reverse"
                      : "justify-between"
                  } `}
                >
                  {/* area */}
                  <div
                    className={`h-[3.813rem] w-[7.688rem] bg-primaryTwo text-white flex items-center justify-center ${
                      index % 2 !== 0 ? " rounded-l-full " : "rounded-r-full"
                    } `}
                  >
                    <div className=" text-wrap flex items-center justify-center w-[80%]  font-medium text-sm">
                      {project.area || "  Worked Area 5000 sqft"}
                    </div>
                  </div>
                  {/* logo */}
                  <div className="   h-[3.813rem] w-[7.688rem] text-white flex items-center justify-center ">
                    <div
                      className={`h-[3.813rem] w-[7.688rem] relative ${
                        index % 2 !== 0 ? " ml-4" : " mr-4"
                      } `}
                    >
                      <Image
                        src={
                          project.logo ||
                          "/images/commercial/majorProject/Hyatt-Place-Logo.png"
                        }
                        alt="hyatt"
                        fill
                        className=" object-contain py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
