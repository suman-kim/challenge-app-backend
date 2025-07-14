import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';
import { IPasswordService } from '../../../domain/services/password-service.interface';
import { User } from '../../../domain/entities/user.entity';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

/**
 * 사용자 프로필 수정 유스케이스
 * 사용자 정보 업데이트 비즈니스 로직 처리
 */
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
  ) {}

  /**
   * 사용자 프로필 수정 실행
   * 1. 사용자 존재 확인
   * 2. 비밀번호 변경 시 해시 처리
   * 3. 사용자 정보 업데이트
   * @param userId 수정할 사용자 ID
   * @param updateData 수정할 데이터
   * @returns 업데이트된 사용자 정보
   */
  async execute(userId: number, updateData: UpdateUserRequest): Promise<UpdateUserResponse> {
    // 1. 사용자 존재 확인
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new UserNotFoundError(userId);
    }

    // 2. 비밀번호 변경 시 해시 처리
    let passwordHash = existingUser.passwordHash;
    if (updateData.password) {
      passwordHash = await this.passwordService.hash(updateData.password);
    }

    // 3. 사용자 정보 업데이트 - User 엔티티 객체를 새로 생성
    const updatedUserEntity = new User(
      existingUser.id,
      updateData.email ?? existingUser.email,
      updateData.username ?? existingUser.username,
      passwordHash,
      existingUser.rank,
      existingUser.points,
      existingUser.createdAt,
      new Date(), // updatedAt
    );

    const updatedUser = await this.userRepository.update(updatedUserEntity);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      rank: updatedUser.rank,
      points: updatedUser.points,
    };
  }
}

/**
 * 사용자 수정 요청 인터페이스
 */
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}

/**
 * 사용자 수정 응답 인터페이스
 */
export interface UpdateUserResponse {
  id: number;
  email: string;
  username: string;
  rank: string;
  points: number;
} 