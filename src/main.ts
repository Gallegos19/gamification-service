import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar middleware de autenticación
import { authTokenMiddleware } from "./infrastructure/web/middlewares/authToken.middleware";

// Swagger docs
import swaggerDocument from "./infrastructure/config/swagger";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta base de salud
app.get("/api/gamification/health", (_req, res) => {
  res.json({ status: "ok", service: "gamification-service" });
});

// Rutas principales
import quizPointsRouter from "./infrastructure/web/routes/quizPoints.routes";
import petsRouter from "./infrastructure/web/routes/pets.routes";
import challengePointsRouter from "./infrastructure/web/routes/challengePoints.routes";
import badgesRouter from "./infrastructure/web/routes/badges.routes";
import dashboardRouter from "./infrastructure/web/routes/dashboard.routes";
import rankingsRouter from "./infrastructure/web/routes/rankings.routes";
import petEvolutionCostRouter from "./infrastructure/web/routes/petEvolutionCost.routes";
import quizRankingsRouter from "./infrastructure/web/routes/quizRankings.routes";
import directRankingsRouter from "./infrastructure/web/routes/directRankings.routes";
import { getQuizRankingsDirectly } from "./infrastructure/web/controllers/quizRankings.direct.controller";

// Aplicar middleware de autenticación a todas las rutas protegidas
const protectedRoutes = [
  "/api/gamification/quiz-points",
  "/api/gamification/pets",
  "/api/gamification/challenge-points",
  "/api/gamification/badges",
  "/api/gamification/dashboard",
  "/api/gamification/rankings",
  "/api/gamification/pet-evolution-costs",
  "/api/gamification/quiz-rankings",
  "/api/gamification/direct-rankings"
];

// Aplicar middleware de autenticación a las rutas protegidas
app.use(protectedRoutes, authTokenMiddleware);

// Registrar rutas
app.use("/api/gamification/quiz-points", quizPointsRouter);
app.use("/api/gamification/pets", petsRouter);
app.use("/api/gamification/challenge-points", challengePointsRouter);
app.use("/api/gamification/badges", badgesRouter);
app.use("/api/gamification/dashboard", dashboardRouter);
app.use("/api/gamification/rankings", rankingsRouter);
app.use("/api/gamification/pet-evolution-costs", petEvolutionCostRouter);
app.use("/api/gamification/quiz-rankings", quizRankingsRouter);
app.use("/api/gamification/direct-rankings", directRankingsRouter);

app.listen(PORT, () => {
  console.log(`Gamification Service running on port ${PORT}`);
});
