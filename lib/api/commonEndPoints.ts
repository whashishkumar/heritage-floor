import { get } from 'http';
import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost } from './fetcher';
// CommonComponent Content Api`
export const CommonComponentData = {
  getWhyChooseUs: () => {
    return apiFetch({
      endpoint: '/builder/why-choose-us',
      cache: 'dynamic',
    });
  },

  getTestinomials: () => {
    return apiFetch({
      endpoint: '/builder/testimonials',
      cache: 'dynamic',
    });
  },

  getOurBlogs: (page: number) => {
    return apiFetch({
      endpoint: `/residential/blogs?page=${page}&per_page=${15}`,
      cache: 'no-store',
    });
  },

  getFeaturedBlogs: () => {
    return apiFetch({
      endpoint: '/residential/blogs/featured',
      cache: 'dynamic',
    });
  },

  getCategoryBaseBlog: (slug: string) => {
    return apiFetch({
      endpoint: `/residential/blogs/category/${slug}`,
      cache: 'no-store',
    });
  },

  getBlogsDetail: (slug: string) => {
    return apiFetch({
      endpoint: `/residential/blogs/${slug}`,
      cache: 'dynamic',
    });
  },

  getCountriesList: () => {
    return apiFetch({
      endpoint: '/countries/?pagination=0',
      cache: 'no-store',
    });
  },

  getStatesList: (countryCode: string) => {
    return apiFetch({
      endpoint: `/countries-states?country_code=${'CA'}&pagination=0`,
      cache: 'no-store',
    });
  },

  getMenuItemsList: () => {
    return apiFetch({
      endpoint: '/residential/menus',
      cache: 'dynamic',
    });
  },

  getFooterList: () => {
    return apiFetch({
      endpoint: 'residential/footer-menus',
      cache: 'no-store',
    });
  },

  getTermAndCondesion: () => {
    return apiFetch({
      endpoint: '/cms/4',
      cache: 'dynamic',
    });
  },

  getPrivacyPolicy: () => {
    return apiFetch({
      endpoint: '/cms/10',
      cache: 'dynamic',
    });
  },

  getFeaturesProducts: () => {
    return apiFetch({
      endpoint: '/products?featured=1',
      cache: 'no-store',
    });
  },

  getAllBrands: () => {
    return apiFetch({
      endpoint: '/brands',
      cache: 'no-store',
    });
  },
};
