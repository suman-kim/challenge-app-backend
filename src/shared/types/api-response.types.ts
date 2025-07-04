/**
 * API 응답 타입 정의
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

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
} 