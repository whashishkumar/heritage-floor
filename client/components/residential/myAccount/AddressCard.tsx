'use client';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiPhone, FiMail, FiCheckCircle, FiStar } from 'react-icons/fi';
import SidebarNav from './SideBarNav';
import ModalBox from '@/components/ui/ModalBox';
import AddressForm from './AddressForm';
import Loader from '@/components/ui/Loader';
import { CartEndPoint } from '@/lib/api/cartEndPoints';
import { useAuth } from '@/context/userAuthContext';
import ConfirmationPopup from '@/components/ui/ConfirmationPopUp';

interface Address {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postcode: string;
  email: string;
  vat_id: string;
  default_address: boolean;
  is_default?: boolean;
}

export default function AddressList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null);
  const [isEditId, setIsEditId] = useState<number | null>(null);

  const handleConfirm = async () => {
    if (deleteAddressId !== null) {
      try {
        await CartEndPoint.deleteCustomerAddress(deleteAddressId);
        await fetchUserAddresses();
        setOpen(false);
        setDeleteAddressId(null);
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleDelete = (id: number) => {
    setDeleteAddressId(id);
    setOpen(true);
  };

  const handleEdit = async (id: number) => {
    setIsEditId(id);
    setIsModalOpen(true);
  };

  const handleAddAddress = () => {
    setIsEditId(null); // Reset edit ID when adding new address
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditId(null);
  };

  const handleSuccess = async () => {
    await fetchUserAddresses(); // Refresh address list
    handleCloseModal(); // Close modal
  };

  const handleMakeDefault = async (id: number) => {
    try {
      await CartEndPoint.matchCustomerAddressAsDefault(id);
      fetchUserAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const fetchUserAddresses = async () => {
    try {
      setLoading(true);
      const resp = await CartEndPoint.getUserAddressList();
      setAddresses(resp.data || []);
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!isAuthenticated) {
    fetchUserAddresses();
    // }
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
              {loading ? (
                <div className="col-span-2 flex justify-center items-center py-20">
                  <Loader />
                </div>
              ) : (
                addresses?.map((item) => (
                  <div
                    key={item.id}
                    className="shadow-sm rounded-xl p-4 shadow-sm bg-white relative border-1 border-gray-200"
                  >
                    {item.is_default && (
                      <span className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <FiCheckCircle className="text-sm" /> Default
                      </span>
                    )}

                    <h3 className="font-semibold text-lg mb-1">
                      {item.first_name} {item.last_name}
                    </h3>
                    <p className="text-base text-gray-600">{item.company_name}</p>
                    <p className="text-base text-gray-700 mt-1">{item.address}</p>
                    <p className="text-base text-gray-700">
                      {item.city}, {item.state}, {item.postcode}
                    </p>
                    <p className="text-base text-gray-700">{item.country}</p>
                    <p className="text-base text-gray-700 mt-2 flex items-center gap-2">
                      <FiPhone className="text-gray-600" /> {item.phone}
                    </p>
                    <p className="text-base text-gray-700 flex items-center gap-2">
                      <FiMail className="text-gray-600" />
                      {item.email}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <FiEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <FiTrash2 /> Delete
                      </button>
                      {!item.default_address && (
                        <button
                          onClick={() => handleMakeDefault(item.id)}
                          className="flex items-center gap-1 text-teal-600 hover:text-teal-800 font-medium cursor-pointer"
                        >
                          <FiStar /> Make Default
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      <ConfirmationPopup
        isOpen={open}
        title="Delete Address"
        message="Are you sure you want to delete this address? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
          setDeleteAddressId(null);
        }}
      />

      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <AddressForm
            isEditId={isEditId}
            closeModal={handleCloseModal}
            onSuccess={handleSuccess}
          />
        </div>
      </ModalBox>
    </div>
  );
}
