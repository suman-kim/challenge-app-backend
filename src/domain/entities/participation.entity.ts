import { ParticipationStatus } from '../enums/participation-status.enum';

/**
 * 참여 도메인 엔티티
 * 사용자의 챌린지 참여 상태 및 진행 상황 관리
 */
export class Participation {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly challengeId: string,
    public readonly status: ParticipationStatus,
    public readonly joinedAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly completedAt?: Date,
    public readonly failedAt?: Date,
    public readonly withdrawnAt?: Date,
  ) {}

  static create(
    userId: string,
    challengeId: string,
  ): Participation {
    return new Participation(
      undefined,
      userId,
      challengeId,
      ParticipationStatus.ACTIVE,
      new Date(),
      new Date(),
      new Date(),
      undefined,
      undefined,
      undefined,
    );
  }



  /**
   * 챌린지 완료 처리 - 보상 지급 및 상태 변경
   * @param rewardPoints 완료 보상 점수
   * @returns 완료 처리된 참여 객체
   */
  public complete(): Participation {
    return new Participation(
      this.id,
      this.userId,
      this.challengeId,
      ParticipationStatus.COMPLETED,
      this.joinedAt,
      new Date(),
      this.failedAt,
      this.withdrawnAt,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 챌린지 실패 처리 - 상태 변경
   * @returns 실패 처리된 참여 객체
   */
  public fail(): Participation {
    return new Participation(
      this.id,
      this.userId,
      this.challengeId,
      ParticipationStatus.FAILED,
      this.joinedAt,
      this.completedAt,
      new Date(),
      this.withdrawnAt,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 챌린지 철회 처리 - 상태 변경
   * @returns 철회 처리된 참여 객체
   */
  public withdraw(): Participation {
    return new Participation(
      this.id,
      this.userId,
      this.challengeId,
      ParticipationStatus.WITHDRAWN,
      this.joinedAt,
      this.completedAt,
      this.failedAt,
      new Date(),
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 참여 상태가 활성인지 확인
   * @returns 활성 상태 여부
   */
  public isActive(): boolean {
    return this.status === ParticipationStatus.ACTIVE;
  }

  /**
   * 참여 상태가 완료된 상태인지 확인
   * @returns 완료 상태 여부
   */
  public isCompleted(): boolean {
    return this.status === ParticipationStatus.COMPLETED;
  }

  /**
   * 참여 상태가 실패한 상태인지 확인
   * @returns 실패 상태 여부
   */
  public isFailed(): boolean {
    return this.status === ParticipationStatus.FAILED;
  }

  /**
   * 참여 상태가 철회된 상태인지 확인
   * @returns 철회 상태 여부
   */
  public isWithdrawn(): boolean {
    return this.status === ParticipationStatus.WITHDRAWN;
  }


} 