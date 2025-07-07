import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
} 