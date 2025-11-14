import Image from "next/image";
import ButtonCommon from "../ui/Button";

// const heroData = {
//   mainHero: {
//     image: "/videos/hero.gif",
//     offerText: "25% off on Flooring",
//     title: "Premium Residential\nFlooring Solutions",
//     button: {
//       text: "Explore More",
//       link: "#",
//       icon: "/icon/arrowRightUp.png",
//     },
//   },

//   rightTop: {
//     image: "/images/residential/hero2.png",
//     title: "Transform Your\nHome or Business with GTA\nFlooring Canada",
//     description: "Explore Showrooms in Ottawa,\nVaughan, Hamilton & Windsor",
//   },

//   rightBottom: [
//     leftsection: {
//       image: "/images/residential/hero4.svg",
//     },
//   rightSection:   {

//       title: "Exclusive\nFlooring Deals",
//       description: "Visit Your Nearest GTA Flooring\nCanada Showroom",
//       button: {
//         text: "Explore More",
//         link: "#",
//         icon: "/icon/rightUp.svg",
//       },
//     },
//   ],
// };
export default function HeroSection({ bannerData }: any) {
  const _premiumBanner = bannerData?.[0];

  return (
    <>
      <div className="w-full p-4 md:p-6 lg:p-8">
        <div className="max-w-[101.75rem] w-full mx-auto">
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2 w-full">
            <div className="h-[210px] sm:h-[450px] md:h-[600px] lg:h-[730px] w-full rounded-[1.25rem] md:rounded-[1.875rem] overflow-hidden relative">
              <Image
                src="/videos/hero.gif"
                alt="heritage floor & home and GTA FlooringCanada"
                fill
                className="object-cover"
                unoptimized
                quality={100}
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 md:bottom-14 md:left-14 md:right-14">
                <p className="text-white text-sm sm:text-base md:text-xl lg:text-[1.625rem] font-medium leading-[1.4231] mb-2">
                  25% off on Flooring
                </p>
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.438rem] font-bold mb-4 md:mb-6 leading-tight lg:leading-[1.1818]">
                  Premium Residential
                  <br />
                  Flooring Solutions
                </h2>
                <ButtonCommon
                  buttonName="Explore More"
                  link="#"
                  image="/icon/arrowRightUp.png"
                  cssChild=" "
                  cssParent="bg-white text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="h-[180px] sm:h-[350px] md:h-[400px] lg:h-[350px] w-full rounded-[1.25rem] md:rounded-[1.875rem] overflow-hidden relative">
                <Image
                  src="/images/residential/hero2.png"
                  alt="heritage floor & home and GTA FlooringCanada"
                  fill
                  className="object-cover"
                  unoptimized
                  quality={100}
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 leading-tight lg:leading-[1.1111]">
                    Transform Your
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    Home or Business with GTA
                    <br />
                    Flooring Canada
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-normal">
                    Explore Showrooms in Ottawa,
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    Vaughan, Hamilton & Windsor
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="h-[190px] sm:h-[300px] md:h-[350px] lg:h-[350px] w-full rounded-[1.25rem] md:rounded-[1.875rem] relative overflow-hidden">
                  <Image
                    src="/images/residential/hero4.svg"
                    alt="heritage floor & home and GTA FlooringCanada"
                    fill
                    className="object-cover"
                    unoptimized
                    quality={100}
                  />
                </div>
                <div className="h-[170px] sm:h-[300px] md:h-[350px] lg:h-[350px] w-full bg-primaryTwo rounded-[1.25rem] md:rounded-[1.875rem] flex items-center justify-center p-4 sm:p-6">
                  <div className="flex flex-col text-center">
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-3">
                      Exclusive
                      <br />
                      Flooring Deals
                    </h3>
                    <p className="text-white/95 text-xs sm:text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                      Visit Your Nearest GTA Flooring
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      Canada Showroom
                    </p>

                    <div>
                      <ButtonCommon
                        buttonName="Explore More"
                        link="#"
                        cssChild="bg-white"
                        image="/icon/rightUp.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
