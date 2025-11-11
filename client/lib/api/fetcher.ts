// lib/api/fetcher.ts
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import { api } from "./axios-instance";
import type { FetchOptions, APIResponse } from "./types";
import { AxiosError } from "axios";

const getCacheConfig = (
  strategy: FetchOptions["cache"],
  customRevalidate?: number
) => {
  if (strategy === "no-store") {
    return 0;
  }

  const revalidateMap = {
    static: 3600,
    dynamic: 600,
    realtime: 10,
  };

  return customRevalidate ?? revalidateMap[strategy!];
};

// Retry logic with exponential backoff
async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 2,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
}

// Core API fetch with axios
export async function apiFetch<T = any>(options: FetchOptions): Promise<T> {
  const {
    endpoint,
    params,
    throw404 = false,
    cache = "dynamic",
    customRevalidate,
    tags = [],
    retry = 2,
    timeout,
    headers = {},
  } = options;

  const revalidate = getCacheConfig(cache, customRevalidate);

  // Create cached function if cache is enabled
  const fetchFunction = async () => {
    try {
      const response = await retryRequest(
        () =>
          api.get(endpoint, {
            params,
            timeout: timeout || undefined,
            headers,
          }),
        retry
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (throw404 && error.response?.status === 404) {
          notFound();
        }
        throw new Error(
          `API Error: ${endpoint} - ${error.response?.status} ${error.message}`
        );
      }
      throw error;
    }
  };

  // Use Next.js cache only if not no-store
  if (cache === "no-store") {
    return fetchFunction();
  }

  // Cache the request with Next.js unstable_cache
  const cachedFetch = unstable_cache(
    fetchFunction,
    [endpoint, JSON.stringify(params)],
    {
      revalidate,
      tags: [...tags, endpoint],
    }
  );

  return cachedFetch();
}

// Fetch with full response details
export async function apiFetchWithResponse<T = any>(
  options: FetchOptions
): Promise<APIResponse<T>> {
  const { endpoint, params, throw404 = false, timeout, headers = {} } = options;

  try {
    const response = await api.get<T>(endpoint, {
      params,
      timeout: timeout || undefined,
      headers,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (throw404 && error.response?.status === 404) {
        notFound();
      }
      throw new Error(
        `API Error: ${endpoint} - ${error.response?.status} ${error.message}`
      );
    }
    throw error;
  }
}

// POST request
export async function apiPost<T = any>(
  endpoint: string,
  data?: any,
  options?: Omit<FetchOptions, "endpoint">
): Promise<T> {
  const { timeout, headers = {} } = options || {};

  try {
    const response = await api.post(endpoint, data, {
      timeout: timeout || undefined,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `API Error: ${endpoint} - ${error.response?.status} ${error.message}`
      );
    }
    throw error;
  }
}

// PUT request
export async function apiPut<T = any>(
  endpoint: string,
  data: any,
  options?: Omit<FetchOptions, "endpoint">
): Promise<T> {
  const { timeout, headers = {} } = options || {};
  try {
    const response = await api.put(endpoint, data, {
      timeout: timeout || undefined,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `API Error: ${endpoint} - ${error.response?.status} ${error.message}`
      );
    }
    throw error;
  }
}

// DELETE request
export async function apiDelete<T = any>(
  endpoint: string,
  options?: Omit<FetchOptions, "endpoint">
): Promise<T> {
  const { timeout, headers = {} } = options || {};

  try {
    const response = await api.delete(endpoint, {
      timeout: timeout || undefined,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `API Error: ${endpoint} - ${error.response?.status} ${error.message}`
      );
    }
    throw error;
  }
}

// Batch fetch multiple endpoints
export async function apiFetchBatch<T extends Record<string, FetchOptions>>(
  requests: T
): Promise<{ [K in keyof T]: Awaited<ReturnType<typeof apiFetch>> }> {
  const entries = Object.entries(requests);
  const promises = entries.map(([key, options]) =>
    apiFetch(options).then((data) => [key, data])
  );
  const results = await Promise.all(promises);
  return Object.fromEntries(results) as any;
}
