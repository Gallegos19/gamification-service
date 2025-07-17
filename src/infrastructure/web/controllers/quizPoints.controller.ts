import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getQuizPointsByUserId(req: Request, res: Response) {
    const getQuizPointsByUserIdUseCase = container.getQuizPointsByUserIdUseCase;
    const { userId } = req.params;
    
    console.log(`Obteniendo puntos de quiz para userId: ${userId}`);
    
    // Validar que userId sea un UUID válido
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
        console.log(`UUID inválido recibido: ${userId}`);
        return res.status(400).json({ 
            message: 'Invalid user ID format. Must be a valid UUID.',
            received: userId
        });
    }
    
    try {
        const quizPoints = await getQuizPointsByUserIdUseCase.execute(userId);
        if (!quizPoints) {
            return res.status(404).json({ message: 'User quiz points not found' });
        }
        res.json(quizPoints);
    } catch (error: any) {
        console.error('Error al obtener puntos de quiz:', error);
        
        // Manejar errores específicos de Prisma
        if (error.code === 'P2023') {
            return res.status(400).json({ 
                message: 'Invalid UUID format in database query',
                details: error.message
            });
        }
        
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getQuizHistory(req: Request, res: Response) {
    const getQuizHistoryUseCase = container.getQuizHistoryUseCase;
    const { userId } = req.params;
    
    // Validar que userId sea un UUID válido
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format. Must be a valid UUID.' });
    }
    
    try {
        const history = await getQuizHistoryUseCase.execute(userId);
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getQuizRankings(req: Request, res: Response) {
    const getQuizRankingsUseCase = container.getQuizRankingsUseCase;
    try {
        const rankings = await getQuizRankingsUseCase.execute();
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getWeeklyQuizRankings(req: Request, res: Response) {
    const getWeeklyQuizRankingsUseCase = container.getWeeklyQuizRankingsUseCase;
    try {
        const rankings = await getWeeklyQuizRankingsUseCase.execute();
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createQuizPointsHistory(req: Request, res: Response) {
    const useCase = container.createQuizPointsHistoryUseCase;
    try {
        const record = await useCase.execute(req.body);
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateQuizPointsHistory(req: Request, res: Response) {
    const useCase = container.updateQuizPointsHistoryUseCase;
    const { historyId } = req.params;
    try {
        const record = await useCase.execute(historyId, req.body);
        res.json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteQuizPointsHistory(req: Request, res: Response) {
    const useCase = container.deleteQuizPointsHistoryUseCase;
    const { historyId } = req.params;
    try {
        await useCase.execute(historyId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createQuizPointsRanking(req: Request, res: Response) {
    const useCase = container.createQuizPointsRankingUseCase;
    try {
        const record = await useCase.execute(req.body);
        res.status(201).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateQuizPointsRanking(req: Request, res: Response) {
    const useCase = container.updateQuizPointsRankingUseCase;
    const { userId } = req.params;
    
    // Validar que userId sea un UUID válido
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format. Must be a valid UUID.' });
    }
    
    try {
        const record = await useCase.execute(userId, req.body);
        res.json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteQuizPointsRanking(req: Request, res: Response) {
    const useCase = container.deleteQuizPointsRankingUseCase;
    const { userId } = req.params;
    try {
        await useCase.execute(userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createQuizPoints(req: Request, res: Response) {
    const createQuizPointsUseCase = container.createQuizPointsUseCase;
    try {
        const quizPoints = await createQuizPointsUseCase.execute(req.body);
        res.status(201).json(quizPoints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateQuizPoints(req: Request, res: Response) {
    const updateQuizPointsUseCase = container.updateQuizPointsUseCase;
    const { userId } = req.params;
    
    // Validar que userId sea un UUID válido
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format. Must be a valid UUID.' });
    }
    
    try {
        const quizPoints = await updateQuizPointsUseCase.execute(userId, req.body);
        res.json(quizPoints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteQuizPoints(req: Request, res: Response) {
    const deleteQuizPointsUseCase = container.deleteQuizPointsUseCase;
    const { userId } = req.params;
    
    // Validar que userId sea un UUID válido
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format. Must be a valid UUID.' });
    }
    
    try {
        await deleteQuizPointsUseCase.execute(userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAgeGroupQuizRankings(req: Request, res: Response) {
    const getAgeGroupQuizRankingsUseCase = container.getAgeGroupQuizRankingsUseCase;
    const { ageGroup } = req.params;
    try {
        const rankings = await getAgeGroupQuizRankingsUseCase.execute(ageGroup);
        res.json(rankings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

