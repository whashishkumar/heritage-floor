import SectionHeader from "@/components/common/SectionHeader";
import LatestAwards from "./LatestAwards";
import LeaderShipTeam from "./LeaderShipTeam";
import WorldCount from "./WorldCount";

export default function AboutUsPage(bgColor:any) {
  return (
		<>
    <div className="wrapper m-auto">
     <div className="w-full flex flex-col items-center justify-center py-16">
             <SectionHeader
               subHeading="ABOUT DAMAC"
               headingCss={ `text-darkBlue`}
               description="The DAMAC Group of Companies established its property development division with the formation of DAMAC Properties in 2002, which has since grown and expanded to become a globally recognised brand."
               mainCss={`flex flex-col items-center justify-center  ${
                 bgColor ? `text-white` : `text-darkBlue`
               }`}
               descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle ${
                  `text-darkBlue`
               }`}
               subHeadingCss={`text-darkBlue`}
             />
      </div>
    </div>
 <div className="relative w-full h-screen">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/images/commercial/aboutUs/aboutUsbg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="rounded-xl p-4 sm:p-10 bg-[#5889d1]/85  border border-white/60">
      <h1 className="poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] mb-4 font-extrabold uppercase tracking-widest text-white">
        DAMAC <br/>PROPERTIES
      </h1>
      <p className="text-center max-w-xl mx-auto text-base lg:text-lg text-white roboto-font">
        DAMAC Properties strives to set new standards for design, craftsmanship and inspired lifestyle. Whether it be
        master communities or iconic high-rise towers, DAMAC is redefining luxury living. As a leading luxury real
        estate developer, DAMAC believes in developing and nourishing superior residential communities that deliver
        outstanding return on investment, while offering residents differentiated properties and services.
      </p>
    </div>
  </div>
  </div>
      <WorldCount/>
      <LeaderShipTeam/>
      <LatestAwards/>
		</>
  )
}
