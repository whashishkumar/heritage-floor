"use client";
import { AuthValidation } from "@/lib/api/endpoints";
import { useEffect, useState } from "react";

export function useAuthCheck() {
  const [authStatus, setAuthStatus] = useState({
    success: false,
    customer: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      const res = await AuthValidation.validateuser();
      setAuthStatus({ ...res, loading: false });
    })();
  }, []);

  return authStatus;
}
