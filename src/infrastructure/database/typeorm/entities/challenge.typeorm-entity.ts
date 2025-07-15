import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Challenge } from '../../../../domain/entities/challenge.entity';
import { ChallengeDifficulty } from '../../../../domain/enums/challenge-difficulty.enum';
import { CategoryTypeOrmEntity } from './category.typeorm-entity';
import { ParticipationTypeOrmEntity } from './participation.typeorm-entity';

/**
 * 챌린지 TypeORM 엔티티
 * DB와 도메인 엔티티 간 매핑
 */
@Entity('challenges', { comment: '챌린지 테이블' })
export class ChallengeTypeOrmEntity {
  @PrimaryGeneratedColumn({ comment: '챌린지 ID' })
  id: number;

  @Column({ comment: '챌린지 제목' })
  title: string;

  @Column({ comment: '챌린지 설명', type: 'text' })
  description: string;

  @Column({
    comment: '난이도',
    type: 'enum',
    enum: ChallengeDifficulty,
    default: ChallengeDifficulty.EASY,
  })
  difficulty: ChallengeDifficulty;

  @Column({ comment: '챌린지 기간(일)', type: 'int' })
  duration: number;

  @Column({ comment: '최대 참여자 수', type: 'int' })
  maxParticipants: number;

  @Column({ comment: '현재 참여자 수', type: 'int', default: 0 })
  currentParticipants: number;

  @Column({ comment: '챌린지 보상 포인트', type: 'int', default: 0 })
  pointsReward: number;

  @Column({ comment: '시작일', type: 'datetime' })
  startDate: Date;

  @Column({ comment: '종료일', type: 'datetime' })
  endDate: Date;

  @Column({ comment: '활성화 여부', default: true })
  isActive: boolean;

  @ManyToOne(() => CategoryTypeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryTypeOrmEntity;

  @Column({ comment: '카테고리 ID' })
  categoryId: number;

  @OneToMany(() => ParticipationTypeOrmEntity, participation => participation.challenge)
  participations: ParticipationTypeOrmEntity[];

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  /**
   * TypeORM 엔티티를 도메인 엔티티로 변환
   */
  toDomain(): Challenge {
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
      this.isActive,
      this.createdAt,
      this.updatedAt,
    );
  }

  /**
   * 도메인 엔티티를 TypeORM 엔티티로 변환
   */
  static fromDomain(challenge: Challenge): ChallengeTypeOrmEntity {
    const entity = new ChallengeTypeOrmEntity();
    entity.id = challenge.id;
    entity.title = challenge.title;
    entity.description = challenge.description;
    entity.difficulty = challenge.difficulty;
    entity.duration = challenge.duration;
    entity.maxParticipants = challenge.maxParticipants;
    entity.currentParticipants = challenge.currentParticipants;
    entity.pointsReward = challenge.pointsReward;
    entity.startDate = challenge.startDate;
    entity.endDate = challenge.endDate;
    entity.isActive = challenge.isActive;
    entity.createdAt = challenge.createdAt;
    entity.updatedAt = challenge.updatedAt;
    return entity;
  }
} 