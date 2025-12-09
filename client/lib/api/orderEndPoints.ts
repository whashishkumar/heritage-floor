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
      endpoint: `/customer/orders/${id}`,
      cache: 'no-store',
    });
  },

  cancleOrder: (id: any) => {
    return apiPost(`/customer/orders/${id}/cancel`);
  },

  reOrderItem: (id: any) => {
    return apiFetch({
      endpoint: `/customer/orders/reorder/${id}`,
      cache: 'no-store',
    });
  },

  filterOrderListItems: (serchKey?: any, status?: any) => {
    return apiFetch({
      endpoint: `/customer/order-filter?search=${serchKey}&status=${status}`,
      cache: 'no-store',
    });
  },

  getOrderStatus: () => {
    return apiFetch({
      endpoint: `/customer/orders/statuses`,
      cache: 'no-store',
    });
  },

  trackingOrder: (OrderId: any) => {
    return apiPost('/order/track', OrderId);
  },

  getPlaceOrderSummary: () => {
    return apiFetch({
      endpoint: '',
      cache: 'no-store',
    });
  },
};
