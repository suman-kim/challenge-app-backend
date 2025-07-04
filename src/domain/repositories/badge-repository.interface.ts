import { Badge } from '../entities/badge.entity';
import { BadgeType } from '../enums/badge-type.enum';

export interface IBadgeRepository {
  findById(id: string): Promise<Badge | null>;
  findByUserId(userId: string): Promise<Badge[]>;
  findByType(type: BadgeType): Promise<Badge[]>;
  save(badge: Badge): Promise<Badge>;
  update(badge: Badge): Promise<Badge>;
  delete(id: string): Promise<void>;
  existsByUserIdAndType(userId: string, type: BadgeType): Promise<boolean>;
} 