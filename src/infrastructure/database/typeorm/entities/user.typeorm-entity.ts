import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { UserRank } from '../../../../domain/enums/user-rank.enum';

/**
 * 사용자 TypeORM 엔티티
 * 데이터베이스와 도메인 엔티티 간의 매핑 처리
 */
@Entity('users', { comment: '사용자 테이블' })
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '사용자 ID' })
  id: number; 

  @Column({ unique: true, comment: '사용자 이메일 & 로그인 아이디' })
  email: string;

  @Column({ unique: true, comment: '사용자 이름' })
  username: string;

  @Column({ comment: '비밀번호 해시' })
  passwordHash: string;

  @Column({ 
    comment: '사용자 랭크',
    type: 'enum', 
    enum: UserRank,
    default: UserRank.BRONZE
  })
  rank: UserRank;

  @Column({ default: 0, comment: '사용자 점수' })
  points: number;

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  /**
   * TypeORM 엔티티를 도메인 엔티티로 변환
   * @returns 도메인 User 엔티티
   */
  toDomain(): User {
    return new User(
      this.id,
      this.email,
      this.username,
      this.passwordHash,
      this.rank,
      this.points,
      this.createdAt,
      this.updatedAt,
    );
  }

  /**
   * 도메인 엔티티를 TypeORM 엔티티로 변환
   * @param user 도메인 User 엔티티
   * @returns TypeORM 엔티티
   */
  static fromDomain(user: User): UserTypeOrmEntity {
    const entity = new UserTypeOrmEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.username = user.username;
    entity.passwordHash = user.passwordHash;
    entity.rank = user.rank;
    entity.points = user.points;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
} 