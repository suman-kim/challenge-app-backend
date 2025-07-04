export class ChallengeNotFoundError extends Error {
  constructor(challengeId: string) {
    super(`Challenge with id ${challengeId} not found`);
    this.name = 'ChallengeNotFoundError';
  }
} 