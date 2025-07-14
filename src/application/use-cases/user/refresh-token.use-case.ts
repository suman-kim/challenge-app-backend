import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IJwtService } from '../../../domain/services/jwt-service.interface';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { RefreshTokenDto } from '../../../shared/dto/auth/auth.dto';

/**
 * 토큰 갱신 요청 데이터
 */
export class RefreshTokenRequest {
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}

/**
 * 토큰 갱신 응답 데이터
 */
export class RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

/**
 * 토큰 갱신 유스케이스
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 발급
 */
@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  /**
   * 토큰 갱신 실행
   * 1. 리프레시 토큰 검증
   * 2. 사용자 정보 조회
   * 3. 새로운 토큰 페어 생성
   * @param request 토큰 갱신 요청 데이터
   * @returns 새로운 토큰 페어
   */
  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    // 1. 리프레시 토큰 검증
    const refreshTokenPayload = await this.jwtService.verifyRefreshToken(request.refreshToken);
    const userId = refreshTokenPayload.userId;

    // 2. 사용자 정보 조회
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    // 3. 새로운 토큰 페어 생성
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      rank: user.rank,
      points: user.points,
    };

    const tokenPair = await this.jwtService.generateTokenPair(tokenPayload);

    return new RefreshTokenResponse(
      tokenPair.accessToken,
      tokenPair.refreshToken
    );
  }

  /**
   * DTO를 통한 토큰 갱신 (컨트롤러에서 사용)
   * @param refreshTokenDto 토큰 갱신 DTO
   * @returns 새로운 토큰 페어
   */
  async executeWithDto(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenResponse> {
    const request = new RefreshTokenRequest(refreshTokenDto.refreshToken);
    return this.execute(request);
  }
} 