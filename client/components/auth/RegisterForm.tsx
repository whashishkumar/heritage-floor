'use client';
import { AuthValidation } from '@/lib/api/authincationEndPoints';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<{
    email?: string;
    password?: string[];
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await AuthValidation.regesterUser(formData);
      if (resp.message !== '') {
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });
        setStatus(null);
        router.push('/residential');
      }
    } catch (error: any) {
      setStatus(error?.errors?.errors);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 relative hidden lg:block">
        <Image
          src="/images/commercial/hero.png"
          alt="Register background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center mb-8">Join us and explore more</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
                required
              />
            </div>

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
              {status?.email && <p className="text-red-500 text-sm">{status?.email}</p>}
            </div>

            {/* Password */}
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

            {/* Password Confirmation */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password_confirmation"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-[#018C99]"
                required
              />
              <div
                className="absolute top-10 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>
            {status?.password && (
              <p className="text-red-500 text-sm">{status?.password?.map((err: any) => err)}</p>
            )}
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#018C99] text-white py-3 rounded-lg font-medium hover:bg-[#017c88] transition-all cursor-pointer"
            >
              Register
            </button>

            {/* Extra Links */}
            {/* <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#018C99] font-medium hover:underline"
              >
                Login
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
