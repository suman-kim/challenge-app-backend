import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserUseCase, CreateUserRequest } from '../../application/use-cases/user/create-user.use-case';
import { LoginUserUseCase, LoginUserRequest } from '../../application/use-cases/user/login-user.use-case';

/**
 * 인증 컨트롤러
 * 회원가입, 로그인 관련 HTTP 요청 처리
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  /**
   * 회원가입 엔드포인트
   * POST /auth/register
   * @param body 회원가입 요청 데이터
   * @returns 생성된 사용자 정보 및 토큰
   */
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<ApiResponse<AuthResponseDto>> {
    try {
      const request = new CreateUserRequest(body.email, body.username, body.password);
      const response = await this.createUserUseCase.execute(request);
      
      return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: {
          user: {
            id: response.user.id,
            email: response.user.email,
            username: response.user.username,
            rank: response.user.rank,
            points: response.user.points,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 로그인 엔드포인트
   * POST /auth/login
   * @param body 로그인 요청 데이터
   * @returns JWT 토큰 및 사용자 정보
   */
  @Post('login')
  async login(@Body() body: LoginDto): Promise<ApiResponse<AuthResponseDto>> {
    try {
      const request = new LoginUserRequest(body.email, body.password);
      const response = await this.loginUserUseCase.execute(request);
      
      return {
        success: true,
        message: '로그인이 완료되었습니다.',
        data: {
          accessToken: response.accessToken,
          user: {
            id: response.user.id,
            email: response.user.email,
            username: response.user.username,
            rank: response.user.rank,
            points: response.user.points,
          },
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  /**
   * 프로필 조회 엔드포인트
   * GET /auth/profile
   * @param req 인증된 요청 객체
   * @returns 현재 로그인한 사용자 정보
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<ApiResponse<UserProfileDto>> {
    return {
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        rank: req.user.rank,
        points: req.user.points,
        createdAt: req.user.createdAt,
      },
    };
  }
}

// DTO 클래스들
export class CreateUserDto {
  email: string;
  username: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class UserProfileDto {
  id: string;
  email: string;
  username: string;
  rank: string;
  points: number;
  createdAt: Date;
}

export class AuthResponseDto {
  accessToken?: string;
  user: {
    id: string;
    email: string;
    username: string;
    rank: string;
    points: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp?: string;
  path?: string;
  responseTime?: string;
}

// 임시 JWT 가드 (나중에 구현)
export class JwtAuthGuard {
  canActivate() {
    return true;
  }
} 