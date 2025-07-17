import { Request, Response } from 'express';
import { container } from '../../config/container';
import { AwardChallengePointsDto } from '../dtos/AwardChallengePointsDto';
import { validate } from 'class-validator';

export async function awardChallengePoints(req: Request, res: Response) {
  const { userId } = req.params;
  const dto = new AwardChallengePointsDto();
  dto.points = req.body.points;
  dto.challengeId = req.body.challengeId;
  dto.submissionId = req.body.submissionId;
  dto.validationScore = req.body.validationScore;
  dto.environmentalCategory = req.body.environmentalCategory;
  dto.bonusReason = req.body.bonusReason;
  dto.multiplier = req.body.multiplier;

  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  const useCase = container.awardChallengePointsUseCase;
  try {
    await useCase.execute({
      userId,
      points: dto.points,
      challengeId: dto.challengeId,
      submissionId: dto.submissionId,
      validationScore: dto.validationScore,
      environmentalCategory: dto.environmentalCategory,
      bonusReason: dto.bonusReason,
      multiplier: dto.multiplier || 1
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
