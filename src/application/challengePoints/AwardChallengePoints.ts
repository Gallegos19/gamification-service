import { ChallengePointsRepository } from '../../domain/repositories/ChallengePointsRepository';

export interface AwardChallengePointsDTO {
  userId: string;
  points: number;
  challengeId?: string;
  submissionId?: string;
  validationScore?: number;
  environmentalCategory?: string;
  bonusReason?: string;
  multiplier?: number;
}

export class AwardChallengePoints {
  constructor(private readonly repo: ChallengePointsRepository) {}

  async execute(dto: AwardChallengePointsDTO): Promise<void> {
    // Calcular puntos finales con multiplicador
    const finalPoints = Math.round(dto.points * (dto.multiplier || 1));
    
    await this.repo.awardPoints(
      dto.userId, 
      finalPoints, 
      dto.challengeId,
      dto.submissionId,
      dto.validationScore,
      dto.environmentalCategory,
      dto.bonusReason,
      dto.multiplier
    );
  }
}
