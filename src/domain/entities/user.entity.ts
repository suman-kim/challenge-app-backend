import { UserRank } from '../enums/user-rank.enum';

/**
 * 사용자 도메인 엔티티
 * 사용자와 관련된 모든 비즈니스 로직을 포함
 * 불변 객체로 설계하여 상태 변경 시 새 객체 반환
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly rank: UserRank,
    public readonly points: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    email: string,
    username: string,
    passwordHash: string,
  ): User {
    return new User(
      undefined,
      email,
      username,
      passwordHash,
      UserRank.BEGINNER,
      0,
      new Date(),
      new Date(),
    );
  }

  updatePoints(points: number): User {
    return new User(
      this.id,
      this.email,
      this.username,
      this.passwordHash,
      this.rank,
      points,
      this.createdAt,
      new Date(),
    );
  }

  updateRank(rank: UserRank): User {
    return new User(
      this.id,
      this.email,
      this.username,
      this.passwordHash,
      rank,
      this.points,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 사용자 점수 업데이트 및 랭크 재계산
   * 비즈니스 규칙: 점수는 음수가 될 수 없음
   * @param points 추가할 점수 (음수 불가)
   * @returns 업데이트된 사용자 객체
   * @throws Error 점수가 음수인 경우 에러 발생
   */
  public updateScore(points: number): User {
    if (points < 0) {
      throw new Error('점수는 음수가 될 수 없습니다.');
    }

    const newScore = this.points + points;
    const newRank = this.calculateRank(newScore);
    
    return new User(
      this.id, this.email, this.username, this.passwordHash,
      newRank, newScore, this.createdAt, new Date()
    );
  }

  /**
   * 총 점수를 기반으로 사용자 랭크 계산
   * @param score 현재 총 점수
   * @returns 계산된 사용자 랭크
   */
  private calculateRank(score: number): UserRank {
    if (score >= 10000) return UserRank.MASTER;
    if (score >= 5000) return UserRank.EXPERT;
    if (score >= 2000) return UserRank.ADVANCED;
    if (score >= 500) return UserRank.INTERMEDIATE;
    return UserRank.BEGINNER;
  }
}


