import { Injectable, Inject } from '@nestjs/common';
import { IChallengeRepository } from '../../../domain/repositories/challenge-repository.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { ICategoryRepository } from '../../../domain/repositories/category-repository.interface';
import { IRewardCalculator } from '../../../domain/services/reward-calculator.interface';
import { Challenge } from '../../../domain/entities/challenge.entity';
import { ChallengeDifficulty } from '../../../domain/enums/challenge-difficulty.enum';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

/**
 * 챌린지 생성 유스케이스
 */
@Injectable()
export class CreateChallengeUseCase {
  constructor(
    @Inject('IChallengeRepository')
    private readonly challengeRepository: IChallengeRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IRewardCalculator')
    private readonly rewardCalculator: IRewardCalculator,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  /**
   * 챌린지 생성 실행
   * @param request 챌린지 생성 요청
   * @returns 생성된 챌린지 정보
   */
  async execute(request: CreateChallengeRequest): Promise<CreateChallengeResponse> {
    // 1. 사용자 존재 확인
    const creator = await this.userRepository.findById(Number(request.creatorId));
    if (!creator) {
      throw new UserNotFoundError(request.creatorId);
    }

    // 2. 카테고리 존재 확인
    const category = await this.categoryRepository.findById(request.categoryId);
    if (!category) {
      throw new Error('존재하지 않는 카테고리입니다.');
    }

    // 3. 챌린지 기간/정원 검증
    if (request.duration <= 0) {
      throw new Error('챌린지 기간은 1일 이상이어야 합니다.');
    }
    if (request.maxParticipants && request.maxParticipants < 1) {
      throw new Error('최대 참여자 수는 1명 이상이어야 합니다.');
    }

    // 4. 보상 포인트 (임시 기본값)
    const rewardPoints = 100;

    // 5. 챌린지 생성
    const challenge = Challenge.create(
      request.title,
      request.description,
      request.difficulty,
      request.duration,
      request.maxParticipants || 10,
      rewardPoints,
      request.startDate || new Date(),
    );

    // 6. 챌린지 저장
    const createdChallenge = await this.challengeRepository.save(challenge);

    return new CreateChallengeResponse(createdChallenge);
  }
}

export class CreateChallengeRequest {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly categoryId: number,
    public readonly difficulty: ChallengeDifficulty,
    public readonly creatorId: number, // string -> number로 변경
    public readonly duration: number,
    public readonly isPublic: boolean = true,
    public readonly maxParticipants?: number,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly tags: string[] = [],
  ) {}
}

export class CreateChallengeResponse {
  constructor(public readonly challenge: Challenge) {}
} 