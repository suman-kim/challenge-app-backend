import { PostType } from '../enums/post-type.enum';

/**
 * 포스트 도메인 엔티티
 * 소셜 피드 포스트의 비즈니스 로직
 */
export class Post {
  constructor(
    public readonly id: string,
    public readonly userId: number,
    public readonly participationId: string,
    public readonly type: PostType,
    public readonly title: string,
    public readonly content: string,
    public readonly likesCount: number,
    public readonly commentsCount: number,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly imageUrl?: string,
  ) {}

  static create(
    userId: number,
    participationId: string,
    type: PostType,
    title: string,
    content: string,
    imageUrl?: string,
    isPublic: boolean = true,
  ): Post {
    return new Post(
      undefined,
      userId,
      participationId,
      type,
      title,
      content,
      0,
      0,
      isPublic,
      new Date(),
      new Date(),
      imageUrl,
    );
  }

  updateContent(content: string): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      content,
      this.likesCount,
      this.commentsCount,
      this.isPublic,
      this.createdAt,
      new Date(),
      this.imageUrl,
    );
  }

  updateImage(imageUrl: string): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      this.content,
      this.likesCount,
      this.commentsCount,
      this.isPublic,
      this.createdAt,
      new Date(),
      imageUrl,
    );
  }

  addLike(): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      this.content,
      this.likesCount + 1,
      this.commentsCount,
      this.isPublic,
      this.createdAt,
      new Date(),
      this.imageUrl,
    );
  }

  removeLike(): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      this.content,
      Math.max(0, this.likesCount - 1),
      this.commentsCount,
      this.isPublic,
      this.createdAt,
      new Date(),
      this.imageUrl,
    );
  }

  addComment(): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      this.content,
      this.likesCount,
      this.commentsCount + 1,
      this.isPublic,
      this.createdAt,
      new Date(),
      this.imageUrl,
    );
  }

  removeComment(): Post {
    return new Post(
      this.id,
      this.userId,
      this.participationId,
      this.type,
      this.title,
      this.content,
      this.likesCount,
      Math.max(0, this.commentsCount - 1),
      this.isPublic,
      this.createdAt,
      new Date(),
      this.imageUrl,
    );
  }

  /**
   * 포스트 작성자인지 확인
   * @param userId 확인할 사용자 ID
   * @returns 작성자 여부
   */
  public isAuthor(userId: number): boolean {
    return this.userId === userId;
  }

  /**
   * 포스트가 인기 게시물인지 확인 (좋아요 10개 이상)
   * @returns 인기 게시물 여부
   */
  public isPopular(): boolean {
    return this.likesCount >= 10;
  }
} 