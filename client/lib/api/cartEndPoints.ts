import { apiDelete, apiFetch, apiPost } from './fetcher';

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

  moveWishListToCart: (productId: any) =>
    apiPost(`/customer/wishlist/${productId}/move-to-cart`),
    
  removeAllWishList: () => apiDelete('/customer/wishlist/all'),
};
