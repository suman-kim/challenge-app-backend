import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Participation } from '../../../../domain/entities/participation.entity';
import { ParticipationStatus } from '../../../../domain/enums/participation-status.enum';
import { ChallengeTypeOrmEntity } from './challenge.typeorm-entity';
import { UserTypeOrmEntity } from './user.typeorm-entity';

/**
 * 참여 TypeORM 엔티티
 * DB와 도메인 엔티티 간 매핑
 */
@Entity('participations', { comment: '챌린지 참여 테이블' })
export class ParticipationTypeOrmEntity {
  @PrimaryGeneratedColumn({ comment: '참여 ID' })
  id: number;

  @ManyToOne(() => UserTypeOrmEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @Column({ comment: '사용자 ID' })
  userId: number;

  @ManyToOne(() => ChallengeTypeOrmEntity, challenge => challenge.participations, { nullable: false })
  @JoinColumn({ name: 'challengeId' })
  challenge: ChallengeTypeOrmEntity;

  @Column({ comment: '챌린지 ID' })
  challengeId: number;

  @Column({
    comment: '참여 상태',
    type: 'enum',
    enum: ParticipationStatus,
    default: ParticipationStatus.ACTIVE,
  })
  status: ParticipationStatus;

  @Column({ comment: '참여 시작일', type: 'datetime' })
  joinedAt: Date;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  @Column({ comment: '완료일', type: 'datetime', nullable: true })
  completedAt?: Date;

  @Column({ comment: '실패일', type: 'datetime', nullable: true })
  failedAt?: Date;

  @Column({ comment: '탈퇴일', type: 'datetime', nullable: true })
  withdrawnAt?: Date;

  /**
   * TypeORM 엔티티를 도메인 엔티티로 변환
   */
  toDomain(): Participation {
    return new Participation(
      this.id,
      this.userId,
      this.challengeId,
      this.status,
      this.joinedAt,
      this.createdAt,
      this.updatedAt,
      this.completedAt,
      this.failedAt,
      this.withdrawnAt,
    );
  }

  /**
   * 도메인 엔티티를 TypeORM 엔티티로 변환
   */
  static fromDomain(participation: Participation): ParticipationTypeOrmEntity {
    const entity = new ParticipationTypeOrmEntity();
    entity.id = participation.id;
    entity.userId = participation.userId;
    entity.challengeId = participation.challengeId;
    entity.status = participation.status;
    entity.joinedAt = participation.joinedAt;
    entity.createdAt = participation.createdAt;
    entity.updatedAt = participation.updatedAt;
    entity.completedAt = participation.completedAt;
    entity.failedAt = participation.failedAt;
    entity.withdrawnAt = participation.withdrawnAt;
    return entity;
  }
} 