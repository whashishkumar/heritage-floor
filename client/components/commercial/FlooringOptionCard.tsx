"use client"
import Image from "next/image";
interface FlooringOptionCardProps {
  team: {
    name: string;
    designation: string;
    email: string;
    image: string;
  };
  index: number;
}
export default function FlooringOptionsCard({
  team,
  index,
}: FlooringOptionCardProps) {
  return (
    <>
      <div
        className={`  min-w-[21.875rem] h-[35.625rem]   ${
          index % 2 === 0 ? "mt-[4.063rem] " : " "
        }`}
        key={index}
      >
        <div
          className={` ${
            index % 2 === 0 ? "h-[30.875rem]" : "h-[28.063rem]"
          }  w-full overflow-hidden relative`}
        >
          <Image
            src={team.image}
            alt={team.name}
            fill
            className={`object-center ${index % 2 === 0 ? "" : ""}`}
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center inter-font ${
            index % 2 === 0 ? " " : "mt-[2.125rem]"
          } `}
        >
          <div className=" font-semibold text-[1.688rem] text-[#564F4F] leading-[1.1700]">
            {team.name}
          </div>
          <div className=" text-base font-medium text-black  flex justify-center leading-[1.1700] my-[0.4rem]">
            {team.designation}
          </div>
          <div className=" text-base font-medium text-black  flex justify-center leading-[1.1700]">
            {team.email}
          </div>
        </div>
      </div>
    </>
  );
}
