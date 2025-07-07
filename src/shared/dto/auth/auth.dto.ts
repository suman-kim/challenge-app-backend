import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 회원가입 요청 DTO
 */
export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: '사용자명',
    example: 'johndoe',
    minLength: 3,
    maxLength: 20
  })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123!',
    minLength: 8
  })
  password: string;
}

/**
 * 로그인 요청 DTO
 */
export class LoginDto {
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password123!'
  })
  password: string;
}

/**
 * 사용자 프로필 DTO
 */
export class UserProfileDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 'uuid-string-here'
  })
  id: string;

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
    example: 'BEGINNER'
  })
  rank: string;

  @ApiProperty({
    description: '포인트',
    example: 100
  })
  points: number;

  @ApiProperty({
    description: '생성일시',
    example: '2025-01-04T15:30:00Z'
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
    example: 'BEGINNER'
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
 */
export class AuthResponseDto {
  @ApiPropertyOptional({
    description: 'JWT 액세스 토큰',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken?: string;

  @ApiProperty({
    description: '사용자 정보',
    type: UserInfoDto
  })
  user: UserInfoDto;
} 