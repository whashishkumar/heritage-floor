import Image from 'next/image';
import React from 'react';

const solutions = [
  {
    id: 1,
    title: 'Skilled Professionals You Can Trust',
    description:
      'Our certified installers and project specialists deliver precision workmanship and attentive service from start to finish.',
    image: '/images/builder/skilled.png',
  },
  {
    id: 2,
    title: 'Eco-Friendly Flooring Options',
    description:
      'Choose from responsibly sourced materials and low-VOC finishes to create a healthier, greener home.',
    image: '/images/builder/ecoFriendly.png',
  },
  {
    id: 3,
    title: 'Custom Expertise Quote',
    description:
      'Receive a detailed, no-obligation estimate designed to fit your budget and specific flooring needs.',
    image: '/images/builder/custom.png',
  },
];

export default function Solutions() {
  return (
    <div className="wrapper m-auto py-12 ">
      <div className=" flex gap-6 flex-wrap md:flex-nowrap justify-center items-center">
        {solutions?.map((solution) => (
          <div key={solution.id} className="flex gap-4">
            <div className="">
              <Image
                src={solution.image}
                alt={solution.title}
                height={50}
                width={50}
                className="rounded-lg object-contain"
              />
            </div>
            <div className="w-full poppins-font">
              <h3 className="text-2xl font-medium mb-2 text-xl text-black">{solution.title}</h3>
              <p className="text-black text-base font-normal">{solution.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="banner relative mt-12 rounded-lg overflow-hidden">
        <Image
          src={'/images/builder/solutionbanner.jpg'}
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
  );
}
