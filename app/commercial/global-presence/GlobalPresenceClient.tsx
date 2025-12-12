'use client';

import dynamic from 'next/dynamic';

// Dynamically import GlobalPresence with SSR disabled to prevent hydration errors
const GlobalPresence = dynamic(() => import('@/components/commercial/Pages/GlobalPresence'), {
  ssr: false,
});

interface GlobalPresenceClientProps {
  countries: any;
  headerBanner: any;
}

export default function GlobalPresenceClient({
  countries,
  headerBanner,
}: GlobalPresenceClientProps) {
  return <GlobalPresence countries={countries} headerBanner={headerBanner} />;
}
