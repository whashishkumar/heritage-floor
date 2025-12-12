'use client';
import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import ButtonCommon from '../ui/Button';
import Image from 'next/image';
import ModalBox from '../ui/ModalBox';

export default function MajorProjectsResidential({ majorProjects }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { heading, subheading, description, data } = majorProjects || {};

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

  // console.log(data, "majorProjects");

  return (
    <>
      <div className="w-full h-full  flex items-center justify-center mb-[5rem] ">
        <div className=" wrapper w-full mx-auto  ">
          <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center lg:justify-between mb-[4rem] gap-2">
            <div className="lg:w-[60%] w-full">
              <SectionHeader
                heading={heading}
                subHeading={subheading}
                description={description}
                mainCss=""
                headingCss=" font-semibold text-base tracking-[1.4px]"
                subHeadingCss=" text-[2.5rem] font-bold leading-[1.3500] text-black align-middle pt-[0.25rem] pb-[0.5rem]"
                descriptionCss=""
              />
            </div>
            <div className=" w-full md:w-[40%] w-full flex lg:justify-end items-end  justify-start  ">
              <ButtonCommon
                buttonName="Explore More "
                image="/icon/arrowRightUp.png"
                link="/residential/majorProjects"
              />
            </div>
          </div>
          <div className=" flex  lg:grid lg:grid-cols-3 gap-6 w-full  overflow-x-scroll lg:overflow-x-hidden">
            {videoData?.map((vdo: any, index: any) => (
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

      {/* Video Modal */}
      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full ">
          <h2 className="text-2xl font-bold mb-4 text-black">Project Video</h2>
          {selectedVideo && (
            <video
              className="w-full lg:max-h-[30rem] rounded-lg"
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
