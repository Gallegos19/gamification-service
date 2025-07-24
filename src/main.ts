import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./infrastructure/config/swagger";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar middleware de autenticación
import { authTokenMiddleware } from "./infrastructure/web/middlewares/authToken.middleware";

// Configurar Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none } .swagger-ui .info { margin: 20px 0 } .swagger-ui .opblock-tag { font-size: 16px; padding: 5px 10px; }",
    customSiteTitle: "Gamification Service API",
    customfavIcon: "https://your-logo-url/favicon.ico",
  })
);

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
import petStatsRouter from "./infrastructure/web/routes/petStats.routes";
import { setupPetMaintenanceCron } from "./infrastructure/cron/petMaintenance.cron";

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
  "/api/gamification/pet-stats",
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
app.use("/api/gamification/pet-stats", petStatsRouter);

// Inicializar el cron job de mantenimiento de mascotas
setupPetMaintenanceCron();
console.log('Pet maintenance cron job initialized');

// Inicializar la aplicación
app.listen(PORT, () => {
  console.log(`Gamification Service running on port ${PORT}`);
});
