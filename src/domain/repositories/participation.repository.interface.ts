import { Participation } from '../entities/participation.entity';

/**
 * 참여 저장소 인터페이스
 */
export interface IParticipationRepository {
  findById(id: number): Promise<Participation | null>;
  findByUserAndChallenge(userId: number, challengeId: number): Promise<Participation | null>;
  findByUser(userId: number): Promise<Participation[]>;
  findByChallenge(challengeId: number): Promise<Participation[]>;
  create(participation: Omit<Participation, 'id'>): Promise<Participation>;
  update(id: number, participation: Partial<Participation>): Promise<Participation>;
  delete(id: number): Promise<void>;
} 