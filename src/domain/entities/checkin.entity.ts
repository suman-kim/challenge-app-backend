import { Mood } from '../enums/mood.enum';

/**
 * 체크인 도메인 엔티티
 * 일일 체크인 데이터와 관련된 비즈니스 로직
 */
export class Checkin {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly participationId: string,
    public readonly mood: Mood,
    public readonly checkinDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly note?: string,
    public readonly imageUrl?: string,
  ) {}

  static create(
    userId: string,
    participationId: string,
    mood: Mood,
    note?: string,
    imageUrl?: string,
  ): Checkin {
    return new Checkin(
      undefined,
      userId,
      participationId,
      mood,
      new Date(),
      new Date(),
      new Date(),
      note,
      imageUrl,
    );
  }

  updateMood(mood: Mood): Checkin {
    return new Checkin(
      this.id,
      this.userId,
      this.participationId,
      mood,
      this.checkinDate,
      this.createdAt,
      new Date(),
      this.note,
      this.imageUrl,
    );
  }

  updateNote(note: string): Checkin {
    return new Checkin(
      this.id,
      this.userId,
      this.participationId,
      this.mood,
      this.checkinDate,
      this.createdAt,
      new Date(),
      note,
      this.imageUrl,
    );
  }

  updateImage(imageUrl: string): Checkin {
    return new Checkin(
      this.id,
      this.userId,
      this.participationId,
      this.mood,
      this.checkinDate,
      this.createdAt,
      new Date(),
      this.note,
      imageUrl,
    );
  }

  /**
   * 오늘 체크인인지 확인
   * @returns 오늘 체크인 여부
   */
  public isToday(): boolean {
    const today = new Date();
    const checkinDate = new Date(this.checkinDate);
    return (
      today.getFullYear() === checkinDate.getFullYear() &&
      today.getMonth() === checkinDate.getMonth() &&
      today.getDate() === checkinDate.getDate()
    );
  }

  /**
   * 체크인 유효성 확인 (미래 날짜 체크인 불가)
   * @returns 유효성 여부
   */
  public isValid(): boolean {
    return this.checkinDate <= new Date();
  }

  /**
   * 체크인에 메모가 있는지 확인
   * @returns 메모 존재 여부
   */
  public hasNote(): boolean {
    return !!this.note && this.note.trim().length > 0;
  }

  /**
   * 체크인에 사진이 있는지 확인
   * @returns 사진 존재 여부
   */
  public hasPhoto(): boolean {
    return !!this.imageUrl && this.imageUrl.trim().length > 0;
  }
} 