import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost } from './fetcher';

//Commercial Page
export const CommercialPageData = {
  getHeroBannerData: () => {
    return apiFetch({
      endpoint: '/commercial/hero-section',
      cache: 'dynamic',
    });
  },
  getWhyToChooseUsDetails: () => {
    return apiFetch({
      endpoint: '/commercial/why-choose-us',
      cache: 'dynamic',
    });
  },
  getOurCustomers: () => {
    return apiFetch({
      endpoint: '/commercial/our-customers',
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

  getCommercialHeroSection: () => {
    return apiFetch({
      endpoint: '',
      cache: 'dynamic',
    });
  },

  getCommercialAboutSections: () => {
    return apiFetch({
      endpoint: '',
      cache: 'dynamic',
    });
  },

  getAboutUsLandingPage: () => {
    return apiFetch({
      endpoint: '/commercial/about-section',
      cache: 'dynamic',
    });
  },

  getOurServices: () => {
    return apiFetch({
      endpoint: '/commercial/our-services',
      cache: 'dynamic',
    });
  },
  getOurProjets: () => {
    return apiFetch({
      endpoint: '/commercial/our-projects',
      cache: 'dynamic',
    });
  },

  getMajorProductsVedio: () => {
    return apiFetch({
      endpoint: '/commercial/our-vedios',
      cache: 'dynamic',
    });
  },
};
