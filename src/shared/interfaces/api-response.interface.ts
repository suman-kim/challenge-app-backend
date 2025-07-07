/**
 * API 응답 인터페이스
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp?: string;
  path?: string;
  responseTime?: string;
} 