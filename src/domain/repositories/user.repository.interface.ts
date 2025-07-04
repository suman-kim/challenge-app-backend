import { User } from '../entities/user.entity';

/**
 * 사용자 저장소 인터페이스
 * 의존성 역전 원칙에 따라 추상화 정의
 */
export interface IUserRepository {
  /**
   * ID로 사용자 조회
   * @param id 사용자 ID
   * @returns 사용자 도메인 엔티티 또는 null
   */
  findById(id: number): Promise<User | null>;

  /**
   * 이메일로 사용자 조회
   * @param email 사용자 이메일
   * @returns 사용자 도메인 엔티티 또는 null
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * 사용자 생성
   * @param user 생성할 사용자 도메인 엔티티
   * @returns 생성된 사용자 도메인 엔티티
   */
  create(user: Omit<User, 'id'>): Promise<User>;

  /**
   * 사용자 정보 업데이트
   * @param id 사용자 ID
   * @param user 업데이트할 사용자 정보
   * @returns 업데이트된 사용자 도메인 엔티티
   */
  update(id: number, user: Partial<User>): Promise<User>;

  /**
   * 사용자 삭제 (소프트 삭제)
   * @param id 사용자 ID
   */
  delete(id: number): Promise<void>;

  /**
   * 상위 사용자 조회 (리더보드용)
   * @param limit 조회할 사용자 수
   * @returns 점수 기준 상위 사용자 목록
   */
  findTopUsers(limit: number): Promise<User[]>;

  /**
   * 사용자 순위 조회
   * @param userId 사용자 ID
   * @returns 사용자의 전체 순위
   */
  getUserRank(userId: number): Promise<number>;
} 