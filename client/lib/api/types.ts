export type CacheStrategy = "static" | "dynamic" | "realtime" | "no-store";

export interface FetchOptions {
  endpoint: string;
  params?: Record<string, string | number | boolean | undefined>;
  throw404?: boolean;
  cache?: CacheStrategy;
  customRevalidate?: number;
  tags?: string[]; // For on-demand revalidation
  retry?: number;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
