'use client';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '../ui/Tooltip';

export default function GetInTouch() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(''); // clear error while typing
  };

  const handleLetterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError('Email is required');
      return;
    }

    // optional: email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const payload = { email: inputValue };
      const resp = await UserMyAccountEndpoints.getSubscriptionStatus(payload);

      if (resp?.message) {
        showToast(resp.message, 'success');
      }

      setInputValue('');
    } catch {
      showToast('Failed to subscribe. Please try again.', 'error');
    }
  };

  return (
    <div className="w-full h-full mx-auto flex items-center justify-center px-4 md:px-6 lg:px-0 flex flex-col ">
      <div className="h-[4.6rem] lg:h-[6.938rem] max-w-[73.125rem] w-full bg-[#272727] rounded-[.75rem] flex overflow-hidden relative">
        <form onSubmit={handleLetterSubscribe} className="w-[90%] flex items-center pl-8">
          <div className="h-[1.813rem] w-[1.813rem] relative shrink-0">
            <Image src="/icon/Letter.png" alt="get in touch" fill />
          </div>

          <div className="ml-4 flex flex-col w-full md:w-[60%] relative">
            <input
              type="text"
              placeholder={error ? '' : 'Get in touch with us today!'}
              value={inputValue}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full
               placeholder:text-white text-lg transition-colors"
            />

            {error && <p className="absolute -top-6 left-0 text-sm text-red-500">Required field</p>}
          </div>
        </form>

        <button
          onClick={handleLetterSubscribe}
          className="w-[10%] bg-primaryTwo flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <div className="h-[1rem] w-[1rem] relative md:h-[1.875rem] md:w-[1.875rem]">
            <Image src="/icon/share.png" alt="submit" fill />
          </div>
        </button>

        {/* Error message */}

        {/* {error && <p className="absolute -bottom-6 left-8 text-sm text-red-500">{error}</p>} */}
      </div>
    </div>
  );
}
