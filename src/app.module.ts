import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

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
    // 기능별 모듈 import
    // AuthModule,      // 인증 관련 기능
    // UserModule,      // 사용자 관련 기능
    // ChallengeModule, // 챌린지 관련 기능
    // PostModule,      // 포스트/피드 관련 기능
    // RankingModule,   // 랭킹 관련 기능
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
