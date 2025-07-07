import { UserRank } from '../enums/user-rank.enum';

/**
 * 사용자 도메인 엔티티
 * 사용자와 관련된 모든 비즈니스 로직을 포함
 * 불변 객체로 설계하여 상태 변경 시 새 객체 반환
 */
export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly username: string,
    public readonly passwordHash: string,
    public readonly rank: UserRank,
    public readonly points: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(email: string, username: string, passwordHash: string): User {
    return new User(
      undefined,
      email,
      username,
      passwordHash,
      UserRank.BRONZE,
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
  // BRONZE = 'bronze',      // 0~999점
  // SILVER = 'silver',      // 1000~2999점
  // GOLD = 'gold',          // 3000~5999점
  // PLATINUM = 'platinum',  // 6000~9999점
  // DIAMOND = 'diamond',    // 10000~14999점
  // MASTER = 'master',      // 15000~24999점
  // GRANDMASTER = 'grandmaster', // 25000~39999점
  // CHALLENGER = 'challenger',   // 40000~59999점
  // LEGEND = 'legend'       // 60000점 이상
  private calculateRank(score: number): UserRank {
    if (score >= 60000) return UserRank.LEGEND;
    if (score >= 40000) return UserRank.CHALLENGER;
    if (score >= 25000) return UserRank.GRANDMASTER;
    if (score >= 10000) return UserRank.MASTER;
    if (score >= 5000) return UserRank.DIAMOND;
    if (score >= 3000) return UserRank.GOLD;
    if (score >= 1000) return UserRank.SILVER;
    return UserRank.BRONZE;
  }
}


