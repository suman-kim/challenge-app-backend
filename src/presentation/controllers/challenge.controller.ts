import { Controller, Post, Body, Get, Param, Query, UseGuards, Request, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateChallengeUseCase, CreateChallengeRequest } from '../../application/use-cases/challenge/create-challenge.use-case';
import { JoinChallengeUseCase, JoinChallengeRequest } from '../../application/use-cases/challenge/join-challenge.use-case';
import { 
  ChallengeQueryDto, 
  CreateChallengeDto, 
  ChallengeDto, 
  ChallengeDetailDto, 
  ChallengeListResponseDto, 
  ParticipationDto 
} from '../../shared/dto/challenge/challenge.dto';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { JwtAuthGuard } from '../../shared/interfaces/jwt-auth.guard';

/**
 * 챌린지 컨트롤러
 * 챌린지 관련 HTTP 요청 처리
 */
@Controller('challenges')
export class ChallengeController {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
    private readonly joinChallengeUseCase: JoinChallengeUseCase,
  ) {}

  /**
   * 챌린지 목록 조회
   * GET /challenges
   * @param query 필터링 쿼리 파라미터
   * @returns 챌린지 목록 및 페이징 정보
   */
  @Get()
  async findAll(@Query() query: ChallengeQueryDto): Promise<ApiResponse<ChallengeListResponseDto>> {
    try {
      // 임시 구현 - 나중에 GetChallengeListUseCase로 대체
      return {
        success: true,
        data: {
          challenges: [],
          pagination: {
            page: query.page || 1,
            limit: query.limit || 10,
            total: 0,
            totalPages: 0,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 챌린지 상세 조회
   * GET /challenges/:id
   * @param id 챌린지 ID
   * @returns 챌린지 상세 정보
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ApiResponse<ChallengeDetailDto>> {
    try {
      // 임시 구현 - 나중에 GetChallengeDetailUseCase로 대체
      throw new NotFoundException('챌린지를 찾을 수 없습니다.');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * 챌린지 생성
   * POST /challenges
   * @param body 챌린지 생성 요청 데이터
   * @param req 인증된 요청 객체
   * @returns 생성된 챌린지 정보
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateChallengeDto, @Request() req): Promise<ApiResponse<ChallengeDto>> {
    try {
      // 요청 DTO → 유스케이스 Request 매핑
      const request = new CreateChallengeRequest(
        body.title,
        body.description || '',
        body.categoryId,
        body.difficulty,
        req.user.id, // 인증된 사용자 ID
        body.durationDays || 30,
        body.isPublic ?? true,
        body.maxParticipants,
        body.startDate,
        body.endDate,
        body.tags || [],
      );
      // 유스케이스 실행
      const response = await this.createChallengeUseCase.execute(request);
      const challenge = response.challenge;
      // Challenge 엔티티 → ChallengeDto 변환
      const result: ChallengeDto = {
        id: challenge.id!,
        title: challenge.title,
        description: challenge.description,
        difficulty: challenge.difficulty,
        rewardPoints: challenge.pointsReward,
        durationDays: challenge.duration,
      };
      return {
        success: true,
        message: '챌린지가 생성되었습니다.',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 챌린지 참여
   * POST /challenges/:id/join
   * @param id 챌린지 ID
   * @param req 인증된 요청 객체
   * @returns 참여 성공 메시지
   */
  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async join(@Param('id') id: number, @Request() req): Promise<ApiResponse<ParticipationDto>> {
    try {
      // const request = new JoinChallengeRequest(id, req.user.id);
      // const response = await this.joinChallengeUseCase.execute(request);
      
      return {
        success: true,
        message: '챌린지에 참여했습니다!',
        data: {
          id: 1, // 임시 ID
          challengeId: id,
          userId: req.user?.id || 1, // 임시 사용자 ID
          joinedAt: new Date(),
          status: 'ACTIVE',
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
} 