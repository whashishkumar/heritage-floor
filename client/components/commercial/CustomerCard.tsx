'use client';
import Image from 'next/image';
export function CustomeCard({ data }: { data: any }) {
  return (
    <div className="relative w-[10.688rem] sm:h-[5rem] h-[5.75rem]  overflow-hidden ">
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
