import { Request, Response } from 'express';
import { container } from '../../config/container';
import { validate } from 'class-validator';
import { AwardQuizPointsDto } from '../dtos/AwardQuizPointsDto';

export async function awardQuizPoints(req: Request, res: Response) {
  const { userId } = req.params;
  const dto = new AwardQuizPointsDto();
  dto.points = req.body.points;
  dto.quizId = req.body.quizId;
  dto.quiz_score_percentage = req.body.quiz_score_percentage;
  dto.bonus_reason = req.body.bonus_reason;
  dto.multiplier = req.body.multiplier;

  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  try {
    // Generar un UUID para quiz_id si no es un UUID válido
    let quizId = '';
    if (dto.quizId) {
      // Verificar si es un UUID válido
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(dto.quizId)) {
        quizId = dto.quizId;
      } else {
        // Si no es un UUID válido, dejarlo como null para que el repositorio lo maneje
        quizId = '';
        console.log(`quizId no es un UUID válido: ${dto.quizId}, se usará null`);
      }
    }
    
    await container.awardQuizPointsUseCase.execute({
      user_id: userId,
      points_earned: dto.points,
      quiz_id: quizId,
      quiz_score_percentage: dto.quiz_score_percentage || 0,
      bonus_reason: dto.bonus_reason || '',
      multiplier: dto.multiplier || 1,
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
