import { apiFetch, apiPost } from "./fetcher";

export const AuthValidation = {
  regesterUser: (data: any) => apiPost("/customer/register", data),

  loginUser: (data: any) => apiPost("/customer/login", data),

  validateuser: () => {
    return apiFetch({
      endpoint: "/auth/me",
      cache: "no-store",
    });
  },

  forgetPassword: (data: any) => apiPost("/customer/forgot-password", data),
  logOut: () => apiPost("/customer/logout"),
};
