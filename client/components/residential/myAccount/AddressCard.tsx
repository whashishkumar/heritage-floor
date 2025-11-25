'use client';

import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import SidebarNav from './SideBarNav';
import ModalBox from '@/components/ui/ModalBox';
import AddressForm from './AddressForm';
import { CartEndPoint } from '@/lib/api/cartEndPoints';

interface Address {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  postcode: string;
  email: string;
  vat_id: string;
  default_address: boolean;
}

export default function AddressList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      company_name: 'ABC Corp',
      phone: '1234567890',
      address: '123 Main St',
      address2: 'Suite 21',
      city: 'New York',
      country: 'US',
      state: 'NY',
      postcode: '10001',
      email: 'john@gmail.com',
      vat_id: 'VAT123',
      default_address: true,
    },
    {
      id: 2,
      first_name: 'Ashish',
      last_name: 'Sharma',
      company_name: 'Tech Ltd',
      phone: '9876543210',
      address: '77 Sector Road',
      address2: 'Floor 2',
      city: 'Delhi',
      country: 'IN',
      state: 'DL',
      postcode: '110001',
      email: 'ashish@gmail.com',
      vat_id: 'VAT999',
      default_address: false,
    },
    {
      id: 21,
      first_name: 'Ashish',
      last_name: 'Sharma',
      company_name: 'Tech Ltd',
      phone: '9876543210',
      address: '77 Sector Road',
      address2: 'Floor 2',
      city: 'Delhi',
      country: 'IN',
      state: 'DL',
      postcode: '110001',
      email: 'ashish@gmail.com',
      vat_id: 'VAT999',
      default_address: false,
    },
  ]);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    alert('Open edit modal for ID: ' + id);
  };

  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserAddresses = async () => {
    const resp = await CartEndPoint.getUserAddressList();
    console.log(resp, 'USER ADDRESSES');
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10">
          <div className="sticky top-20 h-fit">
            <SidebarNav />
          </div>
          <div className="w-full">
            {/* Add New Address Button */}
            <div className="sticky top-10 bg-[#f3f4f6] z-20  p-4 ">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900 poppins-font capitalize">
                  Create address
                </h2>
                <button
                  onClick={handleAddAddress}
                  className="flex items-center gap-2 border-2 border-dashed border-gray-400 px-4 py-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  <FiPlus className="text-xl poppins-font" /> Add New Address
                </button>
              </div>
            </div>
            {/* Address List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 poppins-font">
              {addresses.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 shadow-sm bg-white relative">
                  {item.default_address && (
                    <span className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}

                  <h3 className="font-semibold text-lg mb-1">
                    {item.first_name} {item.last_name}
                  </h3>
                  <p className="text-base text-gray-600">{item.company_name}</p>
                  <p className="text-base text-gray-700 mt-1">
                    {item.address}, {item.address2}
                  </p>
                  <p className="text-base text-gray-700">
                    {item.city}, {item.state}, {item.postcode}
                  </p>
                  <p className="text-base text-gray-700">{item.country}</p>
                  <p className="text-base text-gray-700 mt-2">📞 {item.phone}</p>
                  <p className="text-base text-gray-700">📧 {item.email}</p>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <AddressForm />
        </div>
      </ModalBox>
    </div>
  );
}
