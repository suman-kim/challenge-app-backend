import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from '../../../../domain/entities/category.entity';
import { ChallengeTypeOrmEntity } from './challenge.typeorm-entity';

/**
 * 카테고리 TypeORM 엔티티
 * DB와 도메인 엔티티 간 매핑
 */
@Entity('categories', { comment: '챌린지 카테고리 테이블' })
export class CategoryTypeOrmEntity {
  @PrimaryGeneratedColumn({ comment: '카테고리 ID' })
  id: number;

  @Column({ unique: true, comment: '카테고리명' })
  name: string;

  @Column({ comment: '카테고리 설명', type: 'text' })
  description: string;

  @Column({ comment: '카테고리 아이콘 URL' })
  iconUrl: string;

  @Column({ comment: '카테고리 색상' })
  color: string;

  @Column({ comment: '활성화 여부', default: true })
  isActive: boolean;

  @OneToMany(() => ChallengeTypeOrmEntity, challenge => challenge.category)
  challenges: ChallengeTypeOrmEntity[];

  @CreateDateColumn({ comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt: Date;

  /**
   * TypeORM 엔티티를 도메인 엔티티로 변환
   */
  toDomain(): Category {
    return new Category(
      this.id,
      this.name,
      this.description,
      this.iconUrl,
      this.color,
      this.isActive,
      this.createdAt,
      this.updatedAt,
    );
  }

  /**
   * 도메인 엔티티를 TypeORM 엔티티로 변환
   */
  static fromDomain(category: Category): CategoryTypeOrmEntity {
    const entity = new CategoryTypeOrmEntity();
    entity.id = category.id;
    entity.name = category.name;
    entity.description = category.description;
    entity.iconUrl = category.iconUrl;
    entity.color = category.color;
    entity.isActive = category.isActive;
    entity.createdAt = category.createdAt;
    entity.updatedAt = category.updatedAt;
    return entity;
  }
} 