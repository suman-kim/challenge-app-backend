import { Checkin } from '../entities/checkin.entity';

export interface ICheckinRepository {
  findById(id: string): Promise<Checkin | null>;
  findByUserId(userId: string): Promise<Checkin[]>;
  findByParticipationId(participationId: string): Promise<Checkin[]>;
  findByUserIdAndDate(userId: string, date: Date): Promise<Checkin | null>;
  save(checkin: Checkin): Promise<Checkin>;
  update(checkin: Checkin): Promise<Checkin>;
  delete(id: string): Promise<void>;
  existsByUserIdAndDate(userId: string, date: Date): Promise<boolean>;
} 