import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 사용자 생성 DTO
 * 회원가입 시 사용되는 데이터 전송 객체
 */
export class CreateUserDto {
  @ApiProperty({ description: '사용자 이메일', example: 'user@example.com' })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email: string;

  @ApiProperty({ description: '사용자명', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자리여야 합니다.' })
  password: string;
}

/**
 * 사용자 로그인 DTO
 * 로그인 시 사용되는 데이터 전송 객체
 */
export class LoginDto {
  @ApiProperty({ description: '사용자 이메일', example: 'user@example.com' })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email: string;

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  password: string;
}

/**
 * 사용자 프로필 수정 DTO
 * 프로필 수정 시 사용되는 데이터 전송 객체
 */
export class UpdateUserDto {
  @ApiProperty({ description: '사용자명', example: 'john_doe_updated', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: '이메일', example: 'john_updated@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: '새 비밀번호', example: 'newpassword123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

/**
 * 토큰 갱신 DTO
 * 리프레시 토큰을 사용한 토큰 갱신 시 사용되는 데이터 전송 객체
 */
export class RefreshTokenDto {
  @ApiProperty({ 
    description: '리프레시 토큰', 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
  })
  @IsString()
  refreshToken: string;
}

/**
 * 사용자 프로필 응답 DTO
 * 사용자 프로필 정보를 반환할 때 사용되는 데이터 전송 객체
 */
export class UserProfileDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: '사용자명',
    example: 'johndoe'
  })
  username: string;

  @ApiProperty({
    description: '사용자 등급',
    example: 'BRONZE'
  })
  rank: string;

  @ApiProperty({
    description: '포인트',
    example: 100
  })
  points: number;

  @ApiProperty({
    description: '생성일시',
    example: '2024-01-01T00:00:00.000Z'
  })
  createdAt: Date;
}

/**
 * 사용자 정보 (중첩 객체)
 */
export class UserInfoDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: '사용자명',
    example: 'johndoe'
  })
  username: string;

  @ApiProperty({
    description: '사용자 등급',
    example: 'BRONZE'
  })
  rank: string;

  @ApiProperty({
    description: '포인트',
    example: 100
  })
  points: number;
}

/**
 * 인증 응답 DTO
 * 로그인 성공 시 반환되는 데이터 전송 객체
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT 액세스 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT 리프레시 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;

  @ApiProperty({
    description: '사용자 정보',
    type: UserInfoDto
  })
  user: UserInfoDto;
}

/**
 * 토큰 갱신 응답 DTO
 * 토큰 갱신 성공 시 반환되는 데이터 전송 객체
 */
export class TokenRefreshResponseDto {
  @ApiProperty({
    description: '새로운 JWT 액세스 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: '새로운 JWT 리프레시 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;
} 