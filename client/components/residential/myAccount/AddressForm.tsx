'use client';
import { useState } from 'react';
import SidebarNav from './SideBarNav';

export default function AddressForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    country: 'Canada',
    province: '',
    postalCode: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10">
          <SidebarNav />
          <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Create address</h2>
            </div>

            <hr className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">First name</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Company</label>
                  <span className="text-gray-400 text-sm">Optional</span>
                </div>
                <input
                  type="text"
                  name="company"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Address 2</label>
                  <span className="text-gray-400 text-sm">Optional</span>
                </div>
                <input
                  type="text"
                  name="address2"
                  placeholder="Apt, Suite, Etc"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Canada</option>
                  <option>United States</option>
                  <option>India</option>
                </select>
              </div>

              {/* Province */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Province</label>
                <select
                  name="province"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Select a Province</option>
                  <option>Ontario</option>
                  <option>Quebec</option>
                  <option>British Columbia</option>
                </select>
              </div>

              {/* Postal Code */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700">
                Save
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
