import { apiFetch, apiPost } from "./fetcher";

export const CartEndPoint = {
  getCartItems: () =>
    apiFetch({
      endpoint: "/customer/cart",
      cache: "no-store",
    }),

  addItemToCart: (productId: any) => apiPost(`/customer/cart/add/${productId}`),
};
