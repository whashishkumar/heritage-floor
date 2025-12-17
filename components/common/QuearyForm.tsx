// 'use client';
// import { ResidentailPageData } from '@/lib/api/residentialEndPoints';
// import Image from 'next/image';
// import { useState } from 'react';

// type FormState = {
//   full_name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// };

// export default function QueryForm({ onClose }: any) {
//   const [form, setForm] = useState<FormState>({
//     full_name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//     setErrorMsg(null);
//     setSuccessMsg(null);
//   };

//   const validate = () => {
//     if (!form.full_name.trim()) return 'Please enter your name.';
//     if (!form.email.trim()) return 'Please enter your email.';
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email.';
//     if (!form.phone.trim()) return 'Please enter your phone number.';
//     if (!/^[0-9+\-\s()]{6,15}$/.test(form.phone)) return 'Please enter a valid phone number.';
//     if (!form.subject.trim()) return 'Please enter a subject.';
//     if (!form.message.trim()) return 'Please enter your message.';
//     return null;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationError = validate();
//     if (validationError) {
//       setErrorMsg(validationError);
//       return;
//     }
//     const data = await ResidentailPageData.postInquary(form);
//     setLoading(true);
//     setErrorMsg(data.error);
//     setSuccessMsg(data.message);
//     if (data.message) {
//       setTimeout(() => {
//         onClose();
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-4">
//       <form onSubmit={handleSubmit} className="rounded-[.75rem] lg:p-6 flex flex-col gap-5">
//         <div className="flex items-center gap-4 mb-2 ">
//           <h2 className="font-semibold text-xl lg:text-3xl text-gray-800 md:text-center w-full md:py-3 capitalize">
//             Send us a query
//           </h2>
//         </div>
//         {/* Name, Email, Phone in one row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               name="full_name"
//               value={form.full_name}
//               onChange={handleChange}
//               placeholder="Full name"
//               className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email address"
//               type="email"
//               className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               type="tel"
//               className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//           <input
//             name="subject"
//             value={form.subject}
//             onChange={handleChange}
//             placeholder="Subject"
//             className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//           <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             placeholder="Your message"
//             rows={5}
//             className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#018C99] resize-none"
//           />
//         </div>

//         {successMsg && <div className="text-sm text-green-600">{successMsg}</div>}

//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-sm text-gray-500">We'll respond within 1–2 business days.</div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="flex items-center gap-2 bg-[#018C99] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#017c88] transition-all disabled:opacity-60"
//           >
//             {loading ? (
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeOpacity="0.25"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   d="M22 12a10 10 0 00-10-10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                 ></path>
//               </svg>
//             ) : (
//               <div className="h-[1.2rem] w-[1.2rem] relative">
//                 <Image src="/icon/share.png" alt="send" fill className="object-contain" />
//               </div>
//             )}
//             <span>{loading ? 'Sending...' : 'Send Query'}</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

'use client';
import { ResidentailPageData } from '@/lib/api/residentialEndPoints';
import Image from 'next/image';
import { useState } from 'react';

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function QueryForm({ onClose, title }: any) {
  const [form, setForm] = useState<FormState>({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});

  // Handle inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    // Clear error for that input
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));

    setSuccessMsg(null);
  };

  // Field wise validation
  const validate = () => {
    const errors: Partial<FormState> = {};

    if (!form.full_name.trim()) errors.full_name = 'Please enter your name.';
    if (!form.email.trim()) errors.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email.';

    if (!form.phone.trim()) errors.phone = 'Please enter your phone number.';
    else if (!/^[0-9+\-\s()]{6,15}$/.test(form.phone))
      errors.phone = 'Please enter a valid phone number.';

    if (!form.subject.trim()) errors.subject = 'Please enter a subject.';
    if (!form.message.trim()) errors.message = 'Please enter your message.';

    return errors;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();

    // Show errors under fields
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    const data = await ResidentailPageData.postInquary(form);

    setSuccessMsg(data.message || null);
    setLoading(false);

    if (data.message) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  // Helper for red border
  const errorClass = (field: keyof FormState) =>
    fieldErrors[field]
      ? 'border-red-500 focus:ring-red-400'
      : 'border-gray-300 focus:ring-[#018C99]';

  return (
    <div className="w-full mx-auto px-6">
      <form onSubmit={handleSubmit} className="rounded-[.75rem]  flex flex-col gap-5">
        <div className="flex items-center gap-4 mb-2 ">
          <h2 className="font-semibold text-xl lg:text-2xl text-gray-800 md:text-center w-full md:py-3 capitalize">
            {title ? title : 'Send us a query'}
          </h2>
        </div>

        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Full name"
              className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errorClass(
                'full_name'
              )}`}
            />
            {fieldErrors.full_name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email address"
              className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errorClass(
                'email'
              )}`}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone number"
              className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errorClass(
                'phone'
              )}`}
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className={`w-full border rounded-lg p-3 outline-none focus:ring-2 ${errorClass(
              'subject'
            )}`}
          />
          {fieldErrors.subject && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            className={`w-full border rounded-lg p-3 outline-none focus:ring-2 resize-none ${errorClass(
              'message'
            )}`}
          />
          {fieldErrors.message && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
          )}
        </div>

        {successMsg && <div className="text-sm text-green-600">{successMsg}</div>}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">We'll respond within 1–2 business days.</div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#018C99] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#017c88] transition-all disabled:opacity-60"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="4"
                ></circle>
                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                ></path>
              </svg>
            ) : (
              <div className="h-[1.2rem] w-[1.2rem] relative">
                <Image src="/icon/share.png" alt="send" fill className="object-contain" />
              </div>
            )}
            <span>{loading ? 'Sending...' : 'Send Query'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
