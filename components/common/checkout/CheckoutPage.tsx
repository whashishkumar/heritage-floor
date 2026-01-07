'use client';
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
import { OrderEndPoints } from '@/lib/api/orderEndPoints';
import Image from 'next/image';

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
  const [showBillingScreen, setBillingScreen] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [orderSummaryList, seOrderSummarylist] = useState<any | null>(null);
  const { billing_address, customer, items, payment, shipping, totals } =
    orderSummaryList?.data || {};

  // Memoize shippingAddress to prevent infinite loop
  const shippingAddress = useMemo(() => {
    return purchaserAddress?.filter((address: any) => address.is_default);
  }, [purchaserAddress]);

  // Check if all required steps are completed
  const isCheckoutComplete = purchaserInfo && shippingAddress?.length > 0 && paymentMethodSelected;

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
      setBillingScreen(!showBillingScreen);
    }
    // Update state
    setFormData(updatedFormData);
    try {
      const resp = await CartEndPoint.addCustomerCheckoutAddress(updatedFormData);

      showToast(resp.message);
      if (resp.status === 200) {
        setBillingScreen(true);
      }
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

  const fetchOrderSummary = async () => {
    const orderSummary = await OrderEndPoints.getPlaceOrderSummary();
    seOrderSummarylist(orderSummary);
  };

  useEffect(() => {
    fetchCustomerDetail();
    fetchCustomerAddress();
    fetchOrderSummary();
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
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_PATH;
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
              // action={'Edit'}
              action={shippingAddress && shippingAddress.length > 0 ? 'Edit' : undefined}
              addAddress={'Add Address'}
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
                  {shippingAddress && shippingAddress.length > 0 && (
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
                  )}
                </>
              ) : (
                <div className="py-4">
                  {isAddMode ? (
                    <CheckoutAddressForm
                      handleCloseDrawer={handleCloseDrawer}
                      fetchCustomerAddress={fetchCustomerAddress}
                      setBillingScreen={setBillingScreen}
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
            {/* Billing */}
          </Card>
          {showBillingScreen && (
            <Card>
              <PaymentMethod
                onPaymentMethodSelect={() => setPaymentMethodSelected(true)}
                orderSummary={orderSummaryList}
                onOrderSummaryUpdate={seOrderSummarylist}
              />
            </Card>
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="space-y-6 lg:sticky lg:top-20">
          {/* Checkout Progress Indicator */}
          <Card>
            <div className="space-y-3 poppins-font">
              <h3 className="font-bold text-lg text-gray-900">Checkout Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      purchaserInfo ? 'bg-[#008c99] text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {purchaserInfo ? '✓' : '1'}
                  </div>
                  <span className={purchaserInfo ? 'text-[#008c99] font-medium' : 'text-gray-600'}>
                    Purchaser Information {purchaserInfo ? '✓' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      shippingAddress?.length > 0
                        ? 'bg-[#008c99] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {shippingAddress?.length > 0 ? '✓' : '2'}
                  </div>
                  <span
                    className={
                      shippingAddress?.length > 0 ? 'text-[#008c99] font-medium' : 'text-gray-600'
                    }
                  >
                    Shipping Address {shippingAddress?.length > 0 ? '✓' : ''}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      paymentMethodSelected
                        ? 'bg-[#008c99] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {paymentMethodSelected ? '✓' : '3'}
                  </div>
                  <span
                    className={
                      paymentMethodSelected ? 'text-[#008c99] font-medium' : 'text-gray-600'
                    }
                  >
                    Payment Method {paymentMethodSelected ? '✓' : ''}
                  </span>
                </div>
              </div>

              {isCheckoutComplete && (
                <div className="mt-4 p-3 bg-[#008c99]/5 border border-[#008c99] rounded-lg">
                  <p className="text-[#008c99] text-sm font-medium">✓ All steps completed!</p>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <Section
              title="Order Summary"
              amountValue={`${totals?.currency} ${totals?.grand_total || '0.00'}`}
            >
              <div className="mt-4 border-t pt-4 space-y-3 text-sm poppins-font">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {totals?.currency} {totals?.subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">
                    {totals?.currency} {totals?.tax || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping ({shipping?.title})</span>
                  <span className="font-medium">
                    {totals?.currency} {totals?.shipping || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    -{totals?.currency} {totals?.discount || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                  <span>Order Total</span>
                  <span className="text-[#008c99]">
                    {totals?.currency} {totals?.grand_total || '0.00'}
                  </span>
                </div>

                {payment?.title && (
                  <div className="flex justify-between pt-3 border-t text-gray-700">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">{payment.title}</span>
                  </div>
                )}

                {payment?.status && (
                  <div className="flex justify-between pt-2 text-gray-700">
                    <span className="text-gray-600">Payment Status</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'processing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                )}
              </div>
            </Section>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4 poppins-font">
              Items ({items?.length || 0})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide ">
              {items && Array.isArray(items) && items.length > 0 ? (
                items.map((item: any) => (
                  <div key={item?.item_id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                      {item?.image && (
                        <Image
                          src={`${imageBaseUrl}${item?.image}`}
                          // src={item?.image}
                          height={160}
                          width={160}
                          alt="img"
                          className="w-full object-contain"
                        />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {item?.name}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">SKU: {item?.sku}</p>

                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-gray-600">
                          Qty: <span className="font-medium">{item?.qty}</span>
                        </span>
                        <span className="text-gray-600">
                          Price:{' '}
                          <span className="font-medium">
                            {totals?.currency}
                            {item?.price}
                          </span>
                        </span>
                      </div>

                      {item?.tax > 0 && (
                        <p className="text-gray-500 text-xs mt-1">
                          Tax:{' '}
                          <span className="font-medium">
                            {totals?.currency}
                            {item?.tax}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Price and Total */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[#008c99] font-bold text-sm">
                        {totals?.currency}
                        {item?.total}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Subtotal: {totals?.currency}
                        {item?.subtotal}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No items in order</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
