'use client';
import SectionHeader from '@/components/common/SectionHeader';
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// const countries = [
//   {
//     id: 1,
//     name: 'All',
//     lat: 25.276987,
//     long: 55.296249,
//     zoom: 2,
//   },
//   {
//     id: 2,
//     name: 'United Arab Emirates',
//     lat: 25.276987,
//     long: 55.296249,
//     zoom: 6,
//   },
//   {
//     id: 3,
//     name: 'Saudi Arabia',
//     lat: 23.885942,
//     long: 45.079163,
//     zoom: 5,
//   },
//   {
//     id: 4,
//     name: 'United Kingdom',
//     lat: 51.509865,
//     long: -0.118092,
//     zoom: 5,
//   },
//   {
//     id: 5,
//     name: 'Jordan',
//     lat: 31.963158,
//     long: 35.930359,
//     zoom: 6,
//   },
//   {
//     id: 6,
//     name: 'Maldives',
//     lat: 3.202778,
//     long: 73.22068,
//     zoom: 6,
//   },
//   {
//     id: 7,
//     name: 'Qatar',
//     lat: 25.276987,
//     long: 51.52,
//     zoom: 7,
//   },
//   {
//     id: 8,
//     name: 'USA',
//     lat: 37.0902,
//     long: -95.7129,
//     zoom: 4,
//   },
//   {
//     id: 9,
//     name: 'Lebanon',
//     lat: 33.8547,
//     long: 35.8623,
//     zoom: 7,
//   },
// ];

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function GlobalPresence({ countries, headerBanner }: any) {
  const [active, setActive] = useState(countries[0]);
  const { heading, description } = headerBanner;

  return (
    <>
      <div className="wrapper m-auto">
        <div className="md:py-8 lg:py-16 ">
          <SectionHeader
            subHeading={heading}
            headingCss={`text-darkBlue`}
            description={description}
            mainCss={`flex flex-col items-center justify-center text-darkBlue `}
            descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[100%] text-center align-middle  text-darkBlue `}
            subHeadingCss={`text-darkBlue uppercase  tracking-[0.6rem] text-center`}
          />
        </div>
        <div className="w-full bg-white pb-6">
          {/* Country Filter */}
          <div className="flex gap-8 overflow-x-auto whitespace-nowrap px-6 py-4 border-b">
            {countries.map((c: any) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`text-lg transition cursor-pointer ${
                  active.id === c.id ? 'text-black border-b-2 border-blue-500' : 'text-gray-400'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Map */}
      <div className="relative w-full h-[450px]">
        <MapContainer
          key={active.id}
          center={[active.lat, active.long] as [number, number]}
          zoom={active.zoom}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          <ChangeView center={[active.lat, active.long]} zoom={active.zoom} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </>
  );
}
