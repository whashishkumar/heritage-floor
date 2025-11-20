'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const globalHeadData = [
  {
    key: 'Commercial',
    dest: '/commercial',
    path: '/commercial',
  },
  {
    key: 'Residential',
    dest: '/residential',
    path: '/residential',
  },
  {
    key: 'Builder/Pro',
    dest: '/builder',
    path: '/builder',
  },
];

const socialMediaData = [
  {
    key: 'Facebook',
    dest: 'https://facebook.com',
    icon: FaFacebookF,
    label: 'Visit our Facebook page',
  },
  {
    key: 'WhatsApp',
    dest: 'https://wa.me/',
    icon: FaWhatsapp,
    label: 'Contact us on WhatsApp',
  },
  {
    key: 'Instagram',
    dest: 'https://instagram.com',
    icon: FaInstagram,
    label: 'Follow us on Instagram',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to check if the current path matches or starts with the nav item path
  const isActive = (navPath: string) => {
    if (navPath === '/commercial') {
      // For commercial, match exact root "/" or paths starting with "/commercial"
      return pathname === '/' || pathname.startsWith('/commercial');
    }
    return pathname.startsWith(navPath);
  };

  return (
    <nav className="w-full bg-primaryTwo h-[3.125rem] justify-center flex items-center z-50 sticky top-0 transition-all duration-300 shadow-md">
      <div className="wrapper flex justify-between items-center w-full">
        {/* Left Menu */}
        <div className="flex items-center" role="navigation" aria-label="Main navigation">
          {globalHeadData.map((data, index) => {
            const isCurrentlyActive = isActive(data.path);
            return (
              <Link
                key={data.key}
                href={data.dest}
                aria-current={isCurrentlyActive ? 'page' : undefined}
                className={`px-3 h-[3.125rem] flex items-center font-medium text-sm min-[440px]:text-base sm:text-lg transition-all duration-300 ${
                  isCurrentlyActive
                    ? 'bg-white text-primaryTwo'
                    : 'text-white hover:bg-white hover:text-primaryTwo mb-[2px]'
                }`}
              >
                {data.key}
              </Link>
            );
          })}
        </div>

        {/* Right Social Icons */}
        <div
          className="flex items-center sm:space-x-4 space-x-2 text-white text-sm"
          role="navigation"
          aria-label="Social media links"
        >
          {socialMediaData.map((social) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={social.key}
                href={social.dest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-secondary-yellow-css transition-colors"
              >
                <IconComponent className="text-lg sm:text-xl" />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
