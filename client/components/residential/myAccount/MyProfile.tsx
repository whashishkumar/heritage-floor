"use client";
import { useEffect, useState } from "react";
import SideBarNav from "./SideBarNav";
import { UserDetailEndpoints } from "@/lib/api/authincationEndPoints";


export default function MyProfileForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    email: "",
    subscribed_to_news_letter: false,
    // current_password: "",
    // new_password: "",
    // new_password_confirmation: "",
  });

  const [image, setImage] = useState<File | null>(null);


  const fetchUserDetail = async () => {
    const resp = await UserDetailEndpoints.getUserDetail()
   fillForm(resp.data)
    
  }

  const fillForm = (data: any) => {
  setFormData(prev => ({
    ...prev,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    gender: data.gender ?? "",
    date_of_birth: data.date_of_birth ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
  }));
};

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value as any));
    if (image) fd.append("image[]", image);
    // await UserDetailEndpoints.updatePeofile(formData)
    console.log(formData,"fd");
  };


  useEffect(()=>{
    fetchUserDetail()
  },[])

  // Tailwind common input style
  const inputClass ="border border-gray-300 rounded-md px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none";

  return (
    <div className="bg-[#f3f4f6] min-h-screen">
      <div className="wrapper m-auto py-16">
        <div className="flex gap-10">
          <SideBarNav />

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
                  className={inputClass}
                />
              </div>

              {/* Last name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Last name *</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Gender *</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={formData.gender}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DOB */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Date of birth *</label>
                <input
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => setImage(e.target.files[0])}
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
              </div>

              {/* Password section */}
              {/* <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium mb-1">Current Password</label>
                <input
                  name="current_password"
                  type="password"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">New Password</label>
                <input
                  name="new_password"
                  type="password"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Confirm New Password</label>
                <input
                  name="new_password_confirmation"
                  type="password"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div> */}

            </div>

            {/* Save button */}
            <div className="flex justify-end mt-8 border-t pt-6">
              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-8 py-2 rounded-md font-semibold hover:bg-teal-700 transition-all"
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
