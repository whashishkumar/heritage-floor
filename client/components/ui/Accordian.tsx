"use client";

import { useState } from "react";
import { MdExpandLess } from "react-icons/md";
import { GrFormDown } from "react-icons/gr";

interface FAQItem {
  id?: number | string;
  question?: string;
  title?: string;
  answer?: string;
  description?: string;
}

interface AccordionProps {
  faqs: FAQItem[];
}

export default function Accordion({ faqs }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 poppins-font">
      {faqs?.map((faq, idx) => (
        <div
          key={faq.id ?? idx}
          className="border-b border-[#F1F1F1] mb-0 py-2"
        >
          <button
            type="button"
            className="w-full flex justify-between items-center  py-2 text-left accordian-question hover:cursor-pointer"
            onClick={() => toggleAccordion(idx)}
          >
            <span className="font-medium text-xl">
              {faq.question || faq.title}
            </span>
            {openIndex === idx ? (
              <MdExpandLess className="w-6 h-6" />
            ) : (
              <GrFormDown className="w-6 h-6" />
            )}
          </button>

          {openIndex === idx && (
            <div className="py-4 text-base font-normal">
              {faq.answer || faq.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
