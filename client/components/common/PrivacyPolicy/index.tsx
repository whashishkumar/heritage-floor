'use client';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { usePathSegments } from '@/utils/segmentPath';

export default function PrivacyPolicyPage({ privacyPolicy }: any) {
  const router = useRouter();
  const { mainPath } = usePathSegments();
  const { page_title, html_content } = privacyPolicy || {};

  console.log(privacyPolicy, 'privacyPolicy');

  return (
    <div className="wrapper mx-auto px-4 py-12 ">
      <button
        onClick={() => router.push(mainPath)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 
                 border border-gray-200 
                 px-4 py-2 rounded-lg 
                 bg-white hover:bg-gray-50 cursor-pointer"
      >
        <IoArrowBack className="text-xl " />
        <span className="font-medium poppins-font">Back</span>
      </button>
      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-6 text-center inter-font">
        {page_title}
      </h1>

      {/* Content */}
      <div className="bg-white shadow-md border border-gray-100 rounded-xl p-8 leading-relaxed poppins-font">
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: html_content }}
        />
      </div>
    </div>
  );
}
