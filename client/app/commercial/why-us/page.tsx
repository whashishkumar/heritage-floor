import WorldCount from '@/components/commercial/Pages/Common/WorldCount';
import OurWorld from '@/components/commercial/Pages/GlobalPresence/OurWorld';
import WhyUs from '@/components/commercial/Pages/WhyUs';
import BrandCollebration from '@/components/commercial/Pages/WhyUs/BrandCollebration';
import GlobalPresence from '@/components/commercial/Pages/WhyUs/GlobalPresence';
import WhyDubai from '@/components/commercial/Pages/WhyUs/WhyDubai';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';
import { CiDeliveryTruck, CiHospital1 } from 'react-icons/ci';
import { IoKeyOutline } from 'react-icons/io5';

const statsData = [
  {
    id: 1,
    icon: CiDeliveryTruck,
    value: 'EST. 2002',
    label: 'in Dubai, UAE',
  },
  {
    id: 2,
    icon: CiHospital1,
    value: '15 CITIES',
    label: 'Spanning the globe',
  },
  {
    id: 3,
    icon: IoKeyOutline,
    value: '3000+',
    label: 'Employees - Growing stronger together',
  },
];

const pageTitle = {
  tag: 'The Journey Of Luxury Living',
  description:
    'With a legacy in luxury living, DAMAC Properties has grown to become one of the world’s foremost luxury developers, with projects spanning the GCC, Levant, Middle East, United States, Asia, and beyond.',
};

export default async function page() {
  const whyUs = await CommercialPageData.getWhyUsDetails();
  const { banner, journey, third_section, countries, fifth_section, seventh_section } = whyUs || {};
  const { items, data } = journey || {};

  return (
    <div>
      <WhyUs banner={banner} />
      <WorldCount statsData={items} pageTitle={data} Founder={third_section} />
      <BrandCollebration brands={fifth_section} countries={countries} />
      <GlobalPresence countries={countries} />
      <WhyDubai whyDubai={seventh_section} />
    </div>
  );
}
