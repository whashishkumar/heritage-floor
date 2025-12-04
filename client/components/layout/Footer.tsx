'use client';
import OnlyButton from '../common/ArrowButton';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaLinkedinIn, FaFacebookF, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import { usePathSegments } from '@/utils/segmentPath';
import { UserMyAccountEndpoints } from '@/lib/api/authincationEndPoints';
import { useToast } from '../ui/Tooltip';
import Loader from '../ui/Loader';

// Type Definitions
interface FormField {
  label: string;
  type: string;
  name: string;
  options?: string[];
}

interface PrivacyConsent {
  text: string;

  privacyLink: string;
}

interface SubmitButton {
  text: string;
  color: string;
}

interface FormSection {
  title: string;
  fields: FormField[];
  privacyConsent: PrivacyConsent;
  submitButton: SubmitButton;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

interface CompanyInfo {
  name: string;
  description: string;
  socialLinks: SocialLink[];
}

interface Location {
  city: string;
  address: string;
  phone: string;
  note: string;
}

interface QuickLink {
  label: string;
  url: string;
}

interface Categories {
  hardwood: string[];
  flooring: string[];
}

interface FooterData {
  formSection: FormSection;
  companyInfo: CompanyInfo;
  locations: Location[];
  quickLinks: QuickLink[];
  categories: Categories;
  copyright: string;
}

interface FormData {
  email: string;
  name: string;
  interest: string;
  consent: boolean;
}

const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    interest: '',
    consent: false,
  });
  const { mainPath } = usePathSegments();
  const [footerData, setFooterData] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    consent?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    const newErrors: { email?: string; name?: string; consent?: string } = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Validate consent
    if (!formData.consent) {
      newErrors.consent = 'You must accept the privacy policy';
    }
    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Clear errors if validation passes
    setErrors({});
    try {
      setIsSubmitting(true);
      const payload = {
        email: formData.email,
        name: formData.name,
        area_of_interest: formData.interest,
      };

      const resp = await UserMyAccountEndpoints.getSubscriptionStatus(payload);
      showToast(resp?.message || 'Subscription successful!');
      // Reset form data and errors
      setFormData({
        email: '',
        name: '',
        interest: '',
        consent: false,
      });
      setErrors({});
    } catch (error: any) {
      showToast(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const getSocialIcon = (icon: string): React.ReactElement | null => {
    switch (icon) {
      case 'linkedin':
        return <FaLinkedinIn className="w-5 h-5" />;
      case 'facebook':
        return <FaFacebookF className="w-5 h-5" />;
      case 'whatsapp':
        return <FaWhatsapp className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getFooterList = async () => {
    setIsLoading(true);
    try {
      const resp = await CommonComponentData.getFooterList();
      setFooterData(resp);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFooterList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <footer className="w-full bg-black  justify-center flex items-center rounded-tl-[1.688rem] rounded-tr-[1.688rem] flex-col text-white bottom-0 -mt-[1.5rem]">
      <div className="flex-1">
        <div className="wrapper mx-auto py-16 lg:px-0 px-10">
          <div className="flex  flex-col lg:flex-row gap-[3%] ">
            <div className="lg:w-[32%] pl-2   mb-4">
              <h2 className="text-[2.5rem] font-normal mb-8  leading-[1.3750] roboto-font letter-spacing-[-0.88px]">
                {footerData?.formSection?.title}
              </h2>
              <div className="space-y-6">
                {footerData?.formSection?.fields.map((field: FormField) => (
                  <div key={field.name}>
                    {field?.type === 'select' ? (
                      <div className="relative">
                        <select
                          name={field.name}
                          value={formData[field.name as keyof FormData] as string}
                          onChange={handleInputChange}
                          className="w-full h-[3.313rem] bg-black border-b border-gray-700 py-3 pr-8 text-gray-400 appearance-none focus:outline-none focus:border-teal-500 transition-colors [&>option]:bg-black [&>option]:text-white [&>option]:py-3 [&>option]:px-2 [&>option]:min-h-[3rem]"
                          style={{
                            colorScheme: 'dark',
                          }}
                        >
                          <option value="" className="bg-black text-gray-400 py-3">
                            {field.label}
                          </option>
                          {field.options?.map((opt: string, idx: number) => (
                            <option
                              key={idx}
                              value={opt}
                              className="bg-black text-white py-3 px-2 min-h-[3rem]"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-0 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    ) : (
                      <>
                        <input
                          required
                          type={field.type}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name as keyof FormData] as string}
                          onChange={handleInputChange}
                          className={`w-full h-[3.313rem] bg-black border-b ${
                            errors[field.name as keyof typeof errors]
                              ? 'border-red-400'
                              : 'border-gray-700'
                          } py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors [-webkit-autofill]:!bg-black [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(0,0,0)] [&:-webkit-autofill]:[-webkit-text-fill-color:white]`}
                        />
                        {errors[field.name as keyof typeof errors] && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors[field.name as keyof typeof errors]}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 lg:w-[60%]">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className={`mt-1 w-4 h-4 bg-transparent border ${
                          errors.consent ? 'border-red-400' : 'border-gray-700'
                        } rounded cursor-pointer accent-teal-500`}
                      />
                      <label className="text-sm text-gray-400 leading-relaxed">
                        {footerData?.formSection?.privacyConsent.text.split('Privacy Policy')[0]}
                        <a
                          href={footerData?.formSection.privacyConsent.privacyLink}
                          className="underline hover:text-white transition-colors"
                        >
                          Privacy Policy
                        </a>
                        {footerData?.formSection?.privacyConsent.text.split('Privacy Policy')[1]}
                      </label>
                    </div>
                    <div className="">
                      <button onClick={handleSubmit} disabled={isSubmitting}>
                        <OnlyButton />
                      </button>
                    </div>
                  </div>
                  {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
                </div>
              </div>
            </div>

            <div className="lg:max-w-[25%]  px-2 lg:mb-0 mb-[1.5rem]">
              <div className="text-xl font-semibold mb-[2.5rem] tracking-wider roboto-font w-[12rem] h-[3.438rem] relative ">
                <Image
                  src="/logo/heritageLogoWhite.svg"
                  alt="Heritage Floor & Home"
                  fill
                  className="object-contain"
                  unoptimized
                  quality={100}
                />
              </div>
              <p className="text-[#FAFCFF] text-base leading-[1.7500]">
                {footerData?.companyInfo?.description}
              </p>

              <div className="mt-[2rem]">
                <h4 className="text-base font-medium mb-4 tracking-wider inter-font tracking-[1.75px]">
                  FOLLOW US
                </h4>
                <div className="flex gap-3">
                  {footerData?.companyInfo?.socialLinks.map((social: SocialLink) => (
                    <a
                      key={social?.platform}
                      href={social?.url}
                      className="w-[4rem] h-[4rem] border border-gray-700 flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors"
                      aria-label={social?.platform}
                    >
                      {getSocialIcon(social?.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:max-w-[20%] pl-4 hidden lg:block">
              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">OTTAWA</h4>
              {footerData?.locations.map((location: Location, idx: number) => (
                <div key={idx} className="text-base text-[#FAFCFF] space-y-2 ">
                  <p>{location?.address}</p>
                  <p className="text-white mt-[1.5rem]">{location?.note}</p>
                  <p className="text-white ">{location?.phone}</p>
                </div>
              ))}

              <div className="mt-8">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">QUICK LINKS</h4>
                <ul className="space-y-2 lg:mb-0 mb-[1.5rem]">
                  {footerData?.quickLinks?.map((link: QuickLink) => (
                    <li key={link.label}>
                      <a
                        href={`${mainPath}${link.url}`}
                        className="text-base text-[#FAFCFF] hover:text-white transition-colors leading-[1.7500]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:max-w-[20%]   pl-4 hidden lg:block">
              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">HARDWOOD</h4>
              <ul className="space-y-2 mb-8">
                {footerData?.categories?.hardwood.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">FLOORING</h4>
              <ul className="space-y-2">
                {footerData?.categories?.flooring.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className=" grid grid-cols-2 sm:grid-cols-4 w-full lg:hidden gap-[5%]  sm:gap-[3%] mt-[1.5rem] ">
              <div className=" pl-4">
                {' '}
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">OTTAWA</h4>
                {footerData?.locations?.map((location: Location, idx: number) => (
                  <div key={idx} className="text-base text-[#FAFCFF] space-y-2 ">
                    <p>{location?.address}</p>
                    <p className="text-white mt-[1.5rem]">{location?.note}</p>
                    <p className="text-white ">{location?.phone}</p>
                  </div>
                ))}
              </div>
              <div className="  pl-4">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">QUICK LINKS</h4>
                <ul className="space-y-2 lg:mb-0 mb-[1.5rem]">
                  {footerData?.quickLinks.map((link: QuickLink) => (
                    <li key={link?.label}>
                      <a
                        href={link?.url}
                        className="text-base text-[#FAFCFF] hover:text-white transition-colors leading-[1.7500]"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="  pl-4">
                {' '}
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">HARDWOOD</h4>
                <ul className="space-y-2 mb-8">
                  {footerData?.categories?.hardwood?.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="  pl-4">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">FLOORING</h4>
                <ul className="space-y-2">
                  {footerData?.categories?.flooring?.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className=" w-full  px-10">
        <div className="mx-auto px-6 py-6 border-t border-[#FAFCFF]/10">
          <p className="text-base text-[#FAFCFF] lg:text-right text-center">
            {footerData?.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
