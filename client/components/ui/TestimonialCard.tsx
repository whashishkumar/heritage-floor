import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Rating from '../common/Rating';

export default function TestimonialCard({ data }: { data: any }) {
  return (
    <>
      <div className="w-[21.563rem] p-[1.5rem] h-auto  rounded-[1rem] bg-black  border-[0.5px] border-[#3686F7]  flex flex-col custom-shadow">
        {/* user */}
        <div className="h-[4rem]  w-full flex items-center  justify-center">
          <div className="w-[20%] h-full   flex items-center">
            <div className="h-[2.5rem] w-[2.5rem] relative overflow-hidden rounded-full border-white border-[0.5px]">
              {data?.profile_image && (
                <Image
                  // src="/images/commercial/user1.jpg"
                  src={data?.profile_image}
                  fill
                  alt="Name"
                  className=" object-center"
                />
              )}
            </div>
          </div>
          <div className="w-[80%] h-full  space-y-[0.25rem]">
            <div className=" text-white text-base font-bold leading-[1.2500] line-clamp-1">
              {data.title || 'Name'}
            </div>
            <div className=" text-xs  font-normal text-white/50 leading-[1.2500]">
              {data.role || 'IT Consultant, Reynolds Systems'}
            </div>
            {/* <div className=" text-[#FFC107] flex  space-x-1">
              <FaStar size={16} />
            </div> */}
            <Rating rating={data.rating || 0} />
          </div>
        </div>
        {/* review */}
        <div className="w-full h-auto  mt-[0.5rem] ">
          <p className="text-white leading-[1.25] text-base font-normal line-clamp-4">
            {data.feedback ||
              'This widget has made our workflow incredibly efficient! The interface is user-friendly, and the performance is seamless. Customer support was quick to respond to our queries. Highly recommend!'}
          </p>
        </div>
      </div>
    </>
  );
}
