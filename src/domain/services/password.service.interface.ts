/**
 * 비밀번호 서비스 인터페이스
 */
export interface IPasswordService {
  /**
   * 비밀번호 해싱
   * @param password 평문 비밀번호
   * @returns 해시된 비밀번호
   */
  hash(password: string): Promise<string>;

  /**
   * 비밀번호 검증
   * @param password 평문 비밀번호
   * @param hash 해시된 비밀번호
   * @returns 일치 여부
   */
  compare(password: string, hash: string): Promise<boolean>;
} 