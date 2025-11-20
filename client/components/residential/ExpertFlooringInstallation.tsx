import Image from 'next/image';
import ButtonCommon from '../ui/Button';

interface ExpertFlooringInstallationProps {
  heading: string;
  subheading: string;
  description: string;
  data: {
    image: string;
    alt: string;
    description: string;
  }[];
}

interface ExpertFlooringInstallation {
  data: ExpertFlooringInstallationProps;
}

export default async function ExpertFlooringInstallation({ data }: ExpertFlooringInstallation) {
  // console.log("Residential page flooringInstallation Section Data:", data);

  const featureData = [
    {
      icon: '/icon/skill.svg',
      title: 'Skilled Professionals',
      description: 'Certified installers with years of hands-on experience.',
    },
    {
      icon: '/icon/premiumMaterials.svg',
      title: 'Premium Materials',
      description: 'High-quality flooring that stands up to everyday life.',
    },
    {
      icon: '/icon/foucs.svg',
      title: 'Detail-Focused',
      description: 'Perfect alignment, smooth finishes, and lasting durability.',
    },
  ];

  return (
    <>
      <div className="w-full min-h-[48.563rem] h-full  flex lg:flex-row  flex-col mb-[5rem]">
        <div className="w-full lg:w-1/2   bg-primaryTwo text-white flex flex-col  items-center  justify-center p-12 lg:p-0">
          <div className="">
            <h2 className=" text-[2.5rem] font-bold leading-[1.3500] align-middle">
              {data?.heading || 'Expert Flooring Installation'}
            </h2>
            <p className="text-lg   align-middle font-normal ">
              {data?.subheading || 'Bring beauty and strength to every room with our'}
              <br />
              {data?.description || 'precision installation services.'}
            </p>
            {data?.data?.map((feature, index) => (
              <div className="min-h-[3.563rem]  flex mt-[2rem] gap-2" key={index}>
                <div className="h-[3.563rem] w-[3.563rem] relative overflow-hidden">
                  <Image
                    src={feature.image}
                    fill
                    alt={feature.alt}
                    unoptimized
                    quality={100}
                    className=" object-contian"
                  />
                </div>
                <div className=" flex flex-col">
                  <div className=" font-bold text-xl align-middle">{feature.alt}</div>
                  <div className="text-base font-normal align-middle">{feature.description}</div>
                </div>
              </div>
            ))}
            <ButtonCommon
              buttonName="Explore More"
              link="#"
              cssChild=" bg-black"
              image="/icon/arrowRightUp.png"
              cssParent=" bg-white text-black mt-[3rem]"
            />
          </div>
        </div>

        <div className="w-1/2  h-[48.563rem] relative overflow-hidden  hidden lg:block">
          <Image
            src="/images/residential/repair.jpg"
            fill
            alt="Repair"
            className=" object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </>
  );
}
