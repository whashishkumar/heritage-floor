'use client';
import { useState } from 'react';
import SidebarNav from './SideBarNav';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import { useToast } from '@/components/ui/Tooltip';

export default function ChangePasswordForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
    general: '',
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    setErrors({ ...errors, [name]: '', general: '' });
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    const { current_password, new_password, new_password_confirmation } = formData;
    const newErrors = {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
      general: '',
    };

    let isValid = true;

    if (!current_password) {
      newErrors.current_password = 'Current password is required';
      isValid = false;
    }

    if (!new_password) {
      newErrors.new_password = 'New password is required';
      isValid = false;
    } else if (new_password.length < 6) {
      newErrors.new_password = 'New password must be at least 6 characters long';
      isValid = false;
    } else if (current_password && current_password === new_password) {
      newErrors.new_password = 'New password must be different from current password';
      isValid = false;
    }

    if (!new_password_confirmation) {
      newErrors.new_password_confirmation = 'Please confirm your new password';
      isValid = false;
    } else if (new_password && new_password !== new_password_confirmation) {
      newErrors.new_password_confirmation = 'New password and confirm password do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // ✅ HANDLE SUBMIT
  const handleSetNewPassword = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      setErrors({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
        general: '',
      });
      const resp = await UserMyAccountEndpoints.updatePeofile(formData);
      showToast(resp.message, 'success');

      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || 'Failed to update password';
      setErrors({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
        general: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10">
          <SidebarNav />
        </div>

        <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Change your password</h2>
            <p className="text-gray-500 text-sm mt-1">
              You can change your password for security reasons or reset it if you forget it
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            {/* Current Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-700 mb-1">Current password</label>
              <input
                type={showPass.current ? 'text' : 'password'}
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 pr-10 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.current_password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <span
                className="absolute right-3 top-8 cursor-pointer text-gray-600"
                onClick={() => setShowPass({ ...showPass, current: !showPass.current })}
              >
                {showPass.current ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {errors.current_password && (
                <span className="text-red-500 text-xs mt-1">{errors.current_password}</span>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-700 mb-1">New password</label>
              <input
                type={showPass.new ? 'text' : 'password'}
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 pr-10 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.new_password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <span
                className="absolute right-3 top-8 cursor-pointer text-gray-600"
                onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
              >
                {showPass.new ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
              {errors.new_password && (
                <span className="text-red-500 text-xs mt-1">{errors.new_password}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col relative">
              <label className="text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
              <input
                type={showPass.confirm ? 'text' : 'password'}
                name="new_password_confirmation"
                value={formData.new_password_confirmation}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 pr-10 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                  errors.new_password_confirmation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <span
                className="absolute right-3 top-8 cursor-pointer text-gray-600"
                onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })}
              >
                {showPass.confirm ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {errors.new_password_confirmation && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.new_password_confirmation}
                </span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-10 border-t border-gray-300 pt-6">
            <button
              onClick={handleSetNewPassword}
              disabled={loading}
              className="bg-teal-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-teal-700 transition cursor-pointer disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
