import type React from "react";
import { FiChevronDown } from "react-icons/fi";

interface MobileBlogFilterProps {
  categories: string[];
  selectedCategory: string;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  CategoryBaseArticles: (cat: any) => void;
}

const MobileBlogFilter: React.FC<MobileBlogFilterProps> = ({
  categories,
  selectedCategory,
  isFilterOpen,
  setIsFilterOpen,
  setSelectedCategory: _setSelectedCategory,
  CategoryBaseArticles,
}) => {
  return (
    <div className="lg:hidden py-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-700 font-medium"
      >
        <span>{selectedCategory}</span>
        <FiChevronDown
          className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isFilterOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {categories.map((category: any) => (
            <button
              key={category?.name}
              onClick={() => {
                // setSelectedCategory(category.slug);
                setIsFilterOpen(false);
                CategoryBaseArticles(category);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                selectedCategory === category
                  ? "bg-primaryTwo/10 text-primaryTwo font-medium"
                  : "text-darkBlue"
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileBlogFilter;
