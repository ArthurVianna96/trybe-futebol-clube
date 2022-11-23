import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import matchesMocks from './mocks/matches.mocks';

import { Response } from 'superagent';
import Match from '../database/models/Match';
import IMatchResponse from '../interfaces/IMatchResponse';
import IMatchCreationRequest from '../interfaces/IMatchCreationRequest';
import Team from '../database/models/Team';
import teamsMocks from './mocks/teams.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste das rotas de matches', () => {
  let chaiHttpResponse: Response;

  describe('Rotas GET', () => {
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

  describe('Rotas POST', () => {
    it('deve retornar um status de 201 e as informações da partida adicionada quando a rota POST /matches for chamada', async () => {
      const createMatchRequest: IMatchCreationRequest = {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }

      sinon
        .stub(Team, 'findByPk')
        .resolves(teamsMocks.oneTeam as Team);

      sinon
        .stub(Match, 'create')
        .resolves(matchesMocks.createdMatch as Match);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(createMatchRequest);

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.deep.equal(matchesMocks.createdMatch);

      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('deve retornar um status de 400 se alguma informação da partida não foi providenciada quando a rota POST /matches for chamada', async () => {
      const createMatchRequest = {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
      }

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(createMatchRequest);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be provided');
    });

    it('deve retornar um status de 400 se alguma informação da partida não for do tipo número quando a rota POST /matches for chamada', async () => {
      const createMatchRequest = {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": "0"
      }

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(createMatchRequest);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.eq('All fields must be of type number');
    });

    it('deve retornar um status de 422 se o homeTeam e o awayTeam forem iguais quando a rota POST /matches for chamada', async () => {
      const createMatchRequest = {
        "homeTeam": 16, 
        "awayTeam": 16, 
        "homeTeamGoals": 2,
        "awayTeamGoals": 0
      }

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(createMatchRequest);

      expect(chaiHttpResponse).to.have.status(422);
      expect(chaiHttpResponse.body).to.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.eq('It is not possible to create a match with two equal teams');
    });

    it('deve retornar um status de 404 caso algum time informado não exista quando a rota POST /matches for chamada', async () => {
      const createMatchRequest: IMatchCreationRequest = {
        "homeTeam": 160000, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }

      sinon
        .stub(Team, 'findByPk')
        .onFirstCall()
        .resolves(teamsMocks.oneTeam as Team)
        .onSecondCall()
        .resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(createMatchRequest);

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.eq('There is no team with such id!');

      (Team.findByPk as sinon.SinonStub).restore();
    });
  });

  describe('Rotas PATCH', () => {
    it('deve retornar um status 200 e terminar uma partida com exito caso a rota PATCH /matches/:id/finish', async () => {
      const mockId = 5;
      sinon
        .stub(Match, 'update')
        .resolves([1]);
      
      chaiHttpResponse = await chai
        .request(app)
        .patch(`/matches/${5}/finish`);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.haveOwnProperty('message');
      expect(chaiHttpResponse.body.message).to.be.eq('Finished');

      (Match.update as sinon.SinonStub).restore();
    });
  });

});