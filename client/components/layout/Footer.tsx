"use client";
import OnlyButton from "../common/ArrowButton";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaChevronDown,
} from "react-icons/fa";

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

// Footer Data
const footerData: FooterData = {
  formSection: {
    title: "Unlock your actionable insight today",
    fields: [
      { label: "Email *", type: "email", name: "email" },
      { label: "Name *", type: "text", name: "name" },
      {
        label: "Areas of interest (Please select)",
        type: "select",
        name: "interest",
        options: [],
      },
    ],
    privacyConsent: {
      text: "I hereby agree to and accept Privacy Policy and give permission to access my personal data.",
      privacyLink: "/privacy-policy",
    },
    submitButton: {
      text: "→",
      color: "#2b6b75",
    },
  },
  companyInfo: {
    name: "Heritage Floor & Home",
    description:
      "As a family-owned business with showrooms in Ottawa, Vaughan, Hamilton, and Windsor, we provide high-quality flooring, expert advice, and personalized service to help you find stylish, durable, and affordable solutions for every space.",
    socialLinks: [
      { platform: "LinkedIn", icon: "linkedin", url: "#" },
      { platform: "Facebook", icon: "facebook", url: "#" },
      { platform: "WhatsApp", icon: "whatsapp", url: "#" },
    ],
  },
  locations: [
    {
      city: "Ottawa",
      address: "207 Colonnade Rd, S. Nepean, ON K2E 7K3",
      phone: "613-224-0300",
      note: "Call us if you need any help",
    },
  ],
  quickLinks: [
    { label: "About Us", url: "/about-us" },
    { label: "Products", url: "/products" },
    { label: "Contact Us", url: "/contact-us" },
    { label: "Terms & Conditions", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy-policy" },
  ],
  categories: {
    hardwood: [
      "Affinity Hardwood",
      "African Plains",
      "Antico",
      "Baffin Island",
      "Bluenoae Lake 7",
      "Antico",
    ],
    flooring: [
      "Tile Flooring",
      "Hardwood Flooring",
      "Laminate Flooring",
      "Carpet",
      "Luxury Vinyl Flooring",
    ],
  },
  copyright: "Copyright 2025 - Heritage Floor & Home",
};

const Footer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    interest: "",
    consent: false,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getSocialIcon = (icon: string): React.ReactElement | null => {
    switch (icon) {
      case "linkedin":
        return <FaLinkedinIn className="w-5 h-5" />;
      case "facebook":
        return <FaFacebookF className="w-5 h-5" />;
      case "whatsapp":
        return <FaWhatsapp className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-black  justify-center flex items-center rounded-tl-[1.688rem] rounded-tr-[1.688rem] flex-col text-white bottom-0 -mt-[1.5rem]">
      <div className="flex-1">
        <div className="wrapper mx-auto py-16 lg:px-0 px-10">
          <div className="flex  flex-col lg:flex-row gap-[3%] ">
            <div className="lg:w-[32%] pl-2   mb-4">
              <h2 className="text-[2.5rem] font-normal mb-8  leading-[1.3750] roboto-font letter-spacing-[-0.88px]">
                {footerData.formSection.title}
              </h2>
              <div className="space-y-6">
                {footerData.formSection.fields.map((field: FormField) => (
                  <div key={field.name}>
                    {field.type === "select" ? (
                      <div className="relative">
                        <select
                          name={field.name}
                          value={
                            formData[field.name as keyof FormData] as string
                          }
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-700 py-3 pr-8 text-gray-400 appearance-none focus:outline-none focus:border-teal-500 transition-colors"
                        >
                          <option value="">{field.label}</option>
                          {field.options?.map((opt: string, idx: number) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-0 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name as keyof FormData] as string}
                        onChange={handleInputChange}
                        className="w-full h-[3.313rem]  bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3 lg:w-[60%]">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1 w-4  bg-transparent border border-gray-700 rounded cursor-pointer"
                    />
                    <label className="text-sm text-gray-400 leading-relaxed">
                      {
                        footerData.formSection.privacyConsent.text.split(
                          "Privacy Policy"
                        )[0]
                      }
                      <a
                        href={footerData.formSection.privacyConsent.privacyLink}
                        className="underline hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                      {
                        footerData.formSection.privacyConsent.text.split(
                          "Privacy Policy"
                        )[1]
                      }
                    </label>
                  </div>
                  <div className="">
                    <button onClick={handleSubmit}>
                      <OnlyButton />
                    </button>
                  </div>
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
                {footerData.companyInfo.description}
              </p>

              <div className="mt-[2rem]">
                <h4 className="text-base font-medium mb-4 tracking-wider inter-font tracking-[1.75px]">
                  FOLLOW US
                </h4>
                <div className="flex gap-3">
                  {footerData.companyInfo.socialLinks.map(
                    (social: SocialLink) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        className="w-[4rem] h-[4rem] border border-gray-700 flex items-center justify-center hover:border-teal-500 hover:text-teal-500 transition-colors"
                        aria-label={social.platform}
                      >
                        {getSocialIcon(social.icon)}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="lg:max-w-[20%] pl-4 hidden lg:block">
              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                OTTAWA
              </h4>
              {footerData.locations.map((location: Location, idx: number) => (
                <div key={idx} className="text-base text-[#FAFCFF] space-y-2 ">
                  <p>{location.address}</p>
                  <p className="text-white mt-[1.5rem]">{location.note}</p>
                  <p className="text-white ">{location.phone}</p>
                </div>
              ))}

              <div className="mt-8">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                  QUICK LINKS
                </h4>
                <ul className="space-y-2 lg:mb-0 mb-[1.5rem]">
                  {footerData.quickLinks.map((link: QuickLink) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
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
              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                HARDWOOD
              </h4>
              <ul className="space-y-2 mb-8">
                {footerData.categories.hardwood.map(
                  (item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>

              <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                FLOORING
              </h4>
              <ul className="space-y-2">
                {footerData.categories.flooring.map(
                  (item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className=" grid grid-cols-2 sm:grid-cols-4 w-full lg:hidden gap-[5%]  sm:gap-[3%] mt-[1.5rem] ">
              <div className=" pl-4">
                {" "}
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                  OTTAWA
                </h4>
                {footerData.locations.map((location: Location, idx: number) => (
                  <div
                    key={idx}
                    className="text-base text-[#FAFCFF] space-y-2 "
                  >
                    <p>{location.address}</p>
                    <p className="text-white mt-[1.5rem]">{location.note}</p>
                    <p className="text-white ">{location.phone}</p>
                  </div>
                ))}
              </div>
              <div className="  pl-4">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                  QUICK LINKS
                </h4>
                <ul className="space-y-2 lg:mb-0 mb-[1.5rem]">
                  {footerData.quickLinks.map((link: QuickLink) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        className="text-base text-[#FAFCFF] hover:text-white transition-colors leading-[1.7500]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="  pl-4">
                {" "}
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                  HARDWOOD
                </h4>
                <ul className="space-y-2 mb-8">
                  {footerData.categories.hardwood.map(
                    (item: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="  pl-4">
                <h4 className="text-base font-semibold mb-4 tracking-[1.78px]">
                  FLOORING
                </h4>
                <ul className="space-y-2">
                  {footerData.categories.flooring.map(
                    (item: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-base text-[#FAFCFF] hover:text-white transition-colors cursor-pointer leading-[1.7500]"
                      >
                        {item}
                      </li>
                    )
                  )}
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
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
