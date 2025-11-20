'use client';
import Image from 'next/image';
export function CustomeCard({ data }: { data: any }) {
  return (
    // <div className="relative sm:max-w-[16.625rem] w-fit sm:h-[5.25rem] h-[5.75rem]  overflow-hidden ">
    <div className="relative w-[10.688rem] sm:h-[5rem] h-[5.75rem]  overflow-hidden ">
      {/* Company Logo */}
      <Image
        src={data?.image || '/placeholder.jpg'}
        alt={data?.alt || 'company-logo'}
        fill
        unoptimized
        quality={100}
        sizes="100vw"
        className="object-contain  bg-white"
      />
    </div>
  );
}
