import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // 전역 검증 파이프 설정 - 모든 요청에 대해 DTO 검증 수행
  app.useGlobalPipes(new ValidationPipe({
      transform: true, // 자동 타입 변환
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // 허용되지 않은 속성 발견 시 에러 발생
  }));

  // 전역 응답 변환 인터셉터 설정 - 일관된 응답 형식 제공
  //app.useGlobalInterceptors(new TransformInterceptor());

  // CORS 설정 - 프론트엔드 애플리케이션과의 통신 허용
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger API 문서 설정
  const config = new DocumentBuilder()
    .setTitle('30일 챌린지 앱 API')
    .setDescription('30일 챌린지 앱의 백엔드 API 문서')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 6666;
  await app.listen(port);

  console.log(`🚀 애플리케이션이 포트 ${port}에서 실행 중입니다.`);
  console.log(`📚 API 문서: http://localhost:${port}/api`);
}
bootstrap();
