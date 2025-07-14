import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserUseCase, CreateUserRequest } from '../../application/use-cases/user/create-user.use-case';
import { LoginUserUseCase, LoginUserRequest } from '../../application/use-cases/user/login-user.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/user/refresh-token.use-case';
import { 
  CreateUserDto, 
  LoginDto, 
  RefreshTokenDto,
  UserProfileDto, 
  AuthResponseDto,
  TokenRefreshResponseDto
} from '../../shared/dto/auth/auth.dto';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { JwtAuthGuard } from '../../shared/interfaces/jwt-auth.guard';

/**
 * 인증 컨트롤러
 * 회원가입, 로그인, 토큰 갱신 관련 HTTP 요청 처리
 */
@ApiTags('인증 (Authentication)')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  /**
   * 회원가입 엔드포인트
   * POST /auth/register
   * @param body 회원가입 요청 데이터
   * @returns 생성된 사용자 정보 (토큰 포함)
   */
  @ApiOperation({ 
    summary: '회원가입', 
    description: '새로운 사용자 계정을 생성하고 자동으로 로그인합니다.' 
  })
  @ApiBody({ type: CreateUserDto })
  @SwaggerApiResponse({ 
    status: 201, 
    description: '회원가입 성공',
    type: AuthResponseDto
  })
  @SwaggerApiResponse({ 
    status: 400, 
    description: '잘못된 요청 (이메일 중복 등)' 
  })
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<ApiResponse<AuthResponseDto>> {
    try {
      const request = new CreateUserRequest(body.email, body.username, body.password);
      const response = await this.createUserUseCase.execute(request);
      
      return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        data: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
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
   * @returns JWT 토큰 페어 및 사용자 정보
   */
  @ApiOperation({ 
    summary: '로그인', 
    description: '이메일과 비밀번호로 로그인하여 JWT 토큰 페어를 발급받습니다.' 
  })
  @ApiBody({ type: LoginDto })
  @SwaggerApiResponse({ 
    status: 200, 
    description: '로그인 성공',
    type: AuthResponseDto
  })
  @SwaggerApiResponse({ 
    status: 401, 
    description: '인증 실패 (잘못된 이메일/비밀번호)' 
  })
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
          refreshToken: response.refreshToken,
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
   * 토큰 갱신 엔드포인트
   * POST /auth/refresh
   * @param body 토큰 갱신 요청 데이터
   * @returns 새로운 JWT 토큰 페어
   */
  @ApiOperation({ 
    summary: '토큰 갱신', 
    description: '리프레시 토큰을 사용하여 새로운 액세스 토큰과 리프레시 토큰을 발급받습니다.' 
  })
  @ApiBody({ type: RefreshTokenDto })
  @SwaggerApiResponse({ 
    status: 200, 
    description: '토큰 갱신 성공',
    type: TokenRefreshResponseDto
  })
  @SwaggerApiResponse({ 
    status: 401, 
    description: '인증 실패 (유효하지 않은 리프레시 토큰)' 
  })
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<ApiResponse<TokenRefreshResponseDto>> {
    try {
      const response = await this.refreshTokenUseCase.executeWithDto(body);
      
      return {
        success: true,
        message: '토큰 갱신이 완료되었습니다.',
        data: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
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
  @ApiOperation({ 
    summary: '프로필 조회', 
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.' 
  })
  @ApiBearerAuth('access-token')
  @SwaggerApiResponse({ 
    status: 200, 
    description: '프로필 조회 성공',
    type: UserProfileDto
  })
  @SwaggerApiResponse({ 
    status: 401, 
    description: '인증되지 않은 사용자' 
  })
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