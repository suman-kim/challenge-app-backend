export class AlreadyParticipatingError extends Error {
  constructor(userId: string, challengeId: string) {
    super(`User ${userId} is already participating in challenge ${challengeId}`);
    this.name = 'AlreadyParticipatingError';
  }
} 