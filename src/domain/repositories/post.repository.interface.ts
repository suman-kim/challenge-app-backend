import { Post } from '../entities/post.entity';

/**
 * 포스트 저장소 인터페이스
 */
export interface IPostRepository {
  findById(id: number): Promise<Post | null>;
  findAll(page: number, limit: number): Promise<{ posts: Post[]; total: number }>;
  findByUser(userId: number, page: number, limit: number): Promise<{ posts: Post[]; total: number }>;
  findFeed(userId: number, page: number, limit: number): Promise<{ posts: Post[]; total: number }>;
  create(post: Omit<Post, 'id'>): Promise<Post>;
  update(id: number, post: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
} 