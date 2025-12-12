'use client';
import Image from 'next/image';
export function CustomeCard({ data }: { data: any }) {
  // const logoImage = `${process.env.NEXT_PUBLIC_IMAGE_PATH_WITHOUT_STORAGE}${data?.image}`;
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
