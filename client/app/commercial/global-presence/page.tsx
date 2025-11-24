import OurWorld from '@/components/commercial/Pages/GlobalPresence/OurWorld';
import React from 'react';
import dynamic from 'next/dynamic';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';

// Dynamically import GlobalPresence with SSR disabled to prevent hydration errors
const GlobalPresence = dynamic(() => import('@/components/commercial/Pages/GlobalPresence'), {
  ssr: false,
});

export default async function page() {
  const { timelineData, heading, second_section_data } =
    (await CommercialPageData.getGlobalPresenceDetails()) || {};
  const { t_data } = timelineData || {};

  return (
    <>
      <GlobalPresence countries={t_data} headerBanner={heading} />
      <OurWorld worldPresence={second_section_data} />
    </>
  );
}
