import { Injectable } from '@nestjs/common';
import { IRewardCalculator } from '../../domain/services/reward-calculator.interface';
import { ChallengeDifficulty } from '../../domain/enums/challenge-difficulty.enum';
import { Mood } from '../../domain/enums/mood.enum';

/**
 * 보상 계산 서비스 구현체
 * 챌린지 완료 시 지급할 포인트 계산
 */
@Injectable()
export class RewardCalculatorService implements IRewardCalculator {
  private readonly basePoints = 10; // 기본 포인트

  /**
   * 체크인 보상 포인트 계산
   * @param difficulty 챌린지 난이도
   * @param mood 체크인 시 기분
   * @param streakDays 연속 체크인 일수
   * @returns 계산된 보상 포인트
   */
  calculateCheckinReward(difficulty: ChallengeDifficulty, mood: Mood, streakDays: number): number {
    const difficultyMultiplier = this.getDifficultyMultiplier(difficulty);
    const moodMultiplier = this.getMoodMultiplier(mood);
    const streakBonus = this.calculateStreakBonus(streakDays);
    
    return Math.floor(this.basePoints * difficultyMultiplier * moodMultiplier + streakBonus);
  }

  /**
   * 챌린지 완료 보상 포인트 계산
   * @param difficulty 챌린지 난이도
   * @param totalCheckins 총 체크인 수
   * @returns 계산된 보상 포인트
   */
  calculateCompletionReward(difficulty: ChallengeDifficulty, totalCheckins: number): number {
    const difficultyMultiplier = this.getDifficultyMultiplier(difficulty);
    const completionBonus = Math.floor(totalCheckins * 5); // 체크인당 5점 보너스
    
    return Math.floor(100 * difficultyMultiplier + completionBonus);
  }

  /**
   * 연속일 보너스 포인트 계산
   * @param streakDays 연속일
   * @returns 보너스 포인트
   */
  calculateStreakBonus(streakDays: number): number {
    if (streakDays >= 30) return 100; // 30일 이상 대박 보너스
    if (streakDays >= 14) return 50;  // 2주 이상 큰 보너스
    if (streakDays >= 7) return 20;   // 1주 이상 보너스
    return 0;
  }

  /**
   * 난이도별 배율 계산
   * @param difficulty 챌린지 난이도
   * @returns 난이도 배율
   */
  private getDifficultyMultiplier(difficulty: ChallengeDifficulty): number {
    switch (difficulty) {
      case ChallengeDifficulty.EASY: return 1.0;
      case ChallengeDifficulty.MEDIUM: return 1.5;
      case ChallengeDifficulty.HARD: return 2.0;
      case ChallengeDifficulty.EXTREME: return 3.0;
      default: return 1.0;
    }
  }

  /**
   * 기분별 배율 계산
   * @param mood 체크인 시 기분
   * @returns 기분 배율
   */
  private getMoodMultiplier(mood: Mood): number {
    switch (mood) {
      case Mood.EXCELLENT: return 1.5;
      case Mood.GOOD: return 1.2;
      case Mood.NORMAL: return 1.0;
      case Mood.BAD: return 0.8;
      case Mood.TERRIBLE: return 0.5;
      default: return 1.0;
    }
  }
} 