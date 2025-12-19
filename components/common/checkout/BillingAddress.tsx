'use client';
import { useEffect, useState } from 'react';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import ScrollableSelect from '@/components/ui/ScrollableSelect';

interface AddressData {
  id?: number | null;
  address: string[];
  save_as_address: boolean;
  use_for_shipping?: boolean;
  default_address?: boolean;
  is_shipping: boolean;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  city: string;
  state: string;
  country: string;
  postcode: string | number;
  phone: string | number;
}

interface Country {
  code: string;
  name: string;
}

interface State {
  code: string;
  default_name: string;
}

interface BillingAddressProps {
  data: AddressData;
  errors: { [key: string]: string[] };
  onChange: (field: keyof AddressData, value: any) => void;
  onAddressChange: (index: number, value: string) => void;
  countryList: Country[];
  stateList: State[];
  onCountryChange: (countryCode: string) => void;
}

export default function BillingAddress({
  data,
  errors,
  onChange,
  onAddressChange,
  countryList,
  stateList,
  onCountryChange,
}: BillingAddressProps) {
  const handleCountryChange = (value: string) => {
    onChange('country', value);
    onCountryChange(value);
  };

  const addAddressLine = () => {
    const newAddress = [...data.address, ''];
    onChange('address', newAddress);
  };

  return (
    <div className="p-6 bg-white rounded-lg ">
      <h2 className="text-xl font-semibold mb-4">Billing Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            value={data.first_name}
            type="text"
            onChange={(e) => onChange('first_name', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.first_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            value={data.last_name}
            type="text"
            onChange={(e) => onChange('last_name', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.last_name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>}
        </div>

        {/* Company */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Company</label>
            <span className="text-gray-400 text-sm">Optional</span>
          </div>
          <input
            value={data.company_name}
            type="text"
            onChange={(e) => onChange('company_name', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            value={data.phone}
            type="tel"
            onChange={(e) => onChange('phone', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            value={data.email}
            type="email"
            onChange={(e) => onChange('email', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            City <span className="text-red-500">*</span>
          </label>
          <input
            value={data.city}
            type="text"
            onChange={(e) => onChange('city', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city[0]}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Address <span className="text-red-500">*</span>
          </label>
          {data.address.map((addr, index) => (
            <input
              key={index}
              value={addr}
              type="text"
              placeholder={index === 0 ? 'Street Address' : 'Apt, Suite, etc (Optional)'}
              onChange={(e) => onAddressChange(index, e.target.value)}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                index === 0 ? 'mb-2' : ''
              } ${errors.address && index === 0 ? 'border-red-500' : 'border-gray-300'}`}
            />
          ))}
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
          {data.address.length === 1 && (
            <button
              type="button"
              onClick={addAddressLine}
              className="text-sm text-teal-600 hover:text-teal-700 mt-2"
            >
              + Add address line 2
            </button>
          )}
        </div>

        {/* Country */}
        {/* <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Country <span className="text-red-500">*</span>
          </label>
          <ScrollableSelect
            value={data.country}
            onChange={handleCountryChange}
            options={countryList.map((country) => ({
              value: country.code,
              label: country.name,
            }))}
            placeholder="Select Country"
            error={!!errors.country}
            required
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country[0]}</p>}
        </div> */}

        {/* State */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Province <span className="text-red-500">*</span>
          </label>
          <ScrollableSelect
            value={data.state}
            onChange={(value) => onChange('state', value)}
            options={stateList.map((state) => ({
              value: state.code,
              label: state.default_name,
            }))}
            placeholder="Select State"
            disabled={stateList.length === 0}
            error={!!errors.state}
            required
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state[0]}</p>}
        </div>
        {/* Postal Code */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            value={data.postcode}
            type="text"
            onChange={(e) => onChange('postcode', e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              errors.postcode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode[0]}</p>}
        </div>
        {/* Checkboxes */}
        <div className="md:col-span-2 space-y-3">
          {/* Save this address */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="save_as_address"
              checked={data.save_as_address || false}
              onChange={(e) => onChange('save_as_address', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="save_as_address" className="text-sm font-medium text-gray-700">
              Save this address
            </label>
          </div>

          {/* Use same address for shipping */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="use_for_shipping"
              checked={data.use_for_shipping || false}
              onChange={(e) => onChange('use_for_shipping', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="use_for_shipping" className="text-sm font-medium text-gray-700">
              Use same address for shipping
            </label>
          </div>

          {/* Use as default address */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="default_address"
              checked={data.default_address || false}
              onChange={(e) => onChange('default_address', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label htmlFor="default_address" className="text-sm font-medium text-gray-700">
              Use as default address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
