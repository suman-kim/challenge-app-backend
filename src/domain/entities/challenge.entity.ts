import { ChallengeDifficulty } from '../enums/challenge-difficulty.enum';

/**
 * 챌린지 도메인 엔티티
 * 챌린지와 관련된 모든 비즈니스 로직을 포함
 */
export class Challenge {
  constructor(
    public readonly id: number | undefined,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: ChallengeDifficulty,
    public readonly duration: number, // days
    public readonly maxParticipants: number,
    public readonly currentParticipants: number,
    public readonly pointsReward: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    title: string,
    description: string,
    difficulty: ChallengeDifficulty,
    duration: number,
    maxParticipants: number,
    pointsReward: number,
    startDate: Date,
  ): Challenge {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    return new Challenge(
      undefined,
      title,
      description,
      difficulty,
      duration,
      maxParticipants,
      0,
      pointsReward,
      startDate,
      endDate,
      true,
      new Date(),
      new Date(),
    );
  }

  /**
   * 사용자가 해당 챌린지에 참여할 수 있는지 확인
   * 비즈니스 규칙들을 모두 검증
   * @param userId 참여하려는 사용자 ID
   * @param existingParticipants 기존 참여자 ID 목록
   * @returns 참여 가능 여부
   */
  public canJoin(): boolean {
    return this.isActive && 
           this.currentParticipants < this.maxParticipants &&
           new Date() >= this.startDate &&
           new Date() <= this.endDate;
  }

  /**
   * 참여자 수 증가 처리
   * @returns 참여자 수가 증가된 챌린지 객체
   */
  public addParticipant(): Challenge {
    if (!this.canJoin()) {
      throw new Error('Cannot join this challenge');
    }

    return new Challenge(
      this.id,
      this.title,
      this.description,
      this.difficulty,
      this.duration,
      this.maxParticipants,
      this.currentParticipants + 1,
      this.pointsReward,
      this.startDate,
      this.endDate,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 참여자 수 감소 처리 (0 이하로 내려가지 않음)
   * @returns 참여자 수가 감소된 챌린지 객체
   */
  public removeParticipant(): Challenge {
    return new Challenge(
      this.id,
      this.title,
      this.description,
      this.difficulty,
      this.duration,
      this.maxParticipants,
      Math.max(0, this.currentParticipants - 1),
      this.pointsReward,
      this.startDate,
      this.endDate,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 난이도에 따른 보상 배율 계산
   * @returns 난이도별 배율 (1.0 ~ 2.0)
   */
  public calculateDifficultyMultiplier(): number {
    switch (this.difficulty) {
      case ChallengeDifficulty.EASY: return 1.0;
      case ChallengeDifficulty.MEDIUM: return 1.5;
      case ChallengeDifficulty.HARD: return 2.0;
      case ChallengeDifficulty.EXTREME: return 3.0;
      default: return 1.0;
    }
  }

  deactivate(): Challenge {
    return new Challenge(
      this.id,
      this.title,
      this.description,
      this.difficulty,
      this.duration,
      this.maxParticipants,
      this.currentParticipants,
      this.pointsReward,
      this.startDate,
      this.endDate,
      false,
      this.createdAt,
      new Date(),
    );
  }
} 