import { Request, Response, NextFunction } from 'express';
import ErrorMap from '../utils/errorMap';

class ValidateMatchCreation {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const fields = [homeTeam, awayTeam, homeTeamGoals, awayTeamGoals];
    if (fields.some((field) => field === undefined)) {
      return res.status(ErrorMap.BAD_REQUEST).json({ message: 'All fields must be provided' });
    }

    if (fields.some((field) => typeof field !== 'number')) {
      return res.status(ErrorMap.BAD_REQUEST).json({
        message: 'All fields must be of type number',
      });
    }

    if (homeTeam === awayTeam) {
      return res.status(ErrorMap.UNPROCESSABLE).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }
}

export default ValidateMatchCreation;
