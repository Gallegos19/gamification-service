import { Router } from 'express';
import { 
  createChallengeRankingDirectly,
  createQuizRankingDirectly
} from '../controllers/challengeRankings.direct.controller';

const router = Router();

// POST /api/gamification/direct-rankings/challenge
router.post('/challenge', createChallengeRankingDirectly);

// POST /api/gamification/direct-rankings/quiz
router.post('/quiz', createQuizRankingDirectly);

export default router;