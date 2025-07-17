import { ChallengePoints } from '../entities/ChallengePoints';

export interface ChallengePointsRepository {
  getByUserId(userId: string): Promise<ChallengePoints | null>;
  awardPoints(
    userId: string, 
    points: number, 
    challengeId?: string,
    submissionId?: string,
    validationScore?: number,
    environmentalCategory?: string,
    bonusReason?: string,
    multiplier?: number
  ): Promise<void>;
  getChallengeHistory(userId: string): Promise<any[]>;
  getChallengeRankings(): Promise<any[]>;
  getEnvironmentalImpactRankings(): Promise<any[]>;
}
