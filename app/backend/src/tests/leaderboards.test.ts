import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import matchesMocks from './mocks/matches.mocks';
import leaderboardsMocks from './mocks/leaberboards.mocks';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import IMatchResponse from '../interfaces/IMatchResponse';

const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de leaderboard', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(Match, 'findAll').resolves(matchesMocks.matches as IMatchResponse[]);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar um status de 200 e a tabela geral ordenada de maneira correta quando a rota GET /leaderboard é chamada', async () => {
    chaiHttpResponse = await chai 
      .request(app)
      .get('/leaderboard');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardsMocks.leaderboard);
  });

  it('deve retornar um status de 200 e a tabela de mandantes ordenada de maneira correta quando a rota GET /leaderboard/home é chamada', async () => {
    chaiHttpResponse = await chai 
      .request(app)
      .get('/leaderboard/home');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardsMocks.homeLeaderBoard);
  });

  it('deve retornar um status de 200 e a tabela de visitantes ordenada de maneira correta quando a rota GET /leaderboard/away é chamada', async () => {
    chaiHttpResponse = await chai 
      .request(app)
      .get('/leaderboard/away');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(leaderboardsMocks.awayLeaderBoard);
  });
});