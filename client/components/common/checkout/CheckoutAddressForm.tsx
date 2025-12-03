'use client';
import { useEffect, useState } from 'react';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import { useToast } from '@/components/ui/Tooltip';
import BillingAddress from './BillingAddress';
import ShippingAddress from './ShippingAddress';

interface AddressData {
  id?: number | null;
  address: string[];
  save_as_address: boolean;
  use_for_shipping?: boolean;
  is_default: boolean;
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

interface CheckoutFormData {
  billing: AddressData;
  shipping: AddressData;
}

interface AddressFormErrors {
  billing?: { [key: string]: string[] };
  shipping?: { [key: string]: string[] };
}

interface Country {
  code: string;
  name: string;
}

interface State {
  code: string;
  default_name: string;
}

interface CheckoutAddressFormProps {
  onSubmit?: (data: CheckoutFormData) => void;
  initialData?: CheckoutFormData;
}

export default function CheckoutAddressForm({ onSubmit, initialData }: CheckoutAddressFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<CheckoutFormData>(
    initialData || {
      billing: {
        id: null,
        address: [''],
        save_as_address: false,
        use_for_shipping: false,
        is_default: false,
        is_shipping: false,
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        city: '',
        state: '',
        country: 'US',
        postcode: '',
        phone: '',
      },
      shipping: {
        id: null,
        address: [''],
        save_as_address: false,
        is_default: false,
        is_shipping: true,
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        city: '',
        state: '',
        country: 'US',
        postcode: '',
        phone: '',
      },
    }
  );
  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [billingStateList, setBillingStateList] = useState<State[]>([]);
  const [shippingStateList, setShippingStateList] = useState<State[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (section: 'billing' | 'shipping', field: keyof AddressData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error for this field
    if (errors[section]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: undefined,
        },
      }));
    }

    // Fetch states when country changes
    if (field === 'country' && value) {
      if (section === 'billing') {
        fetchStates(value, 'billing');
      } else {
        fetchStates(value, 'shipping');
      }
      // Reset state when country changes
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          state: '',
        },
      }));
    }

    // Copy billing to shipping if use_for_shipping is checked
    if (section === 'billing' && field === 'use_for_shipping' && value === true) {
      const billingData = { ...formData.billing };
      delete billingData.use_for_shipping;
      setFormData((prev) => ({
        ...prev,
        shipping: {
          ...billingData,
          id: null,
          save_as_address: false,
        },
      }));
      // Also fetch states for shipping
      fetchStates(formData.billing.country, 'shipping');
    }
  };

  const handleAddressChange = (section: 'billing' | 'shipping', index: number, value: string) => {
    setFormData((prev) => {
      const newAddress = [...prev[section].address];
      newAddress[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          address: newAddress,
        },
      };
    });
  };

  const fetchCountries = async () => {
    try {
      const resp = await CommonComponentData.getCountriesList();
      setCountryList(resp?.data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryCode: string, section: 'billing' | 'shipping') => {
    try {
      const resp = await CommonComponentData.getStatesList(countryCode);
      if (section === 'billing') {
        setBillingStateList(resp?.data || []);
      } else {
        setShippingStateList(resp?.data || []);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      if (section === 'billing') {
        setBillingStateList([]);
      } else {
        setShippingStateList([]);
      }
    }
  };

  const validateForm = (): AddressFormErrors => {
    const newErrors: AddressFormErrors = {};

    // Validate billing
    const billingErrors: { [key: string]: string[] } = {};
    if (!formData.billing.first_name.trim()) {
      billingErrors.first_name = ['The first name field is required.'];
    }
    if (!formData.billing.last_name.trim()) {
      billingErrors.last_name = ['The last name field is required.'];
    }
    if (!formData.billing.address[0]?.trim()) {
      billingErrors.address = ['The address field is required.'];
    }
    if (!formData.billing.country.trim()) {
      billingErrors.country = ['The country field is required.'];
    }
    if (!formData.billing.state.trim()) {
      billingErrors.state = ['The state field is required.'];
    }
    if (!formData.billing.city.trim()) {
      billingErrors.city = ['The city field is required.'];
    }
    if (!formData.billing.postcode.toString().trim()) {
      billingErrors.postcode = ['The postcode field is required.'];
    }
    if (!formData.billing.phone.toString().trim()) {
      billingErrors.phone = ['The phone field is required.'];
    }
    if (!formData.billing.email.trim()) {
      billingErrors.email = ['The email field is required.'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billing.email)) {
      billingErrors.email = ['Please enter a valid email address.'];
    }

    if (Object.keys(billingErrors).length > 0) {
      newErrors.billing = billingErrors;
    }

    // Validate shipping (unless using billing for shipping)
    if (!formData.billing.use_for_shipping) {
      const shippingErrors: { [key: string]: string[] } = {};
      if (!formData.shipping.first_name.trim()) {
        shippingErrors.first_name = ['The first name field is required.'];
      }
      if (!formData.shipping.last_name.trim()) {
        shippingErrors.last_name = ['The last name field is required.'];
      }
      if (!formData.shipping.address[0]?.trim()) {
        shippingErrors.address = ['The address field is required.'];
      }
      if (!formData.shipping.country.trim()) {
        shippingErrors.country = ['The country field is required.'];
      }
      if (!formData.shipping.state.trim()) {
        shippingErrors.state = ['The state field is required.'];
      }
      if (!formData.shipping.city.trim()) {
        shippingErrors.city = ['The city field is required.'];
      }
      if (!formData.shipping.postcode.toString().trim()) {
        shippingErrors.postcode = ['The postcode field is required.'];
      }
      if (!formData.shipping.phone.toString().trim()) {
        shippingErrors.phone = ['The phone field is required.'];
      }
      if (!formData.shipping.email.trim()) {
        shippingErrors.email = ['The email field is required.'];
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.shipping.email)) {
        shippingErrors.email = ['Please enter a valid email address.'];
      }

      if (Object.keys(shippingErrors).length > 0) {
        newErrors.shipping = shippingErrors;
      }
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fill in all required fields correctly', 'error');
      return;
    }

    setErrors({});
    console.log('Form Data:', formData);

    if (onSubmit) {
      onSubmit(formData);
    } else {
      showToast('Checkout data validated successfully!', 'success');
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchStates(formData.billing.country, 'billing');
    fetchStates(formData.shipping.country, 'shipping');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8 ">
      {/* BILLING ADDRESS */}
      <BillingAddress
        data={formData.billing}
        errors={errors.billing || {}}
        onChange={(field, value) => handleChange('billing', field, value)}
        onAddressChange={(index, value) => handleAddressChange('billing', index, value)}
        countryList={countryList}
        stateList={billingStateList}
        onCountryChange={(countryCode) => fetchStates(countryCode, 'billing')}
      />

      {/* SHIPPING ADDRESS */}
      {!formData.billing.use_for_shipping && (
        <ShippingAddress
          data={formData.shipping}
          errors={errors.shipping || {}}
          onChange={(field, value) => handleChange('shipping', field, value)}
          onAddressChange={(index, value) => handleAddressChange('shipping', index, value)}
          countryList={countryList}
          stateList={shippingStateList}
          onCountryChange={(countryCode) => fetchStates(countryCode, 'shipping')}
        />
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </form>
  );
}
