'use client';
import OurWorld from '@/components/commercial/Pages/GlobalPresence/OurWorld';
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import GlobalPresence with no SSR to avoid window reference errors
const GlobalPresence = dynamic(() => import('@/components/commercial/Pages/GlobalPresence'), {
  ssr: false,
});

export default function page() {
  return (
    <>
      <GlobalPresence />
      <OurWorld />
    </>
  );
}
