import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost } from './fetcher';

//Commercial Page
export const CommercialPageData = {
  getOurCustomers: () => {
    return apiFetch({
      endpoint: '/builder/our-customers',
      cache: 'dynamic',
    });
  },
  getAboutUsPageDetail: () => {
    return apiFetch({
      endpoint: '/commercial/aboutus-intro',
      cache: 'dynamic',
    });
  },

  getAboutUsAwards: () => {
    return apiFetch({
      endpoint: '/commercial/awards',
      cache: 'dynamic',
    });
  },

  getOurHistory: () => {
    return apiFetch({
      endpoint: '/commercial/our-history',
      cache: 'dynamic',
    });
  },

  getGlobalPresenceDetails: () => {
    return apiFetch({
      endpoint: '/commercial/global-presence',
      cache: 'dynamic',
    });
  },

  getWhyUsDetails: () => {
    return apiFetch({
      endpoint: '/commercial/about/why-us',
      cache: 'dynamic',
    });
  },
};
