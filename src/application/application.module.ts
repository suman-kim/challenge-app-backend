import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CreateUserUseCase } from './use-cases/user/create-user.use-case';
import { LoginUserUseCase } from './use-cases/user/login-user.use-case';
import { RefreshTokenUseCase } from './use-cases/user/refresh-token.use-case';
import { UpdateUserUseCase } from './use-cases/user/update-user.use-case';

/**
 * 애플리케이션 계층 모듈
 * 유스케이스와 애플리케이션 서비스를 등록
 */
@Module({
  imports: [
    // 인프라스트럭처 모듈 import (Repository, Service, JWT 모듈 제공)
    InfrastructureModule,
  ],
  providers: [
    // 유스케이스 등록
    CreateUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    UpdateUserUseCase,
  ],
  exports: [
    // 다른 모듈에서 사용할 수 있도록 내보내기
    CreateUserUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
    UpdateUserUseCase,
  ],
})
export class ApplicationModule {}