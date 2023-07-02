import moviesRepository from "@/repositories/movies.repositories";
import httpStatus from "http-status";
import { Request, Response } from "express";
import errorCase from "@/errors/errors";
import { Movie } from "@/types/users.types";
import { convertDate } from "@/services/movies.services";

async function createMovie(req: Request, res:Response) {
	const userId:number = res.locals.user.id;
	const body = req.body as Movie;
	body.date = convertDate(req.body.date)
	body.userId = userId;
	
	const movieCreated = await moviesRepository.createMovieDB(body)
	
	if (!movieCreated) throw errorCase.UnprocessableEntityError("Sorry, you can't create a film :(")

	res.sendStatus(httpStatus.CREATED)

}

async function getMovies(req: Request, res:Response) {
	const userId:number = res.locals.user.id;
	const movies = await moviesRepository.getUserMoviesDB(userId);
	res.status(httpStatus.OK).send(movies.rows);
}

async function deleteMovie(req: Request, res:Response) {
	const { id } = req.params;
	const userId = res.locals.user.id;
	try {
		await moviesRepository.deleteMovieDB( Number(id), userId );
		res.sendStatus(httpStatus.OK);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

const movieControllers = {
	createMovie,
	getMovies,
	deleteMovie,
};
export default movieControllers;