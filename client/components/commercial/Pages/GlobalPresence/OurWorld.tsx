import Image from "next/image";
import SectionHeader from "../../../common/SectionHeader";
import SwipeSlider from "../../../ui/SwipeSlider";

const teamData = [
  {
    id: 1,
    name: "UAE GOLDEN VISA BENEFITS",
    role: "Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.",
    image: "/images/commercial/why/why01.webp",
  },
  {
    id: 2,
    name: "UAE GOLDEN VISA BENEFITS",
    role: "Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.",
    image: "/images/commercial/why/why02.webp",
  },
  {
    id: 3,
    name: "UAE GOLDEN VISA BENEFITS",
    role: "Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.",
    image: "/images/commercial/why/why03.webp",
  },
  {
    id: 4,
    name: "UAE GOLDEN VISA BENEFITS",
    role: "Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.",
    image: "/images/commercial/why/why02.webp",
  },
  {
    id: 5,
    name: "UAE GOLDEN VISA BENEFITS",
    role: "Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.",
    image: "/images/commercial/why/why01.webp",
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

export function TeamCard({ item }: any) {
  return (
    <div className="relative overflow-hidden  shadow-lg rounded-sm">
      <div className="relative w-full h-[600px]">
        <Image src={item.image} alt={item.name} fill className="object-cover" />

        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-3xl  tracking-widest uppercase font-bold">
          {item.name}
        </h2>
        <p className="text-gray-300 text-sm mt-1 font-bold">{item.role}</p>
      </div>
    </div>
  );
}

export default function OurWorld() {
  return (
    <div>
      <div className="wrapper m-auto">
        <div className="py-10">
          <SectionHeader
            subHeading="Our world of luxury"
            headingCss={`text-darkBlue`}
            description="DAMAC Properties is renowned for developing luxurious residential towers, expansive master-planned communities, and exclusive island resort residences. Each project blends innovative design with exceptional amenities, offering an unparalleled living experience in prime locations around the world."
            mainCss={`flex flex-col items-center justify-center text-darkBlue `}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[100%] text-center align-middle  text-darkBlue `}
            subHeadingCss={`text-darkBlue uppercase  tracking-[0.6rem]`}
          />
        </div>

        <div className="pb-16">
          <SwipeSlider
            slidesPerView={3}
            bottomSwipeBtn={true}
            swipebtn={false}
            spaceBetween={10}
            autoPlay={false}
            loop={true}
            delay={1000}
            speed={8000}
            breakpoints={breakpoints}
          >
            {teamData.map((member) => (
              <TeamCard key={member.id} item={member} />
            ))}
          </SwipeSlider>
        </div>
      </div>
    </div>
  );
}
