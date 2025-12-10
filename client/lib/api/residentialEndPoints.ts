import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost } from './fetcher';
// Residentail PageData Api
export const ResidentailPageData = {
  getCategories: () => {
    return apiFetch({
      endpoint: '/residential/categories',
      cache: 'no-store',
    });
  },

  getFlooringSelections: () => {
    return apiFetch({
      endpoint: '/residential/flooring-selections',
      cache: 'dynamic',
    });
  },

  getFlooringInstallation: () => {
    return apiFetch({
      endpoint: '/residential/flooring-installation',
      cache: 'dynamic',
    });
  },

  getHeroSection: () => {
    return apiFetch({
      endpoint: '/residential/hero-section',
      cache: 'dynamic',
    });
  },

  getOurCustomers: () => {
    return apiFetch({
      endpoint: '/residential/our-customers',
      cache: 'dynamic',
    });
  },

  getOurMajorProjects: () => {
    return apiFetch({
      endpoint: '/residential/our-projects',
      cache: 'dynamic',
    });
  },

  postInquary: (data: any) => apiPost('/query', data),

  getCategoryBasedProducts: (
    params: {
      categoryid?: number;
      id?: number;
      sky?: any;
      sortId?: any;
      order?: any;
      page?: any;
      limit?: any;
      brand?: any;
      color?: any;
      size?: any;
    } = {}
  ) => {
    const { categoryid, id, sky, sortId, order, page, limit, brand, color, size } = params;

    // Build query string only with defined values
    const queryParams = new URLSearchParams();
    if (categoryid !== undefined && categoryid !== null)
      queryParams.append('category_id', String(categoryid));
    if (id !== undefined && id !== null) queryParams.append('id', String(id));
    if (sky !== undefined && sky !== null) queryParams.append('sku', String(sky));
    if (sortId !== undefined && sortId !== null) queryParams.append('sort', String(sortId));
    if (order !== undefined && order !== null) queryParams.append('order', String(order));
    if (page !== undefined && page !== null) queryParams.append('page', String(page));
    if (limit !== undefined && limit !== null) queryParams.append('limit', String(limit));
    if (brand !== undefined && brand !== null) queryParams.append('brand', String(brand));
    if (color !== undefined && color !== null) queryParams.append('color', String(color));
    if (size !== undefined && size !== null) queryParams.append('size', String(size));

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    return apiFetch({
      endpoint,
      cache: 'no-store',
    });
  },

  getProductDetail: (id: any) => {
    return apiFetch({
      endpoint: `/products/${id}`,
      cache: 'no-store',
    });
  },

  getProductFiltersList: () => {
    return apiFetch({
      endpoint: `/filters_data`,
      cache: 'no-store',
    });
  },

  getAllMajorProjects: (perPage?: any, page?: any) => {
    return apiFetch({
      endpoint: `/residential/major-projects?per_page=${10}&page=${page}`,
      cache: 'no-store',
    });
  },
};
