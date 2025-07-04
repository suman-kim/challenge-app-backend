/**
 * 챌린지 관련 도메인 에러들
 */
export class ChallengeNotFoundError extends Error {
  constructor(message: string = '챌린지를 찾을 수 없습니다.') {
    super(message);
    this.name = 'ChallengeNotFoundError';
  }
}

export class AlreadyParticipatingError extends Error {
  constructor(message: string = '이미 참여 중인 챌린지입니다.') {
    super(message);
    this.name = 'AlreadyParticipatingError';
  }
}

export class CannotJoinChallengeError extends Error {
  constructor(message: string = '챌린지에 참여할 수 없습니다.') {
    super(message);
    this.name = 'CannotJoinChallengeError';
  }
}

export class ChallengeFullError extends Error {
  constructor(message: string = '챌린지 참여 인원이 가득 찼습니다.') {
    super(message);
    this.name = 'ChallengeFullError';
  }
} 