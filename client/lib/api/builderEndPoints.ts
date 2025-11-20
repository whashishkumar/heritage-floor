import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost } from './fetcher';

//Builder Page
export const BuilderPageData = {
  getBannerData: () => {
    return apiFetch({
      endpoint: '/builder/hero-section',
      cache: 'dynamic',
    });
  },

  getOurCustomers: () => {
    return apiFetch({
      endpoint: '/builder/our-customers',
      cache: 'dynamic',
    });
  },

  bestSellerProducts: () => {
    return apiFetch({
      endpoint: '/builder/best-seller-products',
      cache: 'dynamic',
    });
  },

  getCategoryProducts: () => {
    return apiFetch({
      endpoint: '/builder/category-products',
      cache: 'dynamic',
    });
  },
};
