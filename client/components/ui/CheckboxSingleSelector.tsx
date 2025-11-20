'use client';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

interface Option {
  id: number | string;
  label: string;
  value: string;
}

interface FilterGroup {
  title: string;
  options: Option[];
}

interface FilterAccordionGroupProps {
  data: FilterGroup[];
  onChange?: (filters: Record<string, string | null>) => void;
}

const CheckboxSingleSelector: React.FC<FilterAccordionGroupProps> = ({ data, onChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({});
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCheckboxChange = (section: string, value: string) => {
    setSelectedFilters((prev) => {
      // If clicked value is same as current → unselect it
      const updatedValue = prev[section] === value ? null : value;
      const updated = { ...prev, [section]: updatedValue };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div className="w-full overflow-hidden divide-y poppins-font text-[#5A5A5A]">
      {data.map((group) => {
        const isOpen = openAccordions[group.title] ?? false;
        const selectedValue = selectedFilters[group.title] || null;

        return (
          <div key={group.title} className="border-b border-[#f1f1f1]">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(group.title)}
              className="flex justify-between items-center w-full py-3 font-semibold text-lg cursor-pointer"
            >
              <span>{group.title}</span>
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
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedValue === item.value}
                      onChange={() => handleCheckboxChange(group.title, item.value)}
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

export default CheckboxSingleSelector;
