"use client";
import React from "react";
import { CiUser } from "react-icons/ci";

interface TableOfContentsProps {
  tableOfContents: { id: string; title: string }[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  authorInfo?: any;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tableOfContents,
  activeSection,
  scrollToSection,
  authorInfo,
}) => {
  const { author, author_desc, author_profile } = authorInfo || {};
  return (
    <div className="sticky top-24">
      <h3 className="text-lg font-bold text-darkBlue mb-4">
        Table of Contents
      </h3>
      <nav className="space-y-2">
        {tableOfContents.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg text-base transition-all ${
              activeSection === item.id
                ? "bg-primaryOne/10 text-primaryTwo font-medium"
                : "text-gray-600 hover:bg-primaryOne/10"
            }`}
          >
            {item.title}
          </button>
        ))}
      </nav>

      {/* Author Card */}
      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primaryOne/10 rounded-full flex items-center justify-center">
            <CiUser className="w-6 h-6 text-primaryTwo" />
          </div>
          <div>
            <h4 className="font-bold text-darkBlue">{author}</h4>
            <p className="text-sm text-gray-600">{author_profile}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">{author_desc}</p>
      </div>
    </div>
  );
};

export default TableOfContents;
