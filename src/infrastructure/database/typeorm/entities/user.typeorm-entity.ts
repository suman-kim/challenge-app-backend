import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../../domain/entities/user.entity';
import { UserRank } from '../../../../domain/enums/user-rank.enum';

/**
 * 사용자 TypeORM 엔티티
 * 데이터베이스와 도메인 엔티티 간의 매핑 처리
 */
@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ 
    type: 'enum', 
    enum: UserRank,
    default: UserRank.BEGINNER
  })
  rank: UserRank;

  @Column({ default: 0 })
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
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