import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import usersRepositories from "@/repositories/users.repositories"
import { Request, Response, NextFunction } from "express";
import errorCase from "@/errors/errors";
import { User } from "@prisma/client";
import userRepositories from "@/repositories/users.repositories";

dotenv.config();

async function validateLogin(req:Request, res:Response, next: NextFunction) {
	const { email, password } = req.body;
    
    const user = await usersRepositories.getUserByEmailDB(email);

    if (!user || user.length > 1) throw errorCase.unauthorizedError("Email or password invalid.");

    const correctPassword = bcrypt.compareSync(password, user[0].password);

    if (!correctPassword) throw errorCase.unauthorizedError("Email or password invalid.");

    const { id, username, image} = user[0];
    const oneHour = 3600; //one hour in seconds
    const token = jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: oneHour });
    await usersRepositories.deleteExpiredSessionDB(id, token);

    res.locals.infos = { id, token, username, image };
    
    next();
}

async function validateSignup(req:Request, res:Response, next: NextFunction) {
    const {email} = req.body as User
	const duplicateEmail = await userRepositories.getUserByEmailDB(email)
    
    if(duplicateEmail.length > 1) throw errorCase.conflictError("user")
    
    next();
}

const userMiddleware = {
    validateLogin,
    validateSignup
}
export default userMiddleware;