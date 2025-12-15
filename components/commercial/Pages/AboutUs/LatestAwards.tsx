import SectionHeader from '@/components/common/SectionHeader';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';
import Image from 'next/image';
import { CiTrophy } from 'react-icons/ci';


const awardsData = [
  {
    id: 1,
    title: 'Global Business Outlook Awards Ceremony',
    icon: CiTrophy,
  },
  {
    id: 2,
    title: 'International Property Awards',
    icon: CiTrophy,
  },
  {
    id: 3,
    title: 'Luxury Lifestyle Awards',
    icon: CiTrophy,
  },
  {
    id: 4,
    title: 'Global Business Outlook Awards Ceremony',
    icon: CiTrophy,
  },
  {
    id: 5,
    title: 'International Property Awards',
    icon: CiTrophy,
  },
  {
    id: 6,
    title: 'Luxury Lifestyle Awards',
    icon: CiTrophy,
  },
  {
    id: 7,
    title: 'Global Business Outlook Awards Ceremony',
    icon: CiTrophy,
  },
  {
    id: 8,
    title: 'International Property Awards',
    icon: CiTrophy,
  },
];

export function AwardCard({ item }: any) {
  const Icon = item.icon;
  const iconImgPath = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${Icon}`
  return (
    <div className="bg-[#f8f7f7]/70 rounded-2xl shadow-sm px-2 py-4  text-center w-[235px]">
     <div className='flex justify-center items-center'>
       <Image src={iconImgPath} height={80} width={110} alt='icon' className='object-contain '/>
     </div>
      <h3 className="text-base font-medium text-gray-800 tracking-widest uppercase leading-relaxed mt-3">
        {item.title}
      </h3>
    </div>
  );
}
export default async  function LatestAwards() {
  const {awards_section} = await CommercialPageData.getAboutUsAwards()
  const {title,description,awards} = awards_section || {}

  
  return (
    <div className="bg-[#f8f7f7]/90">
      <div className="wrapper m-auto py-16 poppins-font ">
        <SectionHeader
          subHeading={title}
          headingCss={`text-darkBlue tracking-[0.8rem] text-[2rem] `}
          description={description}
          mainCss={`flex flex-col items-center justify-center  ${`text-darkBlue`}`}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[80%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
          subHeadingCss={`text-darkBlue  uppercase text-center`}
        />

        <div className=" gap-5 flex justify-center flex-wrap py-5">
          {awards?.map((award:any, idx:number) => (
            <AwardCard  key={`item-${Date.now()}-${idx}`} item={award} />
          ))}
        </div>
      </div>
    </div>
  );
}
