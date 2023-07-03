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
	try{
		await moviesRepository.createMovieDB(body)
		res.sendStatus(httpStatus.CREATED)
	}catch (error) {
		if (error.code === '23505' && error.constraint === 'movies_title_key') return res.status(httpStatus.CONFLICT).send('O título do filme já existe.');
	}

}

async function getMovies(req: Request, res:Response) {
	const movies = await moviesRepository.getUserMoviesDB();
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