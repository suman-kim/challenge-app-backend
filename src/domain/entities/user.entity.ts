import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// import { UserRole } from '../enums/user-role.enum';
// import { ChallengeParticipation } from './challenge-participation.entity';
// import { Challenge } from './challenge.entity';
// import { DailyCheckin } from './daily-checkin.entity';
// import { UserBadge } from './user-badge.entity';
// import { Post } from './post.entity';
// import { Comment } from './comment.entity';
// import { Like } from './like.entity';
export enum UserRank {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
  GRANDMASTER = 'GRANDMASTER',
  CHALLENGER = 'CHALLENGER',
  LEGEND = 'LEGEND',
}

/**
 * 사용자 엔티티
 * - 사용자 기본 정보 관리
 * - 점수 및 통계 정보 저장
 * - 다른 엔티티들과의 관계 정의
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    comment:"사용자 이메일 주소"
  })
  email: string;

  @Column({
    comment:"사용자 비밀번호",
  })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ default: 1 })
  level: number; // 사용자 레벨 (1-10)

  @Column({
    type: 'enum',
    enum: UserRank,
    default: UserRank.BRONZE, // ✅ 이렇게 기본값 설정 가능
  })
  currentRank: UserRank; // 현재 사용자 랭크 (BRONZE, SILVER, GOLD 등)

  // @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  // role: UserRole;

  @Column({ default: 0 })
  totalScore: number; // 총 점수

  @Column({ default: 0, comment:"현재 연속 참여 일수" })
  currentStreak: number; // 현재 연속 참여 일수

  @Column({ default: 0, comment:"가장 긴 연속 참여 일수" })
  longestStreak: number; // 가장 긴 연속 참여 일수

  @Column({ default: 0 })
  completedChallenges: number; // 완료한 챌린지 수

  @Column({ default: true })
  isActive: boolean; // 활성 상태 (true: 활성, false: 비활성)

  @CreateDateColumn()
  createdAt: Date; // 생성일

  @UpdateDateColumn()
  updatedAt: Date; // 수정일


  // 사용자가 참여한 챌린지들
  // @OneToMany(() => ChallengeParticipation, participation => participation.user)
  // participations: ChallengeParticipation[];
  //
  // // 사용자가 생성한 챌린지들
  // @OneToMany(() => Challenge, challenge => challenge.creator)
  // createdChallenges: Challenge[];
  //
  // // 사용자의 일일 체크인 기록들
  // @OneToMany(() => DailyCheckin, checkin => checkin.user)
  // checkins: DailyCheckin[];
  //
  // // 사용자가 획득한 뱃지들
  // @OneToMany(() => UserBadge, userBadge => userBadge.user)
  // userBadges: UserBadge[];
  //
  // // 사용자가 작성한 포스트들
  // @OneToMany(() => Post, post => post.author)
  // posts: Post[];
  //
  // // 사용자가 작성한 댓글들
  // @OneToMany(() => Comment, comment => comment.author)
  // comments: Comment[];
  //
  // // 사용자가 좋아요한 포스트들
  // @OneToMany(() => Like, like => like.user)
  // likes: Like[];

  /**
   * 사용자 점수 업데이트 및 랭크 재계산
   * @param points 추가할 점수 (음수 불가)
   * @returns 업데이트된 사용자 객체
   * @throws Error 점수가 음수인 경우 에러 발생
   */
  public updateScore(points: number): void {
    // 비즈니스 규칙: 점수는 음수가 될 수 없음
    if (points < 0) {
      throw new Error('점수는 음수가 될 수 없습니다.');
    }

    const newScore = this.totalScore + points;
    const newRank = this.calculateRank(newScore);
    this.totalScore = newScore;
    this.currentRank = newRank;

  }

  /**
   * 챌린지 완료 시 완료 횟수 증가
   * @returns 완료 횟수가 증가된 사용자 객체
   */
  public completeChallenge(): void {
    this.completedChallenges =  this.completedChallenges + 1;

  }


  /**
   * 뱃지 획득 가능 여부 확인
   * @param badgeType 뱃지 타입 (점수/챌린지/연속일)
   * @param requirement 필요 조건값
   * @returns 뱃지 획득 가능 여부
   */
  // public canEarnBadge(badgeType: BadgeType, requirement: number): boolean {
  //   switch (badgeType) {
  //     case BadgeType.SCORE:
  //       return this.totalScore >= requirement; // 점수 기반 뱃지
  //     case BadgeType.CHALLENGES:
  //       return this.completedChallenges >= requirement; // 완료 챌린지 수 기반 뱃지
  //     case BadgeType.STREAK:
  //       return this.currentStreak >= requirement; // 연속일 기반 뱃지
  //     default:
  //       return false;
  //   }
  // }

  /**
   * 총 점수를 기반으로 사용자 랭크 계산
   * @param score 현재 총 점수
   * @returns 계산된 사용자 랭크
   * @private 내부 로직이므로 private 메서드
   */
  private calculateRank(score: number): UserRank {
    // 점수 구간별 랭크 계산 (높은 점수부터 확인)
    if (score >= 60000) return UserRank.LEGEND;
    if (score >= 40000) return UserRank.CHALLENGER;
    if (score >= 25000) return UserRank.GRANDMASTER;
    if (score >= 15000) return UserRank.MASTER;
    if (score >= 10000) return UserRank.DIAMOND;
    if (score >= 6000) return UserRank.PLATINUM;
    if (score >= 3000) return UserRank.GOLD;
    if (score >= 1000) return UserRank.SILVER;
    return UserRank.BRONZE;
  }

}


