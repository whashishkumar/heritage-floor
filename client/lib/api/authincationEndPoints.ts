import { apiFetch, apiFetchBatch, apiFetchWithResponse, apiPost, apiPut } from './fetcher';

export const AuthValidation = {
  regesterUser: (data: any) => apiPost('/customer/register', data),

  loginUser: (data: any) => apiPost('/customer/login', data),

  forgetPassword: (data: any) => apiPost('/customer/forgot-password', data),

  logOut: () => apiPost('/customer/logout'),
};

export const UserMyAccountEndpoints = {
  getUserDetail: () => {
    return apiFetch({
      endpoint: `/customer/get`,
      cache: 'no-store',
    });
  },
  updatePeofile: (data: any) => apiPut('/customer/profile', data),
  getSubscriptionStatus: (email: string) => apiPost('/customer/subscription', { email: email }),
};
