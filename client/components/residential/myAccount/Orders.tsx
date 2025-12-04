'use client';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FiFilter } from 'react-icons/fi';
import SideBarNav from './SideBarNav';
import MyOrders from './MyOrder';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';

export default function Orders() {
  const [searchKey, setSearchKey] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchValue?: string) => {
    const searchTerm = searchValue !== undefined ? searchValue : searchKey;
    setIsSearching(true);
    try {
      const resp = await OrderEndPoints.filterOrderListItems(searchTerm, '');
      setFilteredOrders(resp);
    } catch (error) {
      console.error('Error searching orders:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);

    // If search is cleared, reset filtered orders
    if (value === '') {
      setFilteredOrders(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-10 md:py-16">
        <div className="flex gap-5 md:gap-10 flex-col md:flex-row lg:flex-row">
          <div className="md:sticky  top-20 h-fit z-10">
            <SideBarNav />
          </div>
          <div className="w-full bg-white p-6 rounded-xl border border-gray-200  ">
            <div className=" md:sticky  top-12 z-10 bg-white md:p-6">
              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900 poppins-font capitalize">
                Order history &amp; status
              </h2>
              <p className="text-gray-500 mt-1 roboto-font">
                Keep track of all your orders and their status.
              </p>
              {/* Search + Filter */}
              <div className="mt-6 flex w-full">
                {/* Search Box */}
                <div className="flex items-center flex-grow border border-gray-300 rounded-xl px-4 py-3 gap-3">
                  <button onClick={() => handleSearch()} disabled={isSearching}>
                    <FiSearch className="text-gray-400 text-xl cursor-pointer hover:text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search all orders"
                    value={searchKey}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <MyOrders filteredOrders={filteredOrders} isSearching={isSearching} />
          </div>
        </div>
      </div>
    </div>
  );
}
