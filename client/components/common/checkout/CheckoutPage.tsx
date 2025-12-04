'use client';
import { summaryProducts } from './checkoutData';
import ProductCard from './ProductCard';
import Card from './Card';
import Section from './Section';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import { usePathSegments } from '@/utils/segmentPath';
import AddressForm from '@/components/residential/myAccount/AddressForm';
import { useEffect, useState, useMemo } from 'react';
import MyProfileForm from '@/components/residential/myAccount/MyProfileForm';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import { MdOutlinePhoneEnabled } from 'react-icons/md';
import { MdOutlineEmail } from 'react-icons/md';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import {
  MdPerson,
  MdLocationOn,
  MdLocationCity,
  MdPhone,
  MdEmail,
  MdBusiness,
  MdPublic,
} from 'react-icons/md';
import CheckoutAddressForm from './CheckoutAddressForm';
import { useToast } from '@/components/ui/Tooltip';
import PaymentMethod from './PaymentMethod';

export default function CheckoutPage() {
  const { showToast } = useToast();
  const { mainPath } = usePathSegments();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editPurchaserInfo, setPurchaser] = useState(false);
  const [purchaserInfo, setPurchaserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [purchaserAddress, setPurchaserAddress] = useState<any | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  // Memoize shippingAddress to prevent infinite loop
  const shippingAddress = useMemo(() => {
    return purchaserAddress?.filter((address: any) => address.is_default);
  }, [purchaserAddress]);

  const [formData, setFormData] = useState<{
    billing: {
      id: any;
      address: null;
      save_as_address: boolean;
      use_for_shipping: boolean;
      first_name: string;
      last_name: string;
      email: string;
      company_name: string;
      city: string;
      state: string;
      country: string;
      postcode: string;
      phone: string;
      default_address: boolean;
    };
    shipping?: {
      id: any;
      address: null;
      save_as_address: boolean;
      first_name: string;
      last_name: string;
      email: string;
      company_name: string;
      city: string;
      state: string;
      country: string;
      postcode: string;
      phone: string;
      use_for_shipping: boolean;
    };
  }>({
    billing: {
      id: '',
      address: null,
      save_as_address: false,
      use_for_shipping: false,
      first_name: '',
      last_name: '',
      email: '',
      company_name: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      phone: '',
      default_address: true,
    },
  });

  const handleEditAddress = async (address: any) => {
    if (address?.id) {
      setEditAddressId(address.id);
      setIsAddMode(false);
      setAddNewAddress(false);
      setOpenDrawer(true);
    }
  };

  const handleAddAddress = () => {
    setEditAddressId(null);
    setIsAddMode(true);
    setAddNewAddress(true);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setAddNewAddress(false);
    setIsAddMode(false);
    setEditAddressId(null);
  };

  const handleSaveBillingAddress = async () => {
    setFormData((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        save_as_address: !prev.billing.save_as_address,
      },
    }));
  };

  const handleUseForShipping = async () => {
    const newUseForShipping = !formData.billing.use_for_shipping;
    let updatedFormData: any;
    if (newUseForShipping) {
      updatedFormData = {
        billing: {
          ...formData.billing,
          use_for_shipping: newUseForShipping,
        },
        shipping: {
          id: formData.billing.id,
          address: formData.billing.address,
          save_as_address: formData.billing.save_as_address,
          first_name: formData.billing.first_name,
          last_name: formData.billing.last_name,
          email: formData.billing.email,
          company_name: formData.billing.company_name,
          city: formData.billing.city,
          state: formData.billing.state,
          country: formData.billing.country,
          postcode: formData.billing.postcode,
          phone: formData.billing.phone,
          use_for_shipping: true,
        },
      };
    } else {
      updatedFormData = {
        billing: {
          ...formData.billing,
          use_for_shipping: newUseForShipping,
        },
      };
    }
    // Update state
    setFormData(updatedFormData);
    try {
      const resp = await CartEndPoint.addCustomerCheckoutAddress(updatedFormData);
      console.log(resp, 'after saving address');
      showToast(resp.message);
    } catch (error) {
      console.error('Error saving checkout address:', error);
    }
  };

  const fetchCustomerDetail = async () => {
    try {
      setIsLoading(true);
      const resp = await UserMyAccountEndpoints.getUserDetail();
      setPurchaserInfo(resp?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return console.error(err);
    }
  };

  const fetchCustomerAddress = async () => {
    try {
      const resp = await CartEndPoint.getUserAddressList();
      setPurchaserAddress(resp?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomerDetail();
    fetchCustomerAddress();
  }, [editPurchaserInfo]);

  // Update formData when shippingAddress is available
  useEffect(() => {
    if (shippingAddress && shippingAddress.length > 0) {
      const defaultAddress = shippingAddress[0];
      setFormData((prev: any) => ({
        ...prev,
        billing: {
          ...prev.billing,
          id: defaultAddress.id || null,
          address: defaultAddress.address ? defaultAddress.address : [],
          first_name: defaultAddress.first_name || '',
          last_name: defaultAddress.last_name || '',
          email: defaultAddress.email || '',
          company_name: defaultAddress.company_name || '',
          city: defaultAddress.city || '',
          state: defaultAddress.state || '',
          country: defaultAddress.country || '',
          postcode: defaultAddress.postcode || '',
          phone: defaultAddress.phone || '',
        },
      }));
    }
  }, [shippingAddress]);

  return (
    <div className="wrapper m-auto py-12">
      <Link
        href={`${mainPath}/cart`}
        className="py-2 text-gray-800  font-medium flex items-center "
      >
        <IoIosArrowRoundBack size={22} />
        Return to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3 inter-font">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* Purchaser Info */}
          <Card>
            <Section
              title="1. Purchaser Information"
              action="Edit"
              handleOpenDrawer={() => setPurchaser(!editPurchaserInfo)}
            >
              {!editPurchaserInfo ? (
                <Suspense fallback={<Loader />}>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {purchaserInfo?.first_name}
                      <span> {purchaserInfo?.last_name}</span>
                    </p>
                    {purchaserInfo?.email && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <MdOutlineEmail size={16} />
                        {purchaserInfo?.email}
                      </p>
                    )}

                    {purchaserInfo?.phone && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <MdOutlinePhoneEnabled size={16} />
                        {purchaserInfo?.phone}
                      </p>
                    )}
                  </div>
                </Suspense>
              ) : (
                <div className="py-4">
                  <MyProfileForm
                    isCheckOutPage={true}
                    handleOpenDrawer={() => setPurchaser(!editPurchaserInfo)}
                  />
                </div>
              )}
            </Section>
          </Card>
          {/* Shipping Address */}
          <Card>
            <Section
              title="2. Shipping Address"
              action={'Edit'}
              addAddress={'add Address'}
              handleEditAddress={() => handleEditAddress(shippingAddress?.[0])}
              handleAddAddress={() => handleAddAddress()}
            >
              {!openDrawer ? (
                <>
                  {shippingAddress && shippingAddress.length > 0 ? (
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center gap-2">
                        <MdPerson size={18} className="text-gray-600" />
                        <p className="font-medium">{shippingAddress?.[0]?.first_name}</p>
                        <p className="font-medium">{shippingAddress?.[0]?.last_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdPhone size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.phone}</p>
                        <MdEmail size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.email}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdLocationOn size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.address}</p>
                        <MdLocationCity size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.city}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdBusiness size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.company_name}</p>
                        <MdPublic size={18} className="text-gray-600" />
                        <p>{shippingAddress?.[0]?.country_name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm py-4">
                      <p>No default address found. Please add a new address to continue.</p>
                    </div>
                  )}
                  <div className="py-6 flex gap-10">
                    {/* Save as address */}
                    <div className="flex items-center gap-2 md:col-span-2">
                      <input
                        type="checkbox"
                        id="save_billing"
                        checked={formData.billing.save_as_address}
                        onChange={handleSaveBillingAddress}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor="save_billing" className="text-sm font-medium text-gray-700">
                        Save this address
                      </label>
                    </div>

                    {/* Use for shipping */}
                    <div className="flex items-center gap-2 md:col-span-2">
                      <input
                        type="checkbox"
                        id="use_for_shipping"
                        checked={formData.billing.use_for_shipping}
                        onChange={handleUseForShipping}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label
                        htmlFor="use_for_shipping"
                        className="text-sm font-medium text-gray-700"
                      >
                        Use billing address for shipping
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-4">
                  {isAddMode ? (
                    <CheckoutAddressForm handleCloseDrawer={handleCloseDrawer} />
                  ) : (
                    <AddressForm
                      isCheckOutPage={true}
                      isEditId={editAddressId}
                      onSuccess={() => {
                        handleCloseDrawer();
                        fetchCustomerAddress();
                      }}
                    />
                  )}
                </div>
              )}
            </Section>
          </Card>

          {/* Billing */}
          <Card>
            <PaymentMethod />
          </Card>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="space-y-6">
          <Card>
            <Section title="Subtotal" amountValue={'$310.83'}>
              <div className="mt-4 border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$249.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>$4.32</span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Order Total</span>
                  <span>$310.83</span>
                </div>
              </div>
            </Section>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {summaryProducts?.map((item) => (
                <ProductCard key={item?.id} item={item} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
