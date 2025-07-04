/**
 * 참여 상태 열거형
 * 사용자의 챌린지 참여 상태를 정의
 */
export enum ParticipationStatus {
  ACTIVE = 'ACTIVE',       // 활성 - 현재 진행 중
  COMPLETED = 'COMPLETED', // 완료 - 챌린지 성공적으로 완료
  FAILED = 'FAILED',       // 실패 - 중도 포기 또는 실패
  WITHDRAWN = 'WITHDRAWN',  // 철회 - 챌린지 철회
  PAUSED = 'paused'        // 일시정지 - 임시 중단
} 