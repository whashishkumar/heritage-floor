import {
  apiFetch,
  apiFetchBatch,
  apiFetchWithResponse,
  apiPost,
} from "./fetcher";
import type { PaginatedResponse } from "./types";

export const AuthValidation = {
  loginUser: (data: any) => apiPost("/customer/login", data),

  validateuser: () => {
    return apiFetch({
      endpoint: "/auth/me",
      cache: "no-store",
    });
  },
  logOut: () => apiPost("/customer/logout"),
};

// Product APIs
// export const productAPI = {
//   getCategories: () =>
//     apiFetch({
//       endpoint: "/product-categories",
//       cache: "dynamic",
//       tags: ["products", "categories"],
//     }),

//   getRange: () =>
//     apiFetch({
//       endpoint: "/product-types",
//       cache: "dynamic",
//       tags: ["products", "types"],
//     }),

//   getFeatured: () =>
//     apiFetch({
//       endpoint: "/products/featured",
//       cache: "dynamic",
//       tags: ["products", "featured"],
//     }),

//   getAll: (perPage: number = 9, page: number = 1) =>
//     apiFetch<PaginatedResponse>({
//       endpoint: "/products",
//       params: { per_page: perPage, page },
//       cache: "dynamic",
//       tags: ["products"],
//     }),

//   getByCategory: (slug: string, perPage: number = 9) =>
//     apiFetch({
//       endpoint: `/products/${slug}`,
//       params: { per_page: perPage },
//       throw404: true,
//       cache: "dynamic",
//       tags: ["products", `category-${slug}`],
//     }),

//   getByType: (slug: string, perPage: number = 9) =>
//     apiFetch({
//       endpoint: `/products/type/${slug}`,
//       params: { per_page: perPage },
//       throw404: true,
//       cache: "dynamic",
//       tags: ["products", `type-${slug}`],
//     }),

//   getDetails: (slug: string) =>
//     apiFetch({
//       endpoint: `/product/${slug}`,
//       throw404: true,
//       cache: "dynamic",
//       tags: ["products", `product-${slug}`],
//     }),

//   search: (query: string, filters?: Record<string, any>) =>
//     apiFetch({
//       endpoint: "/products/search",
//       params: { q: query, ...filters },
//       cache: "no-store",
//     }),
// };

// Static Content APIs
// export const staticAPI = {
//   getLogo: () =>
//     apiFetch({
//       endpoint: "/theme-options/logo",
//       cache: "static",
//       tags: ["static", "logo"],
//     }),

//   getBanner: () =>
//     apiFetch({
//       endpoint: "/site-desc",
//       cache: "static",
//       tags: ["static", "banner"],
//     }),

//   getCertificates: () =>
//     apiFetch({
//       endpoint: "/certifications",
//       cache: "static",
//       tags: ["static", "certificates"],
//     }),

//   getSpeciality: () =>
//     apiFetch({
//       endpoint: "/why-us",
//       cache: "static",
//       tags: ["static", "speciality"],
//     }),

//   getTestimonials: () =>
//     apiFetch({
//       endpoint: "/testimonials",
//       cache: "static",
//       tags: ["static", "testimonials"],
//     }),

//   getNavigation: () =>
//     apiFetch({
//       endpoint: "/menus",
//       cache: "dynamic",
//       tags: ["navigation"],
//     }),

//   // Batch fetch multiple static data
//   getAll: async () => {
//     return apiFetchBatch({
//       logo: { endpoint: "/theme-options/logo", cache: "static" },
//       banner: { endpoint: "/site-desc", cache: "static" },
//       certificates: { endpoint: "/certifications", cache: "static" },
//       testimonials: { endpoint: "/testimonials", cache: "static" },
//     });
//   },
// };

// Blog APIs
// export const blogAPI = {
//   getAll: (page: number = 1, perPage: number = 10) =>
//     apiFetch<PaginatedResponse>({
//       endpoint: "/posts",
//       params: { page, per_page: perPage },
//       cache: "static",
//       tags: ["blogs"],
//     }),

//   getCategories: () =>
//     apiFetch({
//       endpoint: "/categories",
//       cache: "static",
//       tags: ["blogs", "categories"],
//     }),

//   getByCategory: (slug: string) =>
//     apiFetch({
//       endpoint: `/categories/${slug}/posts`,
//       throw404: true,
//       cache: "static",
//       tags: ["blogs", `blog-category-${slug}`],
//     }),

//   getDetail: (slug: string) =>
//     apiFetch({
//       endpoint: `/posts/${slug}`,
//       throw404: true,
//       cache: "static",
//       tags: ["blogs", `blog-${slug}`],
//     }),

