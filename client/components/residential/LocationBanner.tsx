import Image from "next/image";

export default async function LocationBanner() {
  return (
    <>
      {/* <div className=" w-full h-full flex items-center justify-center mb-[5rem]">
        <div className=" relative wrapper w-full mx-auto h-[10.5rem] overflow-hidden rounded-[1.375rem]">
          <div
            className="absolute inset-0 bg-bottom  bg-no-repeat  overflow-hidden z-0"
            style={{
              backgroundImage: "url('/images/residential/bg-banner.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-[#10101066]/60 group-hover:bg-black/30 transition-colors duration-300" />
          <div className=" w-full flex flex-row justify-between  relative z-10 h-full poppins-font">
            <div className=" md:max-w-1/2 w-full text-white h-full flex flex-col items-center justify-center">
              <div>
                <p className=" font-bold text-[1.563rem] leading-[1.2800]">
                  Residential & Commercial Flooring Solutions
                </p>
                <p className=" font-normal text-[1.563rem] leading-[1.2800]">
                  Tailored for Every Project
                </p>{" "}
              </div>
            </div>
            <div className=" h-full md:max-w-1/2 w-full text-white font-bold text-[1.563rem] leading-[1.2800]  flex flex-col items-center justify-center">
              <p>Ottawa • Vaughan • Hamilton • Windsor</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="wrapper m-auto">
        <div className="banner relative mt-12 rounded-lg overflow-hidden">
          <Image
            src={"/images/residential/bg-banner.jpg"}
            alt="Commercial Banner"
            width={1440}
            height={168}
            className="w-full h-[168px] object-cover rounded-lg"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent rounded-lg"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-around text-white  text-center md:text-left gap-4 md:gap-0">
            <div className="">
              <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
                Residential & Commercial Flooring Solutions
                <br />
                <span className="font-normal text-base sm:text-lg md:text-2xl">
                  Tailored for Every Project
                </span>
              </p>
            </div>

            <p className="font-semibold text-base sm:text-lg md:text-2xl">
              Ottawa • Vaughan • Hamilton • Windsor
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
