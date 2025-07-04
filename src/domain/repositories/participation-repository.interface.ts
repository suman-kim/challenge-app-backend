import { Participation } from '../entities/participation.entity';
import { ParticipationStatus } from '../enums/participation-status.enum';

export interface IParticipationRepository {
  findById(id: string): Promise<Participation | null>;
  findByUserId(userId: string): Promise<Participation[]>;
  findByChallengeId(challengeId: string): Promise<Participation[]>;
  findByUserIdAndChallengeId(userId: string, challengeId: string): Promise<Participation | null>;
  findByStatus(status: ParticipationStatus): Promise<Participation[]>;
  save(participation: Participation): Promise<Participation>;
  update(participation: Participation): Promise<Participation>;
  delete(id: string): Promise<void>;
  existsByUserIdAndChallengeId(userId: string, challengeId: string): Promise<boolean>;
} 