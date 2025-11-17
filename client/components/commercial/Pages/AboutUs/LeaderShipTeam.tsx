import Image from "next/image";
import SectionHeader from "../../../common/SectionHeader";
import SwipeSlider from "../../../ui/SwipeSlider";

const teamData = [
  {
    id: 1,
    name: "Sofyan Khatib",
    role: "Group Director",
    image: "/images/commercial/aboutUs/sofyan.webp", 
  },
  {
    id: 2,
    name: "John Doe",
    role: "Managing Director",
       image: "/images/commercial/aboutUs/john.webp", 
  },
  {
    id: 3,
    name: "Jane Smith",
    role: "Vice President",
          image: "/images/commercial/aboutUs/Danish.webp", 
  },
	  {
    id: 4,
    name: "John Doe",
    role: "Managing Director",
       image: "/images/commercial/aboutUs/john.webp", 
  },
  {
    id: 5,
    name: "Jane Smith",
    role: "Vice President",
          image: "/images/commercial/aboutUs/sandip.webp", 
  },
];


const breakpoints = {
  340: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  440: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  2000: {
    slidesPerView: 4,
    spaceBetween: 25,
  },
};

export  function TeamCard({ item }:any) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">

      <Image
        src={item.image}
        alt={item.name}
        width={600}
        height={800}
        className="w-full h-[600px] object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-2xl font-light tracking-widest uppercase">
          {item.name}
        </h2>
        <p className="text-gray-300 text-sm mt-1">{item.role}</p>
      </div>
    </div>
  );
}

export default function LeaderShipTeam() {
  return (
    <>
      <div className="wrapper m-auto">
         <SectionHeader
                       subHeading="LEADERSHIP TEAM"
                       headingCss={ `text-darkBlue tracking-[0.8rem] text-[2rem] `}
                       description="Our top management is deeply involved in shaping the company's long-term strategy, performance, culture, and values. Meet The DAMAC Group of Companies leadership team and learn more about them."
                       mainCss={`flex flex-col items-center justify-center  ${
                       `text-darkBlue`
                       }`}
                       descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
                       subHeadingCss={`text-darkBlue`}
                     />  
               
		<div className="py-16">
					<SwipeSlider  
								   slidesPerView={3}
              bottomSwipeBtn={true}
              swipebtn={false}
              spaceBetween={10}
              autoPlay={false}
              loop={false}
              delay={1000}
              speed={6000}
              breakpoints={breakpoints}>
        {teamData.map((member) => (
          <TeamCard key={member.id} item={member} />
        ))}

			</SwipeSlider>
		</div>
			 </div>
    </>
  )
}
