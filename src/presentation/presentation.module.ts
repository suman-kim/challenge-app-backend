import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { ApplicationModule } from '../application/application.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

/**
 * 프레젠테이션 계층 모듈
 * 컨트롤러와 HTTP 요청/응답 처리를 담당
 */
@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule, // JwtAuthGuard 접근을 위해 직접 import
  ],
  controllers: [AuthController, UserController],
  providers: [
    // UseCase들은 ApplicationModule에서 이미 제공되므로 여기서 다시 등록하지 않음
  ],
})
export class PresentationModule {} 