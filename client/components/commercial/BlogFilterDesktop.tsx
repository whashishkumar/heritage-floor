import React from 'react';

interface DesktopBlogFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  CategoryBaseArticles: (categories: any) => void;
}

const DesktopBlogFilter: React.FC<DesktopBlogFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  CategoryBaseArticles,
}) => {
  // const handleSelect = (category: any) => {
  //   const { slug } = category;
  //   setSelectedCategory(slug);
  // };

  return (
    <div className="hidden pl-2 lg:flex items-center gap-3 py-6 overflow-x-auto">
      {categories?.map((category: any) => (
        <button
          key={category.name}
          onClick={() => CategoryBaseArticles(category)}
          className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-gray-900 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-darkBlue hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default DesktopBlogFilter;
