import SectionHeader from '@/components/common/SectionHeader';
import Image from 'next/image';

const brandCollection = [
  {
    id: 1,
    name: 'Brand One',
    image: '/images/commercial/brands/brand01.webp',
  },
  {
    id: 2,
    name: 'Brand Two',
    image: '/images/commercial/brands/brand02.webp',
  },
  {
    id: 3,
    name: 'Brand Three',
    image: '/images/commercial/brands/brand03.webp',
  },
  {
    id: 4,
    name: 'Brand Four',
    image: '/images/commercial/brands/brand04.webp',
  },
  {
    id: 5,
    name: 'Brand Five',
    image: '/images/commercial/brands/brand05.webp',
  },
  {
    id: 6,
    name: 'Brand Six',
    image: '/images/commercial/brands/brand06.webp',
  },
  {
    id: 7,
    name: 'Brand Seven',
    image: '/images/commercial/brands/brand07.webp',
  },
  {
    id: 8,
    name: 'Brand Eight',
    image: '/images/commercial/brands/brand08.webp',
  },
];

export default function BrandCollebration({ brands, countries }: any) {
  const { heading, description, items } = countries || {};
  const { heading: tag, description: detail, button_text, image } = brands;

  return (
    <div className="wrapper m-auto w-full">
      <div className="">
        <SectionHeader
          subHeading={heading}
          headingCss={`text-darkBlue`}
          description={description}
          mainCss={`flex flex-col items-center justify-center text-darkBlue `}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[100%] text-center align-middle  text-darkBlue text-center`}
          subHeadingCss={`text-darkBlue uppercase  lg:tracking-[0.6rem] md:text-[1rem] lg:text-[2.5rem] text-center`}
        />
      </div>
      <div className="flex gap-10 justify-center py-14 flex-wrap">
        {items?.map((brand: any) => {
          const iconImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${brand?.image}`;
          return (
            <div key={brand.id} className="w-[120px] sm:w-[90px] md:w-[110px] lg:w-[120px]">
              <Image
                src={iconImage}
                alt="brand"
                width={90}
                height={80}
                sizes="100vw"
                className="w-full h-auto object-contain"
              />
            </div>
          );
        })}
      </div>

      <div className="my-10 w-full">
        <div className="relative w-full h-[38rem] ">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center  md:pr-5 lg:pr-15">
            <div className="rounded-xl p-4 sm:p-10 bg-[#508699]/95  border border-white/60 lg:w-[420px] md:w-[250px]  ">
              <h1 className="tracking-[0.8rem] poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] font-extrabold uppercase tracking-widest text-white">
                {tag}
              </h1>
              <p className="text-center mx-auto text-base lg:text-lg text-white roboto-font">
                {detail}
              </p>
              <button className="bg-white text-gray-500 py-4 w-full rounded-full uppercase mt-6">
                {button_text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
