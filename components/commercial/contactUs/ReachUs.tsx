'use client';

import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdLocationOn, MdPhone } from 'react-icons/md';

const socialIcons: any = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

/* ===================== COMPONENT ===================== */
export default function ReachUs({ map, socialNetworks }: any) {
  return (
    <section className="w-full ">
      <div className="w-full h-[350px] overflow-hidden rounded-xl">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(map?.address)}&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* CONTENT */}
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-14 py-14">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{socialNetworks.title}</h3>
          <ul className="space-y-5 md:space-x-5 md:flex">
            {socialNetworks.links.map((item: any, idx: any) => {
              const Icon = socialIcons[item.icon];
              return (
                <li key={idx}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
                  >
                    <Icon className="text-xl" />
                    <span className="text-lg">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
