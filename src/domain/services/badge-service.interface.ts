import { BadgeType } from '../enums/badge-type.enum';

export interface IBadgeService {
  checkAndAwardBadge(userId: number, badgeType: BadgeType): Promise<void>;
  getBadgeInfo(badgeType: BadgeType): Promise<{
    name: string;
    description: string;
    iconUrl: string;
  }>;
} 