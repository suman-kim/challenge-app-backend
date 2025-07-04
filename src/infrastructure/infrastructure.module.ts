import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { UserTypeOrmEntity } from './database/typeorm/entities/user.typeorm-entity';

// Repositories
import { UserRepository } from './repositories/user.repository';

// Services
import { PasswordService } from './services/password.service';
import { BadgeService } from './services/badge.service';
import { RewardCalculatorService } from './services/reward-calculator.service';

/**
 * 인프라스트럭처 모듈
 * 모든 구현체들을 등록하고 의존성 주입 설정
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      // 나중에 다른 엔티티들 추가
    ]),
  ],
  providers: [
    // Repository 구현체 등록 (의존성 역전)
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    // 나중에 다른 저장소들 추가
    
    // Service 구현체 등록
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
    {
      provide: 'IBadgeService',
      useClass: BadgeService,
    },
    {
      provide: 'IRewardCalculator',
      useClass: RewardCalculatorService,
    },
    // 나중에 다른 서비스들 추가
  ],
  exports: [
    // 다른 모듈에서 사용할 수 있도록 export
    'IUserRepository',
    'IPasswordService',
    'IBadgeService',
    'IRewardCalculator',
  ],
})
export class InfrastructureModule {} 