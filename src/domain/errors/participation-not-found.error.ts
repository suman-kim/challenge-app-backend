export class ParticipationNotFoundError extends Error {
  constructor(participationId: string) {
    super(`Participation with id ${participationId} not found`);
    this.name = 'ParticipationNotFoundError';
  }
} 