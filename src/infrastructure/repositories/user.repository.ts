import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserTypeOrmEntity } from '../database/typeorm/entities/user.typeorm-entity';

/**
 * 사용자 저장소 구현체
 * IUserRepository 인터페이스를 TypeORM으로 구현
 */
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepo: Repository<UserTypeOrmEntity>,
  ) {}

  /**
   * ID로 사용자 조회
   * @param id 사용자 ID
   * @returns 사용자 도메인 엔티티 또는 null
   */
  async findById(id: string): Promise<User | null> {
    const entity = await this.userRepo.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  /**
   * 이메일로 사용자 조회 (로그인 시 사용)
   * @param email 사용자 이메일
   * @returns 사용자 도메인 엔티티 또는 null
   */
  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepo.findOne({ where: { email } });
    return entity ? entity.toDomain() : null;
  }

  /**
   * 사용자명으로 사용자 조회
   * @param username 사용자명
   * @returns 사용자 도메인 엔티티 또는 null
   */
  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.userRepo.findOne({ where: { username } });
    return entity ? entity.toDomain() : null;
  }

  /**
   * 사용자 저장 (생성 또는 업데이트)
   * @param user 저장할 사용자 도메인 엔티티
   * @returns 저장된 사용자 도메인 엔티티
   */
  async save(user: User): Promise<User> {
    const entity = UserTypeOrmEntity.fromDomain(user);
    const savedEntity = await this.userRepo.save(entity);
    return savedEntity.toDomain();
  }

  /**
   * 사용자 정보 업데이트
   * @param user 업데이트할 사용자 도메인 엔티티
   * @returns 업데이트된 사용자 도메인 엔티티
   */
  async update(user: User): Promise<User> {
    const entity = UserTypeOrmEntity.fromDomain(user);
    const savedEntity = await this.userRepo.save(entity);
    return savedEntity.toDomain();
  }

  /**
   * 사용자 삭제
   * @param id 사용자 ID
   */
  async delete(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  /**
   * 이메일 중복 확인
   * @param email 확인할 이메일
   * @returns 중복 여부
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepo.count({ where: { email } });
    return count > 0;
  }

  /**
   * 사용자명 중복 확인
   * @param username 확인할 사용자명
   * @returns 중복 여부
   */
  async existsByUsername(username: string): Promise<boolean> {
    const count = await this.userRepo.count({ where: { username } });
    return count > 0;
  }

  /**
   * 리더보드용 상위 사용자 조회
   * @param limit 조회할 사용자 수
   * @returns 점수 기준 상위 사용자 목록
   */
  async findTopUsers(limit: number): Promise<User[]> {
    const entities = await this.userRepo.find({
      order: { totalScore: 'DESC' },
      take: limit,
    });
    return entities.map(entity => entity.toDomain());
  }

  /**
   * 사용자 순위 조회 (전체 사용자 중 순위)
   * @param userId 사용자 ID
   * @returns 사용자의 전체 순위 (1위부터 시작)
   */
  async getUserRank(userId: number): Promise<number> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) return 0;

    // 해당 사용자보다 점수가 높은 사용자 수 계산
    const rank = await this.userRepo
      .createQueryBuilder()
      .where('totalScore > :score', { score: user.totalScore })
      .getCount();

    return rank + 1; // 순위는 1부터 시작
  }
} 