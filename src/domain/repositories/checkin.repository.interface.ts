import { Checkin } from '../entities/checkin.entity';

/**
 * 체크인 저장소 인터페이스
 */
export interface ICheckinRepository {
  findById(id: number): Promise<Checkin | null>;
  findByParticipation(participationId: number): Promise<Checkin[]>;
  findByDate(participationId: number, date: Date): Promise<Checkin | null>;
  create(checkin: Omit<Checkin, 'id'>): Promise<Checkin>;
  update(id: number, checkin: Partial<Checkin>): Promise<Checkin>;
  delete(id: number): Promise<void>;
  getWeeklyStats(userId: number): Promise<Array<{ date: string; checkins: number }>>;
} 