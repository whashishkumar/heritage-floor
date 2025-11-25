'use client';
import { useEffect, useState } from 'react';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { CommonComponentData } from '@/lib/api/commonEndPoints';

export default function AddressForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    country: 'US',
    state: '',
    postcode: '',
    email: '',
    vat_id: '',
    default_address: false,
  });

  const [countryList, setCountryList] = useState<Array<any>>([]);
  const [stateList, setStateList] = useState<Array<any>>([]);
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const fetChAddressList = async () => {
    const resp = await CartEndPoint.getUserAddressList();
  };

  const fetchCountries = async () => {
    const resp = await CommonComponentData.getCountriesList();
    setCountryList(resp?.data);
  };

  const fetchStates = async (countryCode: string) => {
    const resp = await CommonComponentData.getStatesList(countryCode);
    setStateList(resp?.data);
  };

  const handleSubmitAddress = async () => {
    const payload = {
      ...formData,
      address: [formData.address],
    };
    const resp = await CartEndPoint.addCustomerAddress(payload);
  };

  useEffect(() => {
    fetChAddressList();
    fetchCountries();
    fetchStates(formData.country);
  }, []);

  return (
    <>
      {/* <div className="wrapper m-auto py-16"> */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Create address</h2>
        </div>

        <hr className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">First name</label>
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Last name</label>
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Company</label>
              <span className="text-gray-400 text-sm">Optional</span>
            </div>
            <input
              type="text"
              name="company_name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">VAT ID</label>
            <input
              type="text"
              name="vat_id"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              {countryList.length > 0 &&
                countryList.map((country) => (
                  <option key={country.code} value={country.code} className="">
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
            <select
              name="state"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              {stateList.length > 0 &&
                stateList?.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.default_name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</label>
            <input
              type="text"
              name="postcode"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="default_address" onChange={handleChange} />
            <label className="text-sm font-medium text-gray-700">Set as default address</label>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700"
            onClick={handleSubmitAddress}
          >
            Save
          </button>
          {/* <button className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
            Cancel
          </button> */}
        </div>
      </div>
    </>
    // </div>
  );
}
