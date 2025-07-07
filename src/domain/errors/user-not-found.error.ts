export class UserNotFoundError extends Error {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
    this.name = 'UserNotFoundError';
  }
}

export class UserNotFoundByEmailError extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found`);
    this.name = 'UserNotFoundByEmailError';
  }
}