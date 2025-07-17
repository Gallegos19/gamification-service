import { OpenAPIV3 } from "openapi-types";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Gamification Service API",
    version: "1.0.0",
    description: "API documentation for Gamification microservice.",
  },
  servers: [{ url: "" }],
  tags: [
    {
      name: "Quiz Points",
      description: "Sistema de puntos de quiz y rankings de usuarios",
    },
    { name: "Pets", description: "Tienda y gestión de mascotas" },
    {
      name: "Challenge Points",
      description: "Sistema de puntos de retos y badges",
    },
    { name: "Badges", description: "Gestión de badges y tiers" },
    { name: "Dashboard", description: "Panel combinado de usuario" },
    {
      name: "PetEvolutionCosts",
      description: "Costos de evolución de mascotas",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Content: {
        type: "object",
        required: [
          "title",
          "content_type",
          "main_media_id",
          "thumbnail_media_id",
        ],
        properties: {
          title: { type: "string", example: "Introducción a la gamificación" },
          content_type: {
            type: "string",
            enum: ["VIDEO", "ARTICLE", "QUIZ", "INTERACTIVE", "OTHER"],
            example: "VIDEO",
          },
          main_media_id: {
            type: "string",
            format: "uuid",
            example: "b2e7c0e5-3b6b-4e2b-8a1c-7f2f1c5a9e3d",
          },
          thumbnail_media_id: {
            type: "string",
            format: "uuid",
            example: "a1b2c3d4-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
          },
          description: {
            type: "string",
            example:
              "Este contenido cubre los conceptos básicos de gamificación.",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            example: ["gamificación", "educación"],
          },
        },
      },
      Dashboard: {
        type: "object",
        properties: {
          user_id: { type: "string", example: "user-123" },
          total_quiz_points: { type: "integer", example: 150 },
          total_challenge_points: { type: "integer", example: 80 },
          badges_count: { type: "integer", example: 5 },
          pets_count: { type: "integer", example: 3 },
          quiz_level: { type: "integer", example: 4 },
          challenge_rank: { type: "integer", nullable: true, example: 2 },
          badge_names: {
            type: "array",
            items: { type: "string" },
            example: ["Quiz Master", "First Steps"],
          },
          pet_names: {
            type: "array",
            items: { type: "string" },
            example: ["Firulais", "Michi"],
          },
        },
      },
      Badge: {
        type: "object",
        properties: {
          id: { type: "string", example: "badge-123" },
          name: { type: "string", example: "Quiz Master" },
          description: { type: "string", example: "Completa 10 quizzes." },
          icon_url: { type: "string", example: "https://example.com/icon.png" },
          category: { type: "string", example: "quiz" },
          rarity: { type: "string", example: "rare" },
          badge_tier: { type: "string", example: "gold" },
          unlock_criteria: {
            type: "object",
            example: { quizzes_completed: 10 },
          },
        },
        required: ["id", "name", "rarity", "badge_tier"],
      },
      UserBadge: {
        type: "object",
        properties: {
          id: { type: "string", example: "userbadge-123" },
          user_id: { type: "string", example: "user-123" },
          badge_id: { type: "string", example: "badge-456" },
          unlocked_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T10:00:00Z",
          },
          is_featured: { type: "boolean", example: false },
          challenge_points_when_unlocked: {
            type: "integer",
            nullable: true,
            example: 50,
          },
          badge: { $ref: "#/components/schemas/Badge" },
        },
        required: ["id", "user_id", "badge_id", "unlocked_at", "badge"],
      },
      ChallengePoints: {
        type: "object",
        properties: {
          user_id: { type: "string", example: "user-123" },
          total_challenge_points: { type: "integer", example: 100 },
          lifetime_challenge_points: { type: "integer", example: 200 },
          challenges_completed: { type: "integer", example: 12 },
          challenges_submitted: { type: "integer", example: 15 },
          created_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T10:00:00Z",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-02T10:00:00Z",
          },
          last_challenge_point_earned_at: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2024-01-03T10:00:00Z",
          },
        },
      },
      Pet: {
        type: "object",
        properties: {
          id: { type: "string", example: "pet-123" },
          name: { type: "string", example: "Firulais" },
          species_type: { type: "string", example: "dog" },
          adopted_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T12:00:00Z",
          },
          created_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T10:00:00Z",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            example: "2024-01-02T10:00:00Z",
          },
        },
      },
      QuizPoints: {
        type: "object",
        properties: {
          user_id: { type: "string", example: "user-123" },
          total_quiz_points: { type: "integer", example: 150 },
          available_quiz_points: { type: "integer", example: 100 },
          spent_quiz_points: { type: "integer", example: 50 },
          quiz_level: { type: "integer", example: 3 },
          quiz_level_progress: { type: "integer", example: 80 },
          current_quiz_streak: { type: "integer", example: 5 },
          longest_quiz_streak: { type: "integer", example: 10 },
        },
      },
      AwardQuizPointsRequest: {
        type: "object",
        required: [
          "user_id",
          "quiz_id",
          "points_earned",
          "quiz_score_percentage",
        ],
        properties: {
          user_id: { type: "string" },
          quiz_id: { type: "string" },
          points_earned: { type: "integer", minimum: 1 },
          quiz_score_percentage: { type: "number", minimum: 0, maximum: 100 },
          bonus_reason: { type: "string", nullable: true },
          multiplier: { type: "number", nullable: true },
        },
      },
      AwardQuizPointsResponse: {
        type: "object",
        properties: {
          transaction_id: { type: "string" },
        },
      },
      AwardQuizPointsError: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
      FeaturePetRequest: {
        type: "object",
        required: ["petId"],
        properties: {
          petId: { type: "string" },
        },
      },
      FeaturePetResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          featuredPetId: { type: "string" },
        },
      },
      FeatureBadgeRequest: {
        type: "object",
        required: ["badgeId"],
        properties: {
          badgeId: { type: "string" },
        },
      },
      FeatureBadgeResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          featuredBadgeId: { type: "string" },
        },
      },
      PetEvolutionCost: {
        type: "object",
        properties: {
          petId: { type: "string" },
          stage: { type: "integer" },
          cost: { type: "number" },
        },
        required: ["petId", "stage", "cost"],
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/gamification/quiz-points/{userId}/award": {
      post: {
        tags: ["Quiz Points"],
        summary: "Suma puntos de quiz a un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  points: { type: "integer", minimum: 1, example: 15 },
                  quizId: { type: "string", example: "quiz-789" },
                  quiz_score_percentage: { type: "number", example: 85.5 },
                  bonus_reason: { type: "string", example: "Perfect Score" },
                  multiplier: { type: "number", example: 2 },
                },
                required: ["points"],
              },
              example: {
                points: 25,
                quizId: "quiz-789",
                quiz_score_percentage: 90,
                bonus_reason: "Speed Bonus",
                multiplier: 1.5,
              },
            },
          },
        },
        responses: {
          204: {
            description: "Puntos de quiz sumados correctamente (sin contenido)",
          },
          400: {
            description: "Petición inválida",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    errors: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/badges/{userId}/unlock": {
      post: {
        tags: ["Badges"],
        summary: "Desbloquear una insignia",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  badgeId: { type: "string", example: "badge-789" },
                },
                required: ["badgeId"],
              },
              example: {
                badgeId: "badge-789",
              },
            },
          },
        },
        responses: {
          204: {
            description: "Insignia desbloqueada correctamente (sin contenido)",
          },
          400: {
            description: "Petición inválida",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    errors: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/badges": {
      post: {
        tags: ["Badges"],
        summary: "Crear badge (insignia)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Quiz Master" },
                  description: {
                    type: "string",
                    example: "Completa 10 quizzes.",
                  },
                  icon_url: {
                    type: "string",
                    example: "https://example.com/icon.png",
                  },
                  category: { type: "string", example: "quiz" },
                  rarity: { type: "string", example: "rare" },
                  badge_tier: { type: "string", example: "gold" },
                  unlock_criteria: {
                    type: "object",
                    example: { quizzes_completed: 10 },
                  },
                },
                required: ["name", "rarity", "badge_tier"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Badge creado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Badge" },
                example: {
                  id: "badge-123",
                  badge: {
                    name: "Quiz Master",
                    description: "Completa 10 quizzes.",
                    icon_url: "https://example.com/icon.png",
                    category: "quiz",
                    rarity: "rare",
                    badge_tier: "gold",
                    unlock_criteria: { quizzes_completed: 10 },
                  },
                },
              },
            },
          },
          400: { description: "Campos obligatorios faltantes." },
          500: { description: "Error interno." },
        },
      },
      get: {
        tags: ["Badges"],
        summary: "Listar todas las insignias",
        responses: {
          200: {
            description: "Lista de badges",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Badge" },
                },
                example: [
                  {
                    id: "badge-123",
                    badge: {
                      name: "Quiz Master",
                      rarity: "rare",
                      badge_tier: "gold",
                    },
                  },
                  {
                    id: "badge-456",
                    badge: {
                      name: "Retador",
                      rarity: "common",
                      badge_tier: "bronze",
                    },
                  },
                ],
              },
            },
          },
          500: { description: "Error interno." },
        },
      },
    },
    "/api/gamification/badges/id/{badgeId}": {
      get: {
        tags: ["Badges"],
        summary: "Obtener badge por ID",
        parameters: [
          {
            name: "badgeId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Badge encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Badge" },
                example: {
                  id: "badge-123",
                  badge: {
                    name: "Quiz Master",
                    rarity: "rare",
                    badge_tier: "gold",
                  },
                },
              },
            },
          },
          404: { description: "Badge no encontrado." },
          500: { description: "Error interno." },
        },
      },
      put: {
        tags: ["Badges"],
        summary: "Actualizar badge",
        parameters: [
          {
            name: "badgeId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Quiz Master" },
                  description: {
                    type: "string",
                    example: "Completa 10 quizzes.",
                  },
                  icon_url: {
                    type: "string",
                    example: "https://example.com/icon.png",
                  },
                  category: { type: "string", example: "quiz" },
                  rarity: { type: "string", example: "rare" },
                  badge_tier: { type: "string", example: "gold" },
                  unlock_criteria: {
                    type: "object",
                    example: { quizzes_completed: 10 },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Badge actualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Badge" },
                example: {
                  id: "badge-123",
                  badge: {
                    name: "Quiz Master",
                    rarity: "rare",
                    badge_tier: "gold",
                  },
                },
              },
            },
          },
          500: { description: "Error interno." },
        },
      },
      delete: {
        tags: ["Badges"],
        summary: "Eliminar badge",
        parameters: [
          {
            name: "badgeId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Eliminado correctamente." },
          500: { description: "Error interno." },
        },
      },
    },
    "/api/gamification/badges/feature": {
      post: {
        tags: ["Badges"],
        summary: "Destacar badge",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  badgeId: { type: "string", example: "badge-123" },
                },
                required: ["badgeId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Badge destacado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FeatureBadgeResponse" },
                example: {
                  message: "Badge destacado correctamente",
                  featuredBadgeId: "badge-123",
                },
              },
            },
          },
          404: { description: "Badge no encontrado." },
          500: { description: "Error interno." },
        },
      },
    },
    "/api/gamification/pets/{userId}/adopt": {
      post: {
        tags: ["Pets"],
        summary: "Adoptar una mascota",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  petId: { type: "string", example: "pet-456" },
                  nickname: { type: "string", example: "Firulais" },
                },
                required: ["petId"],
              },
              example: {
                petId: "pet-456",
                nickname: "Firulais",
              },
            },
          },
        },
        responses: {
          204: {
            description: "Mascota adoptada correctamente (sin contenido)",
          },
          400: {
            description: "Petición inválida",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    errors: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/challenge-points/{userId}/award": {
      post: {
        tags: ["Challenge Points"],
        summary: "Suma puntos de reto a un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  points: { type: "integer", minimum: 1, example: 10 },
                  challengeId: { type: "string", example: "challenge-123" },
                },
                required: ["points"],
              },
              example: {
                points: 20,
                challengeId: "challenge-123",
              },
            },
          },
        },
        responses: {
          204: { description: "Puntos sumados correctamente (sin contenido)" },
          400: {
            description: "Petición inválida",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    errors: { type: "array", items: { type: "object" } },
                  },
                },
              },
            },
          },
          500: {
            description: "Error interno del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/dashboard/{userId}": {
      get: {
        tags: ["Dashboard"],
        summary: "Obtener dashboard de usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Dashboard del usuario",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Dashboard" },
              },
            },
          },
          404: {
            description: "Dashboard no encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Dashboard not found for user",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/badges/{userId}": {
      get: {
        tags: ["Badges"],
        summary: "Obtener insignias de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Lista de insignias del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Badge" },
                },
              },
            },
          },
          404: {
            description: "Usuario o insignias no encontradas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No badges found for user",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/challenge-points/{userId}": {
      get: {
        tags: ["Challenge Points"],
        summary: "Obtener puntos de retos de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Puntos de retos del usuario",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ChallengePoints" },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User challenge points not found",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/pets/{userId}": {
      get: {
        tags: ["Pets"],
        summary: "Obtener mascotas de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Lista de mascotas del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Pet" },
                },
              },
            },
          },
          404: {
            description: "Usuario o mascotas no encontradas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No pets found for user",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/quiz-points/{userId}": {
      get: {
        tags: ["Quiz Points"],
        summary: "Obtener puntos de quiz de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Puntos de quiz del usuario",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/QuizPoints" },
              },
            },
          },
          404: {
            description: "Usuario no encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User quiz points not found",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/quiz-points/award": {
      post: {
        tags: ["Quiz Points"],
        summary: "Otorgar puntos de quiz a un usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AwardQuizPointsRequest" },
              examples: {
                example1: {
                  value: {
                    user_id: "user-123",
                    quiz_id: "quiz-456",
                    points_earned: 10,
                    quiz_score_percentage: 85,
                    bonus_reason: "First quiz of the day",
                    multiplier: 1.5,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Transacción exitosa",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AwardQuizPointsResponse",
                },
              },
            },
          },
          400: {
            description: "Error de validación o negocio",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AwardQuizPointsError" },
              },
            },
          },
        },
      },
    },
    "/api/gamification/pets/{userId}/feature": {
      post: {
        tags: ["Pets"],
        summary:
          "Destacar una mascota para un usuario (solo una puede estar destacada a la vez)",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/FeaturePetRequest" },
              example: { petId: "pet-123" },
            },
          },
        },
        responses: {
          200: {
            description: "Mascota destacada correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FeaturePetResponse" },
                example: {
                  message: "Mascota destacada correctamente",
                  featuredPetId: "pet-123",
                },
              },
            },
          },
          400: {
            description: "Error de validación o negocio",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Mascota no pertenece al usuario",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/pets/{userId}/evolve": {
      post: {
        tags: ["Pets"],
        summary:
          "Evolucionar una mascota del usuario (descuenta puntos y sube etapa)",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  petId: {
                    type: "string",
                    description: "ID de la mascota a adoptar",
                    example: "pet-123",
                  },
                  nickname: {
                    type: "string",
                    description: "Apodo opcional para la mascota",
                    example: "Firulais",
                    nullable: true,
                  },
                },
                required: ["petId"],
              },
              example: { petId: "pet-123", nickname: "Firulais" },
            },
          },
        },
        responses: {
          204: {
            description: "Mascota adoptada correctamente (sin contenido)",
          },
          400: {
            description: "Petición inválida o puntos insuficientes",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Puntos de mascota insuficientes.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Mascota no encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Mascota no encontrada.",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "El usuario ya adoptó esta mascota",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "El usuario ya adoptó esta mascota.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/pets/owned/{userId}/{petId}/evolve": {
      post: {
        tags: ["Pets"],
        summary:
          "Evolucionar una mascota del usuario (descuenta puntos y sube etapa)",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota a evolucionar",
          },
        ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: { type: "object", properties: {} },
            },
          },
        },
        responses: {
          204: {
            description: "Mascota evolucionada correctamente (sin contenido)",
          },
          400: {
            description: "Petición inválida o puntos insuficientes",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example:
                        "Puntos de mascota insuficientes para evolucionar.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "El usuario no posee esta mascota",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "El usuario no posee esta mascota.",
                    },
                  },
                },
              },
            },
          },
          409: {
            description:
              "Mascota ya está en etapa máxima o no existe costo de evolución",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example:
                        "La mascota ya está en la etapa máxima o no existe costo de evolución.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/gamification/pets/owned/{userId}/{petId}/selected-stage": {
      patch: {
        tags: ["Pets"],
        summary: "Seleccionar la etapa visualizada de una mascota adoptada",
        description:
          "Permite al usuario seleccionar la etapa (stage) visualizada de una mascota que ya ha adoptado y evolucionado. Solo se puede seleccionar una etapa que ya haya sido desbloqueada.",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  stage: {
                    type: "integer",
                    minimum: 1,
                    description: "Etapa a visualizar (debe estar desbloqueada)",
                    example: 2,
                  },
                },
                required: ["stage"],
              },
              example: {
                stage: 2,
              },
            },
          },
        },
        responses: {
          204: {
            description: "Etapa seleccionada correctamente. No hay contenido.",
          },
          400: {
            description: "El campo stage es inválido.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
                example: {
                  message:
                    "El campo stage debe ser un número entero mayor o igual a 1.",
                },
              },
            },
          },
          404: {
            description: "El usuario no posee esta mascota.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
                example: { message: "El usuario no posee esta mascota." },
              },
            },
          },
          409: {
            description:
              "No puedes seleccionar una etapa que no has desbloqueado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { message: { type: "string" } },
                },
                example: {
                  message:
                    "No puedes seleccionar una etapa que no has desbloqueado.",
                },
              },
            },
          },
        },
      },
    },

    // Quiz Points - Additional endpoints
    "/api/gamification/quiz-points/history/{userId}": {
      get: {
        tags: ["Quiz Points"],
        summary: "Obtener historial de puntos de quiz de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Historial de puntos de quiz del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "history-123" },
                      user_id: { type: "string", example: "user-123" },
                      points_change: { type: "integer", example: 50 },
                      transaction_type: {
                        type: "string",
                        example: "quiz_completed",
                      },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/quiz-points/rankings": {
      get: {
        tags: ["Quiz Points"],
        summary: "Obtener rankings globales de quiz",
        responses: {
          200: {
            description: "Rankings globales de quiz",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      user_id: { type: "string", example: "user-123" },
                      total_quiz_score: { type: "integer", example: 1500 },
                      global_quiz_rank: { type: "integer", example: 1 },
                      weekly_quiz_rank: { type: "integer", example: 2 },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/quiz-points/rankings/weekly": {
      get: {
        tags: ["Quiz Points"],
        summary: "Obtener rankings semanales de quiz",
        responses: {
          200: {
            description: "Rankings semanales de quiz",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      user_id: { type: "string", example: "user-123" },
                      weekly_quiz_score: { type: "integer", example: 350 },
                      weekly_quiz_rank: { type: "integer", example: 1 },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/quiz-points/rankings/age-group/{ageGroup}": {
      get: {
        tags: ["Quiz Points"],
        summary: "Obtener rankings por grupo de edad",
        parameters: [
          {
            name: "ageGroup",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Grupo de edad (ej: 18-25)",
          },
        ],
        responses: {
          200: {
            description: "Rankings por grupo de edad",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      user_id: { type: "string", example: "user-123" },
                      total_quiz_score: { type: "integer", example: 1200 },
                      age_group_quiz_rank: { type: "integer", example: 1 },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    // Challenge Points - Additional endpoints
    "/api/gamification/challenge-points/history/{userId}": {
      get: {
        tags: ["Challenge Points"],
        summary: "Obtener historial de puntos de retos de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Historial de puntos de retos del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "history-456" },
                      user_id: { type: "string", example: "user-123" },
                      points_change: { type: "integer", example: 100 },
                      transaction_type: {
                        type: "string",
                        example: "challenge_completed",
                      },
                      environmental_category: {
                        type: "string",
                        example: "energy",
                      },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/challenge-points/rankings": {
      get: {
        tags: ["Challenge Points"],
        summary: "Obtener rankings globales de retos",
        responses: {
          200: {
            description: "Rankings globales de retos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      user_id: { type: "string", example: "user-123" },
                      total_challenge_score: { type: "integer", example: 2500 },
                      global_challenge_rank: { type: "integer", example: 1 },
                      environmental_impact_score: {
                        type: "integer",
                        example: 850,
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/challenge-points/rankings/environmental-impact": {
      get: {
        tags: ["Challenge Points"],
        summary: "Obtener rankings de impacto ambiental",
        responses: {
          200: {
            description: "Rankings de impacto ambiental",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      user_id: { type: "string", example: "user-123" },
                      environmental_impact_score: {
                        type: "integer",
                        example: 950,
                      },
                      environmental_impact_rank: {
                        type: "integer",
                        example: 1,
                      },
                      total_challenges_completed: {
                        type: "integer",
                        example: 25,
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    // Pets - Additional endpoints
    "/api/gamification/pets/available": {
      get: {
        tags: ["Pets"],
        summary: "Obtener mascotas disponibles para adoptar",
        responses: {
          200: {
            description: "Lista de mascotas disponibles",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "pet-123" },
                      name: { type: "string", example: "Ajolote Dorado" },
                      species_type: { type: "string", example: "amphibian" },
                      quiz_points_cost: { type: "integer", example: 200 },
                      rarity: { type: "string", example: "rare" },
                      description: {
                        type: "string",
                        example: "Anfibio mágico de Xochimilco",
                      },
                      avatar_url: {
                        type: "string",
                        example: "https://example.com/ajolote.png",
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pets/store": {
      get: {
        tags: ["Pets"],
        summary: "Obtener tienda de mascotas con precios y ofertas",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "ID del usuario para verificar puntos disponibles",
          },
        ],
        responses: {
          200: {
            description: "Tienda de mascotas",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    available_pets: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          pet_id: { type: "string", example: "pet-123" },
                          name: { type: "string", example: "Ajolote Dorado" },
                          quiz_points_cost: { type: "integer", example: 200 },
                          rarity: { type: "string", example: "rare" },
                          description: {
                            type: "string",
                            example: "Anfibio mágico de Xochimilco",
                          },
                          avatar_url: {
                            type: "string",
                            example: "https://example.com/ajolote.png",
                          },
                          is_on_sale: { type: "boolean", example: false },
                          user_can_afford: { type: "boolean", example: true },
                        },
                      },
                    },
                    user_quiz_points: { type: "integer", example: 850 },
                    featured_pets: {
                      type: "array",
                      items: { type: "string" },
                      example: ["pet-123", "pet-456"],
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pets/{petId}/details": {
      get: {
        tags: ["Pets"],
        summary: "Obtener detalles específicos de una mascota",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
          {
            name: "userId",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "ID del usuario para información personalizada",
          },
        ],
        responses: {
          200: {
            description: "Detalles de la mascota",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "pet-123" },
                    name: { type: "string", example: "Ajolote Dorado" },
                    scientific_name: {
                      type: "string",
                      example: "Ambystoma mexicanum",
                    },
                    species_type: { type: "string", example: "amphibian" },
                    habitat: { type: "string", example: "Xochimilco" },
                    rarity: { type: "string", example: "rare" },
                    is_mexican_native: { type: "boolean", example: true },
                    quiz_points_cost: { type: "integer", example: 200 },
                    evolution_chain: {
                      type: "array",
                      items: { type: "string" },
                    },
                    base_stats: { type: "object" },
                    user_owns: { type: "boolean", example: false },
                    user_can_afford: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          404: { description: "Mascota no encontrada" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pets/purchase": {
      post: {
        tags: ["Pets"],
        summary: "Comprar mascota (endpoint alternativo a adopt)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string", example: "user-123" },
                  petId: { type: "string", example: "pet-456" },
                  nickname: { type: "string", example: "Mi Ajolote" },
                },
                required: ["userId", "petId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Mascota comprada exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Pet purchased successfully",
                    },
                    transaction_id: {
                      type: "string",
                      example: "txn_1234567890_user-123",
                    },
                    pet_id: { type: "string", example: "pet-456" },
                    nickname: { type: "string", example: "Mi Ajolote" },
                    purchased_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          400: { description: "Puntos insuficientes o petición inválida" },
          409: { description: "El usuario ya posee esta mascota" },
          500: { description: "Error interno del servidor" },
        },
      },
    },

    // Badges - Additional endpoints
    "/api/gamification/badges/available/{userId}": {
      get: {
        tags: ["Badges"],
        summary: "Obtener badges disponibles para desbloquear por un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Badges disponibles para el usuario",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    available_badges: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          badge_id: { type: "string", example: "badge-123" },
                          name: { type: "string", example: "Eco Warrior Gold" },
                          description: {
                            type: "string",
                            example: "Complete 20 environmental challenges",
                          },
                          challenge_points_required: {
                            type: "integer",
                            example: 2000,
                          },
                          user_current_points: {
                            type: "integer",
                            example: 1850,
                          },
                          points_needed: { type: "integer", example: 150 },
                          tier: { type: "string", example: "gold" },
                          category: {
                            type: "string",
                            example: "environmental",
                          },
                        },
                      },
                    },
                    next_tier_progress: {
                      type: "object",
                      properties: {
                        current_tier: { type: "string", example: "gold" },
                        next_tier: { type: "string", example: "platinum" },
                        progress_percentage: { type: "number", example: 75.5 },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/badges/tiers/progress/{userId}": {
      get: {
        tags: ["Badges"],
        summary: "Obtener progreso de tiers de badges de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Progreso de tiers del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    current_tier: { type: "string", example: "gold" },
                    next_tier: { type: "string", example: "platinum" },
                    current_points: { type: "integer", example: 1850 },
                    points_to_next_tier: { type: "integer", example: 150 },
                    progress_percentage: { type: "number", example: 92.5 },
                    tier_benefits: {
                      type: "object",
                      properties: {
                        current: { type: "array", items: { type: "string" } },
                        next: { type: "array", items: { type: "string" } },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/badges/tiers/config": {
      get: {
        tags: ["Badges"],
        summary: "Obtener configuración de tiers de badges",
        responses: {
          200: {
            description: "Configuración de tiers",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      tier_name: { type: "string", example: "gold" },
                      tier_order: { type: "integer", example: 3 },
                      challenge_points_required: {
                        type: "integer",
                        example: 2000,
                      },
                      tier_color_hex: { type: "string", example: "#FFD700" },
                      tier_icon_url: {
                        type: "string",
                        example: "https://example.com/gold-icon.png",
                      },
                      tier_description: {
                        type: "string",
                        example: "Tier dorado para usuarios avanzados",
                      },
                      rewards_unlocked: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/badges/{userId}/feature": {
      post: {
        tags: ["Badges"],
        summary: "Destacar un badge para un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  badgeId: { type: "string", example: "badge-123" },
                },
                required: ["badgeId"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Badge destacado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Badge destacado correctamente",
                    },
                    featuredBadgeId: { type: "string", example: "badge-123" },
                  },
                },
              },
            },
          },
          400: { description: "Badge no pertenece al usuario" },
          404: { description: "Badge no encontrado" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    // Combined/Rankings - Additional endpoints
    "/api/gamification/rankings/combined": {
      get: {
        tags: ["Dashboard"],
        summary: "Obtener rankings combinados de quiz y challenge points",
        responses: {
          200: {
            description: "Rankings combinados",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    quiz_rankings: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          user_id: { type: "string", example: "user-123" },
                          total_quiz_score: { type: "integer", example: 1500 },
                          global_quiz_rank: { type: "integer", example: 1 },
                        },
                      },
                    },
                    challenge_rankings: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          user_id: { type: "string", example: "user-123" },
                          total_challenge_score: {
                            type: "integer",
                            example: 2500,
                          },
                          global_challenge_rank: {
                            type: "integer",
                            example: 1,
                          },
                        },
                      },
                    },
                    combined_rankings: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          user_id: { type: "string", example: "user-123" },
                          combined_score: { type: "integer", example: 4000 },
                          combined_rank: { type: "integer", example: 1 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/rankings/user-stats/{userId}": {
      get: {
        tags: ["Dashboard"],
        summary: "Obtener estadísticas completas de un usuario",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID del usuario",
          },
        ],
        responses: {
          200: {
            description: "Estadísticas completas del usuario",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user_id: { type: "string", example: "user-123" },
                    quiz_system: {
                      type: "object",
                      properties: {
                        available_points: { type: "integer", example: 850 },
                        level: { type: "integer", example: 5 },
                        level_progress: { type: "number", example: 67.5 },
                        owned_pets_count: { type: "integer", example: 3 },
                        global_rank: { type: "integer", example: 45 },
                      },
                    },
                    challenge_system: {
                      type: "object",
                      properties: {
                        total_points: { type: "integer", example: 3450 },
                        current_tier: { type: "string", example: "gold" },
                        tier_progress: { type: "number", example: 75.5 },
                        owned_badges_count: { type: "integer", example: 12 },
                        environmental_rank: { type: "integer", example: 23 },
                      },
                    },
                    recent_achievements: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: { type: "string", example: "badge_unlocked" },
                          name: { type: "string", example: "Water Saver" },
                          unlocked_at: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T10:30:00Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Usuario no encontrado" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pet-evolution-costs": {
      post: {
        tags: ["PetEvolutionCosts"],
        summary: "Crear un costo de evolución para una mascota",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  petId: { type: "string", example: "pet-123" },
                  stage: { type: "integer", example: 2 },
                  cost: { type: "number", example: 500 },
                },
                required: ["petId", "stage", "cost"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Costo de evolución creado exitosamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PetEvolutionCost" },
              },
            },
          },
          400: { description: "Datos inválidos" },
          409: { description: "Ya existe un costo para esa mascota y etapa" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pet-evolution-costs/{petId}": {
      get: {
        tags: ["PetEvolutionCosts"],
        summary: "Obtener todos los costos de evolución para una mascota",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
        ],
        responses: {
          200: {
            description: "Lista de costos de evolución",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/PetEvolutionCost" },
                },
              },
            },
          },
          400: { description: "ID de mascota inválido" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pet-evolution-costs/{petId}/{stage}": {
      put: {
        tags: ["PetEvolutionCosts"],
        summary:
          "Actualizar el costo de evolución para una etapa específica de una mascota",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
          {
            name: "stage",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "Etapa de evolución",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cost: { type: "number", example: 750 },
                },
                required: ["cost"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Costo de evolución actualizado exitosamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PetEvolutionCost" },
              },
            },
          },
          400: { description: "Datos inválidos" },
          404: { description: "No existe costo para esa mascota y etapa" },
          500: { description: "Error interno del servidor" },
        },
      },
      delete: {
        tags: ["PetEvolutionCosts"],
        summary:
          "Eliminar el costo de evolución para una etapa específica de una mascota",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
          {
            name: "stage",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "Etapa de evolución",
          },
        ],
        responses: {
          204: { description: "Costo de evolución eliminado exitosamente" },
          400: { description: "Datos inválidos" },
          404: { description: "No existe costo para esa mascota y etapa" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pets": {
      post: {
        tags: ["Pets"],
        summary: "Crear una nueva especie de mascota",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Dragonite" },
                  species_type: { type: "string", example: "dragon" },
                  description: {
                    type: "string",
                    example: "Un dragón amigable que evoluciona con el tiempo",
                  },
                  rarity: { type: "string", example: "rare" },
                  base_price: { type: "number", example: 1000 },
                  icon_url: {
                    type: "string",
                    example: "https://example.com/pets/dragon.png",
                  },
                  evolution_stages: { type: "integer", example: 3 },
                  environmental_preference: {
                    type: "string",
                    example: "mountain",
                  },
                  available_in_store: { type: "boolean", example: true },
                },
                required: ["name", "species_type"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Mascota creada exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    species_type: { type: "string" },
                    created_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          500: { description: "Error interno del servidor" },
        },
      },
    },
    "/api/gamification/pets/id/{petId}": {
      get: {
        tags: ["Pets"],
        summary: "Obtener una mascota por su ID",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
        ],
        responses: {
          200: {
            description: "Mascota encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" },
              },
            },
          },
          404: { description: "Mascota no encontrada" },
          500: { description: "Error interno del servidor" },
        },
      },
      put: {
        tags: ["Pets"],
        summary: "Actualizar una mascota existente",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Dragonite Plus" },
                  species_type: { type: "string", example: "dragon" },
                  description: {
                    type: "string",
                    example: "Versión mejorada del dragón amigable",
                  },
                  rarity: { type: "string", example: "epic" },
                  base_price: { type: "number", example: 1500 },
                  icon_url: {
                    type: "string",
                    example: "https://example.com/pets/dragon_plus.png",
                  },
                  evolution_stages: { type: "integer", example: 4 },
                  environmental_preference: {
                    type: "string",
                    example: "mountain",
                  },
                  available_in_store: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Mascota actualizada exitosamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" },
              },
            },
          },
          404: { description: "Mascota no encontrada" },
          500: { description: "Error interno del servidor" },
        },
      },
      delete: {
        tags: ["Pets"],
        summary: "Eliminar una mascota",
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID de la mascota",
          },
        ],
        responses: {
          204: { description: "Mascota eliminada exitosamente" },
          404: { description: "Mascota no encontrada" },
          500: { description: "Error interno del servidor" },
        },
      },
    },
  },
};

export default swaggerDocument;
