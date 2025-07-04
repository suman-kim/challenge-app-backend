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
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
    private readonly participationRepository: IParticipationRepository,
  ) {}

  /**
   * 포스트 생성 실행
   * 1. 사용자 존재 확인
   * 2. 참여 정보 확인
   * 3. 포스트 생성
   * @param request 포스트 생성 요청
   * @returns 생성된 포스트
   */
  async execute(request: CreatePostRequest): Promise<CreatePostResponse> {
    // 1. 사용자 존재 확인
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new UserNotFoundError(request.userId);
    }

    // 2. 참여 정보 확인
    const participation = await this.participationRepository.findById(request.participationId);
    if (!participation) {
      throw new ParticipationNotFoundError(request.participationId);
    }

    // 3. 포스트 생성
    const post = Post.create(
      request.userId,
      request.participationId,
      request.type,
      request.title,
      request.content,
      request.imageUrl,
      request.isPublic,
    );

    const createdPost = await this.postRepository.save(post);
    return new CreatePostResponse(createdPost);
  }
}

export class CreatePostRequest {
  constructor(
    public readonly userId: string,
    public readonly participationId: string,
    public readonly type: PostType,
    public readonly title: string,
    public readonly content: string,
    public readonly imageUrl?: string,
    public readonly isPublic: boolean = true,
  ) {}
}

export class CreatePostResponse {
  constructor(public readonly post: Post) {}
} 