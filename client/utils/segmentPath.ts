import { usePathname } from 'next/navigation';

export function usePathSegments() {
  const pathname = usePathname();

  // Convert "/residential/my-account/addresses" ➝ ["residential","my-account","addresses"]
  const segments = pathname.split('/').filter(Boolean);
  const main = segments[0] || null; // residential, commercial
  const section = segments[1] || null; // products, my-account
  const subSection = segments[2] || null; // addresses, orders

  return {
    segments,
    mainPath: main ? `/${main}` : '',
    sectionPath: section ? `/${main}/${section}` : '',
    fullPath: pathname,
    main,
    section,
    subSection,
  };
}
