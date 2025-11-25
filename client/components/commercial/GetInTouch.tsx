'use client';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '../ui/Tooltip';

export default function GetInTouch() {
  const { showToast } = useToast();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleLetterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    try {
      const resp = await UserMyAccountEndpoints.getSubscriptionStatus(inputValue);
      if (resp && resp.message) {
        // showToast(resp.message, 'success');
        alert(resp.message);
      }
      setInputValue('');
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error');
    }
  };

  return (
    <>
      <div className="w-full h-full mx-auto flex items-center justify-center px-4 md:px-6 lg:px-0">
        <div className="h-[4.6rem] lg:h-[6.938rem] max-w-[73.125rem] w-full bg-[#272727] rounded-[.75rem] flex overflow-hidden">
          <form onSubmit={handleLetterSubscribe} className="w-[90%] flex items-center pl-8">
            <div className="h-[1.813rem] w-[1.813rem] relative ">
              <Image src="/icon/Letter.png" alt="get in touch" fill className="object-cover" />
            </div>

            {/* Input Field */}
            <input
              required
              type="text"
              placeholder="Get in touch with us today!"
              value={inputValue}
              onChange={handleChange}
              className="bg-transparent outline-none text-white ml-4 w-[60%]
              placeholder:text-white
              placeholder:font-normal
              placeholder:text-xl
              lg:placeholder:text-2xl
              placeholder:leading-[1.75]
              placeholder:align-middle
              placeholder:tracking-[0.5px]
              text-lg"
            />
          </form>
          <button
            onClick={handleLetterSubscribe}
            className="w-[10%] bg-primaryTwo flex items-center cursor-pointer justify-center hover:opacity-90 transition-opacity"
          >
            <div className="h-[1.875rem] w-[1.875rem] relative ">
              <Image src="/icon/share.png" alt="submit" fill className="object-cover" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
