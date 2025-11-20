"use client";
import { useState } from "react";
import SidebarNav from "./SideBarNav";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <div className="bg-[#f3f4f6]">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10">
          <SidebarNav/>
    <div className="border border-gray-300 rounded-lg p-8 bg-white w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Change your password
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          You can change your password for security reasons or reset it if you
          forget it
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-6">
        {/* Current Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Current password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            New password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Confirm new password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-10 border-t border-gray-300 pt-6">
        <button className="bg-teal-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-teal-700 transition">
          Save
        </button>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
