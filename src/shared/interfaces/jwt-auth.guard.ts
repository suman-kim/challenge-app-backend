import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { IJwtService } from '../../domain/services/jwt-service.interface';

/**
 * 인증된 사용자 정보 인터페이스
 */
interface AuthenticatedUser {
  id: number;
  email: string;
  username: string;
  rank: string;
  points: number;
}

/**
 * 사용자 정보가 포함된 요청 인터페이스
 */
interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

/**
 * JWT 인증 가드
 * HTTP 요청의 Authorization 헤더에서 JWT 토큰을 검증
 * 인증에 성공하면 요청 객체에 사용자 정보를 추가
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  /**
   * 요청 인증 검증
   * 1. Authorization 헤더에서 Bearer 토큰 추출
   * 2. JWT 토큰 검증
   * 3. 사용자 정보를 요청 객체에 추가
   * @param context 실행 컨텍스트 (HTTP 요청 정보)
   * @returns 인증 성공 여부
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    
    // 1. Authorization 헤더에서 Bearer 토큰 추출
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('JWT 토큰이 없습니다.');
    }

    try {
      // 2. JWT 토큰 검증
      const payload = await this.jwtService.verifyToken(token);
      
      // 3. 사용자 정보를 요청 객체에 추가
      request.user = {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
        rank: payload.rank,
        points: payload.points,
      };
      
      return true;
    } 
    catch (error) {
      throw new UnauthorizedException('유효하지 않은 JWT 토큰입니다.');
    }
  }

  /**
   * Authorization 헤더에서 Bearer 토큰 추출
   * @param request HTTP 요청 객체
   * @returns 추출된 JWT 토큰 또는 undefined
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
} 