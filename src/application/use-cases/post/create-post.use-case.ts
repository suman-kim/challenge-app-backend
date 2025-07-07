import { Injectable, Inject } from '@nestjs/common';
import { IPostRepository } from '../../../domain/repositories/post-repository.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IParticipationRepository } from '../../../domain/repositories/participation-repository.interface';
import { Post } from '../../../domain/entities/post.entity';
import { PostType } from '../../../domain/enums/post-type.enum';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { ParticipationNotFoundError } from '../../../domain/errors/participation-not-found.error';

/**
 * 포스트 생성 유스케이스
 */
@Injectable()
export class CreatePostUseCase {
  constructor(
    // @Inject('IPostRepository')
    // private readonly postRepository: IPostRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * 포스트 생성 실행
   * 1. 사용자 존재 확인
   * 2. 포스트 생성
   * @param request 포스트 생성 요청
   * @returns 생성된 포스트 정보
   */
  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    // 1. 사용자 존재 확인
    const user = await this.userRepository.findById(request.authorId);
    if (!user) {
      throw new UserNotFoundError(request.authorId);
    }

    // 2. 포스트 생성
    const post = Post.create(
      request.authorId,
      request.challengeId || 'temp-participation-id', // 임시 참여 ID
      request.type,
      'Post Title', // 임시 제목
      request.content,
      request.imageUrls?.[0], // 첫 번째 이미지만 사용
      true,
    );

    // const createdPost = await this.postRepository.save(post);

    return new CreatePostResponse(post);
  }
}

export class CreatePostRequest {
  constructor(
    public readonly authorId: number,
    public readonly content: string,
    public readonly type: PostType,
    public readonly challengeId?: string,
    public readonly imageUrls?: string[],
  ) {}
}

export class CreatePostResponse {
  constructor(public readonly post: Post) {}
} 