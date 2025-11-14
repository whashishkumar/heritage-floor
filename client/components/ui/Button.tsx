import Image from "next/image";
import Link from "next/link";

interface Button {
  buttonName: string;
  image?: string;
  link?: string;
  cssParent?: string;
  cssButtonName?: string;
  cssChild?: string;
  onClick?: () => void;
}
export default function ButtonCommon({
  buttonName,
  image,
  link,
  cssParent,
  cssButtonName,
  cssChild,
  onClick,
}: Button) {
  return (
    <button className=" cursor-pointer text-white inter-font" onClick={onClick}>
      <Link
        href={link ? link : ""}
        className={`h-[3.625rem] ${cssParent} w-[16rem] flex bg-black rounded-l-[5px] rounded-r-[5px] hover:scale-105 transition ease-in-out duration-300`}
      >
        <div
          className={`w-[75%] ${cssButtonName} h-full  text-center font-normal text-lg  flex items-center justify-center leading-[3] align-middle`}
        >
          {buttonName}
        </div>
        <div
          className={`w-[25%] h-full bg-[#018c99] ${cssChild} flex items-center justify-center rounded-r-[5px]`}
        >
          <div className=" relative h-[.75rem] w-[.75rem] ">
            {image && <Image src={image} alt={buttonName} fill className=" object-center " />}
          </div>
        </div>
      </Link>
    </button>
  );
}
