import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IPasswordService } from '../../../domain/services/password-service.interface';
import { IJwtService } from '../../../domain/services/jwt-service.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserNotFoundByEmailError, UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { InvalidPasswordError } from '../../../domain/errors/invalid-password.error';
import { LoginDto } from '../../../shared/dto/auth/auth.dto';

/**
 * 사용자 로그인 요청 데이터
 */
export class LoginUserRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

/**
 * 사용자 로그인 응답 데이터
 */
export class LoginUserResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    username: string;
    rank: string;
    points: number;
  };

  constructor(
    accessToken: string,
    refreshToken: string,
    user: User
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      rank: user.rank,
      points: user.points,
    };
  }
}

/**
 * 사용자 로그인 유스케이스
 * 로그인 관련 비즈니스 흐름을 처리
 */
@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  /**
   * 사용자 로그인 실행
   * 1. 이메일로 사용자 조회
   * 2. 비밀번호 검증
   * 3. JWT 토큰 페어 생성 (액세스 토큰 + 리프레시 토큰)
   * @param request 로그인 요청 데이터
   * @returns 로그인 응답 데이터 (토큰 페어 + 사용자 정보)
   */
  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // 1. 이메일로 사용자 조회
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UserNotFoundByEmailError(request.email);
    }

    // 2. 비밀번호 검증
    const isValidPassword = await this.passwordService.compare(
      request.password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }

    // 3. JWT 토큰 페어 생성
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      rank: user.rank,
      points: user.points,
    };

    const tokenPair = await this.jwtService.generateTokenPair(tokenPayload);

    // 4. 응답 데이터 반환
    return new LoginUserResponse(
      tokenPair.accessToken,
      tokenPair.refreshToken,
      user
    );
  }

  /**
   * DTO를 통한 로그인 (컨트롤러에서 사용)
   * @param loginDto 로그인 DTO
   * @returns 로그인 응답 데이터
   */
  async executeWithDto(loginDto: LoginDto): Promise<LoginUserResponse> {
    const request = new LoginUserRequest(loginDto.email, loginDto.password);
    return this.execute(request);
  }
} 