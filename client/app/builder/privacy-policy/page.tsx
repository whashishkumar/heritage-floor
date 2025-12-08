import PrivacyPolicyPage from '@/components/common/PrivacyPolicy';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import React from 'react';

export default async function page() {
  const { data } = await CommonComponentData.getPrivacyPolicy();
  return (
    <div>
      <PrivacyPolicyPage privacyPolicy={data} />
    </div>
  );
}
