import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matches = Router();

matches.get('/', (req: Request, res: Response) => MatchesController.getAll(req, res));

export default matches;
