import prisma from "@/database/database.connections";
import { Movie } from "@prisma/client";

type CreateMovie = Omit<Movie,"id">


function createMovieDB(body:CreateMovie) {
    return prisma.movie.create({
        data:body
    })
}

function getMoviesDB(){
    return prisma.movie.findMany()
}

function getOneMovieDB(id: number){
    return prisma.movie.findUnique({where:{id}})
}

function deleteMovieDB(id:number, userId:number) {
	return prisma.movie.deleteMany({
        where:{
            AND: [
                {id},
                {user_id: userId}
            ]
        }
    })
}

const moviesRepository = {
    createMovieDB,
    getMoviesDB,
    getOneMovieDB,
    deleteMovieDB,
}

export default moviesRepository;