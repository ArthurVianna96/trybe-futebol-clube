import { Router, Request, Response, NextFunction } from 'express';
import ValidateCreation from '../middlewares/ValidateMatchCreation';
import MatchesController from '../controllers/MatchesController';

const matches = Router();

matches.get('/', (req: Request, res: Response) => MatchesController.getAll(req, res));
matches.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => ValidateCreation.validate(req, res, next),
  (req: Request, res: Response) => MatchesController.add(req, res),
);
matches.patch(
  '/:id/finish',
  (req: Request, res: Response) => MatchesController.finishGame(req, res),
);

export default matches;
