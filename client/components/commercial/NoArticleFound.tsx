import type React from "react";
import { LuSearch } from "react-icons/lu";

interface NoResultsProps {
  title?: string;
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({
  title = "No articles found",
  message = "Try adjusting your search or filter to find what you're looking for.",
}) => {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <LuSearch className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default NoResults;
