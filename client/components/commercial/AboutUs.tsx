import Image from "next/image";
import SectionHeader from "../common/SectionHeader";
import ButtonCommon from "../ui/Button";
export default async function AboutUsCommercial() {
  return (
    <div className="relative  py-16 lg:py-28  overflow-hidden  ">
      <div
        className="absolute inset-0 bg-cover opacity-10  bg-no-repeat overflow-hidden z-0"
        style={{
          backgroundImage: "url('/images/commercial/aboutUs/bg.png')",
        }}
      />
      <div className="absolute top-0 bg-gradient-to-b from-white  to-transparent min-h-[6.938rem]  w-full  z-10"></div>
      <div className="absolute bottom-0 bg-gradient-to-b from-transparent via-white/10 to-white md:min-h-[11.125rem] min-h-[6.125rem]   w-full z-10"></div>
      <div className=" wrapper mx-auto relative  ">
        <div className="grid lg:grid-cols-2  md:pb-[4rem]">
          {/* Left Content */}
          <div className="  ">
            <SectionHeader
              heading="About Us"
              subHeading=" Elegant Flooring. Enduring Quality"
              description="At Heritage Floor & Home, we believe your home deserves flooring
                that's as unique as your story. From classic hardwood to modern
                vinyl and tile, we offer a wide range of stylish, durable, and
                affordable solutions. Our expert team ensures seamless
                installation and personalized service, helping you create spaces
                that truly feel like home. With a commitment to quality and
                timeless design, Heritage Floor & Home is where tradition and 
                innovation come together"
              mainCss="space-y-6 lg:pr-8 inter-font "
              descriptionCss="leading-[1.8889] mb-[2rem]  sm:mb-[1rem] lg:mb-[4rem]"
            />
            <div className=" relative h-[400px] sm:h-[450px] lg:h-[400px] hidden sm:grid grid-cols-3  lg:hidden   mb-[2rem]">
              {/* Image 1 - Left (Wooden Flooring) */}
              <div className="  absolute w-[32%] left-0 top-[6rem]">
                <div className="relative   overflow-hidden h-[25.938rem] rounded-[23.75rem]  ">
                  <Image
                    src="/images/commercial/aboutUs/1.png"
                    alt="Classic hardwood flooring"
                    fill
                    className="object-center"
                  />
                </div>
              </div>

              {/* Image 2 - Top Right (Marble/Luxury Interior) */}
              {/* <div className="absolute   w-[33%]"> */}
              <div className="  absolute w-[32%] left-1/2 top-[2rem]  -translate-x-1/2 ">
                <div className="relative   overflow-hidden h-[25.938rem]  rounded-[23.75rem] z-50">
                  <Image
                    src="/images/commercial/aboutUs/2.png"
                    alt="Luxury marble flooring"
                    fill
                    className="object-center"
                  />
                </div>
              </div>

              {/* Image 3 - Bottom Right (Modern Bathroom) */}
              {/* <div className=" absolute right-0  w-[33%]"> */}
              <div className=" absolute w-[32%] right-0 top-0">
                <div className="relative overflow-hidden h-[25.938rem]  rounded-[23.75rem]">
                  <Image
                    src="/images/commercial/aboutUs/3.png"
                    alt="Modern bathroom flooring"
                    fill
                    className=" object-center"
                  />
                </div>
              </div>
            </div>

            <ButtonCommon link="#" buttonName="Explore more" image="/icon/arrowRightUp.png" />
          </div>

          {/* Right Images Grid - Exact Layout from Image */}
          <div className=" relative h-[400px] sm:h-[450px] lg:h-[400px] lg:grid grid-cols-3 hidden ">
            {/* Image 1 - Left (Wooden Flooring) */}
            <div className="  absolute w-[32%] left-0 top-[6rem]">
              <div className="relative   overflow-hidden h-[25.938rem] rounded-[23.75rem]  ">
                <Image
                  src="/images/commercial/aboutUs/1.png"
                  alt="Classic hardwood flooring"
                  fill
                  className="object-center"
                />
              </div>
            </div>

            {/* Image 2 - Top Right (Marble/Luxury Interior) */}
            {/* <div className="absolute   w-[33%]"> */}
            <div className="  absolute w-[32%] left-1/2 top-[2rem]  -translate-x-1/2 ">
              <div className="relative   overflow-hidden h-[25.938rem]  rounded-[23.75rem] z-50">
                <Image
                  src="/images/commercial/aboutUs/2.png"
                  alt="Luxury marble flooring"
                  fill
                  className="object-center"
                />
              </div>
            </div>

            {/* Image 3 - Bottom Right (Modern Bathroom) */}
            {/* <div className=" absolute right-0  w-[33%]"> */}
            <div className=" absolute w-[32%] right-0 top-0">
              <div className="relative overflow-hidden h-[25.938rem]  rounded-[23.75rem]">
                <Image
                  src="/images/commercial/aboutUs/3.png"
                  alt="Modern bathroom flooring"
                  fill
                  className=" object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
