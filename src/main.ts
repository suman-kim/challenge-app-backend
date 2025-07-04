import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestJS 애플리케이션 생성
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Global Validation Pipe 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // DTO에 정의되지 않은 속성 제거
    forbidNonWhitelisted: true, // 정의되지 않은 속성이 있으면 에러
    transform: true,        // 자동 타입 변환
    disableErrorMessages: configService.get('NODE_ENV') === 'production', // 프로덕션에서 에러 메시지 숨김
  }));

  // CORS 설정
  app.enableCors({
    origin: configService.get('FRONTEND_URL', 'http://localhost:3000'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global Prefix 설정
  app.setGlobalPrefix('api/v1');

  // Swagger Documentation 설정 (개발 환경에서만)
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('30일 챌린지 앱 API')
      .setDescription('30일 챌린지 앱의 백엔드 API 문서')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'JWT 토큰을 입력하세요',
          in: 'header',
        },
        'access-token'
      )
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    
    logger.log('📚 Swagger documentation available at /api/docs');
  }

  // 애플리케이션 시작
  const port = configService.get('PORT', 5000);
  await app.listen(port);
  
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`🌍 Environment: ${configService.get('NODE_ENV', 'development')}`);
  logger.log(`📦 Database: ${configService.get('DB_NAME', 'challenge_app')}`);
}
// 전역 에러 핸들링
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
