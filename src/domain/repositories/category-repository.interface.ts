import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findById(id: number): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findActive(): Promise<Category[]>;
  save(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 