import { Badge } from '../entities/badge.entity';

/**
 * 뱃지 저장소 인터페이스
 */
export interface IBadgeRepository {
  findById(id: number): Promise<Badge | null>;
  findByName(name: string): Promise<Badge | null>;
  findByType(type: string): Promise<Badge[]>;
  findAll(): Promise<Badge[]>;
  create(badge: Omit<Badge, 'id'>): Promise<Badge>;
  update(id: number, badge: Partial<Badge>): Promise<Badge>;
  delete(id: number): Promise<void>;
} 