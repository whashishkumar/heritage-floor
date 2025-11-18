import SectionHeader from "@/components/common/SectionHeader";
import { CiTrophy } from "react-icons/ci";


 const awardsData = [
  {
    id: 1,
    title: "Global Business Outlook Awards Ceremony",
    icon: CiTrophy,       
  },
  {
    id: 2,
    title: "International Property Awards",
    icon: CiTrophy,
  },
  {
    id: 3,
    title: "Luxury Lifestyle Awards",
    icon: CiTrophy,
  },
	  {
    id: 4,
    title: "Global Business Outlook Awards Ceremony",
    icon: CiTrophy,       
  },
  {
    id: 5,
    title: "International Property Awards",
    icon: CiTrophy,
  },
  {
    id: 6,
    title: "Luxury Lifestyle Awards",
    icon: CiTrophy,
  },
	  {
    id: 7,
    title: "Global Business Outlook Awards Ceremony",
    icon: CiTrophy,       
  },
  {
    id: 8,
    title: "International Property Awards",
    icon: CiTrophy,
  },
];


export  function AwardCard({ item }:any) {
  const Icon = item.icon;

  return (
    <div className="bg-[#f8f7f7]/70 rounded-2xl shadow-sm px-2 py-4  text-center w-[235px]">
      <Icon size={80} className="mx-auto mb-6 text-[#C9A96A]" />
 
      <h3 className="text-base font-medium text-gray-800 tracking-widest uppercase leading-relaxed">
        {item.title}
      </h3>
    </div>
  );
}
export default function LatestAwards() {
  return (
    <div className="bg-[#f8f7f7]/90">
       <div className="wrapper m-auto py-16 poppins-font ">
            <SectionHeader
                               subHeading="Latest Awards"
                               headingCss={ `text-darkBlue tracking-[0.8rem] text-[2rem] `}
                               description="DAMAC Properties accolades over the years reflect our commitment to excellence, innovation, and leadership in real estate. Our achievements are a testament to the hard work and dedication of our team and the trust of our valued clients and partners."
                               mainCss={`flex flex-col items-center justify-center  ${
                               `text-darkBlue`
                               }`}
                               descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[80%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
                               subHeadingCss={`text-darkBlue  uppercase text-center`}
            />  

   <div className=" gap-5 flex justify-center flex-wrap py-5">
        {awardsData.map((award) => (
          <AwardCard key={award.id} item={award} />
        ))}
      </div>
   
       </div>
			 
    </div>
  )
}
