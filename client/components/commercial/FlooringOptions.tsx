import SectionHeader from "../common/SectionHeader";
import FlooringOptionsCard from "./FlooringOptionCard";
import FlooringTeamSlider from "./FlooringOptionSlider";
export default async function FlooringOptionsCommercial() {
  const teamMembers = [
    {
      name: "Nav Brar",
      designation: "Director",
      email: "Nbrar@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/1.png",
      bgColor: "bg-[#E5F3EC]", // replace with actual image path
    },
    {
      name: "Mandy Brar",
      designation: "Managing Director",
      email: "Mandy@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/2.png",
      bgColor: "bg-[#F8E3E3]", // replace with actual image path
    },
    {
      name: "Vikram Brar",
      designation: "Marketing Manager",
      email: "Vbrar@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/3.png", // replace with actual image path
      bgColor: "bg-[#E3EFF8]",
    },
    {
      name: "Parm Gill",
      designation: "Operations Manager",
      email: "Pgill@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/4.png", // replace with actual image path
      bgColor: "bg-[#F8E3E3]",
    },
    {
      name: "Nav Brar",
      designation: "Director",
      email: "Nbrar@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/1.png",
      bgColor: "bg-[#E5F3EC]", // replace with actual image path
    },
    {
      name: "Mandy Brar",
      designation: "Managing Director",
      email: "Mandy@Gtaflooringcanada.Ca",
      image: "/images/commercial/flooringOptions/2.png",
      bgColor: "bg-[#F8E3E3]", // replace with actual image path
    },
  ];

  return (
    <div className="w-full h-full mb-[5rem] mt-[4rem]">
      <div className=" wrapper  mx-auto">
        <div className=" w-full flex flex-col items-center justify-center  ">
          <SectionHeader
            heading="Explore our Wide Range of "
            headingCss="text-base leading-[1.4px font-normal] tracking-[1.4px]"
            subHeading="Flooring Options"
            description="We’re proud to serve businesses who rely on us for timeless flooring, expert installation, and personalized care."
            mainCss="flex flex-col items-center justify-center  mt-[2rem]"
            descriptionCss="leading-[1.5]  mt-[1rem] w-[85%] text-center align-middle"
          />

          <div className="w-full lg:grid lg:grid-cols-4 gap-4">
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto overflow-y-clip lg:overflow-x-hidden lg:hidden no-scrollbar">
              {teamMembers.map((team, index) => (
                <div
                  key={index}
                  className="w-[80%] sm:w-[60%] md:w-[45%]" // adjust width per card
                >
                  <FlooringOptionsCard team={team} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className=" hidden lg:block ">
            <FlooringTeamSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
