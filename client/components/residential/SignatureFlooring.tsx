"use client";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import { FaStar } from "react-icons/fa6";
import ModalBox from "../ui/ModalBox";
import QueryForm from "../common/QuearyForm";

interface SignatureFlooringProps {
  image: string;
  category: string;
  title: string;
  subtitle: string;
  Rating: number;
}

interface SignatureFlooring {
  data: {
    services: SignatureFlooringProps[];
  };
}

export default function SignatureFlooring({ data }: SignatureFlooring) {
  const [activeCard, setActiveCard] = useState<number>(6); // Default active card = 7th
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handleOpenModal = () => setIsAuthModalOpen(true);
  const handleCloseModal = () => setIsAuthModalOpen(false);
  const flooringItems = [
    {
      image: "/images/residential/wood/affinity.png",
      category: "CARPET",
      title: "Affinity Hardwood",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/africanPlains.png",
      category: "CARPET",
      title: "African Plains",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/abstract.png",
      category: "CARPET",
      title: "Abstract Mosaic",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/acceleration.png",
      category: "CARPET",
      title: "Acceleration",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/acro.png",
      category: "CARPET",
      title: "Aero",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/addison.png",
      category: "CARPET",
      title: "Addison",
      subtitle: "Nourison",
      Rating: 5,
    },
    {
      image: "/images/residential/wood/abstract.png",
      category: "CARPET",
      title: "Abstract Mosaic",
      subtitle: "Nourison",
      Rating: 5,
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center mb-[5rem]">
      <div className="wrapper w-full mx-auto">
        <SectionHeader
          heading="Categories"
          subHeading="Our Signature Flooring Selections"
          mainCss=""
          headingCss="font-semibold text-base tracking-[1.4px] poppins-font"
          subHeadingCss="text-[2.5rem] font-bold leading-[1.3500] text-black align-middle poppins-font"
        />

        <div className="w-full h-full min-[1100px]:block hidden">
          {/* <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8"> */}
          <div className="flex flex-nowrap justify-center gap-4 lg:justify-start">
            {/* {data?.services?.map((data:SignatureFlooringProps, index:number) => { */}
            {data?.services?.map(
              (data: SignatureFlooringProps, index: number) => {
                const isActive = activeCard === index;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveCard(index)}
                    // onMouseLeave={() => setActiveCard(6)} // revert to default
                    className="transition-all duration-1000 ease-out"
                  >
                    {/* ============== INACTIVE CARD ============== */}
                    {!isActive && (
                      <div
                        className={`h-[26.25rem] poppins-font transition-transform duration-1000 ease-in-out ${
                          activeCard === index
                            ? "w-0 opacity-0 pointer-events-none "
                            : "w-[10.063rem] transition-transform duration-3000 ease-in-out"
                        } group relative`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-no-repeat overflow-hidden transition-transform duration-500 group-hover:scale-[101%]"
                          style={{
                            backgroundImage: `url(${data.image})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center  w-full h-full">
                          <div className="-rotate-90 flex flex-col items-start whitespace-nowrap text-white h-fit w-fit">
                            <div className="text-xl font-normal mb-2 uppercase tracking-[-1%]">
                              {data.category}
                            </div>
                            <div className="text-[2rem] font-semibold mb-1 leading-tight">
                              {data.title}
                            </div>
                            <div className="text-xl font-normal tracking-[-1%]">
                              By {data.subtitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ============== ACTIVE CARD ============== */}
                    {isActive && (
                      <div
                        className={`poppins-font h-[26.25rem] border relative group transition-transform duration-1000 ease-in-out ${
                          activeCard === index
                            ? "w-[21.563rem] opacity-100 z-20 transition-transform duration-3000 ease-in-out"
                            : "w-0 opacity-0 pointer-events-none"
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-no-repeat overflow-hidden transition-transform duration-500 group-hover:scale-[101%]"
                          style={{
                            backgroundImage: `url(${data.image})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 transition-colors duration-300" />
                        </div>
                        <div className="absolute flex w-full h-full">
                          <div className="absolute bottom-10 left-8 flex flex-col items-start whitespace-nowrap text-white h-fit w-fit">
                            <div className="flex flex-col -space-y-3">
                              <div className="text-xl font-normal uppercase tracking-[-1%]">
                                {data.category}
                              </div>
                              <div className="text-[2rem] font-semibold tracking-[1%] align-middle">
                                {data.title}
                              </div>
                              <div className="text-xl font-normal tracking-[-1%]">
                                By {data.subtitle}
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex my-[0.5rem] gap-1">
                              {[...Array(data?.Rating || 5)].map((_, idx) => (
                                <FaStar
                                  key={idx}
                                  size={16}
                                  className="text-rating"
                                />
                              ))}
                            </div>

                            {/* Quote Button */}
                            <button
                              onClick={() => setIsAuthModalOpen(true)}
                              className="h-[2.25rem] w-[8.563rem] border border-[#BDBDBD] rounded-[3.125rem] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <div className="align-middle text-black leading-[1.5] text-base font-medium">
                                Get a Quote
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className=" min-[1100px]:hidden flex w-full overflow-x-scroll mt-[2rem]">
          {data?.services?.map(
            (data: SignatureFlooringProps, index: number) => (
              <div
                key={index}
                className={`flex-shrink-0 poppins-font h-[26.25rem] border relative group w-[21.563rem] opacity-100 z-20   mx-2  `}
              >
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat overflow-hidden transition-transform duration-500 group-hover:scale-[101%]"
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 transition-colors duration-300" />
                </div>
                <div className="absolute flex w-full h-full">
                  <div className="absolute bottom-10 left-8 flex flex-col items-start whitespace-nowrap text-white h-fit w-fit">
                    <div className="flex flex-col -space-y-1.5  ">
                      <div className="text-xl font-normal uppercase tracking-[-1%]">
                        {data.category}
                      </div>
                      <div className="text-[2rem] font-semibold tracking-[1%] align-middle">
                        {data.title}
                      </div>
                      <div className="text-xl font-normal tracking-[-1%]">
                        By {data.subtitle}
                      </div>
                    </div>

                    <div className="flex my-[0.5rem] gap-1">
                      {[...Array(data?.Rating || 5)].map((_, idx) => (
                        <FaStar key={idx} size={16} className="text-rating" />
                      ))}
                    </div>

                    {/* Quote Button */}
                    <button
                      onClick={handleOpenModal}
                      className="h-[2.25rem] w-[8.563rem] border border-[#BDBDBD] rounded-[3.125rem] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="align-middle text-black leading-[1.5] text-base font-medium">
                        Get a Quote
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <ModalBox isOpen={isAuthModalOpen} onClose={handleCloseModal}>
        <QueryForm onClose={handleCloseModal} />
      </ModalBox>
    </div>
  );
}
