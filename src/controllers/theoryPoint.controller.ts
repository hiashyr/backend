import { Request, Response } from 'express';
import logger from '../config/logger';
import TheoryPointService from '../services/theoryPoint.service';

class TheoryPointController {
  async getPoints(req: Request, res: Response): Promise<void> {
    try {
      const points = await TheoryPointService.getPoints();

      res.status(200).json({
        success: true,
        data: Array.isArray(points) ? points : []
      });
    } catch (error) {
      logger.error('Get points error:', { error });
      res.status(500).json({
        error: 'Failed to get points',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }

  async getPoint(req: Request, res: Response): Promise<void> {
    try {
      const { pointId } = req.params;
      const parsedPointId = parseInt(pointId, 10);

      if (isNaN(parsedPointId)) {
        res.status(400).json({ error: 'Invalid point ID' });
        return;
      }

      const point = await TheoryPointService.getPoint(parsedPointId);

      if (!point) {
        res.status(404).json({ error: 'Point not found' });
        return;
      }

      res.json({
        success: true,
        data: point
      });
    } catch (error) {
      logger.error('Get point error:', { error });
      res.status(500).json({
        error: 'Failed to get point',
        details: error instanceof Error ? error.message : undefined
      });
    }
  }
}

export default new TheoryPointController();
