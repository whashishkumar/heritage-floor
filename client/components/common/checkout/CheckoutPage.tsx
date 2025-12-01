'use client';
import { summaryProducts } from './checkoutData';
import ProductCard from './ProductCard';
import Card from './Card';
import Section from './Section';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';
import { usePathSegments } from '@/utils/segmentPath';
import AddressForm from '@/components/residential/myAccount/AddressForm';
import { useEffect, useState } from 'react';
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

export default function CheckoutPage() {
  const { mainPath } = usePathSegments();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editPurchaserInfo, setPurchaser] = useState(false);
  const [purchaserInfo, setPurchaserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [purchaserAddress, setPurchaserAddress] = useState<any | null>(null);
  const [editAddressId, setEditAddressId] = useState<number | null>(null);

  const shippingAddress = purchaserAddress?.filter((address: any) => address.is_default);

  const handleEditAddress = async (address: any) => {
    if (address?.id) {
      setEditAddressId(address.id);
      setOpenDrawer(true);
    }
  };

  const handleAddAddress = () => {
    setEditAddressId(null);
    setOpenDrawer(true);
  };

  const fetchCustomerDetail = async () => {
    try {
      setIsLoading(true);
      const resp = await UserMyAccountEndpoints.getUserDetail();
      setPurchaserInfo(resp?.data);
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
  }, [editPurchaserInfo, editAddressId]);

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
              action={shippingAddress?.length > 0 ? 'Edit' : 'Add Address'}
              handleOpenDrawer={() =>
                shippingAddress?.length > 0
                  ? handleEditAddress(shippingAddress?.[0])
                  : handleAddAddress()
              }
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
                <AddressForm
                  isCheckOutPage={true}
                  isEditId={editAddressId}
                  onSuccess={() => {
                    setOpenDrawer(false);
                    setEditAddressId(null);
                    fetchCustomerAddress();
                  }}
                />
              )}
            </Section>
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
