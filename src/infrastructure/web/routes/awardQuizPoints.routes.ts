import { Router } from 'express';
import { awardQuizPoints } from '../controllers/awardQuizPoints.controller';
import { validateDto } from '../middlewares/validateDto';
import { AwardQuizPointsDto } from '../dto/AwardQuizPointsDto';

const router = Router();

// POST /api/gamification/quiz-points/award
router.post('/award', validateDto(AwardQuizPointsDto), awardQuizPoints);

export default router;
