export interface INotificationService {
  sendChallengeReminder(userId: string, challengeId: string): Promise<void>;
  sendStreakMilestone(userId: string, streakDays: number): Promise<void>;
  sendBadgeEarned(userId: string, badgeName: string): Promise<void>;
  sendChallengeCompleted(userId: string, challengeId: string): Promise<void>;
} 