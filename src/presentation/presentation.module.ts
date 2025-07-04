import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';

// Controllers
import { AuthController } from './controllers/auth.controller';
import { ChallengeController } from './controllers/challenge.controller';
import { CheckinController } from './controllers/checkin.controller';

/**
 * 프리젠테이션 모듈
 * 모든 컨트롤러들을 등록
 */
@Module({
  imports: [ApplicationModule],
  controllers: [
    AuthController,
    ChallengeController,
    CheckinController,
    // 나중에 다른 컨트롤러들 추가
  ],
  providers: [
    // 나중에 Guards, Interceptors, Filters 추가
  ],
})
export class PresentationModule {} 