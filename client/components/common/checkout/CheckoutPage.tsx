'use client';
import { shippingAddress, summaryProducts } from './checkoutData';
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

export default function CheckoutPage() {
  const { mainPath } = usePathSegments();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editPurchaserInfo, setPurchaser] = useState(false);
  const [purchaserInfo, setPurchaserInfo] = useState<any>(null);
  // const { first_name }: any = purchaserInfo;
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const fetchCustomerDetail = async () => {
    const resp = await UserMyAccountEndpoints.getUserDetail();
    setPurchaserInfo(resp?.data);
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, [openDrawer]);

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
                <div className="space-y-1">
                  <p className="font-medium">
                    {purchaserInfo?.first_name}
                    <span> {purchaserInfo?.last_name}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <MdOutlineEmail size={16} />
                    {purchaserInfo?.email}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <MdOutlinePhoneEnabled size={16} />
                    {purchaserInfo?.phone}
                  </p>
                </div>
              ) : (
                <div className="py-4">
                  <MyProfileForm isCheckOutPage={true} />
                </div>
              )}
            </Section>
          </Card>
          {/* Shipping Address */}
          <Card>
            <Section title="2. Shipping Address" action="Edit" handleOpenDrawer={handleOpenDrawer}>
              {!openDrawer ? (
                <div>
                  <p className="font-medium">{shippingAddress.title}</p>
                  <p className="text-gray-600">{shippingAddress.full}</p>
                  <p className="text-gray-600">{shippingAddress.phone}</p>
                </div>
              ) : (
                <AddressForm isCheckOutPage={true} />
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
