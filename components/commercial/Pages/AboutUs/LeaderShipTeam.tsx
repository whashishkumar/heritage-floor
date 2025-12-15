import Image from 'next/image';
import SectionHeader from '../../../common/SectionHeader';
import SwipeSlider from '../../../ui/SwipeSlider';

const teamData = [
  {
    id: 1,
    name: 'Sofyan Khatib',
    role: 'Group Director',
    image: '/images/commercial/aboutUs/sofyan.webp',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Managing Director',
    image: '/images/commercial/aboutUs/john.webp',
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Vice President',
    image: '/images/commercial/aboutUs/Danish.webp',
  },
  {
    id: 4,
    name: 'John Doe',
    role: 'Managing Director',
    image: '/images/commercial/aboutUs/john.webp',
  },
  {
    id: 5,
    name: 'Jane Smith',
    role: 'Vice President',
    image: '/images/commercial/aboutUs/sandip.webp',
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
  const teamMember = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${item?.profile_image}`;
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
 { teamMember &&    <Image
        src={teamMember}
        alt={item.name || 'member'}
        width={600}
        height={800}
        className="w-full h-[600px] object-cover"
      />}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-2xl font-light tracking-widest uppercase">{item.title}</h2>
        <p className="text-gray-300 text-sm mt-1">{item.designation}</p>
      </div>
    </div>
  );
}

export default function LeaderShipTeam({ team }: any) {
  const { title, description, members } = team || {};

  return (
    <div>
      <div className="wrapper m-auto">
        <SectionHeader
          subHeading={title}
          headingCss={`text-darkBlue tracking-[0.8rem] text-[2rem] `}
          description={description}
          mainCss={`flex flex-col items-center justify-center  ${`text-darkBlue`}`}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
          subHeadingCss={`text-darkBlue  uppercase text-center`}
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
            breakpoints={breakpoints}
          >
            {members?.map((member: any,idx:number) => (
              <TeamCard key={`item-${Date.now()}-${idx}`} item={member} />
            ))}
          </SwipeSlider>
        </div>
      </div>
    </div>
  );
}
