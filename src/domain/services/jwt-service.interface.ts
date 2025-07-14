/**
 * JWT 서비스 인터페이스
 * JWT 토큰 생성 및 검증에 대한 도메인 계약
 */
export interface IJwtService {
  /**
   * JWT 액세스 토큰 생성
   * @param payload 토큰에 포함할 데이터 (사용자 정보 등)
   * @returns 생성된 JWT 액세스 토큰
   */
  generateAccessToken(payload: any): Promise<string>;

  /**
   * JWT 리프레시 토큰 생성
   * @param payload 토큰에 포함할 데이터 (사용자 ID 등)
   * @returns 생성된 JWT 리프레시 토큰
   */
  generateRefreshToken(payload: any): Promise<string>;

  /**
   * JWT 토큰 검증
   * @param token 검증할 JWT 토큰
   * @returns 토큰 페이로드 (사용자 정보 등)
   */
  verifyToken(token: string): Promise<any>;

  /**
   * JWT 리프레시 토큰 검증
   * @param refreshToken 검증할 리프레시 토큰
   * @returns 토큰 페이로드 (사용자 정보 등)
   */
  verifyRefreshToken(refreshToken: string): Promise<any>;

  /**
   * 토큰 페어 생성 (액세스 토큰 + 리프레시 토큰)
   * @param payload 토큰에 포함할 데이터
   * @returns 액세스 토큰과 리프레시 토큰 페어
   */
  generateTokenPair(payload: any): Promise<{ accessToken: string; refreshToken: string }>;
} 