import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import teamsMocks from './mocks/teams.mocks';

import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes para a rota de teams', () => {
  let chaiHttpResponse: Response;

  it('deve ser retornado um status de 200 e todos os times cadastrados quando a rota GET /teams é chamada', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teamsMocks.allTeams as Team[]);
    
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.allTeams);
  });
});