import { Injectable } from '@nestjs/common';
import { IBadgeService } from '../../domain/services/badge-service.interface';
import { BadgeType } from '../../domain/enums/badge-type.enum';

/**
 * 뱃지 서비스 구현체
 * 뱃지 시스템 관련 비즈니스 로직 처리
 */
@Injectable()
export class BadgeService implements IBadgeService {
  constructor() {}

  /**
   * 뱃지 확인 및 부여
   * @param userId 사용자 ID
   * @param badgeType 뱃지 타입
   */
  async checkAndAwardBadge(userId: number, badgeType: BadgeType): Promise<void> {
    // 임시 구현 - 나중에 수정
    console.log(`Badge check for user ${userId}, type ${badgeType}`);
    
    // // 이미 뱃지를 가지고 있는지 확인
    // const hasBadge = await this.badgeRepository.existsByUserIdAndType(userId, badgeType);
    // if (hasBadge) {
    //   return; // 이미 뱃지를 가지고 있음
    // }

    // // 뱃지 정보 가져오기
    // const badgeInfo = await this.getBadgeInfo(badgeType);
    
    // // 뱃지 생성 및 저장
    // const badge = Badge.create(
    //   userId,
    //   badgeType,
    //   badgeInfo.name,
    //   badgeInfo.description,
    //   badgeInfo.iconUrl,
    // );
    
    // await this.badgeRepository.save(badge);
    
    // // 알림 발송
    // await this.notificationService.sendBadgeEarned(userId, badgeInfo.name);
  }

  /**
   * 뱃지 정보 가져오기
   * @param badgeType 뱃지 타입
   * @returns 뱃지 정보
   */
  async getBadgeInfo(badgeType: BadgeType): Promise<{
    name: string;
    description: string;
    iconUrl: string;
  }> {
    const badgeInfoMap = {
      [BadgeType.FIRST_CHALLENGE]: {
        name: '첫 도전자',
        description: '첫 번째 챌린지에 참여했습니다!',
        iconUrl: '/badges/first-challenge.png',
      },
      [BadgeType.STREAK_7]: {
        name: '일주일 연속',
        description: '7일 연속으로 체크인했습니다!',
        iconUrl: '/badges/streak-7.png',
      },
      [BadgeType.STREAK_30]: {
        name: '한 달 연속',
        description: '30일 연속으로 체크인했습니다!',
        iconUrl: '/badges/streak-30.png',
      },
      [BadgeType.PERFECT_WEEK]: {
        name: '완벽한 한 주',
        description: '한 주 동안 모든 체크인을 완료했습니다!',
        iconUrl: '/badges/perfect-week.png',
      },
      [BadgeType.PERFECT_MONTH]: {
        name: '완벽한 한 달',
        description: '한 달 동안 모든 체크인을 완료했습니다!',
        iconUrl: '/badges/perfect-month.png',
      },
      [BadgeType.EARLY_BIRD]: {
        name: '얼리버드',
        description: '이른 시간에 체크인하는 습관을 만들었습니다!',
        iconUrl: '/badges/early-bird.png',
      },
      [BadgeType.NIGHT_OWL]: {
        name: '올빼미',
        description: '늦은 시간에도 체크인하는 끈기를 보여줍니다!',
        iconUrl: '/badges/night-owl.png',
      },
      [BadgeType.SOCIAL_BUTTERFLY]: {
        name: '소셜 버터플라이',
        description: '다른 참여자들과 활발히 소통합니다!',
        iconUrl: '/badges/social-butterfly.png',
      },
      [BadgeType.ENCOURAGER]: {
        name: '격려자',
        description: '다른 참여자들을 격려하는 따뜻한 마음을 가지고 있습니다!',
        iconUrl: '/badges/encourager.png',
      },
      [BadgeType.CHALLENGE_MASTER]: {
        name: '챌린지 마스터',
        description: '여러 챌린지를 성공적으로 완료했습니다!',
        iconUrl: '/badges/challenge-master.png',
      },
    };

    return badgeInfoMap[badgeType] || {
      name: '알 수 없는 뱃지',
      description: '알 수 없는 뱃지입니다.',
      iconUrl: '/badges/unknown.png',
    };
  }
} 