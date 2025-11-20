'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ForgotPasswordForm from './ForgotPasswordForm';
import { AuthValidation } from '@/lib/api/authincationEndPoints';
import { useAuth } from '@/context/userAuthContext';

export default function LoginPage({ onClose }: any) {
  const [forgetPasswordScreen, setForgetScreen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    device_name: 'web',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<any | null>(null);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userInfo = await AuthValidation.loginUser(formData);
      const { token } = userInfo;
      login(token);
      if (token !== '') {
        setFormData({
          email: '',
          password: '',
          device_name: 'web',
        });
        setStatus(null);
        if (token !== '') {
          onClose?.();
        }
      }
    } catch (error: any) {
      setStatus(error?.errors);
      console.log(error?.errors, 'error12345');
    }
  };

  return (
    <div className="w-full  flex items-center justify-center lg:p-10 bg-white">
      {forgetPasswordScreen ? (
        <ForgotPasswordForm />
      ) : (
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">Welcome Back 👋</h2>
          <p className="text-gray-500 text-center mb-8">
            {status?.message ? (
              <span className="text-red-500 ">{status?.message}</span>
            ) : (
              'Login to your account'
            )}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

            {/* Password with Eye Icon */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-[#018C99]"
                required
              />
              <div
                className="absolute top-10 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              {/* <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  className="w-4 h-4 accent-[#018C99] cursor-pointer"
                />
                Remember me
              </label> */}
              <span></span>
              <button
                onClick={() => setForgetScreen(true)}
                // href={"/forgotPassword"}
                className="text-sm text-[#018C99] hover:underline font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#018C99] text-white py-3 rounded-lg font-medium hover:bg-[#017c88] transition-all"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Don’t have an account?{' '}
              <a href="/register" className="text-[#018C99] hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
