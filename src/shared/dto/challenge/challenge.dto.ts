import { ChallengeDifficulty } from '../../../domain/enums/challenge-difficulty.enum';

/**
 * 챌린지 쿼리 DTO
 */
export class ChallengeQueryDto {
  category?: string;
  difficulty?: ChallengeDifficulty;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * 챌린지 생성 요청 DTO
 */
export class CreateChallengeDto {
  title: string;
  description?: string;
  categoryId: number;
  difficulty: ChallengeDifficulty;
  durationDays?: number = 30;
  maxParticipants?: number;
  startDate?: Date;
  endDate?: Date;
  isPublic?: boolean = true;
  tags?: string[] = [];
}

/**
 * 챌린지 기본 정보 DTO
 */
export class ChallengeDto {
  id: number;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  rewardPoints: number;
  durationDays: number;
}

/**
 * 챌린지 상세 정보 DTO
 */
export class ChallengeDetailDto {
  id: number;
  title: string;
  description: string;
  difficulty: ChallengeDifficulty;
  rewardPoints: number;
  durationDays: number;
  participantsCount: number;
  maxParticipants?: number;
  startDate?: Date;
  endDate?: Date;
  tags: string[];
  createdAt: Date;
}

/**
 * 챌린지 목록 응답 DTO
 */
export class ChallengeListResponseDto {
  challenges: ChallengeDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 챌린지 참여 DTO
 */
export class ParticipationDto {
  id: number;
  challengeId: number;
  userId: number;
  joinedAt: Date;
  status: string;
} 