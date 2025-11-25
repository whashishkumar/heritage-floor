import SectionHeader from '@/components/common/SectionHeader';
import Image from 'next/image';

export default function WorldCount({ statsData, pageTitle, Founder }: any) {
  const banerIncon = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${pageTitle?.image}`;
  const founderBgImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${Founder?.f_bg_image}`;
  const whyBannerImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${Founder?.image}`;

  console.log(founderBgImage, 'banerIncon');

  return (
    <div className="wrapper m-auto">
      <div className="w-full flex flex-col items-center justify-center py-16 poppins-font">
        <div className="mb-8 lg:mb-16">
          {banerIncon && <Image src={banerIncon} height={110} width={110} alt="tag" />}
        </div>
        <div>
          <SectionHeader
            subHeading={pageTitle?.tag || pageTitle?.heading}
            headingCss={`text-darkBlue tracking-[0.7rem] sm:text-[1rem] lg:text-[2rem] `}
            description={pageTitle?.description}
            mainCss={`flex flex-col items-center justify-center  ${`text-darkBlue`}`}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[90%] text-center align-middle  text-darkBlue}`}
            subHeadingCss={`text-darkBlue uppercase text-center`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center w-full poppins-font">
          {statsData?.map((item: any, idx: any) => {
            const icon = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${item?.icon}`;
            return (
              <div key={idx} className="flex flex-col items-center py-4">
                {/* <Icon className="text-[#C9A96A] mb-4" size={60} /> */}
                {icon && <Image src={icon} height={150} width={150} alt="icon" />}
                <h2 className="text-4xl sm:text-5xl font-medium text-black tracking-wide">
                  {item?.value || item?.title}
                </h2>
                <p className="text-gray-600 mt-2 text-lg">{item?.label || item?.description}</p>
              </div>
            );
          })}
        </div>
        <div className="my-20 w-full">
          <div className="relative w-full h-[38rem] ">
            {founderBgImage && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${founderBgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
            {whyBannerImage && (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${whyBannerImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            )}
            <div className="relative w-full h-full flex items-center justify-end  md:pr-5 lg:pr-15 ">
              <div className="rounded-xl p-4 sm:p-10 bg-[#858a82]/85  border border-white/60 lg:w-[420px] w-[250px]">
                <h1 className="tracking-[0.8rem] poppins-font text-center whitespace-pre-line text-2xl sm:text-sm lg:text-[1.813rem] font-extrabold uppercase tracking-widest text-white">
                  {Founder?.details?.[0]?.f_title || Founder?.heading}
                </h1>
                <p className="poppins-font text-center font-normal t text-white mb-4 uppercase">
                  {' '}
                  {Founder?.details?.[0]?.f_designation}
                </p>
                <p className="text-center  mx-auto text-base lg:text-lg text-white roboto-font">
                  {Founder?.details?.[0]?.f_description || Founder?.description}
                </p>
                <button className="bg-white text-gray-500 py-4 w-full rounded-full uppercase mt-6">
                  {' '}
                  {Founder?.details?.[0]?.btn_text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
