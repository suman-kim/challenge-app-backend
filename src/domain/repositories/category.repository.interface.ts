import { Category } from '../entities/category.entity';

/**
 * 카테고리 저장소 인터페이스
 */
export interface ICategoryRepository {
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findPopular(limit: number): Promise<Category[]>;
  create(category: Omit<Category, 'id'>): Promise<Category>;
  update(id: number, category: Partial<Category>): Promise<Category>;
  delete(id: number): Promise<void>;
} 