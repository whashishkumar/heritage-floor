"use client";
import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

interface Option {
  id: number | string;
  label: string;
  value: string;

}

interface FilterGroup {
  title: string;
  code:string;
  options: Option[];
}

interface FilterAccordionGroupProps {
  data: FilterGroup[];
  onChange?: (filters: Record<string, string[]>) => void;
}

const CheckboxGroup: React.FC<FilterAccordionGroupProps> = ({
  data,
  onChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {}
  );

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCheckboxChange = (section: string, value: string) => {
    setSelectedFilters((prev) => {
      const sectionValues = prev[section] || [];
      let updatedValues;
      if (sectionValues.includes(value)) {
        updatedValues = sectionValues.filter((v) => v !== value);
      } else {
        updatedValues = [...sectionValues, value];
      }
      const updated = { ...prev, [section]: updatedValues };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div className="w-full overflow-hidden divide-y poppins-font text-[#5A5A5A]">
      {data?.map((group) => {
        const isOpen = openAccordions[group.title] ?? false;
        const selectedValues = selectedFilters[group.title] || [];

        return (
          <div key={group.title} className="border-b border-[#f1f1f1]">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(group.title)}
              className="flex justify-between items-center w-full py-3 font-semibold text-lg cursor-pointer"
            >
              <span className="capitalize">{group.code}</span>
              {isOpen ? (
                <FaMinus size={16} color="#018C99" />
              ) : (
                <FaPlus size={16} color="#018C99" />
              )}
            </button>
            {/* Accordion Content */}
            {isOpen && (
              <div className="p-2 flex flex-col gap-3 bg-white pb-4">
                {group.options.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(item.value)}
                      onChange={() =>
                        handleCheckboxChange(group.title, item.value)
                      }
                      className="w-4 h-4 accent-[#018C99]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
