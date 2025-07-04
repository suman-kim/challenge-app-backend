export class AlreadyCheckedInError extends Error {
  constructor(userId: string, date: Date) {
    super(`User ${userId} has already checked in on ${date.toDateString()}`);
    this.name = 'AlreadyCheckedInError';
  }
} 