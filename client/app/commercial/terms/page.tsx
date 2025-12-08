import TermAndCondesion from '@/components/common/TermAndCondesion';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
import React from 'react';

export default async function page() {
  const response = await CommonComponentData.getTermAndCondesion();

  return (
    <div>
      <TermAndCondesion termsCondesions={response?.data} />
    </div>
  );
}
