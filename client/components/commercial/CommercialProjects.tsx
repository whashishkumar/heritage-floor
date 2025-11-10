import Image from "next/image";
import SectionHeader from "../common/SectionHeader";
const videoData = [
  {
    id: 1,
    gif: "/gif/mp1.gif",
  },
  {
    id: 2,
    gif: "/gif/mp2.gif",
  },
  {
    id: 3,
    gif: "/gif/mp3.gif",
  },
];
export default async function CommercialProjects() {
  return (
    <>
      <div className="w-full h-full mt-[2rem] sm:mt-[4rem] ">
        <div className=" wrapper  mx-auto">
          <div className=" w-full flex flex-col items-center justify-center ">
            <SectionHeader
              heading="Explore our Wide Range of "
              subHeading="Some glimpses of our commercial projects"
              description="We’re proud to serve businesses who rely on us for timeless flooring, expert installation, and personalized care."
              mainCss="flex flex-col items-center justify-center  mt-[2rem]"
              subHeadingCss="text-center"
              descriptionCss="leading-[1.5] mb-[2rem] sm:mb-[4rem] mt-[1rem] sm:w-[80%] w-[85%] text-center align-middle"
            />
            <div className=" flex overflow-x-scroll lg:overflow-x-hidden lg:grid lg:grid-cols-3 gap-6 w-full ">
              {videoData.map((vdo, index) => (
                <div
                  className="h-[36.688rem] md:h-[44.688rem] max-w-[22.313rem] md:max-w-[28.313rem] relative overflow-hidden rounded-[1.25rem] w-full"
                  key={index}
                >
                  <Image
                    src={vdo.gif}
                    fill
                    alt="Major Project"
                    className="absolute top-0 left-0 w-full h-full object-cover "
                  />
                  <div className="absolute bottom-4 left-8 rounded-[0.75rem] flex flex-col  ">
                    <h1 className="text-xl leading-[2.7000] font-bold underline decoration-[1px] text-white mb-2 align-middle">
                      View Now
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
