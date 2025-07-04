import { Post } from '../entities/post.entity';
import { PostType } from '../enums/post-type.enum';

export interface IPostRepository {
  findById(id: string): Promise<Post | null>;
  findByUserId(userId: string): Promise<Post[]>;
  findByParticipationId(participationId: string): Promise<Post[]>;
  findByType(type: PostType): Promise<Post[]>;
  findPublic(): Promise<Post[]>;
  save(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 