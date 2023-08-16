import prisma from "../src/database/database.connections";

async function main() {
    console.log('Inicializando seed...');
    
    const movies = await prisma.movie.findMany({})
    let user = await prisma.user.findUnique({
        where:{
            email:"movieAdmin@system.com"
        }
    })
    if(!user){
        user = await prisma.user.create({
            data:{
                username: "Pikachu",
                image: "https://www.ensino.eu/media/3kyh4vko/pokemon.jpg",
                email: "movieAdmin@system.com",
                password: "40028922"
            }
        })
        console.log(user);
    }

    if(movies.length===0){
        const movie = await prisma.movie.create({
            data:{
                user_id: user.id,
                title: "Click",
                synopsis: "Um arquiteto casado e com filhos está cada vez mais frustrado por passar a maior parte de seu tempo trabalhando. Um dia, ele encontra um inventor excêntrico que lhe dá um controle remoto universal, com capacidade de acelerar o tempo. No início, ele usa o aparelho para acelerar qualquer momento tedioso, mas se dá conta de que está acelerando o tempo demais e deixando de viver preciosos momentos em família. Desesperado, ele procura o inventor para ajudá-lo a reverter o que fez.",
                date: "2006-01-01T00:00:00.000Z",
                genre: "Comédia,Romance, Drama, Fantasia",
                poster: "https://macmagazine.com.br/wp-content/uploads/2013/09/19-click.jpg",
                watched: false,
            }
        })
        console.log(movie);
        
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });