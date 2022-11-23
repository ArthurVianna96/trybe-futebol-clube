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
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.allTeams);
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('deve ser retornado um status de 200 e o time com o id específico quando a rota GET /teams/:id é chamada', async () => {
    const testId = 5;

    sinon
      .stub(Team, "findByPk")
      .resolves(teamsMocks.oneTeam as Team);

    chaiHttpResponse = await chai
      .request(app)
      .get(`/teams/${testId}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMocks.oneTeam);
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('deve ser retornado um status de 200 e null quando a rota GET /teams/:id é chamada com o id de um time que não existe', async () => {
    const testId = 5000;

    sinon
      .stub(Team, "findByPk")
      .resolves(null);

    chaiHttpResponse = await chai
      .request(app)
      .get(`/teams/${testId}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.null;

    (Team.findByPk as sinon.SinonStub).restore();
  });
});