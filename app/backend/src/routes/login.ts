import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';

const login = Router();

login.post('/', (req: Request, res: Response) => LoginController.login(req, res));

export default login;
