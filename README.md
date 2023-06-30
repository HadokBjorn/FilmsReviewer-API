# FilmsReviewer-API
An API to do your reviewers of films

Seja bem-vindo a FIlmsReviewer API, uma public-API para fazer resenhas de filmes que você já assistiu ou pretende assistir.

Abaixo estão as orientações de como consumir essa aplicação.

Path root da API:

```https://filmsreviewer-api.onrender.com```

Para testar se a conexão no seu endpoint deu certo, você pode usar a rota: 

```https://filmsreviewer-api.onrender.com/health```

Ela retornará o status 200 e um "ok" caso esteja tudo certo.

# Rota de cadastro: 

### POST: ```/signup```

Espera receber um body do tipo:

```js
{
    username: "meu_username",//string
    email:"meu_email@email.com",//string com formato de email
    password:"minha_senha"//string com no minimo 6 caracteres
}
```

Em caso de sucesso receberá status 201 created.

# Rota de Login: 

### POST: ```/login```

Espera receber um body do tipo:

```js
{
    email:"meu_email@email.com",//string com formato de email
    password:"minha_senha"//string com no minimo 6 caracteres
}
```

Em caso de sucesso receberá status 200 ok e uma resposta do tipo:

```js
{

  "id": 1, //number

  "token": "eyJhbGckshdfsdfsdiOiJIUzI1NiIsInçdfçlsdjdf787dfdsfsfdss", //string

  "username": "meu_username" //string

}
```