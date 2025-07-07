/**
 * 사용자 랭크 열거형
 * 점수에 따른 사용자 등급을 정의
 */
export enum UserRank {
  BRONZE = 'bronze',      // 0~999점
  SILVER = 'silver',      // 1000~2999점
  GOLD = 'gold',          // 3000~5999점
  PLATINUM = 'platinum',  // 6000~9999점
  DIAMOND = 'diamond',    // 10000~14999점
  MASTER = 'master',      // 15000~24999점
  GRANDMASTER = 'grandmaster', // 25000~39999점
  CHALLENGER = 'challenger',   // 40000~59999점
  LEGEND = 'legend'       // 60000점 이상
} 