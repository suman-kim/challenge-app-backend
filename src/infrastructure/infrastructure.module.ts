import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Entities
import { UserTypeOrmEntity } from './database/typeorm/entities/user.typeorm-entity';

// Repositories
import { UserRepository } from './repositories/user.repository';

// Services
import { PasswordService } from './services/password.service';
import { BadgeService } from './services/badge.service';
import { NotificationService } from './services/notification.service';
import { RewardCalculatorService } from './services/reward-calculator.service';
import { JwtService } from './services/jwt.service';

// Guards
import { JwtAuthGuard } from '../shared/interfaces/jwt-auth.guard';

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
    // JWT 모듈 설정
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key-for-development',
      signOptions: { 
        expiresIn: '7d', // 7일 유효기간
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [
    // Repository 구현체 등록 (의존성 역전)
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    // 임시로 주석 처리 - 구현체가 없는 저장소들
    // {
    //   provide: 'IChallengeRepository',
    //   useClass: ChallengeRepository,
    // },
    // {
    //   provide: 'IParticipationRepository',
    //   useClass: ParticipationRepository,
    // },
    // {
    //   provide: 'ICheckinRepository',
    //   useClass: CheckinRepository,
    // },
    // {
    //   provide: 'IPostRepository',
    //   useClass: PostRepository,
    // },
    // {
    //   provide: 'ICategoryRepository',
    //   useClass: CategoryRepository,
    // },
    
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
      provide: 'INotificationService',
      useClass: NotificationService,
    },
    {
      provide: 'IRewardCalculator',
      useClass: RewardCalculatorService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
    
    // Guards 등록
    JwtAuthGuard,
    
    // 나중에 다른 서비스들 추가
  ],
  exports: [
    // 다른 모듈에서 사용할 수 있도록 export
    'IUserRepository',
    'IPasswordService',
    'IBadgeService',
    'INotificationService',
    'IRewardCalculator',
    'IJwtService',
    JwtAuthGuard,
  ],
})
export class InfrastructureModule {} 