import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IPasswordService } from '../../../domain/services/password-service.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserNotFoundByEmailError, UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { InvalidPasswordError } from '../../../domain/errors/invalid-password.error';

export interface IJwtService {
  generateToken(payload: any): Promise<string>;
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
  ) {}

  /**
   * 로그인 실행
   * 1. 이메일로 사용자 조회
   * 2. 비밀번호 검증
   * 3. JWT 토큰 생성
   * @param request 로그인 요청 데이터
   * @returns JWT 토큰과 사용자 정보
   */
  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // 1. 이메일로 사용자 조회
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UserNotFoundByEmailError(request.email);
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await this.passwordService.compare(request.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    // 3. JWT 토큰 생성 (임시로 더미 토큰 반환)
    const accessToken = 'dummy-jwt-token'; // TODO: 실제 JWT 서비스 구현

    return new LoginUserResponse(accessToken, user);
  }
}

export class LoginUserRequest {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class LoginUserResponse {
  constructor(
    public readonly accessToken: string,
    public readonly user: User,
  ) {}
} 