import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'challenge_app',
  entities: ['src/infrastructure/database/typeorm/entities/*.typeorm-entity.ts'], // 경로 수정
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // 마이그레이션 사용시 false
  logging: process.env.NODE_ENV === 'development',
  timezone: '+09:00',
})