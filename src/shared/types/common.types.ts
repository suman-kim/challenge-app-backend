/**
 * 공통 타입 정의
 */
export interface UserAnalytics {
  totalScore: number;
  completedChallenges: number;
  currentStreak: number;
  longestStreak: number;
  badgesCount: number;
  averageMood: number;
}

export interface IJwtService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}

export interface IUserBadgeRepository {
  findByUserAndBadge(userId: number, badgeId: number): Promise<any>;
  create(data: any): Promise<any>;
} 