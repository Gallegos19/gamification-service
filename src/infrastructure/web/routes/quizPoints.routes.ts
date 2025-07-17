import { Router } from "express";
import {
  getQuizPointsByUserId,
  getQuizHistory,
  getQuizRankings,
  getWeeklyQuizRankings,
  getAgeGroupQuizRankings,
  updateQuizPoints,
  createQuizPoints,
  deleteQuizPoints,
  createQuizPointsHistory,
  updateQuizPointsHistory,
  deleteQuizPointsHistory,
  createQuizPointsRanking,
  updateQuizPointsRanking,
  deleteQuizPointsRanking,
} from "../controllers/quizPoints.controller";
import { awardQuizPoints } from "../controllers/quizPoints.award.controller";

const router = Router();

// CRUD para user_quiz_points
router.post("/", createQuizPoints);

// Rutas específicas primero (antes de las rutas con parámetros)
// CRUD para quiz_points_rankings
router.get("/rankings", getQuizRankings);
router.get("/rankings/weekly", getWeeklyQuizRankings);
router.get("/rankings/age-group/:ageGroup", getAgeGroupQuizRankings);
router.post("/rankings", createQuizPointsRanking);
router.put("/rankings/:userId", updateQuizPointsRanking);
router.delete("/rankings/:userId", deleteQuizPointsRanking);

// CRUD para quiz_points_history
router.post("/history", createQuizPointsHistory);
router.get("/history/:userId", getQuizHistory);
router.put("/history/:historyId", updateQuizPointsHistory);
router.delete("/history/:historyId", deleteQuizPointsHistory);

// Rutas con parámetros genéricos al final
router.post("/:userId/award", awardQuizPoints);
router.put("/:userId", updateQuizPoints);
router.delete("/:userId", deleteQuizPoints);
router.get("/:userId", getQuizPointsByUserId);

export default router;
