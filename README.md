# FilmsReviewer-API
An API to do your reviewers of films

Seja bem-vindo a FIlmsReviewer API, uma public-API para fazer resenhas de filmes que você já assistiu ou pretende assistir.

Abaixo estão as orientações de como consumir essa aplicação.

# Path root da API:

```https://filmsreviewer-api.onrender.com```

Para testar se a conexão no seu endpoint deu certo, você pode usar a rota: 

```https://filmsreviewer-api.onrender.com/health```

Ela retornará o status 200 e um "ok" caso esteja tudo certo.

# Rota de cadastro: 

### POST: ```https://filmsreviewer-api.onrender.com/signup```

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

### POST: ```https://filmsreviewer-api.onrender.com/login```

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

  "username": "meu username" //string

}
```

# Rota para criar um filme: 

### POST: ```https://filmsreviewer-api.onrender.com/movies```

Espera receber um body do tipo:

```js
{
  "title": "Titulo do Filme", //string
  "synopsis": "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.", //string
  "date": "2014", //string com minimo e maximo de 4 caracteres 
  "genre": "Aventura, Drama, Ficção Científica", //string
  "poster": "https://i.pinimg.com/originals/03/b1/c5/03b1c515fc72146f114c5aeb66695fb3.jpg" //string no formato de url
}
```

e um token com o seguinte formato:

```js
const config = {headers: {Authorization: `Bearer ${token}`}}
```

Usando o ```axios``` por exemplo você fará o POST no front da seguinte forma:

```js
axios.post(URL, body, config)
```

Em caso de sucesso receberá status 201 created.

# Rota para obter filmes adicionados pelo usuário: 

### GET: ```https://filmsreviewer-api.onrender.com/movies```

espera receber um token com o seguinte formato:

```js
const config = {headers: {Authorization: `Bearer ${token}`}}
```

Usando o ```axios``` por exemplo você fará o GET no front da seguinte forma:

```js
axios.get(URL, config)
```

Em caso de sucesso receberá status 200 ok e uma resposta do tipo:

```js
[
  {
    id: 1,
    user_id: 1,
    title: "Click",
    synopsis: "Um arquiteto casado e com filhos está cada vez mais frustrado por passar a maior parte de seu tempo trabalhando. Um dia, ele encontra um inventor excêntrico que lhe dá um controle remoto universal, com capacidade de acelerar o tempo. No início, ele usa o aparelho para acelerar qualquer momento tedioso, mas se dá conta de que está acelerando o tempo demais e deixando de viver preciosos momentos em família. Desesperado, ele procura o inventor para ajudá-lo a reverter o que fez.",
    date: "2006-01-01T05:00:00.000Z",
    genre: "Comédia,Romance, Drama, Fantasia",
    poster: "https://macmagazine.com.br/wp-content/uploads/2013/09/19-click.jpg",
    watched: false
  }
]
```