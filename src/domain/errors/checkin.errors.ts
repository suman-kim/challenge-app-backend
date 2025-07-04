/**
 * 체크인 관련 도메인 에러들
 */
export class ParticipationNotFoundError extends Error {
  constructor(message: string = '참여 정보를 찾을 수 없습니다.') {
    super(message);
    this.name = 'ParticipationNotFoundError';
  }
}

export class AlreadyCheckedInError extends Error {
  constructor(message: string = '오늘은 이미 체크인했습니다.') {
    super(message);
    this.name = 'AlreadyCheckedInError';
  }
}

export class InactiveParticipationError extends Error {
  constructor(message: string = '활성화되지 않은 참여입니다.') {
    super(message);
    this.name = 'InactiveParticipationError';
  }
} 