import { Injectable, Inject } from '@nestjs/common';
import { IChallengeRepository } from '../../../domain/repositories/challenge-repository.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IParticipationRepository } from '../../../domain/repositories/participation-repository.interface';
import { IBadgeService } from '../../../domain/services/badge-service.interface';
import { Participation } from '../../../domain/entities/participation.entity';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { ChallengeNotFoundError } from '../../../domain/errors/challenge-not-found.error';
import { AlreadyParticipatingError } from '../../../domain/errors/already-participating.error';
import { CannotJoinChallengeError } from '../../../domain/errors/cannot-join-challenge.error';

/**
 * 챌린지 참여 유스케이스
 */
@Injectable()
export class JoinChallengeUseCase {
  constructor(
    // @Inject('IChallengeRepository')
    // private readonly challengeRepository: IChallengeRepository,
    // @Inject('IUserRepository')
    // private readonly userRepository: IUserRepository,
    // @Inject('IParticipationRepository')
    // private readonly participationRepository: IParticipationRepository,
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  /**
   * 챌린지 참여 실행
   * 1. 챌린지 존재 확인
   * 2. 사용자 존재 확인
   * 3. 중복 참여 확인
   * 4. 참여 가능 여부 확인
   * 5. 참여 생성
   * 6. 챌린지 참여자 수 증가
   * 7. 첫 참여 뱃지 확인
   * @param request 챌린지 참여 요청
   * @returns 참여 정보
   */
  async execute(request: JoinChallengeRequest): Promise<JoinChallengeResponse> {
    // 1. 챌린지 존재 확인
    // const challenge = await this.challengeRepository.findById(request.challengeId);
    // if (!challenge) {
    //   throw new ChallengeNotFoundError(request.challengeId);
    // }

    // 2. 사용자 존재 확인
    // const user = await this.userRepository.findById(request.userId);
    // if (!user) {
    //   throw new UserNotFoundError(request.userId);
    // }

    // 3. 중복 참여 확인
    // const existingParticipation = await this.participationRepository.findByUserIdAndChallengeId(
    //   request.userId, request.challengeId
    // );
    // if (existingParticipation) {
    //   throw new AlreadyParticipatingError(request.userId, request.challengeId);
    // }

    // 4. 참여 가능 여부 확인
    // if (!challenge.canJoin()) {
    //   throw new CannotJoinChallengeError(request.challengeId, 'Challenge is not available for joining');
    // }

    // 5. 참여 생성
    // const participation = Participation.create(request.userId, request.challengeId);
    // const createdParticipation = await this.participationRepository.save(participation);

    // 6. 챌린지 참여자 수 증가
    // const updatedChallenge = challenge.addParticipant();
    // await this.challengeRepository.update(updatedChallenge);

    // 7. 첫 참여 뱃지 확인
    // await this.badgeService.checkAndAwardBadge(request.userId, 'FIRST_CHALLENGE' as any);

    // 임시 응답
    return new JoinChallengeResponse({} as Participation);
  }
}

export class JoinChallengeRequest {
  constructor(
    public readonly challengeId: number,
    public readonly userId: number,
  ) {}
}

export class JoinChallengeResponse {
  constructor(public readonly participation: Participation) {}
} 