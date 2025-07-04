import { IChallengeRepository } from '../../../domain/repositories/challenge-repository.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IRewardCalculator } from '../../../domain/services/reward-calculator.interface';
import { Challenge } from '../../../domain/entities/challenge.entity';
import { ChallengeDifficulty } from '../../../domain/enums/challenge-difficulty.enum';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

/**
 * 챌린지 생성 유스케이스
 */
export class CreateChallengeUseCase {
  constructor(
    private readonly challengeRepository: IChallengeRepository,
    private readonly userRepository: IUserRepository,
    private readonly rewardCalculator: IRewardCalculator,
  ) {}

  /**
   * 챌린지 생성 실행
   * 1. 사용자 존재 확인
   * 2. 보상 포인트 계산
   * 3. 챌린지 생성
   * @param request 챌린지 생성 요청
   * @returns 생성된 챌린지
   */
  async execute(request: CreateChallengeRequest): Promise<CreateChallengeResponse> {
    // 1. 사용자 존재 확인
    const creator = await this.userRepository.findById(request.creatorId);
    if (!creator) {
      throw new UserNotFoundError(request.creatorId);
    }

    // 2. 보상 포인트 계산 (기본값)
    const rewardPoints = request.pointsReward || 100;

    // 3. 챌린지 생성
    const challenge = Challenge.create(
      request.title,
      request.description,
      request.difficulty,
      request.duration,
      request.maxParticipants,
      rewardPoints,
      request.startDate || new Date(),
    );

    const createdChallenge = await this.challengeRepository.save(challenge);

    return new CreateChallengeResponse(createdChallenge);
  }
}

export class CreateChallengeRequest {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: ChallengeDifficulty,
    public readonly duration: number,
    public readonly maxParticipants: number,
    public readonly pointsReward: number,
    public readonly startDate: Date,
    public readonly creatorId: string,
  ) {}
}

export class CreateChallengeResponse {
  constructor(public readonly challenge: Challenge) {}
} 