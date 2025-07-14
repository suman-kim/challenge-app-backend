import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * TypeORM 데이터베이스 연결 설정
 * - MySQL 데이터베이스 연결 정보
 * - 엔티티 자동 등록
 * - 개발 환경에서 스키마 자동 동기화
 */
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'challenge_app',
  autoLoadEntities: true, // 모듈에서 등록된 엔티티 자동 로드
  //entities: [__dirname + '/../infrastructure/database/typeorm/entities/*.ts'],
  synchronize: process.env.NODE_ENV !== 'production', // 프로덕션에서는 false
  logging: process.env.NODE_ENV === 'development',
  timezone: '+09:00', // 한국 시간대
};
