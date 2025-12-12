import OurWorld from '@/components/commercial/Pages/GlobalPresence/OurWorld';
import React from 'react';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';
import GlobalPresenceClient from './GlobalPresenceClient';

export default async function page() {
  const { timelineData, heading, second_section_data } =
    (await CommercialPageData.getGlobalPresenceDetails()) || {};
  const { t_data } = timelineData || {};

  return (
    <>
      <GlobalPresenceClient countries={t_data} headerBanner={heading} />
      <OurWorld worldPresence={second_section_data} />
    </>
  );
}
