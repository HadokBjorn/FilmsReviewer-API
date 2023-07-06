import moviesRepository from "@/repositories/movies.repositories";
import httpStatus from "http-status";
import { Request, Response } from "express";
import errorCase from "@/errors/errors";
import { Movie } from "@prisma/client";
import { convertDate } from "@/services/movies.services";

type CreateMovie = Omit<Movie, "id">

async function createMovie(req: Request, res:Response) {
	const userId:number = res.locals.user.id;
	const body = req.body as CreateMovie;
	body.date = convertDate(req.body.date)
	body.user_id = userId;
	try{
		await moviesRepository.createMovieDB(body)
		res.sendStatus(httpStatus.OK)
	}catch (error) {
		throw errorCase.conflictError("Movie")
	}
}

async function getMovies(req: Request, res:Response) {
	const movies = await moviesRepository.getMoviesDB();
	res.status(httpStatus.OK).send(movies);
}

async function getOneMovie(req: Request, res:Response) {
	const { id } = req.params;
	const movie = await moviesRepository.getOneMovieDB(Number(id));
	if(!movie) throw errorCase.notFoundError("Movie")
	res.status(httpStatus.OK).send(movie);
}

async function deleteMovie(req: Request, res:Response) {
	const { id } = req.params;
	const userId = res.locals.user.id;
	const movieDeleted = await moviesRepository.deleteMovieDB( Number(id), userId );

	if(movieDeleted.count === 0) throw errorCase.notFoundError("Movie deletion failed as it")
	res.status(httpStatus.OK).send("Movie was deleted");
}

const movieControllers = {
	createMovie,
	getMovies,
	getOneMovie,
	deleteMovie,
};
export default movieControllers;