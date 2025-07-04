import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IPasswordService } from '../../../domain/services/password-service.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { InvalidPasswordError } from '../../../domain/errors/invalid-password.error';

export interface IJwtService {
  generateToken(payload: any): Promise<string>;
}

/**
 * 사용자 로그인 유스케이스
 * 로그인 인증 처리
 */
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly jwtService: IJwtService,
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
    // 1. 사용자 조회
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UserNotFoundError(request.email);
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await this.passwordService.compare(request.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    // 3. JWT 토큰 생성
    const token = await this.jwtService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return new LoginUserResponse(token, user);
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