//   search: (query: string) =>
//     apiFetch({
//       endpoint: "/posts/search",
//       params: { q: query },
//       cache: "no-store",
//     }),
// };

// Pages APIs
export const pageAPI = {
  getAboutUs: () =>
    apiFetch({
      endpoint: "/pages/about-us",
      cache: "static",
      tags: ["pages", "about-us"],
    }),

  getAboutUsInner: () =>
    apiFetch({
      endpoint: "/aboutsection",
      cache: "static",
      tags: ["pages", "about-section"],
    }),

  getContact: () =>
    apiFetch({
      endpoint: "/contactad",
      cache: "static",
      tags: ["pages", "contact"],
    }),

  getServices: () =>
    apiFetch({
      endpoint: "/pages/services",
      cache: "static",
      tags: ["pages", "services"],
    }),

  getPcdOpportunity: () =>
    apiFetch({
      endpoint: "/site-options/pcd-franchise",
      cache: "static",
      tags: ["pages", "pcd"],
    }),

  getCareer: () =>
    apiFetch({
      endpoint: "/pages/career",
      cache: "static",
      tags: ["pages", "career"],
    }),

  getTerms: () =>
    apiFetch({
      endpoint: "/pages/terms-and-conditions",
      cache: "static",
      tags: ["pages", "terms"],
    }),

  getHowWeWork: () =>
    apiFetch({
      endpoint: "/pages/how-we-work",
      cache: "static",
      tags: ["pages", "how-we-work"],
    }),

  getFaqs: () =>
    apiFetch({
      endpoint: "/faqs",
      cache: "static",
      tags: ["pages", "faqs"],
    }),
};

// Form submission API (POST example)
export const formAPI = {
  submitContact: (data: { name: string; email: string; message: string }) =>
    apiPost("/contact", data),
  submitInquiry: (data: any) => apiPost("/inquiry", data),
  subscribe: (email: string) => apiPost("/newsletter/subscribe", { email }),
};

//Commercial Page
export const CommercialPageData = {
  getOurCustomers: () => {
    return apiFetch({
      endpoint: "/builder/our-customers",
      cache: "dynamic",
    });
  },
};

// Residentail PageData Api
export const ResidentailPageData = {
  getCategories: () => {
    return apiFetch({
      endpoint: "/residential/categories",
      cache: "dynamic",
    });
  },

  getFlooringSelections: () => {
    return apiFetch({
      endpoint: "/residential/flooring-selections",
      cache: "dynamic",
    });
  },

  getFlooringInstallation: () => {
    return apiFetch({
      endpoint: "/residential/flooring-installation",
      cache: "dynamic",
    });
  },

  getHeroSection: () => {
    return apiFetch({
      endpoint: "/residential/hero-section",
      cache: "dynamic",
    });
  },

  getOurCustomers: () => {
    return apiFetch({
      endpoint: "/residential/our-customers",
      cache: "dynamic",
    });
  },

  getOurMajorProjects: () => {
    return apiFetch({
      endpoint: "/residential/our-projects",
      cache: "dynamic",
    });
  },

  postInquary: (data: any) => apiPost("/query", data),
};

//Builder Page
export const BuilderPageData = {
  getBannerData: () => {
    return apiFetch({
      endpoint: "/builder/hero-section",
      cache: "dynamic",
    });
  },

  getOurCustomers: () => {
    return apiFetch({
      endpoint: "/builder/our-customers",
      cache: "dynamic",
    });
  },

  bestSellerProducts: () => {
    return apiFetch({
      endpoint: "/builder/best-seller-products",
      cache: "dynamic",
    });
  },

  getCategoryProducts: () => {
    return apiFetch({
      endpoint: "/builder/category-products",
      cache: "dynamic",
    });
  },
};

// CommonComponent Content Api`
export const CommonComponentData = {
  getWhyChooseUs: () => {
    return apiFetch({
      endpoint: "/builder/why-choose-us",
      cache: "dynamic",
    });
  },

  getOurBlogs: (page: number) => {
    return apiFetch({
      endpoint: `/residential/blogs?page=${page}&per_page=${15}`,
      cache: "no-store",
    });
  },

  getFeaturedBlogs: () => {
    return apiFetch({
      endpoint: "/residential/blogs/featured",
      cache: "dynamic",
    });
  },

  getCategoryBaseBlog: (slug: string) => {
    return apiFetch({
      endpoint: `/residential/blogs/category/${slug}`,
      cache: "no-store",
    });
  },

  getBlogsDetail: (slug: string) => {
    return apiFetch({
      endpoint: `/residential/blogs/${slug}`,
      cache: "dynamic",
    });
  },
};
