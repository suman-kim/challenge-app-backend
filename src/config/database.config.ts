import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
// import { Challenge } from '../domain/entities/challenge.entity';
// import { ChallengeParticipation } from '../domain/entities/challenge-participation.entity';
// import { DailyCheckin } from '../domain/entities/daily-checkin.entity';
// import { Badge } from '../domain/entities/badge.entity';
// import { UserBadge } from '../domain/entities/user-badge.entity';
// import { Post } from '../domain/entities/post.entity';
// import { Comment } from '../domain/entities/comment.entity';
// import { Like } from '../domain/entities/like.entity';

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
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: [
  //   User,
  //   //Challenge,
  //  // ChallengeParticipation,
  //  // DailyCheckin,
  //   //Badge,
  //   //UserBadge,
  //   //Post,
  //   //Comment,
  //   //Like,
  // ],
  synchronize: process.env.NODE_ENV !== 'production', // 프로덕션에서는 false
  logging: process.env.NODE_ENV === 'development',
  timezone: '+09:00', // 한국 시간대
};
