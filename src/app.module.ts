import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

// Custom Modules
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

/**
 * 애플리케이션 루트 모듈
 * - 모든 기능 모듈들을 통합
 * - 전역 설정 관리
 * - 데이터베이스 연결 설정
 */
@Module({
  imports: [
    // 환경 변수 설정 모듈
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeORM 데이터베이스 연결 설정
    TypeOrmModule.forRoot(databaseConfig),
    // Custom Modules
    PresentationModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
