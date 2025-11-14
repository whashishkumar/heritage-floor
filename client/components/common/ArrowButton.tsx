import { FiArrowUpRight } from "react-icons/fi";

export default function OnlyButton() {
  return (
    <div className="bg-primaryTwo text-white flex items-center justify-center rounded-lg transition-colors h-[3.625rem] w-[3.625rem] cursor-pointer">
      <FiArrowUpRight className="text-xl" />
    </div>
  );
}
