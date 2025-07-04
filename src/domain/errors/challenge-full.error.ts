export class ChallengeFullError extends Error {
  constructor(challengeId: string) {
    super(`Challenge ${challengeId} is full`);
    this.name = 'ChallengeFullError';
  }
} 