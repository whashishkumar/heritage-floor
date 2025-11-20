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

  
};

