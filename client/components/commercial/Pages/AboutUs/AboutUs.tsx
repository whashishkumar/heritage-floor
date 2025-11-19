import SectionHeader from "@/components/common/SectionHeader";
import { CiDeliveryTruck, CiHospital1 } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import WorldCount from "../Common/WorldCount";
import LatestAwards from "./LatestAwards";
import LeaderShipTeam from "./LeaderShipTeam";
import { CommercialPageData } from "@/lib/api/commercialEndPoints";


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

const pageTitle = {
    tag:'A WORLD OF LUXURY',
    description:"From world-class master communities and luxurious residential towers to expansive master-planned developments and exclusive island resort residences, DAMAC Properties is renowned for creating projects that blend innovative design with exceptional amenities, offering an unparalleled living experience in prime locations around the globe."
  }



export default  async function AboutUsPage(bgColor:any) {

  const data= await CommercialPageData.getAboutUsPageDetail()
  const {about_us_intro,second_section,pageTitle,statsData,Founder,team} = data
  const bgImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${second_section?.[0]?.profile_image}`;

  
  return (
		<>
    <div className="wrapper m-auto">
     <div className="w-full flex flex-col items-center justify-center py-16">
             <SectionHeader
               subHeading={about_us_intro?.[0]?.heading}
               headingCss={ `text-darkBlue`}
               description={about_us_intro?.[0]?.description}
               mainCss={`flex flex-col items-center justify-center  ${
                 bgColor ? `text-white` : `text-darkBlue`
               }`}
               descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
                  `text-darkBlue`
               }`}
               subHeadingCss={`text-darkBlue  uppercase text-center`}
             />
      </div>
    </div>
 <div className="relative w-full h-screen">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="rounded-xl p-4 sm:p-10 bg-[#5889d1]/85  border border-white/60">
      <h1 className="poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] mb-4 font-extrabold uppercase tracking-widest text-white">
       {second_section?.[0]?.second_heading}
      </h1>
      <p className="text-center max-w-xl mx-auto text-base lg:text-lg text-white roboto-font">
        {second_section?.[0]?.second_description}
      </p>
    </div>
  </div>
  </div>
      <WorldCount statsData={statsData} pageTitle={pageTitle} Founder={Founder}/>
      <LeaderShipTeam team={team}/>
      <LatestAwards/>
		</>
  )
}
