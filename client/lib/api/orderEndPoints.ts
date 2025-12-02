import { apiFetch, apiPost } from './fetcher';

export const OrderEndPoints = {
  getAllOrderItems: () => {
    return apiFetch({
      endpoint: '/customer/orders',
      cache: 'no-store',
    });
  },

  getOrderByid: (id: any) => {
    return apiFetch({
      endpoint: `/customer/orders${id}`,
      cache: 'no-store',
    });
  },

  cancleOrder: (id: any) => {
    return apiPost(`/customer/orders${id}cancle`);
  },

  reOrderItem: (id: any) => {
    return apiFetch({
      endpoint: `/customer/orders/reorder${id}`,
      cache: 'no-store',
    });
  },
};
