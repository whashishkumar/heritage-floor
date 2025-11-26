'use client';
import { FiSearch } from 'react-icons/fi';
import { FiFilter } from 'react-icons/fi';
import SideBarNav from './SideBarNav';

export default function Orders() {
  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-10 md:py-16">
        <div className="flex gap-5 md:gap-10 flex-col md:flex-row lg:flex-row">
          <div className="md:sticky  top-20 h-fit z-10">
            <SideBarNav />
          </div>
          <div className="w-full bg-white p-6 rounded-xl border border-gray-200">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900">Order history &amp; status</h2>
            <p className="text-gray-500 mt-1">Keep track of all your orders and their status.</p>

            {/* Search + Filter */}
            <div className="mt-6 flex w-full">
              {/* Search Box */}
              <div className="flex items-center flex-grow border border-gray-300 rounded-l-xl px-4 py-3 gap-3">
                <FiSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search all orders"
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 border border-gray-300 border-l-0 px-6 py-3 rounded-r-xl text-gray-700 font-medium hover:bg-gray-50">
                <FiFilter className="text-xl" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
