import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtService } from '../../domain/services/jwt-service.interface';

/**
 * JWT 서비스 구현체
 * JWT 토큰 생성 및 검증 기능을 NestJS JWT 모듈로 구현
 */
@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  /**
   * JWT 액세스 토큰 생성
   * 사용자 정보를 기반으로 JWT 액세스 토큰 생성 (짧은 만료 시간)
   * @param payload 토큰에 포함할 데이터 (사용자 ID, 이메일 등)
   * @returns 생성된 JWT 액세스 토큰
   */
  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '15m', // 15분 만료
    });
  }

  /**
   * JWT 리프레시 토큰 생성
   * 토큰 갱신을 위한 리프레시 토큰 생성 (긴 만료 시간)
   * @param payload 토큰에 포함할 데이터 (사용자 ID만 포함)
   * @returns 생성된 JWT 리프레시 토큰
   */
  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(
      { userId: payload.userId }, // 최소한의 정보만 포함
      { expiresIn: '7d' } // 7일 만료
    );
  }

  /**
   * JWT 토큰 검증
   * 클라이언트에서 전달받은 JWT 토큰 검증 및 페이로드 추출
   * @param token 검증할 JWT 토큰
   * @returns 토큰 페이로드 (사용자 정보 등)
   */
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  /**
   * JWT 리프레시 토큰 검증
   * 리프레시 토큰 검증 및 페이로드 추출
   * @param refreshToken 검증할 리프레시 토큰
   * @returns 토큰 페이로드 (사용자 정보 등)
   */
  async verifyRefreshToken(refreshToken: string): Promise<any> {
    return this.jwtService.verifyAsync(refreshToken);
  }

  /**
   * 토큰 페어 생성
   * 액세스 토큰과 리프레시 토큰을 함께 생성
   * @param payload 토큰에 포함할 데이터
   * @returns 액세스 토큰과 리프레시 토큰 페어
   */
  async generateTokenPair(payload: any): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * 기존 호환성을 위한 메서드 (deprecated)
   * @deprecated generateAccessToken 사용 권장
   */
  async generateToken(payload: any): Promise<string> {
    return this.generateAccessToken(payload);
  }
} 