# API Rentx

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar-o-projeto">Como executar o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor>Autor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/count/AndersonUfop/api-rentx">
  <img src="https://img.shields.io/github/languages/code-size/AndersonUfop/api-rentx"
</p>


![backend](https://user-images.githubusercontent.com/49786548/125171378-4be57f00-e18a-11eb-8179-8f3a5feb598e.png)


## 💻 Sobre o projeto
Projeto desenvolvido na trilha Node JS do Ignite da Rocketseat.
Este projeto consiste em desenvolver o backend para uma aplicação de locadora de veículos, possuindo as seguintes funcionalidades:

### Cadstro de carro

**Requisitos funcionais (RF)**
- Deve ser possível cadastrar um novo carro.

**Regras de negócio (RN)**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado, por padrão com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros

**Requisitos funcionais (RF)**
- Deve ser possível listar todos os carros disponíveis;
- Deve ser possível listar todas as categoriais;
- Deve ser possível listar os carros pelo nome da categoria;
- Deve ser possível listar os carros pelo nome da marca;
- Deve ser possível listar os carros pelo nome do carro;

**Regras de negócio (RN)**
- O usuário não precisa estar logado no sistema.

### Cadastro de especificação no carro
**Requisitos funcionais (RF)**
- Deve ser possível cadastrar uma especificação por carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**Regras de negócio**
- Não deve ser possível uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### Cadastro de imagens do carro

**Requisitos funcionais (RF)**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requisitos não funcionais (RNF)**
- Utilizar o multer para upload dos arquivos

**Regras de negócio (RN)**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro·
- O usuário responsável pelo cadastro deve ser um usuário administrador.

### Aluguel de carro

**Requisitos funcionais (RF)**
- Deve ser possível cadastrar um aluguel.

**Regras de Negócio (RN)**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.

## :rocket: Tecnologias
A aplicação foi desenvolvida usando as seguintes tecnologias e ferramentas:
- [TypeScript](https://www.typescriptlang.org)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org)
- [Docker](https://www.docker.com)
- [Redis](https://redis.io)
- [MongoDB](https://www.mongodb.com)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Tsyringe](https://www.npmjs.com/package/tsyringe)
- [Swagger](https://swagger.io/)
- [AWS EC2](https://aws.amazon.com/)

## 🚀 Como executar o projeto

Para executar o projeto em sua máquina você deverá ter instalado o Node JS (em sua versão LTS), Yarn, Docker e um editor de código.

Para que o projeto rode em sua máquina, siga as seguintes instruções:

1- Clone este repositório em sua máquina, digitando este comando em um terminal:

```git clone https://github.com/AndersonUfop/api-rentx/```

2- Em um terminal acesse a pasta api-rentx:

```cd api-rentx```

3- Instale as dependências, rodando o comando ```yarn```.

4- No arquivo ormconfig.json, altere o username e password, para os que estão configurados no seu docker.

5- Abra o DBeaver e crie uma nova conexão, inserindo os dados:
  - HOST: localhost / 192.168.99.100
  - DATABASE: Postgres
  - USERNAME: Postgres
  - PASSWORD: docker

6- Ainda no DBeaver crie um banco de dados com o nome *rentx*.

7- Para rodar as migrations, digite o comando: ```yarn typeorm migration:run```.

8- Por fim, digite ```yarn dev``` para iniciar a aplicação.

## 🤔 Como contribuir?

- Fork o repositório;
- Crie um branch com seu recurso: ```git checkout -b my-feature```;
- Faça commit de suas mudanças: ```git commit -m 'feat: My new feature'```;
- Envie para o seu branch: ```git push origin my-feature```.
- Após a mesclagem de sua solicitação pull, você pode excluir seu branch.

## 🦸 Autor
<img style="border-radius: 50%" src="https://instagram.fplu14-1.fna.fbcdn.net/v/t51.2885-19/s150x150/210580897_521661042378107_4696043254012376827_n.jpg?_nc_ht=instagram.fplu14-1.fna.fbcdn.net&_nc_ohc=CzFuGXZLNF4AX9QB2aK&tn=HVBsahGFRydsbaPl&edm=ABfd0MgBAAAA&ccb=7-4&oh=b664f35c449844f907d12d4eaf5043f6&oe=60EFCAF7&_nc_sid=7bff83" width="100px;"> <br />

<a href="https://www.linkedin.com/in/anderson-fernandes-8b5a50135/">

  <sub><b>Anderson Fernandes 🚀</b></sub></a>

Feito com :purple_heart: por Anderson Fernandes 👋🏽
Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Anderson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/anderson-fernandes-8b5a50135/)](https://www.linkedin.com/in/anderson-fernandes-8b5a50135/)
[![Gmail Badge](https://img.shields.io/badge/-andersonfferreira96@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:andersonfferreira96@gmail.com)](mailto:andersonfferreira96@gmail.com)

___
