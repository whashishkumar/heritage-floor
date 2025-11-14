"use client";
import Image from "next/image";
import { useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import ModalBox from "@/components/ui/ModalBox";

type Project = {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  video?: string;
};

export default function MajorProjectsList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Heritage Greens",
      location: "Pune, Maharashtra",
      description:
        "A luxurious residential project offering modern amenities and green landscapes designed for comfort and sustainability.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps1.mp4",
    },
    {
      id: 2,
      title: "Urban Heights",
      location: "Mumbai, Maharashtra",
      description:
        "A premium high-rise residential tower that blends urban sophistication with serene living spaces.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps2.mp4",
    },
    {
      id: 3,
      title: "Riverside Villas",
      location: "Nashik, Maharashtra",
      description:
        "Exclusive riverfront villas crafted with elegance, ensuring privacy, comfort, and stunning natural views.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps3.mp4",
    },
    {
      id: 4,
      title: "Heritage Greens",
      location: "Pune, Maharashtra",
      description:
        "A luxurious residential project offering modern amenities and green landscapes designed for comfort and sustainability.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps1.mp4",
    },
    {
      id: 5,
      title: "Urban Heights",
      location: "Mumbai, Maharashtra",
      description:
        "A premium high-rise residential tower that blends urban sophistication with serene living spaces.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps2.mp4",
    },
    {
      id: 6,
      title: "Riverside Villas",
      location: "Nashik, Maharashtra",
      description:
        "Exclusive riverfront villas crafted with elegance, ensuring privacy, comfort, and stunning natural views.",
      image: "/images/residential/category/Eco.jpg",
      video: "/videos/glimps3.mp4",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white py-16">
      <div className="wrapper mx-auto px-4">
        <SectionHeader
          heading="oUr major Projects"
          subHeading="Explore Our Completed & Ongoing Residential Projects"
          description="Our portfolio showcases years of trust, innovation, and architectural excellence. Each project is a testament to our commitment to quality and design."
          mainCss="text-center"
          headingCss="font-semibold text-base tracking-[1.4px] uppercase"
          subHeadingCss="text-[2.5rem] font-bold leading-[1.35] text-black"
          descriptionCss="text-gray-600 max-w-3xl mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-[1rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all bg-white"
            >
              <div className="relative h-[16rem] w-full">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-3">📍 {project.location}</p>
                <p className="text-gray-700 leading-relaxed mb-4 m-h-20 line-campe-4">
                  {project.description}
                </p>

                {project.video ? (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-primaryTwo  font-medium hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Watch Project Video →
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">No video available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for video preview */}
      <ModalBox isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">{selectedProject.title}</h2>
            <video
              controls
              autoPlay
              className="w-full rounded-lg shadow-md lg:max-h-[30rem]"
              src={selectedProject.video}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </ModalBox>
    </div>
  );
}
