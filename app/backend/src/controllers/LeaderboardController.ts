import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async get(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.get();
    return res.status(200).json(leaderboard);
  }

  static async getHome(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getHome();
    return res.status(200).json(leaderboard);
  }

  static async getAway(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAway();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
