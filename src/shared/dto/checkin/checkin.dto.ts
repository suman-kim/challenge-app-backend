import { Mood } from '../../../domain/enums/mood.enum';

/**
 * 체크인 생성 요청 DTO
 */
export class CreateCheckinDto {
  participationId: string;
  note?: string;
  photoUrl?: string;
  mood: Mood = Mood.HAPPY;
}

/**
 * 체크인 응답 DTO
 */
export class CheckinResponseDto {
  id: number;
  date: Date;
  note?: string;
  photoUrl?: string;
  mood: Mood;
  currentStreak: number;
}

/**
 * 체크인 기록 DTO
 */
export class CheckinHistoryDto {
  id: number;
  date: Date;
  note?: string;
  photoUrl?: string;
  mood: Mood;
  createdAt: Date;
}

/**
 * 주간 통계 DTO
 */
export class WeeklyStatsDto {
  date: string;
  checkins: number;
} 