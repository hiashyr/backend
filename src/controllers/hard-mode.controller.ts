import { Request, Response } from 'express';
import HardModeService from '../services/hard-mode.service';

class HardModeController {
    async getStats(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const stats = await HardModeService.getStats(req.user.id);
            
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Get hard mode stats error:', error);
            res.status(500).json({ 
                error: 'Failed to get hard mode stats',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }

    async startTest(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const result = await HardModeService.startTest(req.user.id);
            
            res.json({
                success: true,
                data: {
                    attemptId: result.attemptId,
                    questions: result.questions,
                    timeLimit: result.timeLimit
                }
            });
        } catch (error) {
            console.error('Start hard mode test error:', error);
            res.status(500).json({ 
                error: 'Failed to start hard mode test',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }

    async getAttempt(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { attemptId } = req.params;
            const parsedAttemptId = parseInt(attemptId, 10);
            
            if (isNaN(parsedAttemptId)) {
                res.status(400).json({ error: 'Invalid attempt ID' });
                return;
            }

            const attempt = await HardModeService.getAttempt(parsedAttemptId, req.user.id);
            
            res.json({
                success: true,
                data: attempt
            });
        } catch (error) {
            console.error('Get hard mode attempt error:', error);
            res.status(500).json({ 
                error: 'Failed to get attempt',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }

    async submitAnswer(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { attemptId } = req.params;
            const { questionId, answerId } = req.body;
            
            const result = await HardModeService.submitAnswer(
                Number(attemptId),
                Number(questionId),
                Number(answerId),
                req.user.id
            );
            
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Submit hard mode answer error:', error);
            res.status(500).json({ 
                error: 'Failed to submit answer',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }

    async getResults(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { attemptId } = req.params;
            
            const result = await HardModeService.getResults(
                Number(attemptId),
                req.user.id
            );
            
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Get hard mode results error:', error);
            res.status(500).json({ 
                error: 'Failed to get results',
                details: error instanceof Error ? error.message : undefined
            });
        }
    }
}

export default new HardModeController(); 