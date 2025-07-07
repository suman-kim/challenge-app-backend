import { Injectable, Inject } from '@nestjs/common';
import { IParticipationRepository } from '../../../domain/repositories/participation-repository.interface';
import { ICheckinRepository } from '../../../domain/repositories/checkin-repository.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IBadgeService } from '../../../domain/services/badge-service.interface';
import { Checkin } from '../../../domain/entities/checkin.entity';
import { Mood } from '../../../domain/enums/mood.enum';
import { ParticipationNotFoundError } from '../../../domain/errors/participation-not-found.error';
import { AlreadyCheckedInError } from '../../../domain/errors/already-checked-in.error';
import { InactiveParticipationError } from '../../../domain/errors/inactive-participation.error';

/**
 * 체크인 생성 유스케이스
 */
@Injectable()
export class CreateCheckinUseCase {
  constructor(
    // @Inject('IParticipationRepository')
    // private readonly participationRepository: IParticipationRepository,
    // @Inject('ICheckinRepository')
    // private readonly checkinRepository: ICheckinRepository,
    // @Inject('IUserRepository')
    // private readonly userRepository: IUserRepository,
    @Inject('IBadgeService')
    private readonly badgeService: IBadgeService,
  ) {}

  /**
   * 체크인 생성 실행
   * 1. 참여 정보 확인
   * 2. 참여 상태 확인
   * 3. 중복 체크인 확인
   * 4. 체크인 생성
   * 5. 연속일 뱃지 확인
   * @param request 체크인 생성 요청
   * @returns 체크인 정보
   */
  async execute(request: CreateCheckinRequest): Promise<CreateCheckinResponse> {
    // 1. 참여 정보 확인
    // const participation = await this.participationRepository.findById(request.participationId);
    // if (!participation) {
    //   throw new ParticipationNotFoundError(request.participationId);
    // }

    // 2. 참여 상태 확인
    // if (!participation.isActive()) {
    //   throw new InactiveParticipationError(request.participationId);
    // }

    // 3. 중복 체크인 확인
    const today = new Date();
    // const existingCheckin = await this.checkinRepository.findByUserIdAndDate(participation.userId, today);
    // if (existingCheckin) {
    //   throw new AlreadyCheckedInError(participation.userId, today);
    // }

    // 4. 체크인 생성
    const checkin = Checkin.create(
      // 임시 사용자 ID
      'temp-user-id',
      request.participationId,
      request.mood,
      request.note,
      request.imageUrl,
    );
    // const createdCheckin = await this.checkinRepository.save(checkin);

    // 5. 연속일 뱃지 확인
    // await this.badgeService.checkAndAwardBadge(participation.userId, 'STREAK_7' as any);

    return new CreateCheckinResponse(checkin);
  }
}

export class CreateCheckinRequest {
  constructor(
    public readonly participationId: string,
    public readonly note?: string,
    public readonly imageUrl?: string,
    public readonly mood: Mood = Mood.GOOD,
  ) {}
}

export class CreateCheckinResponse {
  constructor(
    public readonly checkin: Checkin,
  ) {}
} 