'use client';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous */}
        <button
          className={`flex items-center justify-center min-w-[40px] h-10 px-2 border rounded-md text-sm font-medium transition cursor-pointer ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>

        {/* First page if hidden */}
        {visiblePages[0] > 1 && (
          <>
            <button
              className="flex items-center justify-center min-w-[40px] h-10 px-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 hover:border-gray-400 transition cursor-pointer"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="flex items-center justify-center min-w-[40px] h-10 text-gray-400 text-sm font-medium">
                ...
              </span>
            )}
          </>
        )}

        {/* Visible pages */}
        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`flex items-center justify-center min-w-[40px] h-10 px-2 border rounded-md text-sm font-medium transition cursor-pointer ${
              currentPage === pageNumber
                ? 'bg-gray-100 text-gray-900 border-gray-300 font-semibold'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        {/* Last page if hidden */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="flex items-center justify-center min-w-[40px] h-10 text-gray-400 text-sm font-medium ">
                ...
              </span>
            )}
            <button
              className="flex items-center justify-center min-w-[40px] h-10 px-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 hover:border-gray-400 transition"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          className={`flex items-center justify-center min-w-[40px] h-10 px-2 border rounded-md text-sm font-medium transition cursor-pointer ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
