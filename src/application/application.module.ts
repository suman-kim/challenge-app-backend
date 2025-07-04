import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

// User Use Cases
import { CreateUserUseCase } from './use-cases/user/create-user.use-case';
import { LoginUserUseCase } from './use-cases/user/login-user.use-case';

// Challenge Use Cases
import { CreateChallengeUseCase } from './use-cases/challenge/create-challenge.use-case';
import { JoinChallengeUseCase } from './use-cases/challenge/join-challenge.use-case';

// Checkin Use Cases
import { CreateCheckinUseCase } from './use-cases/checkin/create-checkin.use-case';

// Post Use Cases
import { CreatePostUseCase } from './use-cases/post/create-post.use-case';

/**
 * 애플리케이션 모듈
 * 모든 Use Case들을 등록
 */
@Module({
  imports: [InfrastructureModule],
  providers: [
    // User Use Cases
    CreateUserUseCase,
    LoginUserUseCase,
    
    // Challenge Use Cases
    CreateChallengeUseCase,
    JoinChallengeUseCase,
    
    // Checkin Use Cases
    CreateCheckinUseCase,
    
    // Post Use Cases
    CreatePostUseCase,
    
    // 나중에 다른 Use Case들 추가
  ],
  exports: [
    // 모든 Use Case들을 export
    CreateUserUseCase,
    LoginUserUseCase,
    CreateChallengeUseCase,
    JoinChallengeUseCase,
    CreateCheckinUseCase,
    CreatePostUseCase,
  ],
})
export class ApplicationModule {}