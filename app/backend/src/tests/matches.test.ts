import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import matchesMocks from './mocks/matches.mocks';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import IMatchResponse from '../interfaces/IMatchResponse';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste das rotas de matches', () => {
  let chaiHttpResponse: Response;

  it('deve retornar um status de 200 e todas as partidas cadastradas quando a rota GET /matches é chamada', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(matchesMocks.matches as IMatchResponse[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(matchesMocks.matches);

    (Match.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar um status de 200 e todas as partidas em andamento quando a rota GET /matches?inProgress=true é chamada', async () => {
    sinon
    .stub(Match, 'findAll')
    .resolves(matchesMocks.matches as IMatchResponse[]);

  chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true');

  expect(chaiHttpResponse).to.have.status(200);
  expect(chaiHttpResponse.body).to.be.an('array');
  expect(chaiHttpResponse.body).to.deep.equal(matchesMocks.matchesInProgress);

  (Match.findAll as sinon.SinonStub).restore();
  });

  it('deve retornar um status de 200 e todas as partidas em andamento quando a rota GET /matches?inProgress=true é chamada', async () => {
    sinon
    .stub(Match, 'findAll')
    .resolves(matchesMocks.matches as IMatchResponse[]);

  chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false');

  expect(chaiHttpResponse).to.have.status(200);
  expect(chaiHttpResponse.body).to.be.an('array');
  expect(chaiHttpResponse.body).to.deep.equal(matchesMocks.matchesNotInProgress);

  (Match.findAll as sinon.SinonStub).restore();
  });
});