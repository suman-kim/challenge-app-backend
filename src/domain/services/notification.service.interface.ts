/**
 * 알림 서비스 인터페이스
 */
export interface INotificationService {
  sendBadgeNotification(userId: number, badgeName: string): Promise<void>;
  sendChallengeReminder(userId: number, challengeTitle: string): Promise<void>;
  sendStreakNotification(userId: number, streak: number): Promise<void>;
} 