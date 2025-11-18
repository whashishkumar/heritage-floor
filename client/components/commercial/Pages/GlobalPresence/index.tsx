'use client'
import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";
import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";



const countries = [
  {
    id: 1,
    name: "All",
    lat: 25.276987,
    lng: 55.296249,
    zoom: 2
  },
  {
    id: 2,
    name: "United Arab Emirates",
    lat: 25.276987,
    lng: 55.296249,
    zoom: 6
  },
  {
    id: 3,
    name: "Saudi Arabia",
    lat: 23.885942,
    lng: 45.079163,
    zoom: 5
  },
  {
    id: 4,
    name: "United Kingdom",
    lat: 51.509865,
    lng: -0.118092,
    zoom: 5
  },
  {
    id: 5,
    name: "Jordan",
    lat: 31.963158,
    lng: 35.930359,
    zoom: 6
  },
  {
    id: 6,
    name: "Maldives",
    lat: 3.202778,
    lng: 73.220680,
    zoom: 6
  },
  {
    id: 7,
    name: "Qatar",
    lat: 25.276987,
    lng: 51.5200,
    zoom: 7
  },
  {
    id: 8,
    name: "USA",
    lat: 37.0902,
    lng: -95.7129,
    zoom: 4
  },
  {
    id: 9,
    name: "Lebanon",
    lat: 33.8547,
    lng: 35.8623,
    zoom: 7
  }
];

export default function GlobalPresence() {
    const [active, setActive] = useState(countries[0]);
function ChangeView({ center, zoom }:any) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
  return (
    <div className="wrapper m-auto">
      <div className="md:py-8 lg:py-16 ">
        <SectionHeader
          subHeading="Global presence"
          headingCss={`text-darkBlue`}
          description="We deliver luxury lifestyle, products and services to our customers all over the world."
          mainCss={`flex flex-col items-center justify-center text-darkBlue `}
          descriptionCss={`leading-[1.5] mb-[2rem] mt-[0.5rem] md:w-[60%] sm:w-[75%] w-[100%] text-center align-middle  text-darkBlue `}
          subHeadingCss={`text-darkBlue uppercase  tracking-[0.6rem]`}
        />
      </div>
       <div className="w-full bg-white pb-6">

      {/* Country Filter */}
      <div className="flex gap-8 overflow-x-auto whitespace-nowrap px-6 py-4 border-b">
        {countries.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className={`text-lg transition ${
              active.id === c.id
                ? "text-black border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="relative w-full h-[600px]">
        <MapContainer
          key={active.id}
          center={[active.lat, active.lng] as [number, number]}
          zoom={active.zoom}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          <ChangeView center={[active.lat, active.lng]} zoom={active.zoom} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      </div>
    </div>
  );
}
