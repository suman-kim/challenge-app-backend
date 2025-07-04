import { BadgeType } from '../enums/badge-type.enum';

/**
 * 뱃지 도메인 엔티티
 * 뱃지 시스템의 비즈니스 로직
 */
export class Badge {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: BadgeType,
    public readonly name: string,
    public readonly description: string,
    public readonly iconUrl: string,
    public readonly earnedAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    userId: string,
    type: BadgeType,
    name: string,
    description: string,
    iconUrl: string,
  ): Badge {
    return new Badge(
      undefined,
      userId,
      type,
      name,
      description,
      iconUrl,
      new Date(),
      new Date(),
      new Date(),
    );
  }


} 