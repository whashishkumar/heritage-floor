'use client';
import { useEffect, useState } from 'react';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import { useToast } from '@/components/ui/Tooltip';

export default function AddressForm({ isEditId, closeModal, onSuccess, isCheckOutPage }: any) {
  const { showToast } = useToast();
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
  const [errors, setErrors] = useState<any>({});
  const [countryList, setCountryList] = useState<Array<any>>([]);
  const [stateList, setStateList] = useState<Array<any>>([]);
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
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

  const validateForm = () => {
    const newErrors: any = {};

    // Validate required fields
    if (!formData.first_name.trim()) {
      newErrors.first_name = ['The first name field is required.'];
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = ['The last name field is required.'];
    }

    if (!formData.address.trim()) {
      newErrors.address = ['The address field is required.'];
    }

    if (!formData.country.trim()) {
      newErrors.country = ['The country field is required.'];
    }

    if (!formData.state.trim()) {
      newErrors.state = ['The state field is required.'];
    }

    if (!formData.city.trim()) {
      newErrors.city = ['The city field is required.'];
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = ['The postcode field is required.'];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = ['The phone field is required.'];
    }

    if (!formData.email.trim()) {
      newErrors.email = ['The email field is required.'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = ['Please enter a valid email address.'];
    }

    return newErrors;
  };

  const handleSubmitAddress = async () => {
    try {
      // Validate form on frontend first
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        showToast('Please fill in all required fields correctly', 'error');
        return;
      }
      setErrors({});

      const payload = {
        ...formData,
        address: [formData.address],
      };

      let resp;
      if (isEditId) {
        // Update existing address
        resp = await CartEndPoint.updateCustomerAddress(isEditId, payload);
      } else {
        // Create new address
        resp = await CartEndPoint.addCustomerAddress(payload);
      }

      if (resp?.errors) {
        setErrors(resp.errors);
        showToast('Please fix the validation errors', 'error');
      } else {
        showToast(
          resp?.message || `Address ${isEditId ? 'updated' : 'saved'} successfully`,
          'success'
        );

        // Call onSuccess callback to refresh address list and close modal
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: any) {
      console.error('Error saving address:', error);

      // Handle API error response
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
        showToast('Please fix the validation errors', 'error');
      } else {
        showToast(error?.response?.data?.message || 'Failed to save address', 'error');
      }
    }
  };

  const getUpdateAddressData = async (id: number) => {
    try {
      const resp = await CartEndPoint.getCustomerAddress(id);
      const addressData = resp?.data;
      if (addressData) {
        setFormData({
          first_name: addressData.first_name || '',
          last_name: addressData.last_name || '',
          company_name: addressData.company_name || '',
          phone: addressData.phone || '',
          address: addressData.address[0] || '',
          address2: addressData.address[1] || '',
          city: addressData.city || '',
          country: addressData.country || 'US',
          state: addressData.state || '',
          postcode: addressData.postcode || '',
          email: addressData.email || '',
          vat_id: addressData.vat_id || '',
          default_address: addressData.default_address || false,
        });
      }
    } catch (error) {
      console.error('Error fetching address data:', error);
    }
  };

  useEffect(() => {
    fetChAddressList();
    fetchCountries();
    fetchStates(formData.country);

    if (isEditId) {
      getUpdateAddressData(isEditId);
    } else {
      // Reset form data when adding new address
      setFormData({
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
      setErrors({});
    }
  }, [isEditId]);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg">
        {!isCheckOutPage && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {isEditId ? 'Edit address' : 'Create address'}
              </h2>
            </div>

            <hr className="mb-4" />
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.first_name}
              type="text"
              name="first_name"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.last_name}
              type="text"
              name="last_name"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Company</label>
              <span className="text-gray-400 text-sm">Optional</span>
            </div>
            <input
              value={formData.company_name}
              type="text"
              name="company_name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.phone}
              type="text"
              name="phone"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.email}
              type="email"
              name="email"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">VAT ID</label>
            <input
              value={formData.vat_id}
              type="text"
              name="vat_id"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.address}
              type="text"
              name="address"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Address 2</label>
              <span className="text-gray-400 text-sm">Optional</span>
            </div>
            <input
              value={formData.address2 || ''}
              type="text"
              name="address2"
              placeholder="Apt, Suite, Etc"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              City <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.city}
              type="text"
              name="city"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city[0]}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 bg-white ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {countryList.length > 0 &&
                countryList.map((country) => (
                  <option key={country.code} value={country.code} className="">
                    {country.name}
                  </option>
                ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country[0]}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 bg-white ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {stateList.length > 0 &&
                stateList?.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.default_name}
                  </option>
                ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state[0]}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.postcode}
              type="text"
              name="postcode"
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 ${
                errors.postcode ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode[0]}</p>}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="default_address"
              checked={formData.default_address}
              onChange={handleChange}
            />
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
        </div>
      </div>
    </>
  );
}
