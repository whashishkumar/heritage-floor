import Image from 'next/image';
export default async function HeaderTopBar() {
  return (
    <>
      <div className=" hidden md:flex lg:flex items-center justify-center bg-offWhite text-black h-auto py-2 w-full">
        <div className="wrapper mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-4">
          {/* Left Section */}
          <div className="text-sm sm:text-base text-textGray font-normal leading-[1.6] text-center sm:text-left">
            Get a consultation with us{' '}
            <span className="font-medium ml-1 text-black">613-224-0300</span>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4 mt-1 sm:mt-0">
            {/* Address */}
            <div className="flex items-center gap-1.5">
              <div className="relative h-[1rem] w-[1rem] sm:h-[1.25rem] sm:w-[1.25rem]">
                <Image
                  src="/icon/MapPoint.png"
                  fill
                  alt="207 Colonnade Rd S. Nepean, ON K2E 7K3"
                  className="object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm text-textGray font-normal leading-[1.6] text-center sm:text-left">
                207 Colonnade Rd S. Nepean, ON K2E 7K3
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1.5">
              <div className="relative h-[1rem] w-[1rem] sm:h-[1.25rem] sm:w-[1.25rem]">
                <Image
                  src="/icon/message.png"
                  fill
                  alt="ottawa@heritagefloorandhome.ca"
                  className="object-contain"
                />
              </div>
              <p className="text-xs sm:text-sm text-textGray font-normal leading-[1.6] text-center sm:text-left">
                ottawa@heritagefloorandhome.ca
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
