import { Request, Response } from 'express';
import { container } from '../../config/container';

export async function getQuizRankings(req: Request, res: Response) {
    console.log('Obteniendo rankings de quiz desde el controlador específico');
    const getQuizRankingsUseCase = container.getQuizRankingsUseCase;
    try {
        const rankings = await getQuizRankingsUseCase.execute();
        res.json(rankings);
    } catch (error) {
        console.error('Error al obtener rankings de quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getWeeklyQuizRankings(req: Request, res: Response) {
    console.log('Obteniendo rankings semanales de quiz desde el controlador específico');
    const getWeeklyQuizRankingsUseCase = container.getWeeklyQuizRankingsUseCase;
    try {
        const rankings = await getWeeklyQuizRankingsUseCase.execute();
        res.json(rankings);
    } catch (error) {
        console.error('Error al obtener rankings semanales de quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAgeGroupQuizRankings(req: Request, res: Response) {
    console.log('Obteniendo rankings por grupo de edad desde el controlador específico');
    const getAgeGroupQuizRankingsUseCase = container.getAgeGroupQuizRankingsUseCase;
    const { ageGroup } = req.params;
    try {
        const rankings = await getAgeGroupQuizRankingsUseCase.execute(ageGroup);
        res.json(rankings);
    } catch (error) {
        console.error('Error al obtener rankings por grupo de edad:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}