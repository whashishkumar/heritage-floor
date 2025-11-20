// import Image from "next/image";
// import SectionHeader from "../common/SectionHeader";
// const videoData = [
//   {
//     id: 1,
//     gif: "/gif/mp1.gif",
//   },
//   {
//     id: 2,
//     gif: "/gif/mp2.gif",
//   },
//   {
//     id: 3,
//     gif: "/gif/mp3.gif",
//   },
// ];
// export default async function CommercialProjects() {
//   return (
//     <>
//       <div className="w-full h-full mt-[2rem] sm:mt-[4rem] ">
//         <div className=" wrapper  mx-auto">
//           <div className=" w-full flex flex-col items-center justify-center ">
//             <SectionHeader
//               heading="Explore our Wide Range of "
//               subHeading="Some glimpses of our commercial projects"
//               description="We’re proud to serve businesses who rely on us for timeless flooring, expert installation, and personalized care."
//               mainCss="flex flex-col items-center justify-center  mt-[2rem]"
//               subHeadingCss="text-center"
//               descriptionCss="leading-[1.5] mb-[2rem] sm:mb-[4rem] mt-[1rem] sm:w-[80%] w-[85%] text-center align-middle"
//             />
//             <div className=" flex overflow-x-scroll lg:overflow-x-hidden lg:grid lg:grid-cols-3 gap-6 w-full ">
//               {videoData.map((vdo, index) => (
//                 <div
//                   className="h-[36.688rem] md:h-[44.688rem] max-w-[22.313rem] md:max-w-[28.313rem] relative overflow-hidden rounded-[1.25rem] w-full"
//                   key={index}
//                 >
//                   <Image
//                     src={vdo.gif}
//                     fill
//                     alt="Major Project"
//                     className="absolute top-0 left-0 w-full h-full object-cover "
//                   />
//                   <div className="absolute bottom-4 left-8 rounded-[0.75rem] flex flex-col  ">
//                     <h1 className="text-xl leading-[2.7000] font-bold underline decoration-[1px] text-white mb-2 align-middle">
//                       View Now
//                     </h1>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';
import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import ButtonCommon from '../ui/Button';
import Image from 'next/image';
import ModalBox from '../ui/ModalBox';

export default function MajorProjectsResidential() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videoData = [
    {
      id: 1,
      gif: '/gif/mp1.gif',
      video: '/videos/glimps1.mp4',
    },
    {
      id: 2,
      gif: '/gif/mp2.gif',
      video: '/videos/glimps2.mp4',
    },
    {
      id: 3,
      gif: '/gif/mp3.gif',
      video: '/videos/glimps3.mp4',
    },
  ];

  const handleViewClick = (videoPath: string) => {
    setSelectedVideo(videoPath);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="w-full h-full  flex items-center justify-center mb-[5rem] sm:overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="wrapper w-full mx-auto">
          <div className="flex mb-[4rem] gap-2">
            <div className="w-full md:py-10">
              <SectionHeader
                heading="oUr major Projects"
                subHeading="Successful Projects We’ve Delivered"
                description="We’re proud to collaborate with leading clients, delivering projects that reflect innovation, precision, and lasting value. Each project showcases our commitment to quality and trust."
                mainCss=""
                headingCss=" font-semibold text-base tracking-[1.4px]"
                subHeadingCss=" text-[2.5rem] font-bold leading-[1.3500] text-black align-middle pt-[0.25rem] pb-[0.5rem]"
                descriptionCss=""
              />
            </div>
          </div>
          <div className=" flex  lg:grid lg:grid-cols-3 gap-6 w-full  overflow-x-scroll lg:overflow-x-hidden">
            {videoData.map((vdo, index) => (
              <div
                className="flex-shrink-0 h-[36.688rem] md:h-[44.688rem] max-w-[22.313rem] md:max-w-[28.313rem] relative overflow-hidden rounded-[1.25rem] w-full"
                key={index}
              >
                <Image
                  src={vdo.gif}
                  fill
                  alt="Major Project"
                  className="absolute top-0 left-0 w-full h-full object-cover "
                />
                <div className="absolute bottom-4 left-8 rounded-[0.75rem] flex flex-col  ">
                  <button
                    onClick={() => handleViewClick(vdo.video)}
                    className="text-xl leading-[2.7000] font-bold underline decoration-[1px] text-white mb-2 align-middle cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    View Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="w-full h-full  flex items-center justify-center mb-[5rem] sm:overflow-x-auto scrollbar-hide scroll-smooth">
        <div className=" wrapper  mx-auto w-full">
          <div className=" w-full flex flex-col items-center justify-center ">
            <SectionHeader
              heading="Explore our Wide Range of "
              subHeading="Some glimpses of our commercial projects"
              description="We’re proud to serve businesses who rely on us for timeless flooring, expert installation, and personalized care."
              mainCss="flex flex-col items-center justify-center  mt-[2rem]"
              subHeadingCss="text-center"
              descriptionCss="leading-[1.5] mb-[2rem] sm:mb-[4rem] mt-[1rem] sm:w-[80%] w-[85%] text-center align-middle"
            />
            <div className="flex  md:grid-col-1 lg:grid-cols-3 gap-6 w-full  overflow-x-scroll lg:overflow-x-hidden">
              {videoData.map((vdo, index) => (
                <div
                  className="h-[36.688rem] md:h-[44.688rem] max-w-[22.313rem] md:max-w-[28.313rem] relative overflow-hidden rounded-[1.25rem] w-full"
                  key={index}
                >
                  <Image
                    src={vdo.gif}
                    fill
                    alt="Major Project"
                    className="absolute top-0 left-0 w-full h-full object-cover "
                  />
                  <button
                    onClick={() => handleViewClick(vdo.video)}
                    className="absolute bottom-4 left-8 rounded-[0.75rem] flex flex-col  "
                  >
                    <h1 className="text-xl leading-[2.7000] font-bold underline decoration-[1px] text-white mb-2 align-middle cursor-pointer">
                      View Now
                    </h1>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* Video Modal */}
      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4 text-black">Project Video</h2>
          {selectedVideo && (
            <video
              className="w-full max-h-[30rem] rounded-lg"
              controls
              autoPlay
              src={selectedVideo}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </ModalBox>
    </>
  );
}
