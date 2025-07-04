/**
 * 사용자 관련 도메인 에러들
 */
export class UserNotFoundError extends Error {
  constructor(message: string = '사용자를 찾을 수 없습니다.') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message: string = '이미 존재하는 사용자입니다.') {
    super(message);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidPasswordError extends Error {
  constructor(message: string = '비밀번호가 올바르지 않습니다.') {
    super(message);
    this.name = 'InvalidPasswordError';
  }
} 