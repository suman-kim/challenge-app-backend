import { Injectable } from '@nestjs/common';
import { INotificationService } from '../../domain/services/notification-service.interface';

/**
 * 알림 서비스 구현체
 * 실제 알림 발송 로직 (현재는 콘솔 출력으로 대체)
 */
@Injectable()
export class NotificationService implements INotificationService {
  /**
   * 챌린지 리마인더 알림 발송
   * @param userId 사용자 ID
   * @param challengeId 챌린지 ID
   */
  async sendChallengeReminder(userId: string, challengeId: string): Promise<void> {
    console.log(`[알림] 사용자 ${userId}에게 챌린지 ${challengeId} 리마인더 발송`);
    // TODO: 실제 알림 발송 로직 구현 (푸시 알림, 이메일 등)
  }

  /**
   * 연속일 마일스톤 알림 발송
   * @param userId 사용자 ID
   * @param streakDays 연속일
   */
  async sendStreakMilestone(userId: string, streakDays: number): Promise<void> {
    console.log(`[알림] 사용자 ${userId}에게 ${streakDays}일 연속 달성 축하 알림 발송`);
    // TODO: 실제 알림 발송 로직 구현
  }

  /**
   * 뱃지 획득 알림 발송
   * @param userId 사용자 ID
   * @param badgeName 뱃지 이름
   */
  async sendBadgeEarned(userId: string, badgeName: string): Promise<void> {
    console.log(`[알림] 사용자 ${userId}에게 뱃지 "${badgeName}" 획득 축하 알림 발송`);
    // TODO: 실제 알림 발송 로직 구현
  }

  /**
   * 챌린지 완료 알림 발송
   * @param userId 사용자 ID
   * @param challengeId 챌린지 ID
   */
  async sendChallengeCompleted(userId: string, challengeId: string): Promise<void> {
    console.log(`[알림] 사용자 ${userId}에게 챌린지 ${challengeId} 완료 축하 알림 발송`);
    // TODO: 실제 알림 발송 로직 구현
  }
} 