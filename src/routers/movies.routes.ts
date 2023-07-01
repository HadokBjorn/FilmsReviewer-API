import movieControllers from "@/controllers/movies.controllers";
import { authorization } from "@/middlewares/auth.middewares";
import validateSchema from "@/middlewares/validateSchema.middlewares";
import { movieSchema } from "@/schemas/movies.schemas";
import { Router } from "express";

const movieRouters = Router();

movieRouters.post("/movies", validateSchema(movieSchema),authorization, movieControllers.createMovie)
movieRouters.get("/movies",authorization, movieControllers.getMovies)

export default movieRouters;