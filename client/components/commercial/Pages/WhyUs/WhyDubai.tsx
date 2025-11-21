import Image from 'next/image';
import SectionHeader from '../../../common/SectionHeader';
import SwipeSlider from '../../../ui/SwipeSlider';

const teamData = [
  {
    id: 1,
    name: 'UAE GOLDEN VISA BENEFITS',
    role: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: '/images/commercial/why/why01.webp',
  },
  {
    id: 2,
    name: 'UAE GOLDEN VISA BENEFITS',
    role: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: '/images/commercial/why/why02.webp',
  },
  {
    id: 3,
    name: 'UAE GOLDEN VISA BENEFITS',
    role: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: '/images/commercial/why/why03.webp',
  },
  {
    id: 4,
    name: 'UAE GOLDEN VISA BENEFITS',
    role: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: '/images/commercial/why/why02.webp',
  },
  {
    id: 5,
    name: 'UAE GOLDEN VISA BENEFITS',
    role: 'Real estate investments in Dubai can grant you long-term residency and exclusive Golden Visa benefits.',
    image: '/images/commercial/why/why01.webp',
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
  const bannerImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${item.image}`;
  return (
    <div className="relative overflow-hidden  shadow-lg rounded-sm">
      <div className="relative w-full h-[600px]">
       {bannerImage && <Image src={bannerImage} alt={'banner-image'} fill className="object-cover" />}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-3xl  tracking-widest uppercase font-bold">{item.title}</h2>
        <p className="text-gray-300 text-sm mt-1 font-bold">{item.description}</p>
      </div>
    </div>
  );
}

export default function WhyDubai({whyDubai}:any) {
  return (
    <div>
      <div className="wrapper m-auto">
        <SectionHeader
          subHeading="WHY DUBAI?"
          headingCss={`text-darkBlue tracking-[0.8rem] text-[2rem] `}
          mainCss={`flex flex-col items-center justify-center  ${`text-darkBlue`}`}
          subHeadingCss={`text-darkBlue`}
        />
        <div className="py-16">
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
            {whyDubai?.map((member:any, idx:any) => (
              <TeamCard key={`item-${Date.now()}-${idx}`} item={member} />
            ))}
          </SwipeSlider>
        </div>
      </div>
    </div>
  );
}
