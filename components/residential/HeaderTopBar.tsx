'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CommonComponentData } from '@/lib/api/commonEndPoints';

export default function HeaderTopBar({ data }: any) {
  const { email, phone } = data || {};
  // const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [storeLocation, setStoreLocations] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState(storeLocation?.[0]?.address || '');

  const addresses = [
    {
      id: 1,
      label: 'Head Office',
      address: 'Office 201, Tech Park, Bangalore, India',
    },
    {
      id: 2,
      label: 'Branch Office',
      address: 'Sector 62, Noida, Uttar Pradesh, India',
    },
    {
      id: 3,
      label: 'USA Office',
      address: 'San Jose, California, USA',
    },
  ];

  const getNearestStore = async () => {
    try {
      const storeLocations = await CommonComponentData.getStoreLocations();
      setStoreLocations(storeLocations?.data);
    } catch (error) {
      console.error('Error fetching store locations:', error);
    }
  };

  useEffect(() => {
    getNearestStore();
  }, []);

  return (
    <>
      <div className=" hidden md:flex lg:flex items-center justify-center bg-offWhite text-black h-auto py-2 w-full">
        <div className="wrapper mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-4">
          {/* Left Section */}
          <div className="text-sm sm:text-base text-textGray font-normal leading-[1.6] text-center sm:text-left">
            Get a consultation with us
            <a
              href={`tel:${phone.replace(/[^+\d]/g, '')}`}
              className="font-medium ml-1 text-black hover:underline cursor-pointer"
            >
              {phone}
            </a>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-2 sm:gap-4 mt-1 sm:mt-0">
            {/* Address */}
            <div className="flex items-center gap-1.5">
              <div className="relative h-[1rem] w-[1rem] sm:h-[1.25rem] sm:w-[1.25rem]">
                <Image
                  src="/icon/MapPoint.png"
                  fill
                  alt="207 Colonnade Rd S. Nepean, ON K2E 7K3"
                  className="object-contain"
                />
              </div>
              <div className="max-w-md space-y-4">
                <select
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 outline-none"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  {storeLocation?.map((item: any) => (
                    <option key={item.id} value={item.address}>
                      {item.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1.5">
              <div className="relative h-[1rem] w-[1rem] sm:h-[1.25rem] sm:w-[1.25rem]">
                <Image
                  src="/icon/message.png"
                  fill
                  alt="ottawa@heritagefloorandhome.ca"
                  className="object-contain"
                />
              </div>
              <a
                href={`mailto:${email}`}
                className="text-xs sm:text-sm text-textGray font-normal leading-[1.6]  text-center sm:text-left hover:underline cursor-pointer"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
