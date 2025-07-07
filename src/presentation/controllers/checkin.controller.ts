import { Controller, Post, Body, Get, Param, UseGuards, Request, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCheckinUseCase, CreateCheckinRequest } from '../../application/use-cases/checkin/create-checkin.use-case';
import { 
  CreateCheckinDto, 
  CheckinResponseDto, 
  CheckinHistoryDto, 
  WeeklyStatsDto 
} from '../../shared/dto/checkin/checkin.dto';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { JwtAuthGuard } from '../../shared/interfaces/jwt-auth.guard';

/**
 * 체크인 컨트롤러
 * 일일 체크인 관련 HTTP 요청 처리
 */
@Controller('checkins')
export class CheckinController {
  constructor(
    private readonly createCheckinUseCase: CreateCheckinUseCase,
  ) {}

  /**
   * 체크인 생성
   * POST /checkins
   * @param body 체크인 요청 데이터
   * @param req 인증된 요청 객체
   * @returns 체크인 성공 정보
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateCheckinDto, @Request() req): Promise<ApiResponse<CheckinResponseDto>> {
    try {
      const request = new CreateCheckinRequest(
        body.participationId, body.note, body.photoUrl, body.mood
      );
      const response = await this.createCheckinUseCase.execute(request);
      
      return {
        success: true,
        message: '체크인 완료!',
        // data: {
        //   id: response.checkin.id,
        //   date: response.checkin.date,
        //   note: response.checkin.note,
        //   photoUrl: response.checkin.photoUrl,
        //   mood: response.checkin.mood,
        //   currentStreak: response.currentStreak,
        // },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * 체크인 기록 조회
   * GET /checkins/history/:participationId
   * @param participationId 참여 ID
   * @returns 체크인 기록 목록
   */
  @Get('history/:participationId')
  @UseGuards(JwtAuthGuard)
  async getHistory(@Param('participationId') participationId: number): Promise<ApiResponse<CheckinHistoryDto[]>> {
    try {
      // 임시 구현 - 나중에 GetCheckinHistoryUseCase로 대체
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * 주간 체크인 통계 조회
   * GET /checkins/weekly-stats
   * @param req 인증된 요청 객체
   * @returns 주간 체크인 통계
   */
  @Get('weekly-stats')
  @UseGuards(JwtAuthGuard)
  async getWeeklyStats(@Request() req): Promise<ApiResponse<WeeklyStatsDto[]>> {
    try {
      // 임시 구현 - 나중에 GetWeeklyStatsUseCase로 대체
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
} 