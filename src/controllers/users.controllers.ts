import bcrypt from "bcrypt";
import userRepositories from "@/repositories/users.repositories";
import httpStatus from "http-status";
import { Request, Response } from "express";
import errorCase from "@/errors/errors";
import { User } from "@/types/users.types";

async function signup(req: Request, res:Response) {
	const { username, image, email, password } = req.body as User;
	const hash = bcrypt.hashSync(password, 10);
    const duplicateEmail = await userRepositories.getUserByEmailDB(email)
    
    if(duplicateEmail.rowCount >= 1) throw errorCase.conflictError()

    const createdUser = await userRepositories.createUserDB({ username, image, email, hash });
    if (!createdUser) throw errorCase.conflictError();

    res.sendStatus(201);        
}

async function login(req: Request, res:Response) {
	const { id, token, username, image } = res.locals.infos;
	const createSession = await userRepositories.createSessionDB({ id, token });
	if(createSession.rowCount === 0) throw new Error("Something wrong in your session. Please try again.");
    
    res.status(httpStatus.OK).send({ id, token, username, image});
}

const userControllers = {
    signup,
    login
}
export default userControllers;