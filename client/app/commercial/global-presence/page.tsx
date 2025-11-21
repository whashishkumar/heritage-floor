import OurWorld from '@/components/commercial/Pages/GlobalPresence/OurWorld';
import React from 'react';
import dynamic from 'next/dynamic';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';
import GlobalPresence from '@/components/commercial/Pages/GlobalPresence';

export default async function page() {
  const { timelineData, heading, second_section_data } =
    await CommercialPageData.getGlobalPresenceDetails();
  const { t_data } = timelineData || {};

  console.log('timelineData', second_section_data);
  return (
    <>
      <GlobalPresence countries={t_data} headerBanner={heading} />
      <OurWorld worldPresence={second_section_data} />
    </>
  );
}
