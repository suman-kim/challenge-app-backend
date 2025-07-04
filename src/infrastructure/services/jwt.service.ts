import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

export interface IJwtService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}

/**
 * JWT 서비스 구현체
 * JWT 토큰 생성 및 검증
 */
@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  /**
   * JWT 토큰 생성
   * @param payload 토큰에 포함할 데이터
   * @returns 생성된 JWT 토큰
   */
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  /**
   * JWT 토큰 검증
   * @param token 검증할 JWT 토큰
   * @returns 토큰 페이로드
   */
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
} 