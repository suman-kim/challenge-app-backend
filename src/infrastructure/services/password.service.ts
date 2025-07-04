import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordService } from '../../domain/services/password.service.interface';

/**
 * 비밀번호 서비스 구현체
 * bcrypt를 사용한 비밀번호 해싱 및 검증
 */
@Injectable()
export class PasswordService implements IPasswordService {
  private readonly saltRounds = 10; // 보안성과 성능의 균형을 맞춘 값

  /**
   * 비밀번호 해싱 처리
   * @param password 평문 비밀번호
   * @returns 해시된 비밀번호
   */
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * 비밀번호 검증 처리
   * @param password 평문 비밀번호
   * @param hash 해시된 비밀번호
   * @returns 일치 여부
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * 비밀번호 강도 검증 (추가 기능)
   * @param password 검증할 비밀번호
   * @returns 강도 점수 (0-100)
   */
  validatePasswordStrength(password: string): number {
    let score = 0;
    
    if (password.length >= 8) score += 25;           // 길이 체크
    if (/[A-Z]/.test(password)) score += 25;         // 대문자 포함
    if (/[a-z]/.test(password)) score += 25;         // 소문자 포함
    if (/\d/.test(password)) score += 15;            // 숫자 포함
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10; // 특수문자 포함
    
    return score;
  }
} 