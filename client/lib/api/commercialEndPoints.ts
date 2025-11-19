import {
  apiFetch,
  apiFetchBatch,
  apiFetchWithResponse,
  apiPost,
} from "./fetcher";

//Commercial Page
export const CommercialPageData = {
  getOurCustomers: () => {
    return apiFetch({
      endpoint: "/builder/our-customers",
      cache: "dynamic",
    });
  },
    getAboutUsPageDetail: () => {
    return apiFetch({
      endpoint: "/commercial/aboutus-intro",
      cache: "dynamic",
    });
  },
};
