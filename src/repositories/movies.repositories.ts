import prisma from "@/database/database.connections";
import { Movie } from "@prisma/client";

type CreateMovie = Omit<Movie,"id">


function createMovieDB(body:CreateMovie) {
    return prisma.movie.create({
        data:body
    })
}

function getUserMoviesDB(){
    return prisma.movie.findMany()
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
    getUserMoviesDB,
    deleteMovieDB,
}

export default moviesRepository;