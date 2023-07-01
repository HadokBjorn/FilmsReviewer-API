import { Movie } from "@/types/users.types"
import joi from "joi"

export const movieSchema = joi.object<Movie>({
    title: joi.string().min(1).trim().required(),
    synopsis: joi.string().min(30).trim().required(),
    date: joi.string().min(4).max(4).trim().required(),
    genre: joi.string().min(3).trim().required(),
    poster: joi.string().uri().required(),
    watched: joi.boolean(),
})