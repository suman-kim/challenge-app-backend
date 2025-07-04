export class InactiveParticipationError extends Error {
  constructor(participationId: string) {
    super(`Participation ${participationId} is not active`);
    this.name = 'InactiveParticipationError';
  }
} 