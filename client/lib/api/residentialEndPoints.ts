import {
  apiFetch,
  apiFetchBatch,
  apiFetchWithResponse,
  apiPost,
} from "./fetcher";
// Residentail PageData Api
export const ResidentailPageData = {
  getCategories: () => {
    return apiFetch({
      endpoint: "/residential/categories",
      cache: "no-store",
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

  getCategoryBasedProducts: (
    params: {
      categoryid?: number;
      id?: number;
      sky?: any;
      sortId?: any;
      order?: any;
      page?: any;
      limit?: any;
    } = {}
  ) => {
    const { categoryid, id, sky, sortId, order, page, limit } = params;
    return apiFetch({
      endpoint: `/products?category_id=${categoryid}&id=${id}&sku=${sky}&sort=${sortId}&order=${order}&page=${page}&limit=${limit}`,
      cache: "no-store",
    });
  },

  getProductDetail: (id: any) => {
    return apiFetch({
      endpoint: `/products/${id}`,
      cache: "no-store",
    });
  },

  getProductFiltersList :() => {
      return apiFetch({
      endpoint: `/filters_data`,
      cache: "no-store",
    });
  }
};
