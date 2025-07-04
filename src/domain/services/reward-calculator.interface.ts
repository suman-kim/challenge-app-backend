import { ChallengeDifficulty } from '../enums/challenge-difficulty.enum';
import { Mood } from '../enums/mood.enum';

export interface IRewardCalculator {
  calculateCheckinReward(difficulty: ChallengeDifficulty, mood: Mood, streakDays: number): number;
  calculateCompletionReward(difficulty: ChallengeDifficulty, totalCheckins: number): number;
  calculateStreakBonus(streakDays: number): number;
} 