export class CannotJoinChallengeError extends Error {
  constructor(challengeId: string, reason: string) {
    super(`Cannot join challenge ${challengeId}: ${reason}`);
    this.name = 'CannotJoinChallengeError';
  }
} 