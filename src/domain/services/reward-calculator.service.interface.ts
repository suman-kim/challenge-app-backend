import { ChallengeDifficulty } from '../enums/challenge-difficulty.enum';

/**
 * 보상 계산 서비스 인터페이스
 */
export interface IRewardCalculator {
  calculate(difficulty: ChallengeDifficulty, durationDays: number): number;
} 