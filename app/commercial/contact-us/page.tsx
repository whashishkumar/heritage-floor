import ContactUs from '@/components/commercial/contactUs';
import { CommercialPageData } from '@/lib/api/commercialEndPoints';
import React from 'react';

export default async function page() {
  const res = await CommercialPageData.getContactUsDetails();

  return (
    <div>
      <ContactUs contactUsData={res} />
    </div>
  );
}
