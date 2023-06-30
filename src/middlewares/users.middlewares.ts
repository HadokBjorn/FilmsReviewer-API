import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import usersRepositories from "@/repositories/users.repositories"
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import errorCase from "@/errors/errors";

dotenv.config();

export async function validateLogin(req:Request, res:Response, next: NextFunction) {
	const { email, password } = req.body;
    
    const user = await usersRepositories.getUserByEmailDB(email);

    if (user.rowCount === 0) throw errorCase.unauthorizedError("Email or password invalid.");

    const correctPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!correctPassword) throw errorCase.unauthorizedError("Email or password invalid.");

    const { id, username} = user.rows[0];
    const oneHour = 3600; //one hour in seconds
    const token = jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: oneHour });
    await usersRepositories.deleteExpiredSessionDB(id, token);

    res.locals.infos = { id, token, username };
    
    next();
}