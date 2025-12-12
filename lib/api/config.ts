export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  apiKey: process.env.API_KEY!,
  timeout: 30000, // 30 seconds
  defaultRevalidate: 600,
} as const;

export const REVALIDATE_TIMES = {
  static: 3600,
  dynamic: 600,
  realtime: 10,
} as const;
