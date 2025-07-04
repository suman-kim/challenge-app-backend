import { Challenge } from '../entities/challenge.entity';
import { ChallengeDifficulty } from '../enums/challenge-difficulty.enum';

export interface IChallengeRepository {
  findById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
  findByDifficulty(difficulty: ChallengeDifficulty): Promise<Challenge[]>;
  findActive(): Promise<Challenge[]>;
  save(challenge: Challenge): Promise<Challenge>;
  update(challenge: Challenge): Promise<Challenge>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
} 