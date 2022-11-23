import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchResponse from '../interfaces/IMatchResponse';

class MatchesService {
  static async getAll(): Promise<IMatchResponse[]> {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches as IMatchResponse[];
  }
}

export default MatchesService;
