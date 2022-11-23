import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const teams = Router();

teams.get('/', (req: Request, res: Response) => TeamsController.getAll(req, res));

export default teams;
