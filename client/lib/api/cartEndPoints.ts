import { apiDelete, apiFetch, apiPatch, apiPost, apiPut } from './fetcher';

export const CartEndPoint = {
  getCartItems: () => {
    return apiFetch({
      endpoint: '/customer/cart',
      cache: 'no-store',
    });
  },

  addItemToCart: (productId: any) => apiPost(`/customer/cart/add/${productId}`),

  getWishListItems: () => {
    return apiFetch({
      endpoint: '/customer/wishlist',
      cache: 'no-store',
    });
  },

  addRemoveListItems: (productId: any) => apiPost(`/customer/wishlist/${productId}`),
  moveWishListToCart: (productId: any) => apiPost(`/customer/wishlist/${productId}/move-to-cart`),
  removeAllWishList: () => apiDelete('/customer/wishlist/all'),
  getUserAddressList: () => {
    return apiFetch({
      endpoint: '/customer/addresses',
      cache: 'no-store',
    });
  },
  addCustomerAddress: (data: any) => apiPost('/customer/addresses', data),
  deleteCustomerAddress: (id: any) => apiDelete(`/customer/addresses/${id}`),
  matchCustomerAddressAsDefault: (id: any) => apiPatch(`/customer/addresses/make-default/${id}`),
  updateCustomerAddress: (id?: any, data?: any) => apiPut(`/customer/addresses/${id}`, data),
  getCustomerAddress: (id: any) => {
    return apiFetch({
      endpoint: `/customer/addresses/${id}`,
      cache: 'no-store',
    });
  },
};
