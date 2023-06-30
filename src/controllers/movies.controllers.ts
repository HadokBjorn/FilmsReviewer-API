import userRepositories from "@/repositories/users.repositories";
import httpStatus from "http-status";
import { Request, Response } from "express";


async function deleteMovie(req: Request, res:Response) {
	const { id } = req.params;
	const userId = res.locals.user.id;
	try {
		await userRepositories.deleteMovieDB( Number(id), userId );
		res.sendStatus(200);
	} catch (err) {
		res.status(500).send(err.message);
	}
}