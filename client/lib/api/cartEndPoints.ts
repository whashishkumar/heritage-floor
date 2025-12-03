import { apiDelete, apiFetch, apiPatch, apiPost, apiPut } from './fetcher';

export const CartEndPoint = {
  //Cart API EndPoints
  getCartItems: () => {
    return apiFetch({
      endpoint: '/customer/cart',
      cache: 'no-store',
    });
  },
  addItemToCart: (productId: any, product?: any) =>
    apiPost(`/customer/cart/add/${productId}`, product),
  removeItemFromCart: (productId: any) => apiDelete(`/customer/cart/remove/${productId}`),
  updateCartItemQuantity: (data: any) => apiPut(`/customer/cart/update`, data),

  removeAllCartItems: () => apiDelete('/customer/cart/remove'),
  moveItemToWishList: (productId: any) => apiPost(`/customer/cart/move-to-wishlist/${productId}`),

  //Apply Coupne API EndPoints
  applyCustomeCode: (code: any) => apiPost(`/customer/cart/apply-coupon/${code}`),
  removeAppliedCoupon: (code: any) => apiDelete(`/customer/cart/remove-coupon/${code}`),

  //Wish List API EndPoints
  getWishListItems: () => {
    return apiFetch({
      endpoint: '/customer/wishlist',
      cache: 'no-store',
    });
  },

  addRemoveListItems: (productId: any) => apiPost(`/customer/wishlist/${productId}`),
  moveWishListToCart: (productId: any) => apiPost(`/customer/wishlist/${productId}/move-to-cart`),
  removeAllWishList: () => apiDelete('/customer/wishlist/all'),

  //Customer Address API EndPoints
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

  //CheckOut API End Points
  addCustomerCheckoutAddress: (data: any) => {
    apiPost('customer/checkout/save-address', data);
  },
};
