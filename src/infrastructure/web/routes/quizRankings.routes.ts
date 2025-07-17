import { Router } from 'express';
import {
  getQuizRankings,
  getWeeklyQuizRankings,
  getAgeGroupQuizRankings
} from '../controllers/quizRankings.controller';

const router = Router();

// GET /api/gamification/quiz-rankings
router.get('/', getQuizRankings);

// GET /api/gamification/quiz-rankings/weekly
router.get('/weekly', getWeeklyQuizRankings);

// GET /api/gamification/quiz-rankings/age-group/:ageGroup
router.get('/age-group/:ageGroup', getAgeGroupQuizRankings);

export default router;