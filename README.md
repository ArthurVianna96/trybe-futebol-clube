# :soccer: Trybe Futebol Clube

Olá. Bem vindo ao projeto Trybe Futebol Clube (TFC). Este projeto do módulo de Back-end da Trybe consiste no desenvolvimento de uma aplicação para acompanhamento e gerenciamento de um campeonato de futebol.

## :rocket: Habilidades Praticadas no Projeto
- Dockerização da aplicação (frontend, backend e banco de dados) utilizando [docker compose](https://docs.docker.com/compose/)
- Modelagem de banco de dados MySQL utilizando o ORM [Sequelize](https://sequelize.org/)
- Acesso, extração e manipulação de dados de um banco de dados
- Desenvolvimento de API seguindo os padrões REST 
- Paradigma de Programação Orientada a Objetos (P.O.O) e padrão S.O.L.I.D
- Implementação de testes de Integração

## 🛠️ Linguagens, Ferramentas e Bibliotecas Utilizadas
-   [Node.js](https://nodejs.org/en/);
-   [Express.js](https://expressjs.com/);
-   [MySQL](https://www.mysql.com/);
-   [Sequelize(ORM)](https://sequelize.org/);
-   [JWT(Autenticação)](https://jwt.io/);
-   [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js#readme);
-   [Docker](https://www.docker.com/);
-   [TypeScript](https://www.typescriptlang.org/);
-   [Mocha](https://mochajs.org/);
-   [Chai](https://www.chaijs.com/);
-   [Sinon.js](https://sinonjs.org/);

## :book: Sobre o Projeto
Dentro de `app/` temos duas pastas contendo o frontend e o backend da aplicação. 
O frontend da aplicação foi desenvolvido pela [Trybe](https://www.betrybe.com/) e disponibilizada aos alunos.
### Features da API desenvolvida
- Autenticação e autorização de usuário;
- Consulta de times cadastrados;
- Cadastro de partidas;
- Edição de partidas;
- Consulta de partidas;
- Consulta de tabela atualizada do campeonato
## Como rodar o projeto
É possível rodar o projeto tanto localmente quanto em containers.

### :whale: rodando em contêineres
dentro da raiz da aplicação, rode: 
```shell
npm run compose:up
``` 
ou
 ```shell
 npm run compose:up:dev
```
para rodar em desenvolvimento
### :computer: rodando localmente
para iniciar o backend acesse `app/backend/`
atualize o arquivo `.env.example` para `.env` e edite as variáveis de acordo com o acesso ao seu banco de dados local.
Depois, rode:
```shell
npm run prestart && npm run start
```
ou 
```shell
npm run predev && npm run dev
```
para rodar em desenvolvimento.
para iniciar o frontend acesse `app/frontend/` e rode:
```shell
npm run start
```

## Observações importantes
Os seguintes arquivos foram desenvolvidos parcialmente ou integralmente pela Trybe:
- os arquivos de configuração contidos na raiz do projeto;
- os arquivos de configuração contidos na pasta `app/backend/` exceto o `dockerfile`;
- os arquivos contidos em `app/backend/src/database/seeders` e `app/backend/src/database/config`;
- os arquivos `app/backend/src/app.ts` e `app/backend/src/index.ts`;
- os arquivos contidos na pasta `app/frontend/`
