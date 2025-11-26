'use client';
import { useEffect, useState, useRef } from 'react';
import SideBarNav from './SideBarNav';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import { useAuth } from '@/context/userAuthContext';
import { useToast } from '@/components/ui/Tooltip';

export default function MyProfileForm() {
  const { showToast } = useToast();

  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    email: '',
    subscribed_to_news_letter: false,
    profile_image: null,
  });
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUserDetail = async () => {
    const resp = await UserMyAccountEndpoints.getUserDetail();
    fillForm(resp.data);
  };

  const fillForm = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      first_name: data.first_name ?? '',
      last_name: data.last_name ?? '',
      gender: data.gender ?? '',
      date_of_birth: data.date_of_birth ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      subscribed_to_news_letter: data.subscribed_to_news_letter ?? false,
      profile_image: data.profile_image ?? null,
    }));

    // Set the existing profile image if available
    if (data.image) {
      setImagePreview(data.profile_image);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      first_name: '',
      last_name: '',
      gender: '',
      date_of_birth: '',
      phone: '',
    };

    let isValid = true;

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of birth is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const userData = new FormData();
    userData.append('_method', 'PUT');
    userData.append('first_name', formData.first_name);
    userData.append('last_name', formData.last_name);
    userData.append('gender', formData.gender);
    userData.append('date_of_birth', formData.date_of_birth);
    userData.append('phone', formData.phone);
    userData.append('email', formData.email);
    userData.append('subscribed_to_news_letter', formData.subscribed_to_news_letter.toString());
    if (imageFile) {
      userData.append('image[]', imageFile);
    }

    const resp = await UserMyAccountEndpoints.updatePeofile(userData);
    showToast(resp.message, 'success');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserDetail();
    }
  }, [isAuthenticated]);

  // Tailwind common input style
  const inputClass =
    'border border-gray-300 rounded-md px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none';

  console.log(formData?.profile_image, 'formData');

  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10 flex-col md:flex-row lg:flex-row">
          <div className="sticky top-20 h-fit">
            <SideBarNav />
          </div>

          <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto shadow-sm">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">My profile</h2>
              <p className="text-gray-500 text-sm mt-1">
                These details are used across the website to identify you
              </p>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">First name *</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    errors.first_name ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                />
                {errors.first_name && (
                  <span className="text-red-500 text-xs mt-1">{errors.first_name}</span>
                )}
              </div>
              {/* Last name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Last name *</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    errors.last_name ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                />
                {errors.last_name && (
                  <span className="text-red-500 text-xs mt-1">{errors.last_name}</span>
                )}
              </div>
              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Gender *</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  className={`${inputClass} ${
                    errors.gender ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500 text-xs mt-1">{errors.gender}</span>
                )}
              </div>
              {/* DOB */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Date of birth *</label>
                <input
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    errors.date_of_birth ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                />
                {errors.date_of_birth && (
                  <span className="text-red-500 text-xs mt-1">{errors.date_of_birth}</span>
                )}
              </div>
              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Email *</label>
                <input
                  name="email"
                  disabled
                  type="email"
                  value={formData.email}
                  className={`${inputClass} bg-gray-100 cursor-not-allowed`}
                />
              </div>
              {/* Image Upload */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1">Profile Image</label>

                {/* Image Preview with Close Icon */}
                {imagePreview && (
                  <div className="relative mb-4 inline-block">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        // Clear the file input
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute -top-2 left-28 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setImageFile(file);

                      // Create preview URL
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className={inputClass}
                />
              </div>
              {/* Newsletter */}
              <div className="flex items-center gap-3 md:col-span-2">
                <input
                  name="subscribed_to_news_letter"
                  type="checkbox"
                  checked={formData.subscribed_to_news_letter}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                />
                <label className="text-sm">Subscribe to newsletter</label>
              </div>{' '}
            </div>

            {/* Save button */}

            <div className="flex justify-end mt-8 border-t pt-6">
              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-teal-700 transition-all cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
