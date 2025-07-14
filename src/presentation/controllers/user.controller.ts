import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { LoginUserUseCase } from '../../application/use-cases/user/login-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../shared/dto/auth/auth.dto';
import { JwtAuthGuard } from '../../shared/interfaces/jwt-auth.guard';

/**
 * 사용자 컨트롤러
 * 사용자 관련 HTTP 요청을 처리
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  /**
   * 사용자 회원가입
   * 새로운 사용자 계정을 생성
   */
  @Post('register')
  @ApiOperation({ summary: '사용자 회원가입' })
  @ApiResponse({ 
    status: 201, 
    description: '회원가입 성공',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        username: { type: 'string' },
        rank: { type: 'string' },
        points: { type: 'number' },
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }

  /**
   * 사용자 로그인
   * 이메일과 비밀번호로 인증 후 JWT 토큰 발급
   */
  @Post('login')
  @ApiOperation({ summary: '사용자 로그인' })
  @ApiResponse({ 
    status: 200, 
    description: '로그인 성공',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            username: { type: 'string' },
            rank: { type: 'string' },
            points: { type: 'number' },
          }
        }
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUserUseCase.execute(loginDto);
  }

  /**
   * 현재 사용자 정보 조회
   * JWT 토큰을 통해 인증된 사용자의 정보 조회
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '현재 사용자 정보 조회' })
  @ApiResponse({ 
    status: 200, 
    description: '사용자 정보 조회 성공',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        username: { type: 'string' },
        rank: { type: 'string' },
        points: { type: 'number' },
      }
    }
  })
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  /**
   * 사용자 프로필 수정
   * 인증된 사용자의 프로필 정보 수정
   */
  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 프로필 수정' })
  @ApiResponse({ 
    status: 200, 
    description: '프로필 수정 성공',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        username: { type: 'string' },
        rank: { type: 'string' },
        points: { type: 'number' },
      }
    }
  })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.updateUserUseCase.execute(req.user.id, updateUserDto);
  }
}
