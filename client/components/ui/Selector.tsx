"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface Option {
  label: string;
  value: string | number;
  name?: string;
  id?: number;
}

interface SelectorProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  defaultValue?: string | number;
  name?: string;
  id?: number;
  onChange?: (value: string | number) => void;
}

const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  placeholder = "Select an option",
  defaultValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(
    defaultValue || null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string | number | any) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  const selectedLabel =
    options?.find((opt) => opt.value === selected || opt.name === selected)?.label ||
    placeholder;

    
  return (
    <div
      ref={dropdownRef}
      className="relative w-full text-[#444] poppins-font flex items-center justify-center gap-2"
    >
      {label && (
        <label className="text-nowrap text-sm font-bold text-gray">
          {label}
        </label>
      )}

      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm shadow-sm cursor-pointer"
      >
        <span
          className={`${selected ? "text-[#222]" : "text-gray-500"} truncate`}
        >
          {selectedLabel}
        </span>
        <IoChevronDownOutline
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#018C99]" : "rotate-0 text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.value || opt.id}
              onClick={() => handleSelect(opt.value || opt.id)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#018C99]/10 transition ${
                selected === opt.value || selected === opt.id
                  ? "bg-[#018C99]/10 text-[#018C99] font-medium"
                  : "text-gray-700"
              }`}
            >
              {opt.label || opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
