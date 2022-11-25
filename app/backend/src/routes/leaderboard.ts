import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboard = Router();

leaderboard.get('/', (req: Request, res: Response) => LeaderboardController.get(req, res));
leaderboard.get('/home', (req: Request, res: Response) => LeaderboardController.getHome(req, res));
leaderboard.get('/away', (req: Request, res: Response) => LeaderboardController.getAway(req, res));

export default leaderboard;
