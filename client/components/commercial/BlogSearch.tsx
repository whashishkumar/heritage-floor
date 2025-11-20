import React from 'react';
import { LuSearch } from 'react-icons/lu';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const SearchBarBlog: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search articles, topics, or keywords...',
}) => {
  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <div className="relative">
        <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/60 text-white placeholder-offWhite/80 focus:outline-none focus:ring-2 focus:ring-primaryTwo focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBarBlog;
