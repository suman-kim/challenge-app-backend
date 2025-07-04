import { Challenge } from '../entities/challenge.entity';
import { ChallengeDifficulty } from '../enums/challenge-difficulty.enum';

export interface ChallengeFilters {
  category?: string;
  difficulty?: ChallengeDifficulty;
  search?: string;
  page: number;
  limit: number;
}

/**
 * 챌린지 저장소 인터페이스
 */
export interface IChallengeRepository {
  findById(id: number): Promise<Challenge | null>;
  findAll(filters: ChallengeFilters): Promise<{ challenges: Challenge[]; total: number }>;
  findPopular(limit: number): Promise<Challenge[]>;
  findRecommendedForUser(userId: number, limit: number): Promise<Challenge[]>;
  create(challenge: Omit<Challenge, 'id'>): Promise<Challenge>;
  update(id: number, challenge: Partial<Challenge>): Promise<Challenge>;
  delete(id: number): Promise<void>;
  findByCreator(creatorId: number): Promise<Challenge[]>;
} 