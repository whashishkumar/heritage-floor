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

export default function CheckoutPage() {
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
      address: any[];
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
    };
    shipping?: {
      id: any;
      address: any[];
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
      use_for_shipping: string;
    };
  }>({
    billing: {
      id: shippingAddress?.id,
      address: [],
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
    },
  });

  console.log(formData, 'formData');

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

  const handleSaveBillingAddress = () => {
    setFormData((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        save_as_address: !prev.billing.save_as_address,
      },
    }));
  };

  const handleUseForShipping = () => {
    setFormData((prev: any) => {
      const newUseForShipping = !prev.billing.use_for_shipping;
      if (newUseForShipping) {
        return {
          ...prev,
          billing: {
            ...prev.billing,
            use_for_shipping: newUseForShipping,
          },
          shipping: {
            id: prev.billing.id,
            address: prev.billing.address,
            save_as_address: false,
            first_name: prev.billing.first_name,
            last_name: prev.billing.last_name,
            email: prev.billing.email,
            company_name: prev.billing.company_name,
            city: prev.billing.city,
            state: prev.billing.state,
            country: prev.billing.country,
            postcode: prev.billing.postcode,
            phone: prev.billing.phone,
          },
        };
      } else {
        // If checkbox is being unchecked, remove shipping object
        const { shipping, ...rest } = prev;
        return {
          ...rest,
          billing: {
            ...prev.billing,
            use_for_shipping: newUseForShipping,
          },
        };
      }
    });
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

  // Fetch customer details and address on mount and when editPurchaserInfo changes
  useEffect(() => {
    fetchCustomerDetail();
    fetchCustomerAddress();
  }, [editPurchaserInfo]);

  // Update formData when shippingAddress is available
  useEffect(() => {
    if (shippingAddress && shippingAddress.length > 0) {
      const defaultAddress = shippingAddress[0];
      setFormData((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          id: defaultAddress.id || null,
          address: defaultAddress.address?.[0] ? [defaultAddress.address] : [],
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
                </>
              ) : (
                <div className="py-4">
                  {isAddMode ? (
                    <CheckoutAddressForm
                      initialData={
                        shippingAddress && shippingAddress.length > 0
                          ? {
                              billing: {
                                id: shippingAddress[0].id || null,
                                address: shippingAddress[0].address
                                  ? [shippingAddress[0].address]
                                  : [''],
                                save_as_address: false,
                                use_for_shipping: false,
                                is_default: shippingAddress[0].is_default || false,
                                is_shipping: false,
                                first_name: shippingAddress[0].first_name || '',
                                last_name: shippingAddress[0].last_name || '',
                                email: shippingAddress[0].email || '',
                                company_name: shippingAddress[0].company_name || '',
                                city: shippingAddress[0].city || '',
                                state: shippingAddress[0].state || '',
                                country: shippingAddress[0].country || 'US',
                                postcode: shippingAddress[0].postcode || '',
                                phone: shippingAddress[0].phone || '',
                              },
                              shipping: {
                                id: null,
                                address: [''],
                                save_as_address: false,
                                is_default: false,
                                is_shipping: true,
                                first_name: shippingAddress[0].first_name || '',
                                last_name: shippingAddress[0].last_name || '',
                                email: shippingAddress[0].email || '',
                                company_name: shippingAddress[0].company_name || '',
                                city: shippingAddress[0].city || '',
                                state: shippingAddress[0].state || '',
                                country: shippingAddress[0].country || 'US',
                                postcode: shippingAddress[0].postcode || '',
                                phone: shippingAddress[0].phone || '',
                              },
                            }
                          : undefined
                      }
                      onSubmit={(data) => {
                        console.log('New address data:', data);
                        handleCloseDrawer();
                        fetchCustomerAddress();
                      }}
                    />
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
            <div className="py-6 flex gap-10">
              {/* Save as address */}
              <div className="flex items-center gap-2 md:col-span-2">
                {/* <button onChange={handleSaveBillingAddress}> Add Bulling address </button> */}
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
                <label htmlFor="use_for_shipping" className="text-sm font-medium text-gray-700">
                  Use billing address for shipping
                </label>
              </div>
            </div>
          </Card>

          {/* Billing */}
          <Card>
            <Section title="3. Billing">
              <p className="text-gray-700">Choose a Payment Method:</p>
            </Section>
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
