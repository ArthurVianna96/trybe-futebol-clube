import { Request, Response } from 'express';
import IMatchCreationRequest from '../interfaces/IMatchCreationRequest';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress = 'all' } = req.query;
    const matches = await MatchesService.getAll(inProgress as string);
    return res.status(200).json(matches);
  }

  static async add(req: Request, res: Response) {
    const matchCreationRequest = req.body as IMatchCreationRequest;
    const { type, message } = await MatchesService.add(matchCreationRequest);
    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(201).json(message);
  }
}

export default MatchesController;