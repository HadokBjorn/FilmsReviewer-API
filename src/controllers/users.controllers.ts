import bcrypt from "bcrypt";
import userRepositories from "@/repositories/users.repositories";
import httpStatus from "http-status";
import { Request, Response } from "express";
import errorCase from "@/errors/errors";
import { User } from "@/types/users.types";

async function signup(req: Request, res:Response) {
	const { username, image, email, password } = req.body as User;
	const hash = bcrypt.hashSync(password, 10);
    try {
        await userRepositories.createUserDB({ username, image, email, password: hash });
        res.sendStatus(201);        
        
    } catch (error) {
        throw errorCase.conflictError("user");
    }
    
    
    
}

async function login(req: Request, res:Response) {
	const { id, token, username, image } = res.locals.infos;
	await userRepositories.createSessionDB({ user_id: id, token });    
    res.status(httpStatus.OK).send({ id, token, username, image});
}

const userControllers = {
    signup,
    login
}
export default userControllers;