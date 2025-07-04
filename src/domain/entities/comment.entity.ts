/**
 * 댓글 도메인 엔티티
 * 포스트 댓글의 비즈니스 로직
 */
export class Comment {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly postId: string,
    public readonly content: string,
    public readonly likesCount: number,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    userId: string,
    postId: string,
    content: string,
    isPublic: boolean = true,
  ): Comment {
    return new Comment(
      undefined,
      userId,
      postId,
      content,
      0,
      isPublic,
      new Date(),
      new Date(),
    );
  }

  updateContent(content: string): Comment {
    return new Comment(
      this.id,
      this.userId,
      this.postId,
      content,
      this.likesCount,
      this.isPublic,
      this.createdAt,
      new Date(),
    );
  }

  addLike(): Comment {
    return new Comment(
      this.id,
      this.userId,
      this.postId,
      this.content,
      this.likesCount + 1,
      this.isPublic,
      this.createdAt,
      new Date(),
    );
  }

  removeLike(): Comment {
    return new Comment(
      this.id,
      this.userId,
      this.postId,
      this.content,
      Math.max(0, this.likesCount - 1),
      this.isPublic,
      this.createdAt,
      new Date(),
    );
  }

  /**
   * 댓글 작성자인지 확인
   * @param userId 확인할 사용자 ID
   * @returns 작성자 여부
   */
  public isAuthor(userId: string): boolean {
    return this.userId === userId;
  }

  /**
   * 댓글 길이가 적절한지 확인 (500자 이하)
   * @returns 길이 적절성 여부
   */
  public hasValidLength(): boolean {
    return this.content.length <= 500;
  }
} 