import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatchResponse from '../interfaces/IMatchResponse';

class MatchesService {
  static async getAll(inProgressQuery: string): Promise<IMatchResponse[]> {
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
    if (inProgressQuery === 'false') {
      return matches.filter(({ inProgress }) => !inProgress) as IMatchResponse[];
    }
    if (inProgressQuery === 'true') {
      return matches.filter(({ inProgress }) => inProgress) as IMatchResponse[];
    }
    return matches as IMatchResponse[];
  }
}

export default MatchesService;
