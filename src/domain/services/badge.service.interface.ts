/**
 * 뱃지 서비스 인터페이스
 */
export interface IBadgeService {
  awardNewUserBadge(userId: number): Promise<void>;
  checkFirstParticipationBadge(userId: number): Promise<void>;
  checkStreakBadges(userId: number, streak: number): Promise<void>;
  checkCompletionBadges(userId: number, completedChallenges: number): Promise<void>;
} 