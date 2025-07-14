import { Injectable, Inject,Logger } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IPasswordService } from '../../../domain/services/password-service.interface';
import { IBadgeService } from '../../../domain/services/badge-service.interface';
import { IJwtService } from '../../../domain/services/jwt-service.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../../domain/errors/user-already-exists.error';
import { CreateUserDto } from '../../../shared/dto/auth/auth.dto';

/**
 * 사용자 생성 유스케이스
 * 회원가입 관련 비즈니스 흐름을 처리
 */
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
   
  ) {}
  private readonly logger = new Logger(CreateUserUseCase.name);


  /**
   * 사용자 생성 실행
   * 1. 이메일 중복 확인
   * 2. 비밀번호 해싱
   * 3. 사용자 생성
   * 4. 신규 가입자 뱃지 부여
   * 5. JWT 토큰 페어 생성 (자동 로그인)
   * @param request 사용자 생성 요청 데이터
   * @returns 생성된 사용자 응답 데이터 (토큰 포함)
   */
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    this.logger.log(`Creating user: ${request.email}`);
    this.logger.log(`Creating user: ${request.username}`);
    this.logger.log(`Creating user: ${request.password}`);


    
    // 1. 이메일 중복 확인
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(request.email);
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await this.passwordService.hash(request.password);

    // 3. 사용자 생성
    const user = User.create(request.email, request.username, hashedPassword);
    const createdUser = await this.userRepository.save(user);

    // 4. 신규 가입자 뱃지 부여
    // await this.badgeService.checkAndAwardBadge(createdUser.id, 'FIRST_CHALLENGE' as any);

    // 5. JWT 토큰 페어 생성 (자동 로그인)
    const tokenPayload = {
      userId: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      rank: createdUser.rank,
      points: createdUser.points,
    };

    const tokenPair = await this.jwtService.generateTokenPair(tokenPayload);

    return new CreateUserResponse(
      createdUser,
      tokenPair.accessToken,
      tokenPair.refreshToken
    );
  }
}

export class CreateUserRequest {
  constructor(
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
  ) {}
}

export class CreateUserResponse {
  constructor(
    public readonly user: User,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
} 