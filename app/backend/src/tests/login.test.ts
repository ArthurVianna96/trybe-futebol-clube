import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import userMocks from './mocks/user.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota de login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMocks.oneUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('deve ser retornado um status 200 e um token caso o login seja válido', async () => {
    const validUser = {
      email: "mock user",
      password: "secret_admin"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...validUser })
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('deve ser retornado um status de 400 caso nenhum email seja fornecido', async () => {
    const invalidUser = {
      password: "any password"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...invalidUser })
    
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('deve ser retornado um status de 400 caso nenhuma senha seja fornecida', async () => {
    const invalidUser = {
      email: "any email"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...invalidUser })
    
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('deve ser retornado um status de 401 caso nenhum usuario seja encontrado', async () => {
    (User.findOne as sinon.SinonStub).restore();
    sinon
      .stub(User, "findOne")
      .resolves(null);

    const validUser = {
      email: "not a user",
      password: "secret_admin"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...validUser })
    
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('deve ser retornado um status de 401 caso a senha informada não esteja correta', async () => {
    const validUser = {
      email: "correct_user",
      password: "incorrect_password"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...validUser })
    
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('deve ser retornado um status 200 e um perfil', async () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxfSwiaWF0IjoxNjY5MTU3ODI1fQ.6sbiQCzjvJzGdpvxKjwFbEAKD5xwORbPCP7fhf2pvro';
    sinon
      .stub(User, "findByPk")
      .resolves({ role: 'admin' } as User);
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set('authorization', validToken)
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('role');
    expect(chaiHttpResponse.body.role).to.be.eq('admin');
    (User.findByPk as sinon.SinonStub).restore();
  });

  it('deve ser retornado um status 401 caso um token não seja fornecido', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('token not provided');
  });
});
