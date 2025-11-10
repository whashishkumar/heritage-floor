import Image from "next/image";
export default function GetInTouch() {
  return (
    <>
      <div className="w-full h-full mx-auto flex items-center justify-center px-4 md:px-6 lg:px-0">
        <div className="h-[4.6rem] lg:h-[6.938rem] max-w-[73.125rem] w-full bg-[#272727] rounded-[.75rem] flex overflow-hidden">
          <div className="w-[90%] flex items-center pl-8">
            <div className="h-[1.813rem] w-[1.813rem] relative ">
              <Image
                src="/icon/share.png"
                alt="get in touch"
                fill
                className=" object-cover"
              />
            </div>
            <div className="font-normal text-xl lg:text-2xl leading-[1.7500] text-white align-middle ml-2 ">
              Get in touch with us today!
            </div>
          </div>
          <div className="w-[10%] bg-primaryTwo flex items-center justify-center">
            <div className="h-[1.875rem] w-[1.875rem] relative">
              <Image
                src="/icon/share.png"
                alt="get in touch"
                fill
                className=" object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
