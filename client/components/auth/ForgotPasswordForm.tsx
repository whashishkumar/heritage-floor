"use client";
import { forgotPassword } from "@/store/slices/authSlice/forgotSlice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPasswordForm() {
  const dispatch = useDispatch<any>();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { error, message } = useSelector((state: any) => state.forgotPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(formData));
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-center mb-8 capitalize">
            Please enter the email address you'd like your password reset
            information sent to
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
                required
              />
            </div>
            {error?.message && (
              <p className="text-red-500 text-center">{error?.message}</p>
            )}

            {message && <p className="text-gray text-center">{message}</p>}
            <button
              type="submit"
              className="w-full bg-[#018C99] text-white py-3 rounded-lg font-medium hover:bg-[#017c88] transition-all"
            >
              Forgot Password
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{" "}
              <a href="/register" className="text-[#018C99] hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
