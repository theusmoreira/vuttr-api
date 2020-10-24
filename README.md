<div align="center">
  <img src="https://thumbs.gfycat.com/EllipticalGraciousGavial-size_restricted.gif" />
</div>
<h1 align="center">VUTTR-API</h1>

<div align="center">

  <img src="https://img.shields.io/github/repo-size/matheus-santos-moreira/vuttr-api?style=for-the-badge" />
  <img src="https://img.shields.io/github/package-json/v/matheus-santos-moreira/vuttr-api?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/matheus-santos-moreira/vuttr-api?color=blue&style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/top/matheus-santos-moreira/vuttr-api?color=blue&style=for-the-badge" />

</div>

---

<p align="center">Projeto desenvolvido para o desafio de back-end da BossaBox.
    <br>
</p>

## 📝 Conteúdos

- [Sobre](#about)
- [Começando](#getting_started)
- [Uso](#usage)
- [TODO](../TODO.md)
- [Autor](#authors)

## 🧐 Sobre <a name = "about"></a>

A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, link, descrições e tags.

Utilizei a metodologia DDD (Domain Driven Design), usei TDD (Test Driven Development) e também fiz uso de alguns princípios do SOLID.

Como sugestão para o desafio, adicionei cadastro e autenticação de usuário, para que possamos gerenciar melhor nossas ferramentas. Depois que feita a autenticação do usuário, a api irá retornar um token JWT, para que possamos criar, listar, filtrar e deletar as ferramentas.

Todos os requisitos são baseados no desafio da [BossaBox](https://app.bossabox.com/).

## 🏁 Começando <a name = "getting_started"></a>

A API está disponível em produção em https://vuttr-api.matheussantosdev.com.
Já existe um usuário de testes, abaixo estão credenciais para login.

```json
"email": "test@test.com"
"password": "123456"
```

Se tiver interesse em rodar a aplicação em ambiente local, continue seguindo os passos abaixo.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) ~ Recomendo usar a versão LTS 12.x
- [VSCode](https://code.visualstudio.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

Também é necessário a utilização de um banco de dados, usei o [PostgreSQL](https://www.postgresql.org/) que irá ser executado em container com o [Docker](https://www.docker.com/).

```bash
# Para criar um container usando o comando abaixo, é necessário ter o docker
# instalado em sua máquina
# Lembrando que você pode trocar os valores da variáveis, só lembre de todas as
# variáveis pois iremos utilizar mais para frente
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=vuttr -p 5432:5432 -d postgres
```

### Instalação

A seguir daremos inicio ao processo de instalação da api em ambiente local.

```bash
# Clone este repositório
$ git clone https://github.com/matheus-santos-moreira/vuttr-api

# # Acesse a pasta do projeto no terminal/cmd
$ cd vuttr-api

# Instale as dependências
$ yarn
```

Antes de executar a api precisamos de mais uma configuração, no diretório da api, existe um arquivo .env.example, renomeie ele para apenas .env.
Ele terá o seguinte conteúdo:

```bash
# Na variável abaixo você coloca um hash de segurança para a sua aplicação,
# existe uma ferramenta online [MD5](http://www.md5.cz/)
# que pode ser usada para gerar esse hash
APP_SECRET=
APP_WEB_URL=http://localhost:3000
APP_API_URL=http://localhost:3333

PORT=3333

# Nessa variável definimos se iremos rodar a aplicação em modo de desenvolvimento
# ou modo de produção para modo de produção, é só trocar a variável para production
# e seguir o passo a passo de execução em modo de produção
NODE_ENV=development

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres

POSTGRES_PASSWORD=docker
POSTGRES_DB=vuttr

```

Já as variáveis com o prefixo POSTGRES, são as variáveis que definimos quando rodamos o comando docker run, a POSTGRES_USER é definida por padrão como postgres, pois não setamos ela no comando docker run.
Agora vamos seguir com a instalação:


```bash
# Usaremos esse comando para criar as tabelas no banco de dados
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ yarn dev:server

# 🚀 Server started on port 3333!​
# O servidor inciará na porta:3333 - http://localhost:3333
```

### Rodando a aplicação em produção

Para rodar em produção definimos a variável NODE_ENV como production, e rodamos os comandos abaixo:

```bash
# Iremos rodar esse comando para gerar o build da api, que irá criar uma pasta dist
# na raiz do projeto
$ yarn build

# Usaremos para rodar novamente as tabelas no banco de dados
$ yarn typeorm migration:run

# Execute a aplicação em modo de produção
$ node dist/shared/infra/http/server.js

# 🚀 Server started on port 3333!​
# O servidor inciará na porta:3333 - http://localhost:3333
```

## 🔧 Testes <a name = "tests"></a>

Para rodar os testes na aplicação usa-se o seguinte comando:

```bash
$ yarn test
```

Na api existe os seguintes testes:

- **`should be able to create a new user`**: Para que esse teste passe, a aplicação deve permitir a criação de um novo usuário.

- **`should not be able to create a new user with duplicate email`**: Para que esse teste passe, a aplicação não deve permitir a criação de um novo usuário, com o e-mail já existente.

- **`should be able to authenticate`**: Para que esse teste passe, a aplicação deve permitir a autenticação de um usuário.

- **`should not be able to authenticate with non existing user`**: Para que esse teste passe, a aplicação não deve permitir a autenticação de um usuário que não existe.

- **`should not be able to authenticate with wrong password`**: Para que esse teste passe, a aplicação não deve permitir a autenticação de um usuário com password invalido.

- **`should be able to create a new tool`**: Para que esse teste passe, a aplicação deve permitir que uma ferramenta seja criada.

- **`should be able to list tools`**: Para que esse teste passe, a aplicação deve permitir que seja retornado um array contendo todas as ferramentas.

- **`should not be able to list another user tools`**: Para que esse teste passe, a aplicação não deve permitir que seja retornado um array contendo todas as ferramentas de outro usuário.

- **`should be able to list tools with tag`**: Para que esse teste passe, a aplicação deve permitir que seja retornado todas as ferramentas que contém a tag passada como query na rota.

- **`should be able to delete a tool`**: Para que esse teste passe, a aplicação deve permitir deletar uma ferramenta.

- **`should not be able to delete a tool with a non-existent id`**: Para que esse teste passe, a aplicação não deve permitir deletar uma ferramenta que não exista.



## 🎈 Uso <a name="usage"></a>

Para uso da API recomendo o uso dos softwares [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/).

### Rotas da Aplicação

Para a rotas `/tools` é necessário que o usuário esteja logado na aplicação, pois nessas rotas enviamos no cabeçalho de requisição Authorization, um bearer token que é recebido após o login do usuário.


- **`POST /tools`**: Rota para cadastrar uma nova ferramenta. O corpo da requisição deve conter as informações da ferramenta a ser cadastrada, sem o ID (gerado automaticamente).

  É enviado no corpo da requisição:
  ```json
  {
    "title": "hotel",
    "link": "http://github.com/typicode/hotel",
    "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
    "tags": [
      "npm", "yarn", "node"
    ]
  }
  ```

  É retornado na requisição:
  ```json
  {
  "id": "d1faae72-7b48-4724-9253-6d1d6f0d4e8c",
  "title": "hotel",
  "link": "http://github.com/typicode/hotel",
  "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  "tags": [
    "npm",
    "yarn",
    "node"
  ],
  "created_at": "2020-10-22T23:14:20.656Z",
  "updated_at": "2020-10-22T23:14:20.656Z"
  }
  ```


- **`GET /tools`**: Rota para listar todas as ferramentas cadastradas.

  É retornado na requisição:
  ```json
  [
    {
      "id": "8e8af611-2535-4f59-ad5b-790082a72b48",
      "title": "Insomnia",
      "link": "https://insomnia.rest/",
      "description": "Leading Open Source API Client, and Collaborative API Design Platform for GraphQL, and REST.",
      "tags": [
        "debug",
        "test",
        "api"
      ],
      "created_at": "2020-10-22T23:14:02.598Z",
      "updated_at": "2020-10-22T23:14:02.598Z"
    },
    {
      "id": "d1faae72-7b48-4724-9253-6d1d6f0d4e8c",
      "title": "hotel",
      "link": "http://github.com/typicode/hotel",
      "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
      "tags": [
        "npm",
        "yarn",
        "node"
      ],
      "created_at": "2020-10-22T23:14:20.656Z",
      "updated_at": "2020-10-22T23:14:20.656Z"
    }
  ]
  ```

- **`GET /tools?tag={tag}`**: Rota para listar ferramentas utilizando uma busca por tag, ou seja, filtrando as ferramentas de acordo com a tag recebida.

  `/tools?tag=npm`

  É retornado na requisição:
  ```json
  {
    "id": "d1faae72-7b48-4724-9253-6d1d6f0d4e8c",
    "title": "hotel",
    "link": "http://github.com/typicode/hotel",
    "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
    "tags": [
      "npm",
      "yarn",
      "node"
    ],
    "created_at": "2020-10-22T23:14:20.656Z",
    "updated_at": "2020-10-22T23:14:20.656Z"
  }
  ```

- **`DELETE /tools/{id}`**: Rota para deletar uma ferramenta. Se recebido um status 204, é que foi concluída com exito a requisição.

- **`POST /tools`**: Rota para cadastrar uma novo usuário. O corpo da requisição deve conter as informações do usuário como nome, email e senha, sem o ID (gerado automaticamente).

  É enviado no corpo da requisição:
  ```json
  {
	"name": "Matheus Santos",
	"email": "matheus@test.com",
	"password": "123456"
  }
  ```

  É retornado na requisição:
  ```json
  {
  "id": "f2a610a8-dcb9-4a40-ad15-a1b781ba07a9",
  "name": "Matheus Santos",
  "email": "matheus@test.com",
  "created_at": "2020-10-24T00:22:58.143Z",
  "updated_at": "2020-10-24T00:22:58.143Z"
  }
  ```

  - **`POST /tools`**: Rota para autenticar um usuário, é enviado no corpo da requisição, email e password.

  É enviado no corpo da requisição:
  ```json
  {
	"email": "matheus@test.com",
	"password": "123456"
  }
  ```

  É retornado na requisição:
  ```json
  {
    "user": {
      "id": "2c906c2b-86c8-4c1c-bf8d-d6caf562c70f",
      "name": "Test",
      "email": "test@test.com",
      "created_at": "2020-10-24T03:29:05.072Z",
      "updated_at": "2020-10-24T03:29:05.072Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM0OTk0NDEsImV4cCI6MTYwMzU4NTg0MSwic3ViIjoiMmM5MDZjMmItODZjOC00YzFjLWJmOGQtZDZjYWY1NjJjNzBmIn0.WX-B1HtW8-MzALfLW8RXfkohlmIToJpLc7Zq8VZsVzg"
  }
  ```

## ✍️ Autor <a name = "authors"></a>

<a href="https://www.linkedin.com/in/matheus-santos-moreira">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/52337444?s=460&u=98daaab916965e0330ef6552c0e879eb75e51bb1&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Matheus Santos</b></sub></a> <a href="https://www.linkedin.com/in/matheus-santos-moreira" title="Matheus Santos">🚀</a>
​
<br />
​
Feito com ❤️ por Matheus Santos!
​
